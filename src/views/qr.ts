import qrcode from 'qrcode-generator';

/**
 * QR als Inline-SVG. Steht auf jedem Aufkleber neben dem NFC-Chip: wenn der
 * Chip stirbt oder das Handy zu alt ist, bleibt der Aufkleber benutzbar.
 */
export function qrSvg(text: string, kantenlaengeMm: number): string {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  const pfad: string[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.isDark(r, c)) pfad.push(`M${c} ${r}h1v1h-1z`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 ${n + 2} ${n + 2}" ` +
    `width="${kantenlaengeMm}mm" height="${kantenlaengeMm}mm" shape-rendering="crispEdges">` +
    `<rect x="-1" y="-1" width="${n + 2}" height="${n + 2}" fill="#fff"/>` +
    `<path d="${pfad.join('')}" fill="#000"/></svg>`;
}
