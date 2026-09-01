/**
 * Name und Zeichen.
 *
 * "Rüstzeug" — das Wort meint die Ausrüstung, die man zum Arbeiten braucht,
 * und trägt das "Rüst" aus Gerüst schon in sich. Passt in die Reihe neben
 * Türwerk, Tarifcheck und Mikdaten, ohne erklärt werden zu müssen.
 */
export const NAME = 'Rüstzeug';
export const UNTERTITEL = 'Gerüstlager';

/** Markenfarben. Das Gelb ist auch der Akzent in der Oberfläche. */
export const MARKE_GRUND = '#1E2A38';
export const MARKE_SIGNAL = '#F5B800';

/**
 * Ein Gerüstfeld: drei Ständer, zwei Riegel, unten offen — es steht auf dem
 * Boden — und quer darüber die Diagonale in Signalgelb.
 *
 * Die durchgehende Diagonale ist Absicht. Ein geschlossener Rahmen mit einem
 * Strich darin liest sich bei 16 px als durchgestrichenes Kästchen, also als
 * "verboten"; über zwei Felder gespannt bleibt es eine Aussteifung.
 */
const STRICHE = (farbe: string) =>
  `<g fill="none" stroke="${farbe}" stroke-width="6.5" stroke-linecap="round">` +
  '<path d="M12 13v38M32 13v38M52 13v38"/><path d="M12 13h40M12 36h40"/></g>';

const DIAGONALE = (farbe: string) =>
  `<path fill="none" stroke="${farbe}" stroke-width="6.5" stroke-linecap="round" ` +
  'd="M14 34 50 15"/>';

export function zeichenInner(strichfarbe = '#fff', diagonale = MARKE_SIGNAL): string {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
    STRICHE(strichfarbe) + DIAGONALE(diagonale) + '</svg>';
}

/** Freistehendes Zeichen für Kopfzeilen — ohne Kachel, in Marken- und Signalfarbe. */
export function zeichen(groesse = 22, strichfarbe = 'currentColor'): string {
  return `<svg class="zeichen" viewBox="0 0 64 64" width="${groesse}" height="${groesse}" ` +
    `aria-hidden="true" focusable="false">${STRICHE(strichfarbe)}${DIAGONALE(MARKE_SIGNAL)}</svg>`;
}

/** Kachel mit abgerundetem Grund — als Favicon und für den MCP-Hub. */
export function kachel(groesse = 64): string {
  const r = Math.round(groesse * 0.219);
  const anteil = 0.78;
  const skala = (groesse * anteil) / 64;
  const v = (groesse - 64 * skala) / 2;
  const inner = zeichenInner('#fff', MARKE_SIGNAL)
    .replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${groesse} ${groesse}">` +
    `<rect width="${groesse}" height="${groesse}" rx="${r}" fill="${MARKE_GRUND}"/>` +
    `<g transform="translate(${v.toFixed(1)} ${v.toFixed(1)}) scale(${skala.toFixed(4)})">` +
    `${inner}</g></svg>`;
}

export const FAVICON = `data:image/svg+xml,${encodeURIComponent(kachel(64))}`;
