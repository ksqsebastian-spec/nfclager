import { Hono } from 'hono';
import {
  COOKIE_BUERO, COOKIE_MITARBEITER, angemeldeterMitarbeiter, cookieLoeschen,
  cookieSetzen, gleichSicher, istBuero, sitzungBeenden, sitzungLesen, sitzungSetzen,
} from './auth';
import {
  artikelAlle, bestand, buchen, einheitLesen, einheitPerCode, hauptlager, historie,
  inhaltLesen, inventurAbschliessen, inventurOffen, inventurStand, inventurStarten,
  inventurTreffer, meldungAnlegen, meldungen, standortLesen, standorteAktiv,
  stornieren, tagAnlegen, tagLesen, ueberfaellig, verlust, vorhaltung,
} from './db';
import {
  einladungscodeErzeugen, geraetetokenErzeugen, kanonisch, sha256,
  tagCodeNormalisieren,
} from './codes';
import { entfernungKm } from './geo';
import { mcpBehandeln, toolsJson } from './mcp';
import { esc, html, kopf, notiz, seite } from './views/layout';
import {
  aktionenFuer, einheitSeite, fremdSeite, inventurAktion, meldenSeite, sitzungsBanner,
  unbekannterTag, wohinSeite,
} from './views/scan';
import { inventurAuswahl, inventurSeite } from './views/inventur';
import { APP_JS, SW_JS, offlineSeite } from './views/offline';
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
<article class="tafel tafel-akzent">
  <h1>${esc(c.env.FIRMA)}</h1>
  <p class="gedaempft" style="margin-top:6px">Lagerverwaltung</p>
</article>
${notiz('hinweis', 'Dieses Handy ist noch nicht eingerichtet',
        ' Der Einladungslink kommt vom Büro — einmal antippen genügt.')}
<a class="knopf knopf-still" href="/buero">Büro</a>`,
      { titel: c.env.FIRMA, kopf: kopf() }));
  }

  const sitzung = await sitzungLesen(c.env, ma.id);
  const lager = await hauptlager(c.env);
  return html(seite(`
<h1>Hallo ${esc(ma.name)}</h1>
<p class="gedaempft">Tag ans Handy halten, um zu buchen.</p>
<form method="get" action="/t">
  <div class="tafel">
    <div class="feld" style="margin-bottom:0">
      <label for="code">Oder Code vom Aufkleber eintippen</label>
      <input type="text" id="code" name="code" autocapitalize="characters"
        autocomplete="off" placeholder="z. B. K7F2QX"></div>
  </div>
  <button class="knopf knopf-lager" type="submit">Öffnen</button>
</form>
<a class="knopf knopf-zweit" href="/inventur">Inventur</a>
<a class="knopf knopf-still" href="/scan">Scan-Station (nur Android)</a>
<p class="fussnote" id="wgl-wartestand" hidden></p>
${lager ? `<p class="fussnote">Hauptlager: ${esc(lager.name)}</p>` : ''}`,
    { titel: 'Lager', kopf: kopf(), banner: sitzungsBanner(sitzung),
      scripte: '<script src="/app.js"></script>' }));
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
${notiz('erfolg', `Du bist auf ${ziel.standort.name}`,
      ' Die nächsten 4 Stunden geht jede Einheit mit einem Tap hierher.')}
<p class="gedaempft">Jetzt die Einheiten antippen.</p>
<a class="knopf knopf-still" href="/">Übersicht</a>`, {
      titel: ziel.standort.name,
      kopf: kopf(),
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
      : c.req.query('gemeldet')
        ? { art: 'erfolg' as const, text: 'Meldung ist im Büro angekommen.' }
      : c.req.query('storniert')
        ? { art: 'hinweis' as const, text: 'Buchung zurückgenommen.' }
        : c.req.query('fehler')
          ? { art: 'fehler' as const, text: String(c.req.query('fehler')) }
          : undefined;

  // Laeuft am Sitzungsort eine Inventur, ersetzt "gefunden" das Buchen —
  // sonst muesste der Mann bei jedem Tag ueberlegen, was er gerade tut.
  const inv = sitzung ? await inventurOffen(c.env, sitzung.standortId) : null;
  const aktionen = inv
    ? [inventurAktion(inv.id, code, inv.standort ?? ''), ...aktionenFuer(e, sitzung, lager)]
    : aktionenFuer(e, sitzung, lager);

  return einheitSeite({
    einheit: e,
    inhalt,
    aktionen,
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
    return html(seite(
      notiz('fehler', 'Link nicht gültig',
        ' Entweder schon benutzt oder abgelaufen. Bitte im Büro einen neuen anfordern.'),
      { titel: 'Einladung', kopf: kopf() }), 410);
  }

  const token = geraetetokenErzeugen();
  await c.env.DB.prepare(
    `UPDATE mitarbeiter SET token_hash = ?, einladung = NULL WHERE id = ?`,
  ).bind(await sha256(token), ma.id).run();

  return html(seite(`
${notiz('erfolg', `Fertig, ${ma.name}`,
    ' Dieses Handy ist jetzt eingerichtet. Kein Passwort, kein Login — einfach Tags antippen.')}
<a class="knopf knopf-haupt" href="/">Los geht’s</a>`,
    { titel: 'Eingerichtet', kopf: kopf() }),
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


/* ------------------------------------------------- Melden und Fotos --- */

app.get('/t/:code/melden', async (c) => {
  const ziel = await zielFuerCode(c.env, c.req.param('code'));
  if (!ziel || ziel.art !== 'einheit') return unbekannterTag(kanonisch(c.req.param('code')));
  if (!(await angemeldeterMitarbeiter(c.req.raw, c.env))) return c.redirect(`/t/${ziel.code}`);
  return meldenSeite(ziel.einheit, c.env.FOTOS !== undefined);
});

app.post('/t/:code/melden', async (c) => {
  const ziel = await zielFuerCode(c.env, c.req.param('code'));
  if (!ziel || ziel.art !== 'einheit') return unbekannterTag(kanonisch(c.req.param('code')));
  const ma = await angemeldeterMitarbeiter(c.req.raw, c.env);
  if (!ma) return c.redirect('/');

  const form = await c.req.raw.formData();
  const art = String(form.get('art') ?? 'hinweis');
  const text = String(form.get('text') ?? '').trim() || null;

  let schluessel: string | null = null;
  const foto = form.get('foto');
  if (c.env.FOTOS && foto && typeof foto !== 'string' && foto.size > 0) {
    if (foto.size > 8 * 1024 * 1024) {
      return c.redirect(`/t/${ziel.code}?fehler=${encodeURIComponent('Foto zu groß (max. 8 MB)')}`, 303);
    }
    schluessel = `${ziel.einheit.id}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    await c.env.FOTOS.put(schluessel, foto.stream(), {
      httpMetadata: { contentType: foto.type || 'image/jpeg' },
    });
  }

  await meldungAnlegen(c.env, {
    einheitId: ziel.einheit.id, art, text,
    fotoSchluessel: schluessel, mitarbeiterId: ma.id,
  });
  return c.redirect(`/t/${ziel.code}?gemeldet=1`, 303);
});

app.get('/foto/*', async (c) => {
  if (!(await istBuero(c.req.raw, c.env)) && !(await angemeldeterMitarbeiter(c.req.raw, c.env))) {
    return new Response('Nicht berechtigt', { status: 403 });
  }
  if (!c.env.FOTOS) return c.notFound();
  const schluessel = decodeURIComponent(new URL(c.req.url).pathname.slice('/foto/'.length));
  const obj = await c.env.FOTOS.get(schluessel);
  if (!obj) return c.notFound();
  return new Response(obj.body, {
    headers: {
      'Content-Type': obj.httpMetadata?.contentType ?? 'image/jpeg',
      'Cache-Control': 'private, max-age=3600',
    },
  });
});

/* ------------------------------------------------------------ Inventur --- */

app.get('/inventur', async (c) => {
  if (!(await angemeldeterMitarbeiter(c.req.raw, c.env))) return c.redirect('/');
  const { results: offene } = await c.env.DB.prepare(
    `SELECT i.id, s.name AS standort FROM inventur i JOIN standort s ON s.id = i.standort_id
      WHERE i.beendet_am IS NULL ORDER BY i.id DESC`,
  ).all<{ id: number; standort: string }>();
  return inventurAuswahl(await standorteAktiv(c.env), offene);
});

app.post('/inventur', async (c) => {
  const ma = await angemeldeterMitarbeiter(c.req.raw, c.env);
  if (!ma) return c.redirect('/');
  const d = await eingabeLesen(c.req.raw);
  const standortId = Number(d.standort_id);
  const s = await standortLesen(c.env, standortId);
  if (!s) return c.redirect('/inventur', 303);
  const inv = await inventurStarten(c.env, standortId, ma.id);
  // Die Sitzung mitzuziehen macht den Ablauf einhaendig: ab jetzt zaehlt
  // jeder Scan auf diesen Standort, ohne weitere Auswahl.
  await sitzungSetzen(c.env, ma.id, s.id, s.name);
  return c.redirect(`/inventur/${inv.id}`, 303);
});

app.get('/inventur/:id', async (c) => {
  const ma = await angemeldeterMitarbeiter(c.req.raw, c.env);
  if (!ma) return c.redirect('/');
  const stand = await inventurStand(c.env, Number(c.req.param('id')));
  if (!stand) return c.notFound();
  return inventurSeite(stand, await sitzungLesen(c.env, ma.id));
});

app.post('/inventur/:id/abschliessen', async (c) => {
  if (!(await angemeldeterMitarbeiter(c.req.raw, c.env))) return c.redirect('/');
  const id = Number(c.req.param('id'));
  await inventurAbschliessen(c.env, id);
  return c.redirect(`/inventur/${id}`, 303);
});

app.post('/api/inventur/treffer', async (c) => {
  const willJson = (c.req.header('Accept') ?? '').includes('application/json');
  const ma = await angemeldeterMitarbeiter(c.req.raw, c.env);
  if (!ma) return willJson ? c.json({ ok: false, fehler: 'nicht eingerichtet' }, 401) : c.redirect('/');

  const d = await eingabeLesen(c.req.raw);
  const code = kanonisch(String(d.code ?? ''));
  const inventurId = Number(d.inventur);
  const ziel = await zielFuerCode(c.env, code);
  const inv = await inventurStand(c.env, inventurId);
  if (!ziel || ziel.art !== 'einheit' || !inv || inv.inventur.beendet_am) {
    return willJson ? c.json({ ok: false, fehler: 'Inventur oder Tag unbekannt' }, 404)
      : c.redirect(`/t/${code}?fehler=${encodeURIComponent('Inventur oder Tag unbekannt')}`, 303);
  }

  const standortId = inv.inventur.standort_id;
  const warWoanders = ziel.einheit.standort_id !== standortId;

  // Steht die Einheit laut System woanders, ist die Realitaet hier vor Ort —
  // also wird sie umgebucht statt nur vermerkt.
  if (warWoanders) {
    await buchen(c.env, {
      einheitId: ziel.einheit.id, nachStandortId: standortId,
      mitarbeiterId: ma.id, quelle: 'nfc', notiz: 'Inventur: hier vorgefunden',
    });
  }
  await inventurTreffer(c.env, inventurId, ziel.einheit.id, warWoanders);

  if (willJson) return c.json({ ok: true, war_woanders: warWoanders });
  return c.redirect(`/inventur/${inventurId}`, 303);
});

/* ---------------------------------------------------- Offline-Schicht --- */

app.get('/app.js', () => new Response(APP_JS, {
  headers: { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'max-age=300' },
}));

app.get('/sw.js', () => new Response(SW_JS, {
  headers: { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'max-age=0' },
}));

app.get('/offline', () => offlineSeite());

/**
 * Kompakter Abzug aller Einheiten fuer den Offline-Betrieb.
 *
 * Bewusst ueber alle Codes hinweg geschluesselt (Tag-Code und sprechender
 * Code), damit die Offline-Huelle denselben Treffer findet wie der Server.
 */
app.get('/api/schnappschuss', async (c) => {
  if (!(await angemeldeterMitarbeiter(c.req.raw, c.env))) {
    return c.json({ fehler: 'nicht eingerichtet' }, 401);
  }
  const { results: einheiten } = await c.env.DB.prepare(
    `SELECT e.id, e.code, e.bezeichnung, e.standort_id, s.name AS standort_name,
            (SELECT group_concat(CAST(i.menge AS INTEGER) || '× ' || a.name, ', ')
               FROM inhalt i JOIN artikel a ON a.id = i.artikel_id
              WHERE i.einheit_id = e.id) AS inhalt
       FROM einheit e JOIN standort s ON s.id = e.standort_id
      WHERE e.aktiv = 1`,
  ).all<{ id: number; code: string; bezeichnung: string; standort_id: number;
          standort_name: string; inhalt: string | null }>();

  const { results: tags } = await c.env.DB.prepare(
    `SELECT code, ziel_id FROM tag WHERE ziel_typ = 'einheit' AND aktiv = 1`,
  ).all<{ code: string; ziel_id: number }>();

  const proId = new Map(einheiten.map((e) => [e.id, e]));
  const karte: Record<string, unknown> = {};
  const eintrag = (e: (typeof einheiten)[number]) =>
    ({ c: e.code, b: e.bezeichnung, s: e.standort_id, sn: e.standort_name, i: e.inhalt });
  for (const e of einheiten) karte[e.code] = eintrag(e);
  for (const t of tags) {
    const e = proId.get(t.ziel_id);
    if (e) karte[t.code] = eintrag(e);
  }

  return c.json({
    zeit: new Date().toISOString(),
    standorte: (await standorteAktiv(c.env)).map((s) => ({ id: s.id, name: s.name, typ: s.typ })),
    einheiten: karte,
  });
});

/* ================================================================ MCP === */

app.post('/mcp', (c) => mcpBehandeln(c.req.raw, c.env));
app.get('/tools.json', () => toolsJson());
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
  const offene = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM meldung WHERE erledigt = 0`,
  ).first<{ n: number }>();
  return B.uebersicht({
    einheiten: zahlen?.gesamt ?? 0,
    imLager: zahlen?.im_lager ?? 0,
    aufBaustellen: zahlen?.auf_baustellen ?? 0,
    ueberfaellig: await ueberfaellig(c.env),
    standorte: standorte.length,
    offeneMeldungen: offene?.n ?? 0,
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


app.get('/buero/artikel', async (c) => B.artikelSeite(await artikelAlle(c.env)));

app.post('/buero/artikel', async (c) => {
  const d = await eingabeLesen(c.req.raw);
  const name = String(d.name ?? '').trim();
  if (name) {
    await c.env.DB.prepare(
      `INSERT INTO artikel (name, kategorie, mengeneinheit) VALUES (?, ?, ?)
       ON CONFLICT (name) DO NOTHING`,
    ).bind(
      name,
      String(d.kategorie ?? '').trim() || 'sonstiges',
      String(d.mengeneinheit ?? '').trim() || 'Stk',
    ).run();
  }
  return c.redirect('/buero/artikel', 303);
});

app.get('/buero/auswertung', async (c) => {
  const schwelle = Number(c.req.query('schwelle')) || 120;
  return B.auswertungSeite(
    await vorhaltung(c.env), await verlust(c.env, schwelle), schwelle,
  );
});

app.get('/buero/meldungen', async (c) => {
  const alle = c.req.query('alle') === '1';
  return B.meldungenSeite(await meldungen(c.env, !alle), alle);
});

app.post('/buero/meldung/:id/erledigt', async (c) => {
  await c.env.DB.prepare(`UPDATE meldung SET erledigt = 1 WHERE id = ?`)
    .bind(Number(c.req.param('id'))).run();
  return c.redirect('/buero/meldungen', 303);
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

app.notFound(() => html(seite(
  notiz('fehler', 'Seite nicht gefunden') +
  '<a class="knopf knopf-still" href="/">Übersicht</a>',
  { titel: 'Nicht gefunden', kopf: kopf() }), 404));

/* ====================================================== Wochenlauf === */

/**
 * Woechentliche Ueberfaellig-Meldung.
 *
 * Schickt bewusst nur, was seit dem letzten Lauf NEU dazugekommen ist. Eine
 * Liste, die jede Woche identisch ist, liest nach dem dritten Mal niemand
 * mehr — und dann ist der ganze Mechanismus wertlos.
 */
export async function wochenlauf(env: Env): Promise<{ anzahl: number; neu: number }> {
  const offen = await ueberfaellig(env);
  const codes = offen.map((z) => z.code).sort();

  const letzter = await env.DB.prepare(
    `SELECT codes FROM ueberfaellig_lauf ORDER BY id DESC LIMIT 1`,
  ).first<{ codes: string }>();
  const vorher = new Set((letzter?.codes ?? '').split(',').filter(Boolean));
  const neue = offen.filter((z) => !vorher.has(z.code));

  await env.DB.prepare(
    `INSERT INTO ueberfaellig_lauf (anzahl, neu, codes, gemeldet) VALUES (?, ?, ?, ?)`,
  ).bind(offen.length, neue.length, codes.join(','), env.MELDUNG_WEBHOOK ? 1 : 0).run();

  if (env.MELDUNG_WEBHOOK && neue.length > 0) {
    const zeilen = neue.map((z) =>
      `• ${z.code} — ${z.bezeichnung} · ${z.standort}` +
      `${z.baustelle_beendet ? ' (Baustelle beendet!)' : ''} · ${z.tage} Tage` +
      ` · zuletzt ${z.zuletzt_gebucht_von ?? 'unbekannt'}`).join('\n');
    const text = `*Lager — überfälliges Material*\n` +
      `${neue.length} neu, ${offen.length} insgesamt draußen.\n\n${zeilen}`;
    try {
      await fetch(env.MELDUNG_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
    } catch {
      // Ein toter Webhook darf den Lauf nicht scheitern lassen — der
      // Datensatz oben ist geschrieben, die Liste steht im Büro.
    }
  }
  return { anzahl: offen.length, neu: neue.length };
}

export default {
  fetch: app.fetch,
  async scheduled(_ereignis: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(wochenlauf(env));
  },
};
