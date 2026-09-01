import {
  bestand, einheitLesen, einheitPerCode, einheitenAmStandort, historie,
  inhaltLesen, standortLesen, standorteAktiv, suche, ueberfaellig,
} from './db';
import { formatMenge } from './views/scan';
import { seitText, tageSeit } from './geo';
import { gleichSicher } from './auth';
import type { Env } from './types';

const VERSION = '0.1.0';
const PROTOKOLL = '2024-11-05';

interface Werkzeug {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  ausfuehren: (env: Env, args: Record<string, any>) => Promise<string>;
}

const WERKZEUGE: Werkzeug[] = [
  {
    name: 'bestand',
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
            'Lagerverwaltung J. Werner Gerüstbau. Getaggt sind Ladungsträger ' +
            '(Gitterboxen, Stapel) mit gezähltem Inhalt sowie Großteile wie Treppentürme. ' +
            'Mengen sind daher kistengenau, nicht stückgenau — bei Zahlen dazusagen, dass ' +
            'sie aus dem erfassten Trägerinhalt stammen. Für Bestandsfragen "bestand", ' +
            'für Verlust- und Räumungsfragen "ueberfaellig", für Vorhaltefragen ' +
            '"baustelle_bestand". Dieser Server ist lesend; Buchungen entstehen durch ' +
            'Scannen vor Ort.',
        }));

      case 'ping':
        return Response.json(ergebnis(id, {}));

      case 'tools/list':
        return Response.json(ergebnis(id, {
          tools: WERKZEUGE.map(({ name, description, inputSchema }) =>
            ({ name, description, inputSchema })),
        }));

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
