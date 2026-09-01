export function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/**
 * Ein Stylesheet für zwei sehr verschiedene Arbeitsplätze.
 *
 * Baustelle: Handschuhe, Sonnenlicht, ein Balken Empfang. Große Trefferflächen,
 * harter Kontrast, wenig Seite. Büro: viel Zahl auf großem Schirm, also
 * Seitenleiste, klare Abschnitte und Tabellen, die man quer lesen kann.
 *
 * Gemeinsam: eine Skala für Abstände, eine für Schrift, ein Satz Farben mit
 * Bedeutung. Keine Webfonts, kein Framework — die Scan-Seite bleibt unter 12 KB.
 */
const CSS = `
:root{
  --grund:#f2f5f8; --flaeche:#fff; --flaeche2:#f7f9fb; --flaeche3:#eef2f6;
  --linie:#e0e6ec; --linie2:#c8d2dc;
  --ink:#0d1620; --ink2:#4a5765; --ink3:#76838f;
  --gruen:#0d6e3f; --gruen2:#0a5b33; --gruen-bg:#e6f4ec; --gruen-ink:#0a5b33;
  --blau:#14508c; --blau2:#0f4074; --blau-bg:#e6eef7; --blau-ink:#0f4074;
  --amber:#8a5804; --amber-bg:#fdf1dc; --amber-ink:#7a4d03;
  --rot:#a52e22; --rot2:#8c261c; --rot-bg:#fbe9e7; --rot-ink:#8c261c;
  --signal:#f5b800;
  --r1:8px; --r2:12px; --r3:18px;
  --schatten:0 1px 2px rgba(13,22,32,.06),0 2px 8px rgba(13,22,32,.05);
  --schatten2:0 2px 4px rgba(13,22,32,.06),0 8px 24px rgba(13,22,32,.08);
}
@media (prefers-color-scheme:dark){:root{
  --grund:#0c1117; --flaeche:#151d26; --flaeche2:#1a232e; --flaeche3:#212b37;
  --linie:#26313d; --linie2:#374553;
  --ink:#e7ecf2; --ink2:#a4b1bf; --ink3:#7b8898;
  --gruen:#159154; --gruen2:#0f7b46; --gruen-bg:#0f2a1d; --gruen-ink:#6ede9f;
  --blau:#2872c4; --blau2:#215fa5; --blau-bg:#11202f; --blau-ink:#7fb6ec;
  --amber:#c07c0a; --amber-bg:#2a2011; --amber-ink:#f0bd63;
  --rot:#c0442f; --rot2:#a53a28; --rot-bg:#2b1613; --rot-ink:#f0958a;
  --schatten:0 1px 2px rgba(0,0,0,.4),0 2px 8px rgba(0,0,0,.3);
  --schatten2:0 2px 4px rgba(0,0,0,.4),0 8px 24px rgba(0,0,0,.45);
}}

*,*::before,*::after{box-sizing:border-box}
/* Muss stehen, bevor eigene display-Regeln greifen: die Browservorgabe für
   [hidden] ist schwächer als jedes eigene display, sonst blieben verborgene
   Knöpfe (Scan beenden, Warteschlange, Hinweise) sichtbar. */
[hidden]{display:none!important}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--grund);color:var(--ink);
  font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased}
h1,h2,h3{margin:0;line-height:1.2;letter-spacing:-.015em;font-weight:650}
h1{font-size:27px} h2{font-size:19px} h3{font-size:16px}
p{margin:0}
a{color:var(--blau-ink);text-decoration:none}
a:hover{text-decoration:underline}
.zahl,td.zahl,th.zahl{text-align:right;font-variant-numeric:tabular-nums}
.gedaempft{color:var(--ink3)}
.klein{font-size:14px}

/* ---------------------------------------------------------- Baustelle --- */

.balken{background:var(--flaeche);border-bottom:1px solid var(--linie);
  position:sticky;top:0;z-index:20}
.balken .innen{max-width:600px;margin:0 auto;padding:13px 18px;
  display:flex;align-items:center;justify-content:space-between;gap:14px}
.balken .marke{display:flex;align-items:center;gap:9px;font-weight:650;font-size:16px;color:var(--ink)}
.balken .marke::before{content:"";width:4px;height:19px;border-radius:2px;background:var(--signal)}
.balken a{font-size:15px;color:var(--ink2)}

.sitzung{background:var(--gruen);color:#fff;position:sticky;top:53px;z-index:19}
.sitzung .innen{max-width:600px;margin:0 auto;padding:11px 18px;
  display:flex;align-items:center;justify-content:space-between;gap:14px;
  font-size:15px;font-weight:600}
.sitzung a{color:#fff;opacity:.82;font-size:14px;text-decoration:underline}

.bahn{max-width:600px;margin:0 auto;padding:20px 18px 56px}
.bahn>*+*{margin-top:15px}
.bahn h1+p{margin-top:7px}
.bahn h2{margin-top:26px}
/* Eine Auswahl endet, dann kommt etwas anderer Art — das braucht Luft,
   sonst tippt man Abbrechen statt der letzten Baustelle. */
.wahl+.knopf,.wahl+form{margin-top:24px}
p+.wahl,p+form{margin-top:18px}

.tafel{background:var(--flaeche);border:1px solid var(--linie);border-radius:var(--r3);
  padding:20px;box-shadow:var(--schatten)}
.tafel-akzent{border-left:4px solid var(--signal)}

.kennung{display:inline-block;padding:5px 10px;border-radius:7px;background:var(--flaeche3);
  color:var(--ink2);font:650 14px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.13em}
.titel-gross{font-size:26px;font-weight:650;line-height:1.18;letter-spacing:-.02em;margin-top:12px}

.stueckliste{list-style:none;padding:0;margin:16px 0 0;
  border-top:1px solid var(--linie)}
.stueckliste li{display:flex;align-items:baseline;gap:14px;padding:9px 0;
  border-bottom:1px solid var(--linie);font-size:17px}
.stueckliste li:last-child{border-bottom:0}
.stueckliste .anzahl{flex:0 0 62px;text-align:right;font-weight:700;font-variant-numeric:tabular-nums}
.stueckliste .was{min-width:0}

.standzeit{margin-top:18px;padding-top:16px;border-top:1px solid var(--linie)}
.standzeit .wo{font-size:20px;font-weight:650;display:block;line-height:1.25}
.standzeit .wie-lang{color:var(--ink3);font-size:15px;margin-top:2px;display:block}

/* Knöpfe: Haupt 92px, Rest 62px — mit Handschuhen sicher zu treffen. */
button,.knopf{display:block;width:100%;min-height:62px;padding:15px 18px;margin:0;
  font:650 19px/1.3 inherit;letter-spacing:-.01em;text-align:center;text-decoration:none;
  border:1px solid transparent;border-radius:var(--r2);cursor:pointer;
  -webkit-appearance:none;transition:transform .04s,filter .12s}
.knopf small{display:block;font-size:15px;font-weight:450;opacity:.86;margin-top:3px;letter-spacing:0}
.knopf:hover{text-decoration:none;filter:brightness(1.06)}
button:active,.knopf:active{transform:translateY(1px)}
form+form,form+.knopf,.knopf+form,.knopf+.knopf{margin-top:11px}
.tafel+form,.tafel+.knopf{margin-top:16px}

.knopf-haupt{background:var(--gruen);border-color:var(--gruen2);color:#fff;
  min-height:92px;font-size:23px;box-shadow:var(--schatten2)}
.knopf-lager{background:var(--blau);border-color:var(--blau2);color:#fff}
.knopf-zweit{background:var(--flaeche);border-color:var(--linie2);color:var(--ink)}
.knopf-still{background:transparent;border-color:var(--linie);color:var(--ink2);
  min-height:50px;font-size:16px;font-weight:550}
.knopf-warn{background:var(--rot);border-color:var(--rot2);color:#fff}

.wahl{list-style:none;padding:0;margin:0}
.wahl li+li{margin-top:11px}
.wahl .knopf{text-align:left;min-height:66px;font-size:18px;
  display:flex;flex-direction:column;justify-content:center;gap:3px}
.wahl .neben{font-size:14px;font-weight:450;color:var(--ink3)}
.knopf-lager .neben{color:rgba(255,255,255,.8)}

/* --------------------------------------------------------- Meldungen --- */

.notiz{border-radius:var(--r2);padding:14px 16px;border:1px solid;font-size:16px;line-height:1.45}
.notiz strong{display:block;font-weight:650}
.notiz-erfolg{background:var(--gruen-bg);border-color:color-mix(in srgb,var(--gruen) 26%,transparent);color:var(--gruen-ink)}
.notiz-hinweis{background:var(--amber-bg);border-color:color-mix(in srgb,var(--amber) 30%,transparent);color:var(--amber-ink)}
.notiz-fehler{background:var(--rot-bg);border-color:color-mix(in srgb,var(--rot) 30%,transparent);color:var(--rot-ink)}

.pille{display:inline-block;padding:3px 9px;border-radius:99px;font-size:12.5px;font-weight:650;
  letter-spacing:.02em;white-space:nowrap}
.pille-lager{background:var(--blau-bg);color:var(--blau-ink)}
.pille-baustelle{background:var(--amber-bg);color:var(--amber-ink)}
.pille-warn{background:var(--rot-bg);color:var(--rot-ink)}
.pille-ok{background:var(--gruen-bg);color:var(--gruen-ink)}
.pille-ruhig{background:var(--flaeche3);color:var(--ink2)}

/* ------------------------------------------------------------- Büro --- */

.buero{display:grid;grid-template-columns:236px minmax(0,1fr);min-height:100vh}
.leiste{background:var(--flaeche);border-right:1px solid var(--linie);padding:20px 12px 32px;
  position:sticky;top:0;height:100vh;overflow-y:auto}
.leiste .marke{display:flex;align-items:center;gap:10px;padding:0 10px 18px;
  font-weight:700;font-size:16px;letter-spacing:-.01em;color:var(--ink)}
.leiste .marke::before{content:"";width:4px;height:22px;border-radius:2px;background:var(--signal)}
.leiste .gruppe{display:block;margin-top:18px;padding:0 10px 7px;font-size:11.5px;
  font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--ink3)}
.leiste .gruppe:first-child{margin-top:0}
.leiste a{display:block;padding:9px 10px;border-radius:var(--r1);color:var(--ink2);
  font-size:15px;font-weight:550}
.leiste a:hover{background:var(--flaeche3);color:var(--ink);text-decoration:none}
.leiste a.aktiv{background:var(--blau-bg);color:var(--blau-ink);font-weight:650}
.leiste .trenner{display:block;height:1px;background:var(--linie);margin:20px 10px 12px}
.leiste a.nebensache{font-size:14px;color:var(--ink3)}

.inhalt{padding:30px 34px 72px;max-width:1120px;min-width:0}
.kopfzeile{display:flex;align-items:flex-start;justify-content:space-between;
  gap:20px;flex-wrap:wrap;margin-bottom:24px}
.kopfzeile .unter{color:var(--ink3);font-size:15px;margin-top:5px;max-width:60ch}
.kopfzeile .werkzeuge{display:flex;gap:10px;flex-wrap:wrap}
.kopfzeile .werkzeuge .knopf{width:auto;min-height:42px;padding:9px 16px;font-size:15px}

@media (max-width:900px){
  .buero{grid-template-columns:1fr}
  .leiste{position:static;height:auto;border-right:0;border-bottom:1px solid var(--linie);
    padding:12px 0 0}
  .leiste .marke{padding:0 16px 11px}
  /* Auf dem Handy wird aus der gruppierten Liste eine einzige Rolleiste —
     drei umbrechende Reihen schieben den Inhalt sonst aus dem Bild. */
  .leiste .gruppe{display:none}
  .leiste .navi{display:flex;align-items:center;gap:7px;overflow-x:auto;padding:0 16px 12px;
    scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .leiste .navi::-webkit-scrollbar{display:none}
  .leiste .navi a{white-space:nowrap;padding:8px 15px;border-radius:99px;
    background:var(--flaeche3);font-size:14.5px}
  .leiste .navi a.aktiv{background:var(--blau);color:#fff}
  .leiste .trenner{flex:0 0 1px;height:22px;margin:0 3px}
  .inhalt{padding:20px 16px 64px}
}

/* ----------------------------------------------------------- Kacheln --- */

.kacheln{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(168px,1fr));
  margin-bottom:26px}
.kachel{background:var(--flaeche);border:1px solid var(--linie);border-radius:var(--r2);
  padding:16px 18px;box-shadow:var(--schatten);position:relative;overflow:hidden}
.kachel::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--linie2)}
.kachel-blau::before{background:var(--blau)}
.kachel-gruen::before{background:var(--gruen)}
.kachel-amber::before{background:var(--amber)}
.kachel-rot::before{background:var(--rot)}
.kachel .wert{font-size:33px;font-weight:700;line-height:1.05;letter-spacing:-.03em}
.kachel-rot .wert{color:var(--rot-ink)}
.kachel .schild{font-size:14px;color:var(--ink2);margin-top:5px;font-weight:550}
.kachel .zusatz{font-size:13px;color:var(--ink3);margin-top:3px}

/* ------------------------------------------------ Abschnitte, Tabellen --- */

.abschnitt{background:var(--flaeche);border:1px solid var(--linie);border-radius:var(--r2);
  box-shadow:var(--schatten);margin-bottom:22px;overflow:hidden}
.abschnitt>.kopf{display:flex;align-items:baseline;justify-content:space-between;gap:14px;
  flex-wrap:wrap;padding:15px 18px;border-bottom:1px solid var(--linie);background:var(--flaeche2)}
.abschnitt>.kopf h2{font-size:16.5px}
.abschnitt>.kopf .beitext{font-size:13.5px;color:var(--ink3);font-weight:450}
.abschnitt>.koerper{padding:18px}
.abschnitt>.koerper>p:first-child{margin-top:0}

table{width:100%;border-collapse:collapse;font-size:15px}
thead th{text-align:left;padding:10px 18px;font-size:12px;font-weight:700;letter-spacing:.06em;
  text-transform:uppercase;color:var(--ink3);background:var(--flaeche2);
  border-bottom:1px solid var(--linie);white-space:nowrap}
tbody td{padding:12px 18px;border-bottom:1px solid var(--linie);vertical-align:top}
tbody tr:last-child td{border-bottom:0}
tbody tr:hover{background:var(--flaeche2)}
td .zweitzeile{display:block;color:var(--ink3);font-size:13.5px;margin-top:2px}
td form{display:inline}
td .knopf{width:auto;min-height:34px;padding:5px 12px;font-size:13.5px;font-weight:600}
.rollrahmen{overflow-x:auto}

@media (max-width:720px){
  .stapel thead{display:none}
  .stapel tbody tr{display:block;padding:13px 16px;border-bottom:1px solid var(--linie)}
  .stapel tbody tr:hover{background:transparent}
  .stapel tbody td{display:flex;gap:16px;justify-content:space-between;align-items:baseline;
    padding:3px 0;border:0;text-align:right}
  .stapel tbody td::before{content:attr(data-l);color:var(--ink3);font-size:13px;font-weight:650;
    text-align:left;flex:0 0 auto}
  .stapel tbody td:first-child{display:block;text-align:left;font-size:16px;
    font-weight:650;padding-bottom:8px}
  .stapel tbody td:first-child::before{display:none}
  .stapel tbody td:first-child .zweitzeile{font-weight:450}
  .stapel tbody td:empty{display:none}
}

.leer{padding:34px 18px;text-align:center;color:var(--ink3)}
.leer strong{display:block;color:var(--ink2);font-size:16px;margin-bottom:5px}

/* --------------------------------------------------------- Formulare --- */

label{display:block;font-weight:600;font-size:14.5px;margin-bottom:6px;color:var(--ink2)}
input[type=text],input[type=password],input[type=number],input[type=file],select,textarea{
  width:100%;min-height:48px;padding:11px 13px;font:16px inherit;color:var(--ink);
  background:var(--flaeche);border:1px solid var(--linie2);border-radius:var(--r1);
  transition:border-color .12s,box-shadow .12s}
input:focus,select:focus,textarea:focus{outline:0;border-color:var(--blau);
  box-shadow:0 0 0 3px color-mix(in srgb,var(--blau) 18%,transparent)}
.feld{margin-bottom:15px}
.feld:last-of-type{margin-bottom:19px}
.felder-zwei{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.filter{display:flex;gap:10px;align-items:center;margin-bottom:18px;flex-wrap:wrap}
.filter input{max-width:340px;min-height:42px}
.filter .knopf{width:auto;min-height:42px;padding:8px 16px;font-size:15px}

/* Fortschritt der Inventur */
.balkenanzeige{height:10px;border-radius:99px;background:var(--flaeche3);overflow:hidden;margin:12px 0 9px}
.balkenanzeige>span{display:block;height:100%;background:var(--gruen);border-radius:99px;
  transition:width .3s}

.fussnote{margin-top:26px;text-align:center;color:var(--ink3);font-size:14px}
`;

export interface SeiteOpts {
  titel: string;
  kopf?: string;
  banner?: string;
  scripte?: string;
  /** Büro-Seiten bringen ihr eigenes Gerüst mit und brauchen keine Bahn. */
  roh?: boolean;
}

export function seite(inhalt: string, opts: SeiteOpts): string {
  const koerper = opts.roh
    ? inhalt
    : `${opts.kopf ?? ''}${opts.banner ?? ''}<div class="bahn">${inhalt}</div>`;
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#f2f5f8" media="(prefers-color-scheme:light)">
<meta name="theme-color" content="#0c1117" media="(prefers-color-scheme:dark)">
<meta name="robots" content="noindex,nofollow">
<title>${esc(opts.titel)}</title>
<style>${CSS}</style>
</head>
<body>
${koerper}
${opts.scripte ?? ''}
</body>
</html>`;
}

/** Kopfbalken der Baustellen-Seiten. */
export function kopf(titel: string, zurueck?: { href: string; text: string }): string {
  return `<header class="balken"><div class="innen">
    <span class="marke">${esc(titel)}</span>
    ${zurueck ? `<a href="${esc(zurueck.href)}">${esc(zurueck.text)}</a>` : ''}
  </div></header>`;
}

export function html(inhalt: string, status = 200, extraHeaders: HeadersInit = {}): Response {
  return new Response(inhalt, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...extraHeaders },
  });
}

/* ------------------------------------------------------- Bausteine --- */

export type NotizArt = 'erfolg' | 'hinweis' | 'fehler';

export function notiz(art: NotizArt, titel: string, text?: string): string {
  return `<div class="notiz notiz-${art}"><strong>${esc(titel)}</strong>${
    text ? esc(text) : ''}</div>`;
}

export function pille(text: string, art: 'lager' | 'baustelle' | 'warn' | 'ok' | 'ruhig'): string {
  return `<span class="pille pille-${art}">${esc(text)}</span>`;
}

export interface Spalte {
  titel: string;
  /** Rechtsbündig für Zahlen. */
  zahl?: boolean;
}

/**
 * Tabelle mit Stapelfallback.
 *
 * Unter 720 px klappt jede Zeile zu einer Karte aus Beschriftung und Wert —
 * die Spaltenüberschrift wandert per data-l an die Zelle. Deshalb ist der
 * Umweg über diesen Helfer nötig: von Hand vergisst man das data-l genau
 * einmal, und dann steht in der Handy-Ansicht ein Wert ohne Bezeichnung.
 */
export function tabelle(spalten: Spalte[], zeilen: string[][], leerText?: string): string {
  if (zeilen.length === 0) {
    return `<div class="leer"><strong>Nichts da</strong>${esc(leerText ?? '')}</div>`;
  }
  const kopf = spalten.map((s) =>
    `<th${s.zahl ? ' class="zahl"' : ''}>${esc(s.titel)}</th>`).join('');
  const koerper = zeilen.map((z) => `<tr>${z.map((zelle, i) => {
    const s = spalten[i];
    return `<td${s?.zahl ? ' class="zahl"' : ''} data-l="${esc(s?.titel ?? '')}">${zelle}</td>`;
  }).join('')}</tr>`).join('');
  return `<div class="rollrahmen"><table class="stapel">
    <thead><tr>${kopf}</tr></thead><tbody>${koerper}</tbody></table></div>`;
}

export interface AbschnittOpts {
  titel: string;
  beitext?: string;
  /** Tabellen sitzen bündig im Rahmen, Formulare brauchen Polster. */
  gepolstert?: boolean;
}

export function abschnitt(o: AbschnittOpts, inhalt: string): string {
  return `<section class="abschnitt">
    <div class="kopf"><h2>${esc(o.titel)}</h2>${
      o.beitext ? `<span class="beitext">${esc(o.beitext)}</span>` : ''}</div>
    ${o.gepolstert ? `<div class="koerper">${inhalt}</div>` : inhalt}
  </section>`;
}

export interface KachelOpts {
  wert: string | number;
  schild: string;
  zusatz?: string;
  ton?: 'blau' | 'gruen' | 'amber' | 'rot';
}

export function kacheln(liste: KachelOpts[]): string {
  return `<div class="kacheln">${liste.map((k) => `<div class="kachel${
    k.ton ? ` kachel-${k.ton}` : ''}">
    <div class="wert">${esc(k.wert)}</div>
    <div class="schild">${esc(k.schild)}</div>
    ${k.zusatz ? `<div class="zusatz">${esc(k.zusatz)}</div>` : ''}
  </div>`).join('')}</div>`;
}

export function kopfzeile(titel: string, unter?: string, werkzeuge?: string): string {
  return `<div class="kopfzeile"><div>
      <h1>${esc(titel)}</h1>
      ${unter ? `<p class="unter">${esc(unter)}</p>` : ''}
    </div>${werkzeuge ? `<div class="werkzeuge">${werkzeuge}</div>` : ''}</div>`;
}
