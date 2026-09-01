import { esc, html, kopf, notiz, seite } from './layout';
import type { Standort } from '../types';

/**
 * Scan-Station fürs Lager (Weg B aus KONZEPT.md Abschnitt 3a).
 *
 * Web NFC läuft nur in Chromium auf Android. Auf allen anderen Geräten zeigt
 * die Seite ehrlich an, dass es hier nicht geht, statt einen toten Knopf
 * anzubieten — der Banner-Weg über /t/:code funktioniert ja weiterhin.
 */
export function stationSeite(standorte: Standort[], ziel: number | null): Response {
  const optionen = standorte.map((s) =>
    `<option value="${s.id}"${s.id === ziel ? ' selected' : ''}>${esc(s.name)}</option>`,
  ).join('');

  const inhalt = `
<h1>Scan-Station</h1>
<p class="still">Dauerscan fürs Be- und Entladen. Ein Ziel wählen, dann Tag an Tag halten.</p>

<div id="nicht-unterstuetzt" hidden>
  ${notiz('hinweis', 'Dieses Gerät kann nicht dauerscannen',
    ' Web NFC gibt es nur in Chrome auf Android. Auf dem iPhone stattdessen den Tag direkt antippen — das Banner öffnet die Einheit.')}
</div>

<div class="blatt">
  <div class="feld" style="margin-bottom:0"><label for="ziel">Alles buchen nach</label>
    <select id="ziel">${optionen}</select></div>
</div>
<button id="start" class="knopf knopf-haupt" type="button">Scannen starten</button>
<button id="stop" class="knopf knopf-warn" type="button" hidden>Scannen beenden</button>

<article class="blatt" id="status" hidden style="text-align:center">
  <p id="status-text" style="font-size:20px;font-weight:650">Bereit — Tag ans Handy halten</p>
  <p style="font-size:40px;font-weight:700;letter-spacing:-.03em;margin-top:6px"
     id="zaehler">0</p>
  <p class="still">gebucht</p>
</article>

<ul class="stueckliste" id="protokoll" style="margin-top:4px"></ul>
<p class="fussnote"><a href="/">Übersicht</a></p>`;

  const skript = `<script>
(function () {
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var status = document.getElementById('status');
  var statusText = document.getElementById('status-text');
  var protokoll = document.getElementById('protokoll');
  var zaehler = document.getElementById('zaehler');
  var zielFeld = document.getElementById('ziel');
  var n = 0, abbruch = null;
  var zuletzt = {};

  if (!('NDEFReader' in window)) {
    document.getElementById('nicht-unterstuetzt').hidden = false;
    start.disabled = true;
    start.style.opacity = '.45';
    return;
  }

  function melden(zeichen, code, text, farbe) {
    var li = document.createElement('li');
    var a = document.createElement('span');
    a.className = 'anzahl';
    a.textContent = zeichen;
    if (farbe) a.style.color = farbe;
    var b = document.createElement('span');
    b.className = 'was';
    b.textContent = code + (text ? ' — ' + text : '');
    li.appendChild(a); li.appendChild(b);
    protokoll.insertBefore(li, protokoll.firstChild);
    while (protokoll.children.length > 40) protokoll.removeChild(protokoll.lastChild);
  }

  function codeAus(nachricht) {
    for (var i = 0; i < nachricht.records.length; i++) {
      var r = nachricht.records[i];
      if (r.recordType !== 'url' && r.recordType !== 'absolute-url') continue;
      var url = new TextDecoder().decode(r.data);
      var treffer = url.match(/\\/t\\/([0-9A-Z-]{4,12})/i);
      if (treffer) return treffer[1].toUpperCase();
    }
    return null;
  }

  async function buchen(code) {
    // Derselbe Tag zweimal in fünf Sekunden ist ein Doppelkontakt, keine
    // zweite Buchung — auf dem Stapel liegen die Tags dicht beieinander.
    var jetzt = Date.now();
    if (zuletzt[code] && jetzt - zuletzt[code] < 5000) return;
    zuletzt[code] = jetzt;

    try {
      var antwort = await fetch('/api/buchung', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ code: code, ziel: Number(zielFeld.value), quelle: 'nfc' })
      });
      var daten = await antwort.json();
      if (!antwort.ok || !daten.ok) {
        melden('✗', code, daten.fehler || 'Fehler', 'var(--rot-ink)');
        if (navigator.vibrate) navigator.vibrate([80, 60, 80]);
        return;
      }
      if (daten.unveraendert) {
        melden('•', code, 'stand schon hier', 'var(--ink3)');
      } else {
        n++;
        zaehler.textContent = String(n);
        melden('✓', code, daten.bezeichnung, 'var(--gruen)');
      }
      if (navigator.vibrate) navigator.vibrate(40);
    } catch (e) {
      melden('✗', code, 'kein Netz, bitte wiederholen', 'var(--rot-ink)');
    }
  }

  start.addEventListener('click', async function () {
    try {
      var leser = new NDEFReader();
      abbruch = new AbortController();
      await leser.scan({ signal: abbruch.signal });
      leser.onreading = function (ev) {
        var code = codeAus(ev.message);
        if (code) buchen(code);
        else melden('✗', 'Tag', 'ohne gültige URL', 'var(--rot-ink)');
      };
      leser.onreadingerror = function () {
        melden('✗', 'Tag', 'nicht lesbar', 'var(--rot-ink)');
      };
      start.hidden = true;
      stop.hidden = false;
      status.hidden = false;
      zielFeld.disabled = true;
      statusText.textContent = 'Bereit — Tag ans Handy halten';
    } catch (e) {
      melden('✗', 'Start', e.message, 'var(--rot-ink)');
    }
  });

  stop.addEventListener('click', function () {
    if (abbruch) abbruch.abort();
    start.hidden = false;
    stop.hidden = true;
    zielFeld.disabled = false;
    statusText.textContent = 'Beendet';
  });
})();
</script>`;

  return html(seite(inhalt, {
    titel: 'Scan-Station',
    kopf: kopf('Scan-Station', { href: '/', text: 'Übersicht' }),
    scripte: skript,
  }));
}
