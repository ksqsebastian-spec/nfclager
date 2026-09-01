import { html, kopf, notiz, seite } from './layout';

/**
 * Client-Schicht fuer den Baustellenbetrieb.
 *
 * Zwei Aufgaben: den Schnappschuss aller Einheiten vorhalten, damit die
 * Scan-Seite auch ohne Netz etwas anzeigen kann, und Buchungen in eine
 * Warteschlange legen, wenn die Uebertragung scheitert. Der Kernablauf
 * funktioniert weiterhin ohne dieses Skript — es macht ihn nur robust.
 */
export const APP_JS = `
(function () {
  var SCHNAPPSCHUSS = 'wgl.schnappschuss';
  var WARTESCHLANGE = 'wgl.warteschlange';

  function lies(schluessel, standard) {
    try { return JSON.parse(localStorage.getItem(schluessel)) || standard; }
    catch (e) { return standard; }
  }
  function schreib(schluessel, wert) {
    try { localStorage.setItem(schluessel, JSON.stringify(wert)); } catch (e) {}
  }

  /* --------------------------------------------------- Warteschlange --- */

  function einreihen(code, zielId) {
    var q = lies(WARTESCHLANGE, []);
    q.push({ code: code, ziel: Number(zielId), quelle: 'qr', zeit: new Date().toISOString() });
    schreib(WARTESCHLANGE, q);
    zeigeWartestand();
  }
  window.wglEinreihen = einreihen;
  window.wglBestaetigen = function (code, zielId) { bestaetigen(code, zielId); };

  async function abarbeiten() {
    var q = lies(WARTESCHLANGE, []);
    if (!q.length) { zeigeWartestand(); return; }
    var rest = [];
    for (var i = 0; i < q.length; i++) {
      try {
        var a = await fetch('/api/buchung', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(q[i])
        });
        // 4xx heisst: diese Buchung wird auch beim naechsten Versuch nicht
        // klappen (unbekannter Tag, geloeschter Standort). Weglegen statt
        // die Warteschlange ewig blockieren.
        if (!a.ok && a.status >= 500) rest.push(q[i]);
      } catch (e) {
        rest.push(q[i]);
      }
    }
    schreib(WARTESCHLANGE, rest);
    zeigeWartestand();
    if (rest.length === 0 && q.length > 0 && document.getElementById('wgl-wartestand')) {
      location.reload();
    }
  }

  function zeigeWartestand() {
    var n = lies(WARTESCHLANGE, []).length;
    var el = document.getElementById('wgl-wartestand');
    if (!el) return;
    el.hidden = n === 0;
    el.textContent = n === 1
      ? '1 Buchung wartet auf Übertragung'
      : n + ' Buchungen warten auf Übertragung';
  }

  /* ----------------------------------------------------- Schnappschuss --- */

  async function schnappschussHolen() {
    try {
      var a = await fetch('/api/schnappschuss', { headers: { Accept: 'application/json' } });
      if (a.ok) schreib(SCHNAPPSCHUSS, await a.json());
    } catch (e) {}
  }

  window.wglSchnappschuss = function () { return lies(SCHNAPPSCHUSS, null); };

  /* --------------------------------------------------- Formularfang --- */

  function fangen() {
    document.querySelectorAll('form[data-buchung]').forEach(function (f) {
      f.addEventListener('submit', function (ev) {
        if (navigator.onLine) return;   // normaler Formular-POST, kein JS im kritischen Pfad
        ev.preventDefault();
        var d = new FormData(f);
        einreihen(d.get('code'), d.get('ziel'));
        bestaetigen(d.get('code'), Number(d.get('ziel')));
      });
    });
  }

  function bestaetigen(code, zielId) {
    var s = lies(SCHNAPPSCHUSS, null);
    var name = '';
    if (s && s.standorte) {
      for (var i = 0; i < s.standorte.length; i++) {
        if (s.standorte[i].id === zielId) name = s.standorte[i].name;
      }
    }
    document.body.innerHTML =
      '<div class="bahn"><div class="notiz notiz-erfolg"><strong>Gespeichert' +
      (name ? ': ' + name : '') + '</strong>' +
      'Kein Netz — wird übertragen, sobald wieder Empfang da ist.</div>' +
      '<a class="knopf knopf-haupt" href="/">Weiter</a></div>';
  }

  /* ------------------------------------------------------------ Start --- */

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  }
  window.addEventListener('online', abarbeiten);
  document.addEventListener('DOMContentLoaded', function () {
    fangen();
    zeigeWartestand();
    if (navigator.onLine) { abarbeiten(); schnappschussHolen(); }
  });
})();
`;

/**
 * Service Worker. Haelt nur die Huelle vor: wenn der Tag angetippt wird und
 * kein Netz da ist, laedt sonst gar nichts — und dann ist die ganze
 * Warteschlange wertlos, weil man nie zur Seite kommt.
 */
export const SW_JS = `
var CACHE = 'wgl-v1';
var HUELLE = ['/offline', '/app.js'];

self.addEventListener('install', function (ev) {
  ev.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(HUELLE); })
    .then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(caches.keys().then(function (namen) {
    return Promise.all(namen.filter(function (n) { return n !== CACHE; })
      .map(function (n) { return caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (ev) {
  var url = new URL(ev.request.url);
  if (ev.request.method !== 'GET' || url.origin !== location.origin) return;

  if (ev.request.mode === 'navigate') {
    ev.respondWith(fetch(ev.request).catch(function () {
      return caches.match('/offline');
    }));
    return;
  }
  if (url.pathname === '/app.js') {
    ev.respondWith(caches.match(ev.request).then(function (t) {
      return t || fetch(ev.request);
    }));
  }
});
`;

/**
 * Die Seite, die erscheint, wenn der Tag ohne Netz angetippt wird.
 *
 * Sie liest den Code aus der URL und die Einheit aus dem letzten
 * Schnappschuss — der Mann sieht also, was er in der Hand hat, und kann
 * buchen. Die Buchung geht in die Warteschlange.
 */
export function offlineSeite(): Response {
  const inhalt = `
${notiz('hinweis', 'Kein Netz',
    ' Buchungen werden gespeichert und übertragen, sobald wieder Empfang da ist.')}
<div id="einheit"></div>
<div id="knoepfe"></div>
<p class="fussnote" id="wgl-wartestand" hidden></p>`;

  const skript = `<script src="/app.js"></script>
<script>
(function () {
  var treffer = location.pathname.match(/\\/t\\/([^/?#]+)/);
  var code = treffer ? decodeURIComponent(treffer[1]).toUpperCase() : '';
  var s = window.wglSchnappschuss ? window.wglSchnappschuss() : null;
  var e = s && s.einheiten ? s.einheiten[code] : null;
  var ziel = document.getElementById('einheit');
  var knoepfe = document.getElementById('knoepfe');

  function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

  if (!e) {
    ziel.innerHTML = '<article class="tafel"><span class="kennung">' + esc(code) + '</span>' +
      '<p style="margin-top:14px">Zu diesem Tag liegen keine Daten auf dem Handy. ' +
      'Sobald wieder Empfang da ist, die Seite neu laden.</p></article>';
    return;
  }

  var inhalt = e.i ? '<ul class="stueckliste">' + e.i.split(', ').map(function (z) {
    var t = z.match(/^(\S+×)\s*(.*)$/);
    return t
      ? '<li><span class="anzahl">' + esc(t[1]) + '</span><span class="was">' + esc(t[2]) + '</span></li>'
      : '<li><span class="was">' + esc(z) + '</span></li>';
  }).join('') + '</ul>' : '';

  ziel.innerHTML = '<article class="tafel tafel-akzent">' +
    '<span class="kennung">' + esc(e.c) + '</span>' +
    '<h1 class="titel-gross">' + esc(e.b) + '</h1>' + inhalt +
    '<div class="standzeit"><span class="wo">' + esc(e.sn || '') + '</span>' +
    '<span class="wie-lang">Stand vom letzten Empfang</span></div></article>';

  var kandidaten = (s.standorte || []).filter(function (st) { return st.id !== e.s; });
  var lager = kandidaten.filter(function (st) { return st.typ === 'lager'; });
  var rest = kandidaten.filter(function (st) { return st.typ !== 'lager'; });

  // Hier bewusst keine Formulare: diese Seite erscheint nur, weil das Netz
  // nachweislich tot ist. Jeder Klick geht direkt in die Warteschlange —
  // unabhaengig davon, was navigator.onLine gerade behauptet.
  var sortiert = lager.concat(rest);
  knoepfe.innerHTML = sortiert.map(function (st, i) {
    return '<button class="knopf ' + (i === 0 ? 'knopf-haupt' : 'knopf-zweit') +
      '" type="button" data-ziel="' + st.id + '">' + esc(st.name) + '</button>';
  }).join('');

  knoepfe.addEventListener('click', function (ev) {
    var knopf = ev.target.closest('button[data-ziel]');
    if (!knopf) return;
    window.wglEinreihen(code, knopf.getAttribute('data-ziel'));
    window.wglBestaetigen(code, Number(knopf.getAttribute('data-ziel')));
  });
})();
</script>`;

  return html(seite(inhalt, {
    titel: 'Kein Netz',
    kopf: kopf('Lager'),
    scripte: skript,
  }));
}
