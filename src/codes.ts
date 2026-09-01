/**
 * Tag-Codes stehen auf dem Aufkleber und muessen notfalls mit Handschuhen
 * abgetippt werden. Deshalb ein Alphabet ohne 0/O, 1/I/L und ohne Vokale
 * (verhindert nebenbei, dass zufaellig Woerter entstehen).
 */
const ALPHABET = '23456789BCDFGHJKMNPQRSTVWXZ';
const LAENGE = 6;

/** Haeufige Vertipper beim Abtippen geradebiegen. */
const KORREKTUR: Record<string, string> = {
  '0': 'D', 'O': 'D',
  '1': 'J', 'I': 'J', 'L': 'J',
  'A': '4', 'E': 'F', 'U': 'V', 'Y': 'V',
};

export function tagCodeErzeugen(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(LAENGE));
  let code = '';
  for (const b of bytes) code += ALPHABET[b % ALPHABET.length];
  return code;
}

/**
 * Grundform jeder Eingabe: Grossbuchstaben, ohne Leerzeichen.
 *
 * Bindestriche bleiben stehen — sprechende Einheitencodes wie "GB-001" laufen
 * durch dieselbe Tuer wie Tag-Codes und duerfen dabei nicht zerlegt werden.
 */
export function kanonisch(eingabe: string): string {
  return eingabe.toUpperCase().replace(/[^0-9A-Z-]/g, '');
}

/**
 * Zusaetzliche Lesart fuer abgetippte Tag-Codes: haeufige Vertipper werden
 * geradegebogen (O statt D, 1 statt J ...).
 *
 * Nur als Rueckfall gedacht — zuerst wird immer die Grundform gesucht, sonst
 * wuerde diese Korrektur gueltige Codes anderer Form kaputtmachen.
 */
export function tagCodeNormalisieren(eingabe: string): string {
  let out = '';
  for (const z of kanonisch(eingabe).replace(/-/g, '')) out += KORREKTUR[z] ?? z;
  return out;
}

export function istTagCode(code: string): boolean {
  if (code.length !== LAENGE) return false;
  for (const z of code) if (!ALPHABET.includes(z)) return false;
  return true;
}

/** Einladungscodes duerfen laenger und unhandlicher sein — sie werden geklickt. */
export function einladungscodeErzeugen(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function geraetetokenErzeugen(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
