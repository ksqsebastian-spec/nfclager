import type {
  Artikel, Buchung, Einheit, EinheitMitStandort, Env,
  InhaltZeile, Mitarbeiter, Quelle, Standort,
} from './types';

/* ---------------------------------------------------------------- Tags --- */

export interface TagZiel {
  code: string;
  ziel_typ: 'einheit' | 'standort';
  ziel_id: number;
}

export async function tagLesen(env: Env, code: string): Promise<TagZiel | null> {
  return env.DB.prepare(
    `SELECT code, ziel_typ, ziel_id FROM tag WHERE code = ? AND aktiv = 1`,
  ).bind(code).first<TagZiel>();
}

/* ------------------------------------------------------------ Einheiten --- */

const EINHEIT_SELECT = `
  SELECT e.*, s.name AS standort_name, s.typ AS standort_typ
    FROM einheit e
    JOIN standort s ON s.id = e.standort_id`;

export async function einheitLesen(env: Env, id: number): Promise<EinheitMitStandort | null> {
  return env.DB.prepare(`${EINHEIT_SELECT} WHERE e.id = ?`)
    .bind(id).first<EinheitMitStandort>();
}

export async function einheitPerCode(env: Env, code: string): Promise<EinheitMitStandort | null> {
  return env.DB.prepare(`${EINHEIT_SELECT} WHERE e.code = ?`)
    .bind(code).first<EinheitMitStandort>();
}

export async function inhaltLesen(env: Env, einheitId: number): Promise<InhaltZeile[]> {
  const { results } = await env.DB.prepare(
    `SELECT i.artikel_id, a.name, i.menge, a.mengeneinheit
       FROM inhalt i JOIN artikel a ON a.id = i.artikel_id
      WHERE i.einheit_id = ?
      ORDER BY a.name`,
  ).bind(einheitId).all<InhaltZeile>();
  return results;
}

export async function einheitenAmStandort(
  env: Env, standortId: number,
): Promise<EinheitMitStandort[]> {
  const { results } = await env.DB.prepare(
    `${EINHEIT_SELECT} WHERE e.standort_id = ? AND e.aktiv = 1 ORDER BY e.code`,
  ).bind(standortId).all<EinheitMitStandort>();
  return results;
}

/* ----------------------------------------------------------- Standorte --- */

export async function standortLesen(env: Env, id: number): Promise<Standort | null> {
  return env.DB.prepare(`SELECT * FROM standort WHERE id = ?`).bind(id).first<Standort>();
}

export async function standorteAktiv(env: Env): Promise<Standort[]> {
  const { results } = await env.DB.prepare(
    `SELECT * FROM standort WHERE aktiv = 1 ORDER BY typ, name`,
  ).all<Standort>();
  return results;
}

export async function hauptlager(env: Env): Promise<Standort | null> {
  return env.DB.prepare(
    `SELECT * FROM standort WHERE typ = 'lager' AND aktiv = 1 ORDER BY id LIMIT 1`,
  ).first<Standort>();
}

/* ------------------------------------------------------------ Buchungen --- */

export interface BuchungEingabe {
  einheitId: number;
  nachStandortId: number;
  mitarbeiterId: number | null;
  quelle: Quelle;
  lat?: number | null;
  lon?: number | null;
  notiz?: string | null;
}

export interface BuchungErgebnis {
  buchungId: number;
  vonStandortId: number | null;
  unveraendert: boolean;
}

/**
 * Bucht eine Einheit an einen neuen Standort und schreibt die Protokollzeile.
 *
 * Steht die Einheit schon dort, passiert nichts — doppeltes Antippen desselben
 * Tags ist auf der Baustelle der Normalfall und darf keine Geisterbuchungen
 * erzeugen.
 */
export async function buchen(env: Env, ein: BuchungEingabe): Promise<BuchungErgebnis | null> {
  const einheit = await einheitLesen(env, ein.einheitId);
  if (!einheit) return null;

  if (einheit.standort_id === ein.nachStandortId) {
    return { buchungId: 0, vonStandortId: einheit.standort_id, unveraendert: true };
  }

  const eingefuegt = await env.DB.prepare(
    `INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id,
                          mitarbeiter_id, quelle, lat, lon, notiz)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     RETURNING id`,
  ).bind(
    ein.einheitId, einheit.standort_id, ein.nachStandortId,
    ein.mitarbeiterId, ein.quelle, ein.lat ?? null, ein.lon ?? null, ein.notiz ?? null,
  ).first<{ id: number }>();

  await env.DB.prepare(
    `UPDATE einheit SET standort_id = ?, seit = datetime('now') WHERE id = ?`,
  ).bind(ein.nachStandortId, ein.einheitId).run();

  return {
    buchungId: eingefuegt?.id ?? 0,
    vonStandortId: einheit.standort_id,
    unveraendert: false,
  };
}

/**
 * Macht eine Buchung rueckgaengig. Nur moeglich, solange sie die juengste der
 * Einheit ist und keine 15 Minuten alt — danach ist eine Gegenbuchung ehrlicher
 * als stilles Zurueckdrehen.
 */
export async function stornieren(
  env: Env, buchungId: number,
): Promise<{ ok: boolean; grund?: string }> {
  const b = await env.DB.prepare(
    `SELECT * FROM buchung WHERE id = ?`,
  ).bind(buchungId).first<Buchung>();
  if (!b) return { ok: false, grund: 'Buchung nicht gefunden' };
  if (b.storniert) return { ok: false, grund: 'Bereits storniert' };

  const juengste = await env.DB.prepare(
    `SELECT id FROM buchung
      WHERE einheit_id = ? AND storniert = 0
      ORDER BY zeit DESC, id DESC LIMIT 1`,
  ).bind(b.einheit_id).first<{ id: number }>();
  if (juengste?.id !== b.id) {
    return { ok: false, grund: 'Es gibt neuere Buchungen für diese Einheit' };
  }

  const alterMin = (Date.now() - new Date(b.zeit.replace(' ', 'T') + 'Z').getTime()) / 60_000;
  if (alterMin > 15) return { ok: false, grund: 'Zu alt — bitte zurückbuchen statt stornieren' };

  // Zurueck auf den Zeitpunkt, an dem die Einheit am vorigen Standort ankam —
  // NICHT auf den Zeitpunkt der stornierten Buchung. Sonst faengt die
  // Vorhaltezeit nach einem versehentlichen Tap bei null an, und genau die
  // Zahl ist der Grund, warum es dieses System gibt.
  const vorige = await env.DB.prepare(
    `SELECT zeit FROM buchung
      WHERE einheit_id = ? AND storniert = 0 AND id <> ?
      ORDER BY zeit DESC, id DESC LIMIT 1`,
  ).bind(b.einheit_id, b.id).first<{ zeit: string }>();

  const angelegt = await env.DB.prepare(
    `SELECT angelegt_am FROM einheit WHERE id = ?`,
  ).bind(b.einheit_id).first<{ angelegt_am: string }>();

  await env.DB.batch([
    env.DB.prepare(`UPDATE buchung SET storniert = 1 WHERE id = ?`).bind(b.id),
    env.DB.prepare(`UPDATE einheit SET standort_id = ?, seit = ? WHERE id = ?`)
      .bind(b.von_standort_id, vorige?.zeit ?? angelegt?.angelegt_am ?? b.zeit, b.einheit_id),
  ]);
  return { ok: true };
}

export interface HistorieZeile {
  id: number;
  zeit: string;
  von: string | null;
  nach: string;
  wer: string | null;
  quelle: string;
}

export async function historie(
  env: Env, einheitId: number, limit = 50,
): Promise<HistorieZeile[]> {
  const { results } = await env.DB.prepare(
    `SELECT b.id, b.zeit, sv.name AS von, sn.name AS nach,
            m.name AS wer, b.quelle
       FROM buchung b
       LEFT JOIN standort sv ON sv.id = b.von_standort_id
       JOIN standort sn ON sn.id = b.nach_standort_id
       LEFT JOIN mitarbeiter m ON m.id = b.mitarbeiter_id
      WHERE b.einheit_id = ? AND b.storniert = 0
      ORDER BY b.zeit DESC, b.id DESC
      LIMIT ?`,
  ).bind(einheitId, limit).all<HistorieZeile>();
  return results;
}

/* -------------------------------------------------------------- Bestand --- */

export interface BestandZeile {
  artikel_id: number;
  artikel: string;
  mengeneinheit: string;
  standort_id: number;
  standort: string;
  standort_typ: string;
  menge: number;
}

/**
 * Materialbestand je Artikel und Standort.
 *
 * Zaehlt beides zusammen: Inhalt von Traegern und Einzelteile, die selbst einen
 * Artikel tragen. Ein Rahmen in einer Gitterbox und ein separat getaggter
 * Treppenturm sollen in derselben Summe auftauchen.
 */
export async function bestand(
  env: Env, opts: { standortId?: number; artikelSuche?: string } = {},
): Promise<BestandZeile[]> {
  const bed: string[] = ['e.aktiv = 1', "e.zustand <> 'ausgemustert'"];
  const args: unknown[] = [];
  if (opts.standortId !== undefined) { bed.push('e.standort_id = ?'); args.push(opts.standortId); }
  if (opts.artikelSuche) { bed.push('a.name LIKE ?'); args.push(`%${opts.artikelSuche}%`); }
  const wo = bed.join(' AND ');

  const { results } = await env.DB.prepare(
    `SELECT artikel_id, artikel, mengeneinheit, standort_id, standort, standort_typ,
            SUM(menge) AS menge
       FROM (
         SELECT a.id AS artikel_id, a.name AS artikel, a.mengeneinheit,
                s.id AS standort_id, s.name AS standort, s.typ AS standort_typ,
                i.menge AS menge
           FROM inhalt i
           JOIN einheit e  ON e.id = i.einheit_id
           JOIN artikel a  ON a.id = i.artikel_id
           JOIN standort s ON s.id = e.standort_id
          WHERE ${wo}
         UNION ALL
         SELECT a.id, a.name, a.mengeneinheit,
                s.id, s.name, s.typ,
                1
           FROM einheit e
           JOIN artikel a  ON a.id = e.artikel_id
           JOIN standort s ON s.id = e.standort_id
          WHERE ${wo} AND e.typ = 'einzelteil'
       )
      GROUP BY artikel_id, standort_id
      HAVING SUM(menge) > 0
      ORDER BY artikel, standort`,
  ).bind(...args, ...args).all<BestandZeile>();
  return results;
}

export interface UeberfaelligZeile {
  einheit_id: number;
  code: string;
  bezeichnung: string;
  standort_id: number;
  standort: string;
  seit: string;
  tage: number;
  baustelle_beendet: number;
  zuletzt_gebucht_von: string | null;
}

/**
 * Material, das zu lange draussen steht — der eigentliche Hebel des Systems.
 *
 * Zwei Faelle: laenger als `schwelleTage` auf einer Baustelle, oder auf einer
 * Baustelle, die im System bereits abgeschlossen ist. Der zweite Fall ist der
 * teure: dort raeumt niemand mehr auf.
 */
export async function ueberfaellig(
  env: Env, schwelleTage = 56,
): Promise<UeberfaelligZeile[]> {
  const { results } = await env.DB.prepare(
    `SELECT e.id AS einheit_id, e.code, e.bezeichnung,
            s.id AS standort_id, s.name AS standort, e.seit,
            CAST(julianday('now') - julianday(e.seit) AS INTEGER) AS tage,
            CASE WHEN s.aktiv = 0 OR s.beendet_am IS NOT NULL THEN 1 ELSE 0 END AS baustelle_beendet,
            (SELECT m.name FROM buchung b
               LEFT JOIN mitarbeiter m ON m.id = b.mitarbeiter_id
              WHERE b.einheit_id = e.id AND b.storniert = 0
              ORDER BY b.zeit DESC, b.id DESC LIMIT 1) AS zuletzt_gebucht_von
       FROM einheit e
       JOIN standort s ON s.id = e.standort_id
      WHERE e.aktiv = 1
        AND s.typ = 'baustelle'
        AND (julianday('now') - julianday(e.seit) >= ?
             OR s.aktiv = 0 OR s.beendet_am IS NOT NULL)
      ORDER BY baustelle_beendet DESC, tage DESC`,
  ).bind(schwelleTage).all<UeberfaelligZeile>();
  return results;
}

export interface SucheTreffer {
  art: 'einheit' | 'standort' | 'artikel';
  id: number;
  titel: string;
  zusatz: string;
}

export async function suche(env: Env, text: string, limit = 25): Promise<SucheTreffer[]> {
  const m = `%${text}%`;
  const { results } = await env.DB.prepare(
    `SELECT 'einheit' AS art, e.id, e.code || ' · ' || e.bezeichnung AS titel,
            s.name AS zusatz
       FROM einheit e JOIN standort s ON s.id = e.standort_id
      WHERE e.code LIKE ?1 OR e.bezeichnung LIKE ?1
      UNION ALL
     SELECT 'standort', s.id, s.name, s.typ
       FROM standort s WHERE s.name LIKE ?1 OR s.adresse LIKE ?1
      UNION ALL
     SELECT 'artikel', a.id, a.name, a.kategorie
       FROM artikel a WHERE a.name LIKE ?1
      LIMIT ?2`,
  ).bind(m, limit).all<SucheTreffer>();
  return results;
}

/* --------------------------------------------------------- Mitarbeiter --- */

export async function mitarbeiterPerTokenHash(
  env: Env, hash: string,
): Promise<Mitarbeiter | null> {
  return env.DB.prepare(
    `SELECT id, name, rolle, aktiv FROM mitarbeiter WHERE token_hash = ? AND aktiv = 1`,
  ).bind(hash).first<Mitarbeiter>();
}

export async function artikelAlle(env: Env): Promise<Artikel[]> {
  const { results } = await env.DB.prepare(
    `SELECT * FROM artikel WHERE aktiv = 1 ORDER BY kategorie, name`,
  ).all<Artikel>();
  return results;
}

export type { Einheit, Standort, Artikel, Mitarbeiter };
