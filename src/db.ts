import { tagCodeErzeugen } from './codes';
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

/**
 * Legt einen neuen Tag-Code an.
 *
 * Kollisionen sind bei 27^6 unwahrscheinlich, aber ein Duplikat waere ein
 * stiller Datenfehler — deshalb wird bis zum Erfolg neu gewuerfelt statt
 * blind zu vertrauen.
 */
export async function tagAnlegen(
  env: Env, zielTyp: 'einheit' | 'standort', zielId: number,
): Promise<string> {
  for (let versuch = 0; versuch < 8; versuch++) {
    const code = tagCodeErzeugen();
    try {
      await env.DB.prepare(
        `INSERT INTO tag (code, ziel_typ, ziel_id) VALUES (?, ?, ?)`,
      ).bind(code, zielTyp, zielId).run();
      return code;
    } catch {
      continue;
    }
  }
  throw new Error('Kein freier Tag-Code gefunden');
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
  /**
   * Zeitpunkt der Buchung, falls sie offline entstanden ist und erst spaeter
   * ankommt. Ohne das waere die Vorhaltezeit um die Funkloch-Dauer falsch.
   */
  zeit?: string | null;
}

/**
 * Pruefft einen nachgetragenen Zeitstempel.
 *
 * Der Wert kommt vom Handy und ist damit nicht vertrauenswuerdig: er darf nicht
 * in der Zukunft liegen (sonst waere die Einheit "seit -3 Tagen" da) und nicht
 * beliebig weit zurueck. Alles ausserhalb faellt auf die Serverzeit zurueck.
 */
export function nachtragsZeit(wert: string | null | undefined, jetzt = new Date()): string | null {
  if (!wert) return null;
  const d = new Date(wert);
  if (Number.isNaN(d.getTime())) return null;
  const alterTage = (jetzt.getTime() - d.getTime()) / 86_400_000;
  if (alterTage < 0 || alterTage > 14) return null;
  return d.toISOString().slice(0, 19).replace('T', ' ');
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

  const zeit = nachtragsZeit(ein.zeit);

  const eingefuegt = await env.DB.prepare(
    `INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id,
                          mitarbeiter_id, quelle, lat, lon, notiz, zeit)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, datetime('now')))
     RETURNING id`,
  ).bind(
    ein.einheitId, einheit.standort_id, ein.nachStandortId,
    ein.mitarbeiterId, ein.quelle, ein.lat ?? null, ein.lon ?? null,
    zeit ? (ein.notiz ?? 'offline nachgetragen') : (ein.notiz ?? null), zeit,
  ).first<{ id: number }>();

  await env.DB.prepare(
    `UPDATE einheit SET standort_id = ?, seit = COALESCE(?, datetime('now')) WHERE id = ?`,
  ).bind(ein.nachStandortId, zeit, ein.einheitId).run();

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

/* ---------------------------------------------------------- Vorhaltung --- */

export interface VorhaltungZeile {
  standort_id: number;
  standort: string;
  aktiv: number;
  einheiten: number;
  tage_summe: number;
  tage_max: number;
  erste_lieferung: string | null;
}

/**
 * Vorhaltetage je Baustelle.
 *
 * Gezaehlt wird die Zeit zwischen Hin- und Rueckbuchung, bei noch stehendem
 * Material bis jetzt. `tage_summe` ist die Summe ueber alle Einheiten
 * (Einheitentage) — das ist die Zahl, die bei Streit ueber die Mietdauer
 * zaehlt, nicht die Kalenderdauer der Baustelle.
 */
export async function vorhaltung(
  env: Env, opts: { standortId?: number; abDatum?: string } = {},
): Promise<VorhaltungZeile[]> {
  const { results } = await env.DB.prepare(
    `WITH abschnitt AS (
       SELECT b.nach_standort_id AS standort_id,
              b.einheit_id,
              b.zeit AS von,
              COALESCE((SELECT MIN(n.zeit) FROM buchung n
                         WHERE n.einheit_id = b.einheit_id
                           AND n.storniert = 0
                           AND (n.zeit > b.zeit OR (n.zeit = b.zeit AND n.id > b.id))),
                       datetime('now')) AS bis
         FROM buchung b
         JOIN standort s ON s.id = b.nach_standort_id
        WHERE b.storniert = 0 AND s.typ = 'baustelle'
     )
     SELECT s.id AS standort_id, s.name AS standort, s.aktiv,
            COUNT(DISTINCT a.einheit_id) AS einheiten,
            CAST(SUM(julianday(a.bis) - julianday(a.von)) AS INTEGER) AS tage_summe,
            CAST(MAX(julianday(a.bis) - julianday(a.von)) AS INTEGER) AS tage_max,
            MIN(a.von) AS erste_lieferung
       FROM abschnitt a
       JOIN standort s ON s.id = a.standort_id
      WHERE (?1 IS NULL OR s.id = ?1)
        AND (?2 IS NULL OR a.bis >= ?2)
      GROUP BY s.id
      ORDER BY tage_summe DESC`,
  ).bind(opts.standortId ?? null, opts.abDatum ?? null).all<VorhaltungZeile>();
  return results;
}

export interface VerlustZeile {
  einheit_id: number;
  code: string;
  bezeichnung: string;
  standort: string;
  standort_beendet: number;
  tage: number;
  zuletzt_von: string | null;
  inhalt: string | null;
}

/**
 * Material, das als verloren gelten muss: es steht auf einer abgeschlossenen
 * Baustelle oder laenger als die Schwelle draussen, ohne jede Bewegung.
 *
 * Bewusst dieselbe Grundlage wie `ueberfaellig`, aber mit Inhaltsangabe —
 * fuer die Frage "was hat uns das gekostet" braucht es die Stueckzahlen.
 */
export async function verlust(
  env: Env, schwelleTage = 120,
): Promise<VerlustZeile[]> {
  const { results } = await env.DB.prepare(
    `SELECT e.id AS einheit_id, e.code, e.bezeichnung,
            s.name AS standort,
            CASE WHEN s.aktiv = 0 OR s.beendet_am IS NOT NULL THEN 1 ELSE 0 END AS standort_beendet,
            CAST(julianday('now') - julianday(e.seit) AS INTEGER) AS tage,
            (SELECT m.name FROM buchung b LEFT JOIN mitarbeiter m ON m.id = b.mitarbeiter_id
              WHERE b.einheit_id = e.id AND b.storniert = 0
              ORDER BY b.zeit DESC, b.id DESC LIMIT 1) AS zuletzt_von,
            (SELECT group_concat(CAST(i.menge AS INTEGER) || '× ' || a.name, ', ')
               FROM inhalt i JOIN artikel a ON a.id = i.artikel_id
              WHERE i.einheit_id = e.id) AS inhalt
       FROM einheit e
       JOIN standort s ON s.id = e.standort_id
      WHERE e.aktiv = 1 AND s.typ = 'baustelle'
        AND (julianday('now') - julianday(e.seit) >= ?1
             OR s.aktiv = 0 OR s.beendet_am IS NOT NULL)
      ORDER BY standort_beendet DESC, tage DESC`,
  ).bind(schwelleTage).all<VerlustZeile>();
  return results;
}

/* ------------------------------------------------------------ Inventur --- */

export interface Inventur {
  id: number;
  standort_id: number;
  standort?: string;
  gestartet_am: string;
  beendet_am: string | null;
  soll_anzahl: number | null;
  ist_anzahl: number | null;
}

export async function inventurOffen(env: Env, standortId: number): Promise<Inventur | null> {
  return env.DB.prepare(
    `SELECT i.*, s.name AS standort FROM inventur i JOIN standort s ON s.id = i.standort_id
      WHERE i.standort_id = ? AND i.beendet_am IS NULL ORDER BY i.id DESC LIMIT 1`,
  ).bind(standortId).first<Inventur>();
}

export async function inventurPerId(env: Env, id: number): Promise<Inventur | null> {
  return env.DB.prepare(
    `SELECT i.*, s.name AS standort FROM inventur i JOIN standort s ON s.id = i.standort_id
      WHERE i.id = ?`,
  ).bind(id).first<Inventur>();
}

export async function inventurStarten(
  env: Env, standortId: number, mitarbeiterId: number | null,
): Promise<Inventur> {
  const offen = await inventurOffen(env, standortId);
  if (offen) return offen;
  const soll = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM einheit WHERE standort_id = ? AND aktiv = 1`,
  ).bind(standortId).first<{ n: number }>();
  const neu = await env.DB.prepare(
    `INSERT INTO inventur (standort_id, gestartet_von, soll_anzahl) VALUES (?, ?, ?)
     RETURNING id`,
  ).bind(standortId, mitarbeiterId, soll?.n ?? 0).first<{ id: number }>();
  return (await inventurPerId(env, neu!.id))!;
}

/** Eine gescannte Einheit als gefunden verbuchen. Doppelte Scans sind harmlos. */
export async function inventurTreffer(
  env: Env, inventurId: number, einheitId: number, warWoanders: boolean,
): Promise<void> {
  await env.DB.prepare(
    `INSERT INTO inventur_treffer (inventur_id, einheit_id, war_woanders)
     VALUES (?, ?, ?) ON CONFLICT DO NOTHING`,
  ).bind(inventurId, einheitId, warWoanders ? 1 : 0).run();
}

export interface InventurStand {
  inventur: Inventur;
  gefunden: Array<{ code: string; bezeichnung: string; war_woanders: number }>;
  fehlend: Array<{ id: number; code: string; bezeichnung: string }>;
}

export async function inventurStand(env: Env, inventurId: number): Promise<InventurStand | null> {
  const inv = await inventurPerId(env, inventurId);
  if (!inv) return null;
  const { results: gefunden } = await env.DB.prepare(
    `SELECT e.code, e.bezeichnung, t.war_woanders
       FROM inventur_treffer t JOIN einheit e ON e.id = t.einheit_id
      WHERE t.inventur_id = ? ORDER BY t.zeit DESC`,
  ).bind(inventurId).all<{ code: string; bezeichnung: string; war_woanders: number }>();
  const { results: fehlend } = await env.DB.prepare(
    `SELECT e.id, e.code, e.bezeichnung FROM einheit e
      WHERE e.standort_id = ? AND e.aktiv = 1
        AND e.id NOT IN (SELECT einheit_id FROM inventur_treffer WHERE inventur_id = ?)
      ORDER BY e.code`,
  ).bind(inv.standort_id, inventurId).all<{ id: number; code: string; bezeichnung: string }>();
  return { inventur: inv, gefunden, fehlend };
}

export async function inventurAbschliessen(
  env: Env, inventurId: number, notiz?: string,
): Promise<InventurStand | null> {
  const stand = await inventurStand(env, inventurId);
  if (!stand) return null;
  await env.DB.prepare(
    `UPDATE inventur SET beendet_am = datetime('now'), ist_anzahl = ?, notiz = ?
      WHERE id = ? AND beendet_am IS NULL`,
  ).bind(stand.gefunden.length, notiz ?? null, inventurId).run();
  return inventurStand(env, inventurId);
}

/* ----------------------------------------------------------- Meldungen --- */

export interface MeldungZeile {
  id: number;
  einheit_id: number;
  code: string;
  bezeichnung: string;
  art: string;
  text: string | null;
  foto_schluessel: string | null;
  zeit: string;
  wer: string | null;
  erledigt: number;
}

export async function meldungAnlegen(
  env: Env,
  m: { einheitId: number; art: string; text?: string | null;
       fotoSchluessel?: string | null; mitarbeiterId: number | null },
): Promise<number> {
  const neu = await env.DB.prepare(
    `INSERT INTO meldung (einheit_id, art, text, foto_schluessel, mitarbeiter_id)
     VALUES (?, ?, ?, ?, ?) RETURNING id`,
  ).bind(m.einheitId, m.art, m.text ?? null, m.fotoSchluessel ?? null, m.mitarbeiterId)
    .first<{ id: number }>();

  // Der Zustand der Einheit folgt der Meldung — sonst muesste ihn jemand
  // im Buero nachtragen, und genau das passiert nicht.
  if (m.art === 'beschaedigt' || m.art === 'reparatur' || m.art === 'ok') {
    await env.DB.prepare(`UPDATE einheit SET zustand = ? WHERE id = ?`)
      .bind(m.art, m.einheitId).run();
  }
  return neu?.id ?? 0;
}

export async function meldungen(env: Env, nurOffene = true): Promise<MeldungZeile[]> {
  const { results } = await env.DB.prepare(
    `SELECT m.id, m.einheit_id, e.code, e.bezeichnung, m.art, m.text,
            m.foto_schluessel, m.zeit, ma.name AS wer, m.erledigt
       FROM meldung m
       JOIN einheit e ON e.id = m.einheit_id
       LEFT JOIN mitarbeiter ma ON ma.id = m.mitarbeiter_id
      WHERE (?1 = 0 OR m.erledigt = 0)
      ORDER BY m.zeit DESC LIMIT 200`,
  ).bind(nurOffene ? 1 : 0).all<MeldungZeile>();
  return results;
}
