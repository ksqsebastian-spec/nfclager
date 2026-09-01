import { FAVICON, NAME, zeichen } from './marke';

export function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/**
 * Werkstattschild statt Software-Oberfläche.
 *
 * Keine Schatten, keine runden Ecken, keine Verläufe — Schwarz auf Weiß,
 * harte Linien, und Gelb ausschließlich dort, wo etwas passieren soll. Das
 * ist die Sprache von Baustellenbeschilderung und Maschinenblenden, und sie
 * hat den praktischen Vorteil, dass sie bei Sonne und mit Handschuhen
 * funktioniert: maximaler Kontrast, große Flächen, klare Kanten.
 *
 * Rangfolge macht hier die Schrift, nicht die Farbe: Größe, Fettung und
 * Versalien. Farbe bleibt Signal.
 */
const CSS = `
:root{
  --papier:#fff; --papier2:#f2f2f0; --tinte:#000; --tinte2:#565654; --tinte3:#83837f;
  --linie:#000; --linie2:#c9c9c4;
  --gelb:#ffd400; --rot:#d0250f; --gruen:#0a6b34;
}
@media (prefers-color-scheme:dark){:root{
  --papier:#0a0a0a; --papier2:#171716; --tinte:#fff; --tinte2:#b4b4b0; --tinte3:#8a8a85;
  --linie:#fff; --linie2:#3a3a37;
  --gelb:#ffd400; --rot:#ff6a52; --gruen:#3ec97a;
}}

*,*::before,*::after{box-sizing:border-box}
[hidden]{display:none!important}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--papier);color:var(--tinte);
  font:16px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
  font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased}
h1,h2,h3{margin:0;line-height:1.08;font-weight:800;letter-spacing:-.02em}
h1{font-size:30px} h2{font-size:15px;text-transform:uppercase;letter-spacing:.1em;font-weight:800}
h3{font-size:17px}
p{margin:0}
a{color:var(--tinte);text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1.5px}
.still{color:var(--tinte2)}
.leise{color:var(--tinte3);font-size:14px}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.zahl,td.zahl,th.zahl{text-align:right;font-variant-numeric:tabular-nums}

/* ═══ Kopfbalken ═════════════════════════════════════════════════════ */

.balken{background:var(--tinte);color:var(--papier);position:sticky;top:0;z-index:20}
.balken .innen{max-width:640px;margin:0 auto;padding:13px 18px;
  display:flex;align-items:center;justify-content:space-between;gap:14px}
.balken .marke{display:flex;align-items:center;gap:10px;
  font-weight:800;font-size:16px;text-transform:uppercase;letter-spacing:.1em}
.balken a{color:var(--papier);font-size:14px;text-transform:uppercase;
  letter-spacing:.07em;font-weight:700;text-decoration:none;border-bottom:2px solid var(--gelb)}
.zeichen{flex:0 0 auto;display:block}

.sitzung{background:var(--gelb);color:#000;border-bottom:3px solid #000}
.sitzung .innen{max-width:640px;margin:0 auto;padding:11px 18px;
  display:flex;justify-content:space-between;align-items:center;gap:12px;
  font-weight:800;font-size:15px}
.sitzung a{color:#000;font-size:13px;font-weight:700}

.bahn{max-width:640px;margin:0 auto;padding:22px 18px 60px}
.bahn>*+*{margin-top:18px}
.bahn h1+p{margin-top:8px}
.bahn h2{margin-top:32px}

/* ═══ Einheitenblatt ═════════════════════════════════════════════════ */

.blatt{border:3px solid var(--linie);padding:20px}
.kennung{display:inline-block;font:800 15px/1 ui-monospace,SFMono-Regular,Menlo,monospace;
  letter-spacing:.16em;background:var(--tinte);color:var(--papier);padding:7px 10px}
.titel-gross{font-size:26px;font-weight:800;line-height:1.12;letter-spacing:-.02em;
  margin-top:14px;text-wrap:balance}

.stueckliste{list-style:none;padding:0;margin:18px 0 0;border-top:2px solid var(--linie)}
.stueckliste li{display:flex;align-items:baseline;gap:16px;padding:10px 0;
  border-bottom:1px solid var(--linie2);font-size:17px}
.stueckliste li:last-child{border-bottom:0}
.stueckliste .anzahl{flex:0 0 56px;text-align:right;font-weight:800;font-size:19px;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.stueckliste .was{min-width:0}

.standzeit{margin-top:18px;padding-top:16px;border-top:2px solid var(--linie)}
.standzeit .wo{display:block;font-size:22px;font-weight:800;line-height:1.15;
  text-transform:uppercase;letter-spacing:-.01em}
.standzeit .wie-lang{display:block;margin-top:3px;color:var(--tinte2);font-size:15px}

/* ═══ Knöpfe ═════════════════════════════════════════════════════════ */

button,.knopf{display:block;width:100%;min-height:62px;padding:16px 18px;margin:0;
  font:800 19px/1.25 inherit;text-transform:uppercase;letter-spacing:.06em;
  text-align:center;text-decoration:none;border:3px solid var(--linie);border-radius:0;
  background:var(--papier);color:var(--tinte);cursor:pointer;-webkit-appearance:none}
.knopf small{display:block;margin-top:4px;font-size:14px;font-weight:600;
  letter-spacing:.03em;text-transform:none;opacity:.75}
.knopf:hover{text-decoration:none}
button:active,.knopf:active{transform:translate(1px,1px)}
form+form,form+.knopf,.knopf+form,.knopf+.knopf{margin-top:12px}
.blatt+form,.blatt+.knopf{margin-top:20px}

.knopf-haupt{background:var(--gelb);color:#000;border-color:#000;min-height:96px;font-size:24px}
.knopf-haupt small{color:#000;opacity:.7}
.knopf-lager{background:var(--tinte);color:var(--papier);border-color:var(--linie)}
.knopf-zweit{background:var(--papier);color:var(--tinte)}
.knopf-still{display:inline-block;width:auto;border-width:0 0 2px 0;min-height:auto;
  padding:9px 0;font-size:15px;letter-spacing:.08em;color:var(--tinte2)}
.knopf-warn{background:var(--rot);color:#fff;border-color:var(--rot)}

.wahl{list-style:none;padding:0;margin:0}
.wahl li+li{margin-top:12px}
.wahl .knopf{text-align:left;min-height:66px;display:flex;flex-direction:column;
  justify-content:center;gap:3px;letter-spacing:.02em;font-size:18px}
.wahl .neben{font-size:14px;font-weight:600;letter-spacing:.02em;text-transform:none;
  color:var(--tinte2)}
.knopf-lager .neben{color:var(--papier);opacity:.72}
.wahl+.knopf,.wahl+form{margin-top:26px}
p+.wahl,p+form{margin-top:18px}

/* ═══ Meldungen und Marken ═══════════════════════════════════════════ */

.notiz{border:3px solid var(--linie);padding:14px 16px;font-size:16px}
.notiz strong{display:block;font-weight:800;text-transform:uppercase;letter-spacing:.05em;
  font-size:15px;margin-bottom:3px}
.notiz-erfolg{border-color:var(--linie);background:var(--gelb);color:#000}
.notiz-hinweis{border-color:var(--linie);background:var(--papier2)}
.notiz-fehler{border-color:var(--rot);color:var(--rot)}
.notiz-fehler strong{color:var(--rot)}

.status{display:inline-block;padding:3px 7px;font-size:12px;font-weight:800;
  text-transform:uppercase;letter-spacing:.08em;border:2px solid currentColor;white-space:nowrap}
.status-warn{color:var(--rot)}
.status-ok{color:var(--gruen)}
.status-ruhig{color:var(--tinte2)}
.status-voll{background:var(--tinte);color:var(--papier);border-color:var(--tinte)}

/* ═══ Büro ═══════════════════════════════════════════════════════════ */

.buerokopf{background:var(--tinte);color:var(--papier);position:sticky;top:0;z-index:20}
.buerokopf .oben{max-width:1080px;margin:0 auto;padding:14px 22px 0;
  display:flex;align-items:center;justify-content:space-between;gap:16px}
.buerokopf .marke{display:flex;align-items:center;gap:10px;font-weight:800;
  font-size:17px;text-transform:uppercase;letter-spacing:.1em}
.buerokopf .abmelden{color:var(--papier);font-size:13px;text-transform:uppercase;
  letter-spacing:.07em;font-weight:700;text-decoration:none;opacity:.7}
.buerokopf .abmelden:hover{opacity:1}
.reiter{max-width:1080px;margin:0 auto;padding:12px 22px 0;display:flex;gap:26px;
  overflow-x:auto;scrollbar-width:none}
.reiter::-webkit-scrollbar{display:none}
.reiter a{color:var(--papier);opacity:.62;font-size:15px;font-weight:800;
  text-transform:uppercase;letter-spacing:.09em;text-decoration:none;white-space:nowrap;
  padding:0 0 11px;border-bottom:4px solid transparent}
.reiter a:hover{opacity:.9}
.reiter a.aktiv{opacity:1;border-bottom-color:var(--gelb)}

.inhalt{max-width:1080px;margin:0 auto;padding:30px 22px 80px}
.kopfzeile{display:flex;align-items:flex-start;justify-content:space-between;
  gap:20px;flex-wrap:wrap;padding-bottom:18px;border-bottom:3px solid var(--linie)}
.kopfzeile .unter{color:var(--tinte2);font-size:15px;margin-top:7px;max-width:62ch}
.kopfzeile .werkzeuge{display:flex;gap:12px;flex-wrap:wrap}
.kopfzeile .werkzeuge .knopf{width:auto;min-height:40px;padding:8px 16px;font-size:13px}

/* Zahlenreihe: nur Zahl und Wort, getrennt durch Linien. Keine Kacheln. */
.zahlen{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
  border-bottom:3px solid var(--linie);margin-bottom:34px}
.zahlen>div{padding:20px 20px 20px 0;border-right:1px solid var(--linie2)}
.zahlen>div:last-child{border-right:0}
.zahlen .wert{font-size:44px;font-weight:800;line-height:.95;letter-spacing:-.04em}
.zahlen .achtung .wert{color:var(--rot)}
.zahlen .wort{margin-top:8px;font-size:13px;font-weight:800;text-transform:uppercase;
  letter-spacing:.09em}
.zahlen .zusatz{margin-top:3px;font-size:13px;color:var(--tinte2)}

.block{margin-bottom:44px}
.block>.kopf{display:flex;align-items:baseline;justify-content:space-between;gap:14px;
  flex-wrap:wrap;padding-bottom:9px;border-bottom:3px solid var(--linie);margin-bottom:0}
.block>.kopf .beitext{font-size:13px;color:var(--tinte2);text-transform:none;letter-spacing:0;
  font-weight:400}
.block>.koerper{padding-top:18px}

table{width:100%;border-collapse:collapse;font-size:15px}
thead th{text-align:left;padding:10px 14px 10px 0;font-size:12px;font-weight:800;
  letter-spacing:.09em;text-transform:uppercase;color:var(--tinte2);
  border-bottom:2px solid var(--linie);white-space:nowrap}
tbody td{padding:13px 14px 13px 0;border-bottom:1px solid var(--linie2);vertical-align:top}
tbody tr:hover{background:var(--papier2)}
td .zweitzeile{display:block;color:var(--tinte2);font-size:13px;margin-top:2px}
td form{display:inline}
td .knopf{width:auto;min-height:30px;padding:4px 10px;font-size:12px;border-width:2px}
.rollrahmen{overflow-x:auto}

@media (max-width:760px){
  .stapel thead{display:none}
  .stapel tbody tr{display:block;padding:14px 0;border-bottom:2px solid var(--linie)}
  .stapel tbody tr:hover{background:transparent}
  .stapel tbody td{display:flex;gap:16px;justify-content:space-between;align-items:baseline;
    padding:3px 0;border:0;text-align:right}
  .stapel tbody td::before{content:attr(data-l);color:var(--tinte2);font-size:12px;
    font-weight:800;text-transform:uppercase;letter-spacing:.07em;text-align:left;flex:0 0 auto}
  .stapel tbody td:first-child{display:block;text-align:left;font-size:17px;
    font-weight:800;padding-bottom:8px}
  .stapel tbody td:first-child::before{display:none}
  .stapel tbody td:first-child .zweitzeile{font-weight:400}
  .stapel tbody td:empty{display:none}
  .inhalt{padding:22px 16px 70px}
  .zahlen>div{padding:16px 14px 16px 0}
  .zahlen .wert{font-size:34px}
}

.leer{padding:30px 0;color:var(--tinte2);border-bottom:1px solid var(--linie2)}
.leer strong{display:block;color:var(--tinte);font-size:16px;font-weight:800;
  text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px}

/* ═══ Formulare ══════════════════════════════════════════════════════ */

label{display:block;font-weight:800;font-size:12px;text-transform:uppercase;
  letter-spacing:.09em;margin-bottom:6px;color:var(--tinte2)}
input[type=text],input[type=password],input[type=number],input[type=file],select,textarea{
  width:100%;min-height:50px;padding:12px 13px;font:17px inherit;color:var(--tinte);
  background:var(--papier);border:2px solid var(--linie);border-radius:0}
input:focus,select:focus,textarea:focus{outline:3px solid var(--gelb);outline-offset:-1px}
.feld{margin-bottom:16px}
.feld:last-of-type{margin-bottom:20px}
.felder-zwei{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.filter{display:flex;gap:12px;align-items:center;margin:20px 0;flex-wrap:wrap}
.filter input{max-width:320px;min-height:42px}
.filter .knopf{width:auto;min-height:42px;padding:8px 16px;font-size:13px}

.balkenanzeige{height:14px;border:2px solid var(--linie);margin:14px 0 10px}
.balkenanzeige>span{display:block;height:100%;background:var(--gelb)}

.fussnote{margin-top:30px;color:var(--tinte2);font-size:14px}

/* Im Dunkeln wäre der umgekehrte Balken die hellste Fläche auf dem Schirm —
   also bleibt er schwarz und trennt sich über die Linie. */
@media (prefers-color-scheme:dark){
  .balken,.buerokopf{background:var(--papier);color:var(--tinte);
    border-bottom:3px solid var(--tinte)}
  .balken a,.buerokopf .abmelden,.reiter a{color:var(--tinte)}
  .knopf-lager{background:var(--tinte);color:var(--papier)}
}
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
<meta name="theme-color" content="#000000">
<meta name="robots" content="noindex,nofollow">
<link rel="icon" href="${FAVICON}">
<link rel="apple-touch-icon" href="${FAVICON}">
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
export function kopf(titel: string = NAME, zurueck?: { href: string; text: string }): string {
  return `<header class="balken"><div class="innen">
    <span class="marke">${zeichen(21, 'currentColor')}${esc(titel)}</span>
    ${zurueck ? `<a href="${esc(zurueck.href)}">${esc(zurueck.text)}</a>` : ''}
  </div></header>`;
}

export function html(inhalt: string, status = 200, extraHeaders: HeadersInit = {}): Response {
  return new Response(inhalt, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...extraHeaders },
  });
}

/* ───────────────────────────────────────────────────────── Bausteine ── */

export type NotizArt = 'erfolg' | 'hinweis' | 'fehler';

export function notiz(art: NotizArt, titel: string, text?: string): string {
  return `<div class="notiz notiz-${art}"><strong>${esc(titel)}</strong>${
    text ? esc(text) : ''}</div>`;
}

export function marke(text: string, art: 'warn' | 'ok' | 'ruhig' | 'voll' = 'ruhig'): string {
  return `<span class="status status-${art}">${esc(text)}</span>`;
}

export interface Spalte {
  titel: string;
  /** Rechtsbündig für Zahlen. */
  zahl?: boolean;
}

/**
 * Tabelle mit Stapelfallback.
 *
 * Unter 760 px klappt jede Zeile zu einem Block aus Beschriftung und Wert —
 * die Spaltenüberschrift wandert per data-l an die Zelle. Deshalb der Umweg
 * über diesen Helfer: von Hand vergisst man das data-l genau einmal, und dann
 * steht in der Handy-Ansicht ein Wert ohne Bezeichnung.
 */
export function tabelle(spalten: Spalte[], zeilen: string[][], leerText?: string): string {
  if (zeilen.length === 0) {
    return `<div class="leer"><strong>Nichts da</strong>${esc(leerText ?? '')}</div>`;
  }
  const kopfzellen = spalten.map((s) =>
    `<th${s.zahl ? ' class="zahl"' : ''}>${esc(s.titel)}</th>`).join('');
  const koerper = zeilen.map((z) => `<tr>${z.map((zelle, i) => {
    const s = spalten[i];
    return `<td${s?.zahl ? ' class="zahl"' : ''} data-l="${esc(s?.titel ?? '')}">${zelle}</td>`;
  }).join('')}</tr>`).join('');
  return `<div class="rollrahmen"><table class="stapel">
    <thead><tr>${kopfzellen}</tr></thead><tbody>${koerper}</tbody></table></div>`;
}

export interface BlockOpts {
  titel: string;
  beitext?: string;
  /** Tabellen sitzen direkt unter der Linie, Formulare brauchen Abstand. */
  gepolstert?: boolean;
}

export function block(o: BlockOpts, inhalt: string): string {
  return `<section class="block">
    <div class="kopf"><h2>${esc(o.titel)}</h2>${
      o.beitext ? `<span class="beitext">${esc(o.beitext)}</span>` : ''}</div>
    ${o.gepolstert ? `<div class="koerper">${inhalt}</div>` : inhalt}
  </section>`;
}

export interface ZahlOpts {
  wert: string | number;
  wort: string;
  zusatz?: string;
  achtung?: boolean;
}

export function zahlen(liste: ZahlOpts[]): string {
  return `<div class="zahlen">${liste.map((z) => `<div${z.achtung ? ' class="achtung"' : ''}>
    <div class="wert">${esc(z.wert)}</div>
    <div class="wort">${esc(z.wort)}</div>
    ${z.zusatz ? `<div class="zusatz">${esc(z.zusatz)}</div>` : ''}
  </div>`).join('')}</div>`;
}

export function kopfzeile(titel: string, unter?: string, werkzeuge?: string): string {
  return `<div class="kopfzeile"><div>
      <h1>${esc(titel)}</h1>
      ${unter ? `<p class="unter">${esc(unter)}</p>` : ''}
    </div>${werkzeuge ? `<div class="werkzeuge">${werkzeuge}</div>` : ''}</div>`;
}
