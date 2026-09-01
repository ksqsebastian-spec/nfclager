import { esc, html, kopf, seite } from './layout';
import type { Standort } from '../types';

/**
 * Scan-Station fuers Lager (Weg B aus KONZEPT.md Abschnitt 3a).
 *
 * Web NFC laeuft nur in Chromium auf Android. Auf allen anderen Geraeten zeigt
 * die Seite ehrlich an, dass es hier nicht geht, statt einen toten Knopf
 * anzubieten — der Banner-Weg ueber /t/:code funktioniert ja weiterhin.
 */
export function stationSeite(standorte: Standort[], ziel: number | null): Response {
  const optionen = standorte.map((s) =>
    `<option value="${s.id}"${s.id === ziel ? ' selected' : ''}>${esc(s.name)}</option>`,
  ).join('');

  const inhalt = `
<h1>Scan-Station</h1>
<div id="nicht-unterstuetzt" class="hinweis" hidden>
  <strong>Dieses Gerät kann nicht dauerscannen.</strong>
  Web NFC gibt es nur in Chrome auf Android. Auf dem iPhone stattdessen den Tag
  direkt antippen — das Banner öffnet die Einheit.
</div>

<div class="karte">
  <div class="feld"><label for="ziel">Alles buchen nach</label>
    <select id="ziel">${optionen}</select></div>
  <button id="start" class="knopf knopf-haupt" type="button">Scannen starten</button>
  <button id="stop" class="knopf knopf-warn" type="button" hidden>Scannen beenden</button>
</div>

<div id="status" class="karte" hidden style="text-align:center">
  <p class="gross" id="status-text">Bereit — Tag ans Handy halten</p>
  <p style="color:#5a6472"><span id="zaehler">0</span> gebucht</p>
</div>

<ul class="inhalt" id="protokoll"></ul>
<p class="fuss"><a href="/">Übersicht</a></p>`;

  const skript = `<script>
(function () {
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var status = document.getElementById('status');
  var statusText = document.getElementById('status-text');
  var protokoll = document.getElementById('protokoll');
  var zaehler = document.getElementById('zaehler');
  var zielFeld = document.getElementById('ziel');
  var n = 0, laeuft = false, abbruch = null;
  var zuletzt = {};

  if (!('NDEFReader' in window)) {
    document.getElementById('nicht-unterstuetzt').hidden = false;
    start.disabled = true;
    start.style.opacity = '.5';
    return;
  }

  function melden(text, klasse) {
    var li = document.createElement('li');
    li.textContent = text;
    if (klasse) li.style.color = klasse;
    protokoll.insertBefore(li, protokoll.firstChild);
    while (protokoll.children.length > 40) protokoll.removeChild(protokoll.lastChild);
  }

  function codeAus(nachricht) {
    for (var i = 0; i < nachricht.records.length; i++) {
      var r = nachricht.records[i];
      if (r.recordType !== 'url' && r.recordType !== 'absolute-url') continue;
      var url = new TextDecoder().decode(r.data);
      var treffer = url.match(/\\/t\\/([0-9A-Z]{4,12})/i);
      if (treffer) return treffer[1].toUpperCase();
    }
    return null;
  }

  async function buchen(code) {
    // Derselbe Tag zweimal in fuenf Sekunden ist ein Doppelkontakt, keine
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
        melden('✗ ' + code + ' — ' + (daten.fehler || 'Fehler'), '#a3231d');
        if (navigator.vibrate) navigator.vibrate([80, 60, 80]);
        return;
      }
      if (daten.unveraendert) {
        melden('• ' + code + ' — stand schon hier', '#5a6472');
      } else {
        n++;
        zaehler.textContent = String(n);
        melden('✓ ' + code + ' — ' + daten.bezeichnung);
      }
      if (navigator.vibrate) navigator.vibrate(40);
    } catch (e) {
      melden('✗ ' + code + ' — kein Netz, bitte wiederholen', '#a3231d');
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
        else melden('✗ Tag ohne gültige URL', '#a3231d');
      };
      leser.onreadingerror = function () { melden('✗ Tag nicht lesbar', '#a3231d'); };
      laeuft = true;
      start.hidden = true;
      stop.hidden = false;
      status.hidden = false;
      zielFeld.disabled = true;
      statusText.textContent = 'Bereit — Tag ans Handy halten';
    } catch (e) {
      melden('✗ Scannen nicht möglich: ' + e.message, '#a3231d');
    }
  });

  stop.addEventListener('click', function () {
    if (abbruch) abbruch.abort();
    laeuft = false;
    start.hidden = false;
    stop.hidden = true;
    zielFeld.disabled = false;
    statusText.textContent = 'Beendet — ' + n + ' gebucht';
  });
})();
</script>`;

  return html(seite(inhalt, {
    titel: 'Scan-Station',
    kopf: kopf('Scan-Station', { href: '/', text: 'Übersicht' }),
    scripte: skript,
  }));
}
