import { Hono } from 'hono';
import {
  COOKIE_BUERO, COOKIE_MITARBEITER, angemeldeterMitarbeiter, cookieLoeschen,
  cookieSetzen, gleichSicher, istBuero, sitzungBeenden, sitzungLesen, sitzungSetzen,
} from './auth';
import {
  artikelAlle, bestand, buchen, einheitLesen, einheitPerCode, hauptlager, historie,
  inhaltLesen, standortLesen, standorteAktiv, stornieren, tagLesen, ueberfaellig,
} from './db';
import {
  einladungscodeErzeugen, geraetetokenErzeugen, kanonisch, sha256,
  tagCodeErzeugen, tagCodeNormalisieren,
} from './codes';
import { entfernungKm } from './geo';
import { mcpBehandeln } from './mcp';
import { esc, html, kopf, seite } from './views/layout';
import {
  aktionenFuer, einheitSeite, fremdSeite, sitzungsBanner, unbekannterTag, wohinSeite,
} from './views/scan';
import { stationSeite } from './views/station';
import { druckbogen, type DruckEtikett } from './views/druck';
import * as B from './views/buero';
import type { Env, EinheitMitStandort, Standort } from './types';

const app = new Hono<{ Bindings: Env }>();

const basisUrl = (req: Request) => new URL(req.url).origin;

/* =============================================================== Scan === */

app.get('/', async (c) => {
  const ma = await angemeldeterMitarbeiter(c.req.raw, c.env);
  if (!ma) {
    if (await istBuero(c.req.raw, c.env)) return c.redirect('/buero');
    return html(seite(`
<div class="karte">
  <h1>${esc(c.env.FIRMA)}</h1>
  <p>Lagerverwaltung. Zum Buchen einen Tag ans Handy halten.</p>
</div>
<p class="hinweis">Dieses Handy ist noch nicht eingerichtet. Der Einladungslink kommt
  vom Büro — einmal antippen genügt.</p>
<a class="knopf knopf-still" href="/buero">Büro</a>`,
      { titel: c.env.FIRMA, kopf: kopf('Lager') }));
  }

  const sitzung = await sitzungLesen(c.env, ma.id);
  const lager = await hauptlager(c.env);
  return html(seite(`
<h1>Hallo ${esc(ma.name)}</h1>
<p style="color:#5a6472;margin-bottom:20px">Tag ans Handy halten, um zu buchen.</p>
<form method="get" action="/t">
  <div class="feld"><label for="code">Oder Code vom Aufkleber eintippen</label>
    <input type="text" id="code" name="code" autocapitalize="characters"
      autocomplete="off" placeholder="z. B. K7F2QX"></div>
  <button class="knopf knopf-lager" type="submit">Öffnen</button>
</form>
<a class="knopf knopf-zweit" href="/scan">Scan-Station (Android)</a>
${lager ? `<p class="fuss">Hauptlager: ${esc(lager.name)}</p>` : ''}`,
    { titel: 'Lager', kopf: kopf('Lager'), banner: sitzungsBanner(sitzung) }));
});

app.get('/t', (c) => {
  const code = kanonisch(c.req.query('code') ?? '');
  return code ? c.redirect(`/t/${code}`) : c.redirect('/');
});

app.get('/t/:code', async (c) => {
  const roh = c.req.param('code');
  const ziel = await zielFuerCode(c.env, roh);
  if (!ziel) return unbekannterTag(kanonisch(roh));
  const code = ziel.code;

  const ma = await angemeldeterMitarbeiter(c.req.raw, c.env);

  // Standort-Tag: setzt die Baustellen-Sitzung. Ab hier ist jede Einheit ein Tap.
  if (ziel.art === 'standort') {
    if (!ma) return c.redirect('/');
    await sitzungSetzen(c.env, ma.id, ziel.standort.id, ziel.standort.name);
    return html(seite(`
<div class="erfolg"><strong>Du bist auf ${esc(ziel.standort.name)}.</strong><br>
  Die nächsten 4 Stunden geht jede Einheit mit einem Tap hierher.</div>
<p>Jetzt die Einheiten antippen.</p>
<a class="knopf knopf-still" href="/">Übersicht</a>`, {
      titel: ziel.standort.name,
      kopf: kopf('Lager'),
      banner: sitzungsBanner(await sitzungLesen(c.env, ma.id)),
    }));
  }

  const e = ziel.einheit;
  if (!ma) return fremdSeite(e, c.env.FIRMA, c.env.FIRMA_TELEFON);

  const [inhalt, sitzung, lager] = await Promise.all([
    inhaltLesen(c.env, e.id),
    sitzungLesen(c.env, ma.id),
    hauptlager(c.env),
  ]);

  const okId = Number(c.req.query('ok') ?? 0);
  const meldung = okId
    ? { art: 'erfolg' as const, text: `Gebucht: ${e.standort_name}` }
    : c.req.query('schon')
      ? { art: 'hinweis' as const, text: 'Stand schon dort — nichts geändert.' }
      : c.req.query('storniert')
        ? { art: 'hinweis' as const, text: 'Buchung zurückgenommen.' }
        : c.req.query('fehler')
          ? { art: 'fehler' as const, text: String(c.req.query('fehler')) }
          : undefined;

  return einheitSeite({
    einheit: e,
    inhalt,
    aktionen: aktionenFuer(e, sitzung, lager),
    sitzung,
    meldung,
    stornoId: okId || undefined,
  });
});

app.get('/t/:code/wohin', async (c) => {
  const ziel = await zielFuerCode(c.env, c.req.param('code'));
  if (!ziel || ziel.art !== 'einheit') return unbekannterTag(kanonisch(c.req.param('code')));
  const code = ziel.code;
  const ma = await angemeldeterMitarbeiter(c.req.raw, c.env);
  if (!ma) return c.redirect(`/t/${code}`);

  const lat = Number(c.req.query('lat'));
  const lon = Number(c.req.query('lon'));
  const hatPosition = Number.isFinite(lat) && Number.isFinite(lon);

  const alle = await standorteAktiv(c.env);
  const ohneAktuellen = alle.filter((s) => s.id !== ziel.einheit.standort_id);
  const mitEntfernung = ohneAktuellen.map((s) => ({
    ...s,
    entfernungKm: hatPosition && s.lat !== null && s.lon !== null
      ? entfernungKm(lat, lon, s.lat, s.lon) : undefined,
  }));

  // Lager zuerst, dann nach Naehe — die Baustelle, auf der man steht, landet oben.
  mitEntfernung.sort((a, b) => {
    if (a.typ !== b.typ) return a.typ === 'lager' ? -1 : 1;
    if (a.entfernungKm !== undefined && b.entfernungKm !== undefined) {
      return a.entfernungKm - b.entfernungKm;
    }
    if (a.entfernungKm !== undefined) return -1;
    if (b.entfernungKm !== undefined) return 1;
    return a.name.localeCompare(b.name, 'de');
  });

  return wohinSeite({
    code,
    bezeichnung: ziel.einheit.bezeichnung,
    standorte: mitEntfernung,
    sitzung: await sitzungLesen(c.env, ma.id),
    hatPosition,
  });
});

/* ================================================================ API === */

app.post('/api/buchung', async (c) => {
  const willJson = (c.req.header('Accept') ?? '').includes('application/json');
  const daten = await eingabeLesen(c.req.raw);
  const code = kanonisch(String(daten.code ?? ''));
  const zielId = Number(daten.ziel);

  const antwortFehler = (text: string, status = 400) =>
    willJson
      ? c.json({ ok: false, fehler: text }, status as 400)
      : c.redirect(`/t/${code}?fehler=${encodeURIComponent(text)}`, 303);

  const ma = await angemeldeterMitarbeiter(c.req.raw, c.env);
  if (!ma) return antwortFehler('Handy nicht eingerichtet', 401);

  const ziel = await zielFuerCode(c.env, code);
  if (!ziel || ziel.art !== 'einheit') return antwortFehler('Unbekannter Tag', 404);
  if (!Number.isInteger(zielId) || !(await standortLesen(c.env, zielId))) {
    return antwortFehler('Unbekannter Standort', 400);
  }

  const ergebnis = await buchen(c.env, {
    einheitId: ziel.einheit.id,
    nachStandortId: zielId,
    mitarbeiterId: ma.id,
    quelle: daten.quelle === 'nfc' ? 'nfc' : 'qr',
    lat: zahlOderNull(daten.lat),
    lon: zahlOderNull(daten.lon),
  });
  if (!ergebnis) return antwortFehler('Einheit nicht gefunden', 404);

  await c.env.DB.prepare(
    `UPDATE mitarbeiter SET zuletzt_aktiv = datetime('now') WHERE id = ?`,
  ).bind(ma.id).run();

  if (willJson) {
    const nach = await standortLesen(c.env, zielId);
    return c.json({
      ok: true,
      unveraendert: ergebnis.unveraendert,
      bezeichnung: ziel.einheit.bezeichnung,
      standort: nach?.name ?? '',
      buchung_id: ergebnis.buchungId,
    });
  }
  return c.redirect(
    ergebnis.unveraendert ? `/t/${code}?schon=1` : `/t/${code}?ok=${ergebnis.buchungId}`,
    303,
  );
});

app.post('/api/storno', async (c) => {
  const daten = await eingabeLesen(c.req.raw);
  const code = kanonisch(String(daten.code ?? ''));
  const ma = await angemeldeterMitarbeiter(c.req.raw, c.env);
  if (!ma) return c.redirect('/');
  const erg = await stornieren(c.env, Number(daten.id));
  return c.redirect(
    erg.ok ? `/t/${code}?storniert=1` : `/t/${code}?fehler=${encodeURIComponent(erg.grund!)}`,
    303,
  );
});

/* ====================================================== Einrichtung === */

app.get('/einladung/:code', async (c) => {
  const einladung = c.req.param('code');
  const ma = await c.env.DB.prepare(
    `SELECT id, name FROM mitarbeiter WHERE einladung = ? AND aktiv = 1`,
  ).bind(einladung).first<{ id: number; name: string }>();

  if (!ma) {
    return html(seite(`
<div class="fehler"><strong>Link nicht gültig.</strong><br>
  Entweder schon benutzt oder abgelaufen. Bitte im Büro einen neuen anfordern.</div>`,
      { titel: 'Einladung', kopf: kopf('Lager') }), 410);
  }

  const token = geraetetokenErzeugen();
  await c.env.DB.prepare(
    `UPDATE mitarbeiter SET token_hash = ?, einladung = NULL WHERE id = ?`,
  ).bind(await sha256(token), ma.id).run();

  return html(seite(`
<div class="erfolg"><strong>Fertig, ${esc(ma.name)}.</strong><br>
  Dieses Handy ist jetzt eingerichtet. Kein Passwort, kein Login — einfach Tags antippen.</div>
<a class="knopf knopf-haupt" href="/">Los geht's</a>`,
    { titel: 'Eingerichtet', kopf: kopf('Lager') }),
    200, { 'Set-Cookie': cookieSetzen(COOKIE_MITARBEITER, token, 60 * 60 * 24 * 365 * 2) });
});

app.get('/sitzung/beenden', async (c) => {
  const ma = await angemeldeterMitarbeiter(c.req.raw, c.env);
  if (ma) await sitzungBeenden(c.env, ma.id);
  return c.redirect('/');
});

app.get('/scan', async (c) => {
  const ma = await angemeldeterMitarbeiter(c.req.raw, c.env);
  if (!ma) return c.redirect('/');
  const sitzung = await sitzungLesen(c.env, ma.id);
  const lager = await hauptlager(c.env);
  return stationSeite(await standorteAktiv(c.env), sitzung?.standortId ?? lager?.id ?? null);
});

/* ================================================================ MCP === */

app.post('/mcp', (c) => mcpBehandeln(c.req.raw, c.env));
app.get('/mcp', () => new Response('MCP-Endpunkt. Bitte POST mit JSON-RPC.', { status: 405 }));

/* =============================================================== Büro === */

app.use('/buero/*', async (c, next) => {
  if (c.req.path === '/buero/anmelden') return next();
  if (await istBuero(c.req.raw, c.env)) return next();
  return B.anmeldung();
});

app.get('/buero', async (c) => {
  if (!(await istBuero(c.req.raw, c.env))) return B.anmeldung();
  const zahlen = await c.env.DB.prepare(
    `SELECT COUNT(*) AS gesamt,
            SUM(CASE WHEN s.typ = 'lager' THEN 1 ELSE 0 END) AS im_lager,
            SUM(CASE WHEN s.typ = 'baustelle' THEN 1 ELSE 0 END) AS auf_baustellen
       FROM einheit e JOIN standort s ON s.id = e.standort_id WHERE e.aktiv = 1`,
  ).first<{ gesamt: number; im_lager: number; auf_baustellen: number }>();
  const standorte = await standorteAktiv(c.env);
  return B.uebersicht({
    einheiten: zahlen?.gesamt ?? 0,
    imLager: zahlen?.im_lager ?? 0,
    aufBaustellen: zahlen?.auf_baustellen ?? 0,
    ueberfaellig: await ueberfaellig(c.env),
    standorte: standorte.length,
  });
});

app.post('/buero/anmelden', async (c) => {
  const daten = await eingabeLesen(c.req.raw);
  const passwort = String(daten.passwort ?? '');
  if (!c.env.ADMIN_PASSWORT) return B.anmeldung('ADMIN_PASSWORT ist nicht gesetzt.');
  if (!gleichSicher(passwort, c.env.ADMIN_PASSWORT)) return B.anmeldung('Falsches Passwort.');
  return new Response(null, {
    status: 303,
    headers: {
      Location: '/buero',
      'Set-Cookie': cookieSetzen(COOKIE_BUERO, await sha256(passwort), 60 * 60 * 12),
    },
  });
});

app.get('/buero/abmelden', () =>
  new Response(null, {
    status: 303,
    headers: { Location: '/', 'Set-Cookie': cookieLoeschen(COOKIE_BUERO) },
  }));

app.get('/buero/bestand', async (c) => {
  const q = c.req.query('q') ?? '';
  return B.bestandSeite(await bestand(c.env, { artikelSuche: q || undefined }), q);
});

app.get('/buero/einheiten', async (c) => {
  const q = c.req.query('q') ?? '';
  const muster = `%${q}%`;
  const { results } = await c.env.DB.prepare(
    `SELECT e.*, s.name AS standort_name, s.typ AS standort_typ
       FROM einheit e JOIN standort s ON s.id = e.standort_id
      WHERE e.aktiv = 1 AND (?1 = '' OR e.code LIKE ?2 OR e.bezeichnung LIKE ?2)
      ORDER BY e.code LIMIT 300`,
  ).bind(q, muster).all<EinheitMitStandort>();
  return B.einheitenSeite(results, await standorteAktiv(c.env), q);
});

app.post('/buero/einheiten', async (c) => {
  const d = await eingabeLesen(c.req.raw);
  const code = String(d.code ?? '').trim();
  const bezeichnung = String(d.bezeichnung ?? '').trim();
  const typ = d.typ === 'einzelteil' ? 'einzelteil' : 'traeger';
  const standortId = Number(d.standort_id);
  if (!code || !bezeichnung || !Number.isInteger(standortId)) return c.redirect('/buero/einheiten');

  const neu = await c.env.DB.prepare(
    `INSERT INTO einheit (code, typ, bezeichnung, standort_id) VALUES (?, ?, ?, ?)
     RETURNING id`,
  ).bind(code, typ, bezeichnung, standortId).first<{ id: number }>();
  if (!neu) return c.redirect('/buero/einheiten');

  await tagAnlegen(c.env, 'einheit', neu.id);
  await c.env.DB.prepare(
    `INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id, quelle, notiz)
     VALUES (?, NULL, ?, 'manuell', 'Ersterfassung')`,
  ).bind(neu.id, standortId).run();
  return c.redirect(`/buero/einheit/${neu.id}`, 303);
});

app.get('/buero/einheit/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const e = await einheitLesen(c.env, id);
  if (!e) return c.notFound();
  const { results: tags } = await c.env.DB.prepare(
    `SELECT code FROM tag WHERE ziel_typ = 'einheit' AND ziel_id = ? AND aktiv = 1`,
  ).bind(id).all<{ code: string }>();
  return B.einheitDetail({
    einheit: e,
    inhalt: await inhaltLesen(c.env, id),
    historie: await historie(c.env, id),
    artikel: await artikelAlle(c.env),
    tagCodes: tags.map((t) => t.code),
    basisUrl: basisUrl(c.req.raw),
  });
});

app.post('/buero/einheit/:id/inhalt', async (c) => {
  const id = Number(c.req.param('id'));
  const d = await eingabeLesen(c.req.raw);
  const artikelId = Number(d.artikel_id);
  const menge = Number(d.menge);
  if (!Number.isInteger(artikelId)) return c.redirect(`/buero/einheit/${id}`, 303);

  if (!Number.isFinite(menge) || menge <= 0) {
    await c.env.DB.prepare(`DELETE FROM inhalt WHERE einheit_id = ? AND artikel_id = ?`)
      .bind(id, artikelId).run();
  } else {
    await c.env.DB.prepare(
      `INSERT INTO inhalt (einheit_id, artikel_id, menge) VALUES (?, ?, ?)
       ON CONFLICT (einheit_id, artikel_id) DO UPDATE SET menge = excluded.menge`,
    ).bind(id, artikelId, menge).run();
  }
  return c.redirect(`/buero/einheit/${id}`, 303);
});

app.post('/buero/einheit/:id/tag', async (c) => {
  const id = Number(c.req.param('id'));
  await tagAnlegen(c.env, 'einheit', id);
  return c.redirect(`/buero/einheit/${id}`, 303);
});

app.get('/buero/standorte', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM standort ORDER BY aktiv DESC, typ, name`,
  ).all<Standort>();
  return B.standorteSeite(results);
});

app.post('/buero/standorte', async (c) => {
  const d = await eingabeLesen(c.req.raw);
  const name = String(d.name ?? '').trim();
  if (!name) return c.redirect('/buero/standorte', 303);
  const typ = d.typ === 'lager' ? 'lager' : 'baustelle';
  const neu = await c.env.DB.prepare(
    `INSERT INTO standort (name, typ, adresse, lat, lon) VALUES (?, ?, ?, ?, ?)
     RETURNING id`,
  ).bind(
    name, typ, String(d.adresse ?? '').trim() || null,
    zahlOderNull(d.lat), zahlOderNull(d.lon),
  ).first<{ id: number }>();
  if (neu) await tagAnlegen(c.env, 'standort', neu.id);
  return c.redirect('/buero/standorte', 303);
});

app.post('/buero/standorte/:id/beenden', async (c) => {
  await c.env.DB.prepare(
    `UPDATE standort SET aktiv = 0, beendet_am = datetime('now') WHERE id = ? AND typ = 'baustelle'`,
  ).bind(Number(c.req.param('id'))).run();
  return c.redirect('/buero/standorte', 303);
});

app.get('/buero/mitarbeiter', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT id, name, rolle, aktiv, einladung, token_hash, zuletzt_aktiv
       FROM mitarbeiter ORDER BY aktiv DESC, name`,
  ).all<any>();
  return B.mitarbeiterSeite(results, basisUrl(c.req.raw));
});

app.post('/buero/mitarbeiter', async (c) => {
  const d = await eingabeLesen(c.req.raw);
  const name = String(d.name ?? '').trim();
  if (name) {
    await c.env.DB.prepare(
      `INSERT INTO mitarbeiter (name, einladung) VALUES (?, ?)`,
    ).bind(name, einladungscodeErzeugen()).run();
  }
  return c.redirect('/buero/mitarbeiter', 303);
});

app.post('/buero/mitarbeiter/:id/umschalten', async (c) => {
  await c.env.DB.prepare(
    `UPDATE mitarbeiter SET aktiv = 1 - aktiv WHERE id = ?`,
  ).bind(Number(c.req.param('id'))).run();
  return c.redirect('/buero/mitarbeiter', 303);
});

app.get('/buero/etiketten', async (c) => {
  const basis = basisUrl(c.req.raw);
  const einheitId = c.req.query('einheit');
  const standortId = c.req.query('standort');

  let zeilen: Array<{ code: string; bezeichnung: string }>;
  if (einheitId) {
    const { results } = await c.env.DB.prepare(
      `SELECT t.code, e.code || ' · ' || e.bezeichnung AS bezeichnung
         FROM tag t JOIN einheit e ON e.id = t.ziel_id
        WHERE t.ziel_typ = 'einheit' AND t.ziel_id = ? AND t.aktiv = 1`,
    ).bind(Number(einheitId)).all<{ code: string; bezeichnung: string }>();
    zeilen = results;
  } else if (standortId) {
    const { results } = await c.env.DB.prepare(
      `SELECT t.code, 'Standort ' || s.name AS bezeichnung
         FROM tag t JOIN standort s ON s.id = t.ziel_id
        WHERE t.ziel_typ = 'standort' AND t.ziel_id = ? AND t.aktiv = 1`,
    ).bind(Number(standortId)).all<{ code: string; bezeichnung: string }>();
    zeilen = results;
  } else {
    const { results } = await c.env.DB.prepare(
      `SELECT t.code, e.code || ' · ' || e.bezeichnung AS bezeichnung
         FROM tag t JOIN einheit e ON e.id = t.ziel_id
        WHERE t.ziel_typ = 'einheit' AND t.aktiv = 1 AND e.aktiv = 1
        ORDER BY e.code LIMIT 500`,
    ).all<{ code: string; bezeichnung: string }>();
    zeilen = results;
  }

  const etiketten: DruckEtikett[] = zeilen.map((z) => ({
    code: z.code,
    bezeichnung: z.bezeichnung,
    url: `${basis}/t/${z.code}`,
  }));
  return html(druckbogen(etiketten, c.env.FIRMA));
});

/* ============================================================= Helfer === */

type Ziel =
  | { art: 'einheit'; einheit: EinheitMitStandort; code: string }
  | { art: 'standort'; standort: Standort; code: string };

/**
 * Loest eine Eingabe auf — Tag-Code vom Aufkleber, sprechender Einheitencode
 * oder abgetippte Variante mit Vertipper.
 *
 * Der Tag wird ohne Formpruefung nachgeschlagen: welche Codes gueltig sind,
 * entscheidet die Datenbank, nicht das Alphabet im Code-Generator. Sonst
 * wuerden bereits geklebte Tags unlesbar, sobald sich der Generator aendert.
 */
async function zielFuerCode(env: Env, roh: string): Promise<Ziel | null> {
  const grund = kanonisch(roh);
  const vertippt = tagCodeNormalisieren(roh);
  const varianten = grund === vertippt ? [grund] : [grund, vertippt];

  for (const code of varianten) {
    if (!code) continue;
    const tag = await tagLesen(env, code);
    if (tag?.ziel_typ === 'einheit') {
      const e = await einheitLesen(env, tag.ziel_id);
      if (e) return { art: 'einheit', einheit: e, code };
    }
    if (tag?.ziel_typ === 'standort') {
      const s = await standortLesen(env, tag.ziel_id);
      if (s) return { art: 'standort', standort: s, code };
    }
    const e = await einheitPerCode(env, code);
    if (e) return { art: 'einheit', einheit: e, code };
  }
  return null;
}

async function tagAnlegen(
  env: Env, zielTyp: 'einheit' | 'standort', zielId: number,
): Promise<string> {
  // Kollisionen sind bei 27^6 unwahrscheinlich, aber ein Duplikat waere ein
  // stiller Datenfehler — deshalb wird bis zum Erfolg neu gewuerfelt.
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

async function eingabeLesen(req: Request): Promise<Record<string, any>> {
  const typ = req.headers.get('Content-Type') ?? '';
  if (typ.includes('application/json')) {
    try { return (await req.json()) as Record<string, any>; } catch { return {}; }
  }
  const form = await req.formData();
  return Object.fromEntries(form.entries());
}

function zahlOderNull(wert: unknown): number | null {
  if (wert === undefined || wert === null || wert === '') return null;
  const n = Number(String(wert).replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

app.notFound((c) => html(seite(
  `<div class="fehler">Seite nicht gefunden.</div><a class="knopf knopf-still" href="/">Übersicht</a>`,
  { titel: 'Nicht gefunden', kopf: kopf('Lager') }), 404));

export default app;
