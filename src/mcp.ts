import {
  bestand, buchen, einheitLesen, einheitPerCode, einheitenAmStandort, historie,
  inhaltLesen, inventurAbschliessen, inventurStand, inventurStarten, meldungen,
  standortLesen, standorteAktiv, suche, tagAnlegen, ueberfaellig, verlust, vorhaltung,
} from './db';
import { formatMenge, meldungsArt } from './views/scan';
import { seitText, tageSeit } from './geo';
import { gleichSicher } from './auth';
import type { Env } from './types';

const VERSION = '0.1.0';
const PROTOKOLL = '2024-11-05';

interface Werkzeug {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  /**
   * Nur lesend. Wird als annotations.readOnlyHint mitgeschickt — Claude
   * unterscheidet danach, was es ungefragt aufrufen darf, und der MCP-Hub
   * zählt damit "lesend/schreibend" auf der Übersichtsseite.
   */
  readOnly?: boolean;
  ausfuehren: (env: Env, args: Record<string, any>) => Promise<string>;
}

const WERKZEUGE: Werkzeug[] = [
  {
    name: 'bestand',
    readOnly: true,
    description:
      'Materialbestand je Artikel und Standort. Zählt Inhalt von Ladungsträgern und ' +
      'separat getaggte Einzelteile zusammen. Ohne Filter kommt der Gesamtbestand über ' +
      'alle Standorte. Für "wie viel liegt im Lager" den Standort auf das Lager setzen.',
    inputSchema: {
      type: 'object',
      properties: {
        artikel: { type: 'string', description: 'Filtert auf Artikel, deren Name den Text enthält, z. B. "Rahmen"' },
        standort: { type: 'string', description: 'Filtert auf einen Standort (Name oder ID)' },
      },
    },
    async ausfuehren(env, args) {
      const standortId = await standortAufloesen(env, args.standort);
      if (args.standort && standortId === null) return `Standort "${args.standort}" nicht gefunden.`;
      const zeilen = await bestand(env, {
        standortId: standortId ?? undefined,
        artikelSuche: args.artikel,
      });
      if (zeilen.length === 0) return 'Kein Bestand gefunden.';

      const proArtikel = new Map<string, typeof zeilen>();
      for (const z of zeilen) {
        const liste = proArtikel.get(z.artikel) ?? [];
        liste.push(z);
        proArtikel.set(z.artikel, liste);
      }
      const teile: string[] = [];
      for (const [artikel, orte] of proArtikel) {
        const summe = orte.reduce((s, o) => s + o.menge, 0);
        const einheit = orte[0]!.mengeneinheit;
        const detail = orte
          .map((o) => `  ${o.standort} (${o.standort_typ}): ${formatMenge(o.menge)}`)
          .join('\n');
        teile.push(`${artikel} — gesamt ${formatMenge(summe)} ${einheit}\n${detail}`);
      }
      return teile.join('\n\n');
    },
  },
  {
    name: 'einheit',
    readOnly: true,
    description:
      'Alles zu einer Einheit: Bezeichnung, Inhalt, aktueller Standort, wie lange sie ' +
      'dort steht, und die vollständige Bewegungshistorie. Nimmt den sprechenden Code ' +
      '(z. B. "GB-047") oder den Tag-Code vom Aufkleber (z. B. "K7F2QX").',
    inputSchema: {
      type: 'object',
      properties: { code: { type: 'string', description: 'Einheiten-Code oder Tag-Code' } },
      required: ['code'],
    },
    async ausfuehren(env, args) {
      const e = await einheitAufloesen(env, String(args.code));
      if (!e) return `Keine Einheit zu "${args.code}" gefunden.`;
      const inhalt = await inhaltLesen(env, e.id);
      const hist = await historie(env, e.id, 20);
      const inhaltText = inhalt.length
        ? inhalt.map((z) => `  ${formatMenge(z.menge)}× ${z.name}`).join('\n')
        : '  (kein Inhalt erfasst)';
      const histText = hist.length
        ? hist.map((h) =>
            `  ${h.zeit.slice(0, 16)} · ${h.von ?? '—'} → ${h.nach} · ${h.wer ?? 'unbekannt'} (${h.quelle})`,
          ).join('\n')
        : '  (noch keine Bewegungen)';
      return [
        `${e.code} — ${e.bezeichnung} (${e.typ})`,
        `Standort: ${e.standort_name} (${e.standort_typ}), ${seitText(e.seit)}`,
        `Zustand: ${e.zustand}`,
        `Inhalt:\n${inhaltText}`,
        `Historie:\n${histText}`,
      ].join('\n');
    },
  },
  {
    name: 'baustelle_bestand',
    readOnly: true,
    description:
      'Was steht auf einer Baustelle, seit wann und wie viele Vorhaltetage sind ' +
      'aufgelaufen. Grundlage für die Frage "können wir das Gerüst abrechnen" und für ' +
      'die Räumung nach Bauende.',
    inputSchema: {
      type: 'object',
      properties: { standort: { type: 'string', description: 'Name oder ID der Baustelle' } },
      required: ['standort'],
    },
    async ausfuehren(env, args) {
      const id = await standortAufloesen(env, args.standort);
      if (id === null) return `Standort "${args.standort}" nicht gefunden.`;
      const s = await standortLesen(env, id);
      const einheiten = await einheitenAmStandort(env, id);
      if (einheiten.length === 0) return `${s?.name}: kein Material vor Ort.`;

      const zeilen = einheiten.map((e) =>
        `  ${e.code} — ${e.bezeichnung} · ${tageSeit(e.seit)} Vorhaltetage (${seitText(e.seit)})`,
      );
      const maxTage = Math.max(...einheiten.map((e) => tageSeit(e.seit)));
      const material = await bestand(env, { standortId: id });
      const materialText = material.length
        ? material.map((m) => `  ${formatMenge(m.menge)} ${m.mengeneinheit} ${m.artikel}`).join('\n')
        : '  (kein Inhalt erfasst)';
      return [
        `${s?.name} (${s?.typ}${s?.aktiv ? '' : ', beendet'})`,
        `${einheiten.length} Einheiten vor Ort, längste Vorhaltung ${maxTage} Tage`,
        `Material:\n${materialText}`,
        `Einheiten:\n${zeilen.join('\n')}`,
      ].join('\n');
    },
  },
  {
    name: 'ueberfaellig',
    readOnly: true,
    description:
      'Material, das zu lange draußen steht — der eigentliche Hebel gegen Materialverlust. ' +
      'Liefert zwei Fälle: länger als die Schwelle auf einer Baustelle, und Material auf ' +
      'bereits abgeschlossenen Baustellen (der teure Fall, dort räumt niemand mehr auf). ' +
      'Nennt auch, wer zuletzt gebucht hat — um nachfragen zu können, solange sich noch ' +
      'jemand erinnert.',
    inputSchema: {
      type: 'object',
      properties: {
        schwelle_tage: {
          type: 'number',
          description: 'Ab wie vielen Tagen auf einer Baustelle als überfällig gilt. Standard 56 (acht Wochen).',
        },
      },
    },
    async ausfuehren(env, args) {
      const schwelle = typeof args.schwelle_tage === 'number' ? args.schwelle_tage : 56;
      const zeilen = await ueberfaellig(env, schwelle);
      if (zeilen.length === 0) return `Nichts überfällig (Schwelle ${schwelle} Tage).`;
      const beendet = zeilen.filter((z) => z.baustelle_beendet);
      const lang = zeilen.filter((z) => !z.baustelle_beendet);
      const block = (t: typeof zeilen) => t.map((z) =>
        `  ${z.code} — ${z.bezeichnung} · ${z.standort} · ${z.tage} Tage · zuletzt gebucht von ${z.zuletzt_gebucht_von ?? 'unbekannt'}`,
      ).join('\n');
      const teile = [`${zeilen.length} Einheiten überfällig (Schwelle ${schwelle} Tage).`];
      if (beendet.length) teile.push(`Auf beendeten Baustellen (${beendet.length}):\n${block(beendet)}`);
      if (lang.length) teile.push(`Über der Schwelle (${lang.length}):\n${block(lang)}`);
      return teile.join('\n\n');
    },
  },
  {
    name: 'suche',
    readOnly: true,
    description:
      'Freitextsuche über Einheiten, Standorte und Artikel. Nützlich, wenn nur ein ' +
      'Bruchstück bekannt ist — "Elbchaussee", "Treppenturm", "GB-04".',
    inputSchema: {
      type: 'object',
      properties: { text: { type: 'string' } },
      required: ['text'],
    },
    async ausfuehren(env, args) {
      const treffer = await suche(env, String(args.text));
      if (treffer.length === 0) return `Nichts zu "${args.text}" gefunden.`;
      return treffer.map((t) => `${t.art}: ${t.titel} (${t.zusatz})`).join('\n');
    },
  },

  {
    name: 'vorhaltung',
    readOnly: true,
    description:
      'Vorhaltetage je Baustelle — Grundlage für die Abrechnung der Mietdauer. ' +
      '"Einheitentage" ist die Summe über alle Einheiten (3 Gitterboxen × 67 Tage = 201), ' +
      'nicht die Kalenderdauer der Baustelle. Das ist die Zahl, die bei Streit über die ' +
      'Mietdauer zählt.',
    inputSchema: {
      type: 'object',
      properties: {
        standort: { type: 'string', description: 'Auf eine Baustelle einschränken' },
        ab_datum: { type: 'string', description: 'Nur Abschnitte, die nach diesem Datum endeten (JJJJ-MM-TT)' },
      },
    },
    async ausfuehren(env, args) {
      const id = await standortAufloesen(env, args.standort);
      if (args.standort && id === null) return `Standort "${args.standort}" nicht gefunden.`;
      const zeilen = await vorhaltung(env, {
        standortId: id ?? undefined, abDatum: args.ab_datum,
      });
      if (zeilen.length === 0) return 'Keine Vorhaltung erfasst.';
      return zeilen.map((v) =>
        `${v.standort}${v.aktiv ? '' : ' (beendet)'}: ${v.tage_summe} Einheitentage · ` +
        `${v.einheiten} Einheiten · längste ${v.tage_max} Tage · ` +
        `erste Lieferung ${v.erste_lieferung?.slice(0, 10) ?? '?'}`,
      ).join('\n');
    },
  },
  {
    name: 'verlust',
    readOnly: true,
    description:
      'Material, das als verloren gelten muss: auf abgeschlossener Baustelle oder länger ' +
      'als die Schwelle ohne jede Bewegung. Anders als "ueberfaellig" mit Inhaltsangabe — ' +
      'für die Frage, was der Schwund an Stückzahlen gekostet hat.',
    inputSchema: {
      type: 'object',
      properties: {
        schwelle_tage: { type: 'number', description: 'Standard 120 Tage' },
      },
    },
    async ausfuehren(env, args) {
      const schwelle = typeof args.schwelle_tage === 'number' ? args.schwelle_tage : 120;
      const zeilen = await verlust(env, schwelle);
      if (zeilen.length === 0) return `Kein Verlustverdacht (Schwelle ${schwelle} Tage).`;
      return zeilen.map((l) =>
        `${l.code} — ${l.bezeichnung} · ${l.standort}${l.standort_beendet ? ' (beendet)' : ''} · ` +
        `${l.tage} Tage · Inhalt: ${l.inhalt ?? 'nicht erfasst'} · ` +
        `zuletzt gebucht von ${l.zuletzt_von ?? 'unbekannt'}`,
      ).join('\n');
    },
  },
  {
    name: 'meldungen',
    readOnly: true,
    description: 'Schadens- und Zustandsmeldungen von der Baustelle. Standard: nur offene.',
    inputSchema: {
      type: 'object',
      properties: { alle: { type: 'boolean', description: 'Auch erledigte einbeziehen' } },
    },
    async ausfuehren(env, args) {
      const zeilen = await meldungen(env, !args.alle);
      if (zeilen.length === 0) return 'Keine Meldungen.';
      return zeilen.map((m) =>
        `${m.zeit.slice(0, 16)} · ${m.code} (${m.bezeichnung}) · ${meldungsArt(m.art)}` +
        `${m.text ? ` · "${m.text}"` : ''} · ${m.wer ?? 'unbekannt'}` +
        `${m.erledigt ? ' [erledigt]' : ''}`,
      ).join('\n');
    },
  },

  /* ------------------------------------------------------- schreibend --- */

  {
    name: 'buchung_anlegen',
    description:
      'Bucht eine Einheit auf einen anderen Standort — für Korrekturen aus dem Büro. ' +
      'Der Normalweg ist das Scannen vor Ort; dieses Werkzeug ist für Fälle, in denen ' +
      'das nachweislich nicht passiert ist. Steht die Einheit schon dort, passiert nichts.',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Einheiten- oder Tag-Code' },
        standort: { type: 'string', description: 'Zielstandort (Name oder ID)' },
        notiz: { type: 'string' },
      },
      required: ['code', 'standort'],
    },
    async ausfuehren(env, args) {
      const e = await einheitAufloesen(env, String(args.code));
      if (!e) return `Keine Einheit zu "${args.code}" gefunden.`;
      const id = await standortAufloesen(env, args.standort);
      if (id === null) return `Standort "${args.standort}" nicht gefunden.`;
      const erg = await buchen(env, {
        einheitId: e.id, nachStandortId: id, mitarbeiterId: null,
        quelle: 'mcp', notiz: args.notiz ?? 'Korrektur aus dem Büro',
      });
      if (erg?.unveraendert) return `${e.code} stand bereits dort — nichts geändert.`;
      const s = await standortLesen(env, id);
      return `${e.code} gebucht: ${e.standort_name} → ${s?.name}.`;
    },
  },
  {
    name: 'einheit_anlegen',
    description:
      'Legt eine neue Einheit an und erzeugt dazu einen Tag-Code. Der Code muss ' +
      'anschließend über /buero/etiketten gedruckt und auf den Chip geschrieben werden. ' +
      'Typ "traeger" für Gitterbox/Stapel/Bündel, "einzelteil" für Treppenturm/Winde.',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Sprechender Code, z. B. "GB-047"' },
        bezeichnung: { type: 'string' },
        typ: { type: 'string', enum: ['traeger', 'einzelteil'] },
        standort: { type: 'string', description: 'Wo sie gerade steht' },
      },
      required: ['code', 'bezeichnung', 'standort'],
    },
    async ausfuehren(env, args) {
      const standortId = await standortAufloesen(env, args.standort);
      if (standortId === null) return `Standort "${args.standort}" nicht gefunden.`;
      const code = String(args.code).trim().toUpperCase();
      if (await einheitPerCode(env, code)) return `Code ${code} ist schon vergeben.`;
      const typ = args.typ === 'einzelteil' ? 'einzelteil' : 'traeger';
      const neu = await env.DB.prepare(
        `INSERT INTO einheit (code, typ, bezeichnung, standort_id) VALUES (?, ?, ?, ?)
         RETURNING id`,
      ).bind(code, typ, String(args.bezeichnung), standortId).first<{ id: number }>();
      const tag = await tagAnlegen(env, 'einheit', neu!.id);
      await env.DB.prepare(
        `INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id, quelle, notiz)
         VALUES (?, NULL, ?, 'mcp', 'Ersterfassung')`,
      ).bind(neu!.id, standortId).run();
      return `${code} angelegt. Tag-Code: ${tag} — Etikett drucken und den Chip damit beschreiben.`;
    },
  },
  {
    name: 'inhalt_setzen',
    description:
      'Setzt die Menge eines Artikels in einem Ladungsträger. Menge 0 entfernt die Zeile. ' +
      'Ersetzt die bisherige Menge, addiert nicht.',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Einheiten- oder Tag-Code' },
        artikel: { type: 'string', description: 'Artikelname (Teiltreffer genügt)' },
        menge: { type: 'number' },
      },
      required: ['code', 'artikel', 'menge'],
    },
    async ausfuehren(env, args) {
      const e = await einheitAufloesen(env, String(args.code));
      if (!e) return `Keine Einheit zu "${args.code}" gefunden.`;
      const a = await env.DB.prepare(
        `SELECT id, name FROM artikel WHERE aktiv = 1 AND (name = ?1 OR name LIKE ?2)
          ORDER BY LENGTH(name) LIMIT 1`,
      ).bind(String(args.artikel), `%${args.artikel}%`).first<{ id: number; name: string }>();
      if (!a) return `Artikel "${args.artikel}" nicht gefunden.`;
      const menge = Number(args.menge);
      if (menge <= 0) {
        await env.DB.prepare(`DELETE FROM inhalt WHERE einheit_id = ? AND artikel_id = ?`)
          .bind(e.id, a.id).run();
        return `${a.name} aus ${e.code} entfernt.`;
      }
      await env.DB.prepare(
        `INSERT INTO inhalt (einheit_id, artikel_id, menge) VALUES (?, ?, ?)
         ON CONFLICT (einheit_id, artikel_id) DO UPDATE SET menge = excluded.menge`,
      ).bind(e.id, a.id, menge).run();
      return `${e.code}: ${menge}× ${a.name}.`;
    },
  },
  {
    name: 'standort_anlegen',
    description:
      'Legt eine Baustelle oder ein Lager an und erzeugt einen Standort-Tag. Wird der ' +
      'geklebt und angetippt, geht danach jede Einheit mit einem einzigen Tap dorthin. ' +
      'Koordinaten sorgen dafür, dass die Baustelle in der Auswahl nach oben rutscht.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        adresse: { type: 'string' },
        typ: { type: 'string', enum: ['baustelle', 'lager'] },
        lat: { type: 'number' },
        lon: { type: 'number' },
      },
      required: ['name'],
    },
    async ausfuehren(env, args) {
      const typ = args.typ === 'lager' ? 'lager' : 'baustelle';
      const neu = await env.DB.prepare(
        `INSERT INTO standort (name, typ, adresse, lat, lon) VALUES (?, ?, ?, ?, ?)
         RETURNING id`,
      ).bind(
        String(args.name), typ, args.adresse ?? null,
        typeof args.lat === 'number' ? args.lat : null,
        typeof args.lon === 'number' ? args.lon : null,
      ).first<{ id: number }>();
      const tag = await tagAnlegen(env, 'standort', neu!.id);
      return `${args.name} angelegt (${typ}). Standort-Tag: ${tag}.`;
    },
  },
  {
    name: 'standort_beenden',
    description:
      'Schließt eine Baustelle ab. Material, das danach noch dort steht, taucht sofort ' +
      'in "ueberfaellig" und "verlust" auf — das ist der teure Fall, weil dort niemand ' +
      'mehr aufräumt.',
    inputSchema: {
      type: 'object',
      properties: { standort: { type: 'string' } },
      required: ['standort'],
    },
    async ausfuehren(env, args) {
      const id = await standortAufloesen(env, args.standort);
      if (id === null) return `Standort "${args.standort}" nicht gefunden.`;
      await env.DB.prepare(
        `UPDATE standort SET aktiv = 0, beendet_am = datetime('now')
          WHERE id = ? AND typ = 'baustelle'`,
      ).bind(id).run();
      const rest = await einheitenAmStandort(env, id);
      const s = await standortLesen(env, id);
      return rest.length === 0
        ? `${s?.name} beendet. Kein Material mehr vor Ort.`
        : `${s?.name} beendet. ACHTUNG: ${rest.length} Einheiten stehen noch dort:\n` +
          rest.map((e) => `  ${e.code} — ${e.bezeichnung}`).join('\n');
    },
  },
  {
    name: 'tag_zuordnen',
    description:
      'Erzeugt einen Ersatz-Tag für eine bestehende Einheit — für abgerissene oder ' +
      'defekte Chips. Der alte Tag bleibt gültig, sofern er noch lesbar ist; die ' +
      'Historie der Einheit bleibt in jedem Fall erhalten.',
    inputSchema: {
      type: 'object',
      properties: { code: { type: 'string', description: 'Einheiten- oder alter Tag-Code' } },
      required: ['code'],
    },
    async ausfuehren(env, args) {
      const e = await einheitAufloesen(env, String(args.code));
      if (!e) return `Keine Einheit zu "${args.code}" gefunden.`;
      const tag = await tagAnlegen(env, 'einheit', e.id);
      return `Neuer Tag-Code für ${e.code}: ${tag}. Etikett drucken, Chip beschreiben, schreibschützen.`;
    },
  },
  {
    name: 'inventur_start',
    description:
      'Startet einen Inventurlauf für einen Standort. Danach zählt jeder Scan vor Ort als ' +
      '"gefunden"; Einheiten, die laut System woanders stehen, werden automatisch hierher ' +
      'gebucht. Was am Ende offen bleibt, ist die Fehlliste.',
    inputSchema: {
      type: 'object',
      properties: { standort: { type: 'string' } },
      required: ['standort'],
    },
    async ausfuehren(env, args) {
      const id = await standortAufloesen(env, args.standort);
      if (id === null) return `Standort "${args.standort}" nicht gefunden.`;
      const inv = await inventurStarten(env, id, null);
      return `Inventur ${inv.id} für ${inv.standort} läuft. Soll: ${inv.soll_anzahl} Einheiten.`;
    },
  },
  {
    name: 'inventur_stand',
    readOnly: true,
    description: 'Zeigt Fortschritt und Fehlliste eines Inventurlaufs.',
    inputSchema: {
      type: 'object',
      properties: { inventur_id: { type: 'number' } },
      required: ['inventur_id'],
    },
    async ausfuehren(env, args) {
      const stand = await inventurStand(env, Number(args.inventur_id));
      if (!stand) return 'Inventur nicht gefunden.';
      const { inventur: i, gefunden, fehlend } = stand;
      const woanders = gefunden.filter((g) => g.war_woanders);
      return [
        `Inventur ${i.id} · ${i.standort} · ${i.beendet_am ? 'abgeschlossen' : 'läuft'}`,
        `${gefunden.length} von ${i.soll_anzahl ?? gefunden.length + fehlend.length} gefunden, ${fehlend.length} fehlen`,
        woanders.length ? `Hier gefunden, im System woanders (${woanders.length}):\n` +
          woanders.map((g) => `  ${g.code} — ${g.bezeichnung}`).join('\n') : '',
        fehlend.length ? `Fehlt:\n` + fehlend.map((f) => `  ${f.code} — ${f.bezeichnung}`).join('\n') : '',
      ].filter(Boolean).join('\n');
    },
  },
  {
    name: 'inventur_abschluss',
    description: 'Schließt einen Inventurlauf ab und liefert das Ergebnis samt Fehlliste.',
    inputSchema: {
      type: 'object',
      properties: { inventur_id: { type: 'number' }, notiz: { type: 'string' } },
      required: ['inventur_id'],
    },
    async ausfuehren(env, args) {
      const stand = await inventurAbschliessen(env, Number(args.inventur_id), args.notiz);
      if (!stand) return 'Inventur nicht gefunden.';
      const { inventur: i, gefunden, fehlend } = stand;
      return [
        `Inventur ${i.id} · ${i.standort} abgeschlossen.`,
        `Soll ${i.soll_anzahl}, Ist ${gefunden.length}, Differenz ${fehlend.length}.`,
        fehlend.length ? `Fehlt:\n` + fehlend.map((f) => `  ${f.code} — ${f.bezeichnung}`).join('\n')
          : 'Alles gefunden.',
      ].join('\n');
    },
  },
];

/* ------------------------------------------------------------- Helfer --- */

async function standortAufloesen(env: Env, wert: unknown): Promise<number | null> {
  if (wert === undefined || wert === null || wert === '') return null;
  const alsZahl = Number(wert);
  if (Number.isInteger(alsZahl) && alsZahl > 0) {
    return (await standortLesen(env, alsZahl)) ? alsZahl : null;
  }
  const alle = await standorteAktiv(env);
  const text = String(wert).toLowerCase();
  const genau = alle.find((s) => s.name.toLowerCase() === text);
  if (genau) return genau.id;
  const teilweise = alle.find((s) => s.name.toLowerCase().includes(text));
  return teilweise?.id ?? null;
}

async function einheitAufloesen(env: Env, code: string) {
  const direkt = await einheitPerCode(env, code);
  if (direkt) return direkt;
  const tag = await env.DB.prepare(
    `SELECT ziel_id FROM tag WHERE code = ? AND ziel_typ = 'einheit' AND aktiv = 1`,
  ).bind(code.toUpperCase()).first<{ ziel_id: number }>();
  return tag ? einheitLesen(env, tag.ziel_id) : null;
}

/* --------------------------------------------------------- Katalog --- */

export function werkzeugliste() {
  return WERKZEUGE.map(({ name, description, inputSchema, readOnly }) => ({
    name,
    description,
    inputSchema,
    annotations: { readOnlyHint: Boolean(readOnly) },
  }));
}

/**
 * Öffentlicher Katalog für den MCP-Hub.
 *
 * Der Hub holt die Tool-Liste ohne Anmeldung — über /mcp ginge das nicht, das
 * verlangt den Bearer-Token. Beschreibungen der Werkzeuge sind ohnehin nichts
 * Vertrauliches; die Daten dahinter bleiben geschützt.
 */
export function toolsJson(): Response {
  return Response.json(
    { server: { name: 'nfclager', version: VERSION }, tools: werkzeugliste() },
    { headers: { 'Cache-Control': 'public, max-age=300', 'Access-Control-Allow-Origin': '*' } },
  );
}

/* -------------------------------------------------------- JSON-RPC --- */

function ergebnis(id: unknown, result: unknown) {
  return { jsonrpc: '2.0', id, result };
}
function fehler(id: unknown, code: number, message: string) {
  return { jsonrpc: '2.0', id, error: { code, message } };
}

export async function mcpBehandeln(req: Request, env: Env): Promise<Response> {
  if (!env.MCP_TOKEN) {
    return Response.json({ error: 'MCP_TOKEN nicht gesetzt' }, { status: 503 });
  }
  const kopf = req.headers.get('Authorization') ?? '';
  const token = kopf.startsWith('Bearer ') ? kopf.slice(7) : '';
  if (!gleichSicher(token, env.MCP_TOKEN)) {
    return Response.json({ error: 'Nicht autorisiert' }, {
      status: 401,
      headers: { 'WWW-Authenticate': 'Bearer' },
    });
  }

  let anfrage: any;
  try {
    anfrage = await req.json();
  } catch {
    return Response.json(fehler(null, -32700, 'Ungültiges JSON'), { status: 400 });
  }

  // Benachrichtigungen (ohne id) werden quittiert, aber nicht beantwortet.
  if (anfrage.id === undefined || anfrage.id === null) {
    return new Response(null, { status: 202 });
  }

  const { id, method, params } = anfrage;
  try {
    switch (method) {
      case 'initialize':
        return Response.json(ergebnis(id, {
          protocolVersion: PROTOKOLL,
          capabilities: { tools: {} },
          serverInfo: { name: 'nfclager', version: VERSION },
          instructions:
            'Lagerverwaltung J. Werner Gerüstbau.\n\n' +
            'Getaggt sind Ladungsträger (Gitterboxen, Stapel, Bündel) mit gezähltem Inhalt ' +
            'sowie Großteile wie Treppentürme. Mengen sind deshalb kistengenau, nicht ' +
            'stückgenau — bei Zahlen dazusagen, dass sie aus dem erfassten Trägerinhalt ' +
            'stammen und beim letzten Packen gezählt wurden.\n\n' +
            'Wegweiser: "bestand" für Bestandsfragen, "ueberfaellig" für Räumung und ' +
            'Materialverlust, "vorhaltung" für Abrechnungsfragen zur Mietdauer, ' +
            '"baustelle_bestand" für eine einzelne Baustelle.\n\n' +
            'Der normale Weg einer Buchung ist das Scannen vor Ort. "buchung_anlegen" ist ' +
            'für Korrekturen gedacht, nicht für die tägliche Erfassung — wer damit ' +
            'Bewegungen nachträgt, die niemand gescannt hat, macht die Vorhaltezeiten ' +
            'wertlos. Vor schreibenden Aufrufen beim Menschen rückfragen.',
        }));

      case 'ping':
        return Response.json(ergebnis(id, {}));

      case 'tools/list':
        return Response.json(ergebnis(id, { tools: werkzeugliste() }));

      case 'tools/call': {
        const werkzeug = WERKZEUGE.find((w) => w.name === params?.name);
        if (!werkzeug) return Response.json(fehler(id, -32602, `Unbekanntes Werkzeug: ${params?.name}`));
        try {
          const text = await werkzeug.ausfuehren(env, params.arguments ?? {});
          return Response.json(ergebnis(id, { content: [{ type: 'text', text }] }));
        } catch (e) {
          return Response.json(ergebnis(id, {
            content: [{ type: 'text', text: `Fehler: ${(e as Error).message}` }],
            isError: true,
          }));
        }
      }

      default:
        return Response.json(fehler(id, -32601, `Unbekannte Methode: ${method}`));
    }
  } catch (e) {
    return Response.json(fehler(id, -32603, (e as Error).message), { status: 500 });
  }
}
