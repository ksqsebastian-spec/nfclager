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
  <div class="qr">${qrSvg(e.url, 27)}</div>
  <div class="txt">
    <div class="code">${esc(e.code)}</div>
    <div class="bez">${esc(e.bezeichnung)}</div>
    <div class="host">${esc(host(e.url))}</div>
    <div class="firma">${esc(firma)}</div>
  </div>
</div>`).join('');

  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<title>Etiketten — ${etiketten.length} Stück</title>
<style>
@page{size:A4;margin:9mm}
body{margin:0;color:#000;background:#fff;
  font:12px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
.anleitung{padding:14px 16px;background:#f2f5f8;border:1px solid #d9e0e7;border-radius:10px;
  margin-bottom:14px;font-size:13px;line-height:1.55;max-width:170mm}
.anleitung h1{font-size:15px;margin:0 0 6px}
.anleitung ol{margin:6px 0 0;padding-left:18px}
.anleitung li{margin-bottom:3px}
.bogen{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
.etikett{display:flex;gap:3.5mm;align-items:center;border:1px dashed #9aa5b1;border-radius:2.5mm;
  padding:3mm;height:33mm;break-inside:avoid;page-break-inside:avoid;overflow:hidden}
.qr{flex:0 0 auto;line-height:0}
.txt{min-width:0;display:flex;flex-direction:column;gap:1.5mm}
.code{font:700 15px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em}
.bez{font-size:10.5px;line-height:1.25;overflow:hidden;display:-webkit-box;
  -webkit-line-clamp:2;-webkit-box-orient:vertical;color:#1c2733}
.host{font-size:8px;color:#5a6672;letter-spacing:.02em}
.firma{font-size:7.5px;color:#7b8794}
@media print{.anleitung{display:none}.etikett{border-color:#c9d1d9}}
</style></head>
<body>
<div class="anleitung">
  <h1>${etiketten.length} Etiketten</h1>
  <ol>
    <li>Auf wetterfestes Material drucken — Papier überlebt eine Gerüstbau-Baustelle nicht.</li>
    <li>Den NFC-Chip mit <strong>derselben URL</strong> beschreiben, die im QR steckt
        (NFC Tools oder NXP TagWriter, Typ <strong>URI-Record</strong>).</li>
    <li>Chip anschließend <strong>schreibschützen</strong>, damit niemand eine fremde
        URL darauflegen kann.</li>
    <li>On-Metal-Tags verwenden — an Stahl-Gitterboxen funktionieren normale Chips nicht.</li>
  </ol>
</div>
<div class="bogen">${karten}</div>
</body></html>`;
}
