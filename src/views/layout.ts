export function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/**
 * Ein einziges Stylesheet fuer alles.
 *
 * Ausgelegt auf Handschuhe, Sonnenlicht und ein Balken Empfang: grosse
 * Trefferflaechen (mind. 64 px, Hauptknopf 96 px), harter Kontrast, keine
 * Webfonts, kein Framework. Die Seite ist unter 10 KB.
 */
const CSS = `
*,*::before,*::after{box-sizing:border-box}
body{margin:0;font:17px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  color:#111;background:#f4f5f7;-webkit-text-size-adjust:100%}
.wrap{max-width:560px;margin:0 auto;padding:16px 16px 48px}
h1{font-size:26px;margin:0 0 4px;line-height:1.2}
h2{font-size:19px;margin:28px 0 10px}
p{margin:0 0 12px}
a{color:#0b5cab}
.karte{background:#fff;border-radius:14px;padding:18px;margin-bottom:16px;
  box-shadow:0 1px 3px rgba(0,0,0,.12)}
.kopf{background:#1d2b3a;color:#fff;padding:14px 16px}
.kopf .zeile{max-width:560px;margin:0 auto;display:flex;align-items:center;
  justify-content:space-between;gap:12px}
.kopf a{color:#cfe0f2;text-decoration:none;font-size:15px}
.code{font:700 15px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;
  background:#eef1f5;border-radius:6px;padding:6px 9px;display:inline-block}
.gross{font-size:30px;font-weight:700;line-height:1.15;margin:0 0 6px}
.inhalt{list-style:none;padding:0;margin:10px 0 0;font-size:19px}
.inhalt li{padding:7px 0;border-top:1px solid #e6e9ee}
.inhalt li:first-child{border-top:0}
.menge{font-weight:700;font-variant-numeric:tabular-nums}
.ort{margin-top:14px;padding-top:14px;border-top:2px solid #e6e9ee;font-size:19px}
.ort b{font-size:22px;display:block}
.ort .seit{color:#5a6472;font-size:16px}

button,.knopf{display:block;width:100%;min-height:64px;margin:0 0 12px;padding:16px;
  font:700 21px/1.25 inherit;text-align:center;text-decoration:none;
  border:0;border-radius:12px;cursor:pointer;-webkit-appearance:none}
.knopf-haupt{background:#0a7d3c;color:#fff;min-height:96px;font-size:24px}
.knopf-haupt small{display:block;font-size:16px;font-weight:400;opacity:.9;margin-top:4px}
.knopf-lager{background:#12508f;color:#fff}
.knopf-zweit{background:#fff;color:#12508f;border:2px solid #b8c6d6}
.knopf-still{background:#eceff3;color:#39424e;min-height:52px;font-size:17px}
.knopf-warn{background:#a3231d;color:#fff}
button:active,.knopf:active{transform:translateY(1px)}

.hinweis{background:#fff8e1;border-left:5px solid #e0a800;padding:14px;border-radius:8px;
  margin-bottom:16px}
.fehler{background:#fdecea;border-left:5px solid #a3231d;padding:14px;border-radius:8px;
  margin-bottom:16px}
.erfolg{background:#e7f6ec;border-left:5px solid #0a7d3c;padding:14px;border-radius:8px;
  margin-bottom:16px}
.sitzung{background:#0a7d3c;color:#fff;padding:12px 16px;font-weight:600}
.sitzung .zeile{max-width:560px;margin:0 auto;display:flex;justify-content:space-between;
  align-items:center;gap:12px}
.sitzung a{color:#fff;opacity:.85;font-size:15px}

.liste{list-style:none;padding:0;margin:0}
.liste li{margin-bottom:10px}
.liste .knopf{text-align:left;min-height:60px;padding:14px 16px;font-size:19px}
.liste .entf{display:block;font-size:15px;font-weight:400;color:#5a6472;margin-top:2px}

table{width:100%;border-collapse:collapse;font-size:16px;background:#fff}
th,td{text-align:left;padding:10px 8px;border-bottom:1px solid #e6e9ee}
th{background:#eef1f5;font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#4a5563}
td.zahl,th.zahl{text-align:right;font-variant-numeric:tabular-nums}
.tabelle-rahmen{overflow-x:auto;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.12)}
.pill{display:inline-block;padding:3px 9px;border-radius:99px;font-size:13px;font-weight:600}
.pill-lager{background:#dbe8f6;color:#12508f}
.pill-baustelle{background:#fde9c8;color:#8a5a00}
.pill-warn{background:#fbd9d6;color:#a3231d}
.leer{color:#5a6472;padding:24px 0;text-align:center}
input[type=text],input[type=password],input[type=number],select{width:100%;min-height:52px;
  padding:12px;font:17px inherit;border:2px solid #c3ccd7;border-radius:10px;background:#fff}
label{display:block;font-weight:600;margin:0 0 6px;font-size:16px}
.feld{margin-bottom:16px}
.fuss{margin-top:32px;color:#6b7480;font-size:14px;text-align:center}
@media (prefers-color-scheme:dark){
  body{background:#12161c;color:#e8eaed}
  .karte,table{background:#1b2129}
  .code{background:#262e38;color:#e8eaed}
  .inhalt li,.ort,th,td{border-color:#2c343e}
  th{background:#232a33;color:#a8b2bf}
  .knopf-zweit{background:#1b2129;color:#7fb2ea;border-color:#39434f}
  .knopf-still{background:#262e38;color:#c9d1da}
  .ort .seit,.liste .entf,.leer,.fuss{color:#9aa4b1}
  input,select{background:#1b2129;color:#e8eaed;border-color:#39434f}
  .hinweis{background:#2e2712;color:#f2e2b8}
  .fehler{background:#2e1917;color:#f3cdc9}
  .erfolg{background:#132a1c;color:#c6ecd3}
}
`;

export interface SeiteOpts {
  titel: string;
  kopf?: string;
  banner?: string;
  scripte?: string;
}

export function seite(inhalt: string, opts: SeiteOpts): string {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#1d2b3a">
<meta name="robots" content="noindex,nofollow">
<title>${esc(opts.titel)}</title>
<style>${CSS}</style>
</head>
<body>
${opts.kopf ?? ''}
${opts.banner ?? ''}
<div class="wrap">
${inhalt}
</div>
${opts.scripte ?? ''}
</body>
</html>`;
}

export function kopf(titel: string, zurueck?: { href: string; text: string }): string {
  return `<div class="kopf"><div class="zeile">
    <strong>${esc(titel)}</strong>
    ${zurueck ? `<a href="${esc(zurueck.href)}">${esc(zurueck.text)}</a>` : ''}
  </div></div>`;
}

export function html(inhalt: string, status = 200, extraHeaders: HeadersInit = {}): Response {
  return new Response(inhalt, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...extraHeaders },
  });
}
