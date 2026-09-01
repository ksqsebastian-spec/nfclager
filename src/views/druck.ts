import { esc } from './layout';
import { qrSvg } from './qr';

export interface DruckEtikett {
  code: string;
  bezeichnung: string;
  url: string;
}

/** Nur der Host — der Code allein nuetzt niemandem, der ihn abtippen will. */
function host(url: string): string {
  try { return new URL(url).host; } catch { return ''; }
}

/**
 * Druckbogen fuer die Aufkleber: QR, Klartextcode, Bezeichnung, Eigentuemer.
 *
 * Der NFC-Chip traegt dieselbe URL. Wer den Bogen ausdruckt und aufklebt, hat
 * damit zwei unabhaengige Wege auf dieselbe Seite — und einen dritten, wenn
 * jemand die sechs Zeichen abtippt.
 */
export function druckbogen(etiketten: DruckEtikett[], firma: string): string {
  const karten = etiketten.map((e) => `
<div class="etikett">
  <div class="qr">${qrSvg(e.url, 28)}</div>
  <div class="txt">
    <div class="code">${esc(e.code)}</div>
    <div class="bez">${esc(e.bezeichnung)}</div>
    <div class="firma">${esc(host(e.url))} · ${esc(firma)}</div>
  </div>
</div>`).join('');

  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<title>Etiketten — ${etiketten.length} Stück</title>
<style>
@page{size:A4;margin:10mm}
body{margin:0;font:12px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#000;background:#fff}
.hinweis{padding:12px;background:#eef1f5;border-radius:8px;margin-bottom:12px;font-size:13px}
.bogen{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
.etikett{display:flex;gap:3mm;align-items:center;border:1px dashed #999;border-radius:3mm;
  padding:3mm;height:34mm;break-inside:avoid;page-break-inside:avoid}
.qr{flex:0 0 auto;line-height:0}
.txt{min-width:0}
.code{font:700 15px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em}
.bez{font-size:11px;margin-top:3px;overflow:hidden;display:-webkit-box;
  -webkit-line-clamp:2;-webkit-box-orient:vertical}
.firma{font-size:8px;color:#444;margin-top:4px}
@media print{.hinweis{display:none}.etikett{border-color:#ccc}}
</style></head>
<body>
<div class="hinweis"><strong>${etiketten.length} Etiketten.</strong>
  Auf wetterfestes Material drucken. Der NFC-Chip bekommt dieselbe URL wie der
  QR-Code — beim Programmieren mit NFC Tools oder NXP TagWriter als URI-Record
  schreiben und anschließend schreibschützen.</div>
<div class="bogen">${karten}</div>
</body></html>`;
}
