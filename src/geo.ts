/** Luftlinie in Kilometern. Reicht voellig, um die naechste Baustelle nach oben zu sortieren. */
export function entfernungKm(
  aLat: number, aLon: number,
  bLat: number, bLon: number,
): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const lat1 = (aLat * Math.PI) / 180;
  const lat2 = (bLat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** SQLite liefert "YYYY-MM-DD HH:MM:SS" in UTC. */
export function alsDatum(sqliteZeit: string): Date {
  return new Date(sqliteZeit.replace(' ', 'T') + 'Z');
}

export function tageSeit(sqliteZeit: string, jetzt = new Date()): number {
  const ms = jetzt.getTime() - alsDatum(sqliteZeit).getTime();
  return Math.max(0, Math.floor(ms / 86_400_000));
}

/** "seit 34 Tagen" / "seit heute" — fuer die Scan-Seite. */
export function seitText(sqliteZeit: string, jetzt = new Date()): string {
  const tage = tageSeit(sqliteZeit, jetzt);
  if (tage === 0) return 'seit heute';
  if (tage === 1) return 'seit gestern';
  return `seit ${tage} Tagen`;
}
