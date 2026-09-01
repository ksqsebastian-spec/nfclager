import {
  abschnitt, esc, html, kacheln, kopfzeile, notiz, pille, seite, tabelle,
} from './layout';
import { formatMenge, zustandText } from './scan';
import { seitText } from '../geo';
import type {
  BestandZeile, HistorieZeile, MeldungZeile, UeberfaelligZeile,
  VerlustZeile, VorhaltungZeile,
} from '../db';
import type { Artikel, EinheitMitStandort, InhaltZeile, Standort } from '../types';

/** Gruppierte Navigation. Der aktive Eintrag wird über den Pfad erkannt. */
const NAVI: Array<{ gruppe: string; punkte: Array<[string, string]> }> = [
  { gruppe: 'Lager', punkte: [
    ['/buero', 'Übersicht'],
    ['/buero/bestand', 'Bestand'],
    ['/buero/einheiten', 'Einheiten'],
  ] },
  { gruppe: 'Stammdaten', punkte: [
    ['/buero/standorte', 'Standorte'],
    ['/buero/artikel', 'Artikel'],
    ['/buero/mitarbeiter', 'Mitarbeiter'],
  ] },
  { gruppe: 'Kontrolle', punkte: [
    ['/buero/auswertung', 'Auswertung'],
    ['/buero/meldungen', 'Meldungen'],
  ] },
];

/**
 * Eine einzige Navigationsspur.
 *
 * Auf dem Schreibtisch eine gruppierte Liste, auf dem Handy per CSS dieselben
 * Elemente als eine waagerechte Rolleiste — deshalb liegt alles in EINEM
 * <nav>, statt je Gruppe eines zu bauen.
 */
function leiste(pfad: string): string {
  const punkte = NAVI.map((g) =>
    `<span class="gruppe">${esc(g.gruppe)}</span>` +
    g.punkte.map(([href, text]) => {
      const aktiv = href === '/buero' ? pfad === '/buero' : pfad.startsWith(href);
      return `<a href="${esc(href)}"${aktiv ? ' class="aktiv"' : ''}>${esc(text)}</a>`;
    }).join(''),
  ).join('');

  return `<aside class="leiste">
    <div class="marke">Lager · Büro</div>
    <nav class="navi">
      ${punkte}
      <span class="trenner"></span>
      <a class="nebensache" href="/">Baustellen-Ansicht</a>
      <a class="nebensache" href="/buero/abmelden">Abmelden</a>
    </nav>
  </aside>`;
}

function bueroSeite(titel: string, pfad: string, inhalt: string, status = 200): Response {
  return html(seite(
    `<div class="buero">${leiste(pfad)}<main class="inhalt">${inhalt}</main></div>`,
    { titel: `${titel} · Lager`, roh: true },
  ), status);
}

export function anmeldung(fehler?: string): Response {
  const inhalt = `
<h1>Büro</h1>
<p class="gedaempft">Lagerverwaltung</p>
${fehler ? notiz('fehler', fehler) : ''}
<form method="post" action="/buero/anmelden">
  <div class="tafel">
    <div class="feld"><label for="pw">Passwort</label>
      <input type="password" id="pw" name="passwort" autocomplete="current-password" required></div>
  </div>
  <button class="knopf knopf-lager" type="submit">Anmelden</button>
</form>`;
  return html(seite(inhalt, { titel: 'Büro', kopf: '' }), fehler ? 401 : 200);
}

/* ---------------------------------------------------------- Übersicht --- */

export function uebersicht(o: {
  einheiten: number;
  aufBaustellen: number;
  imLager: number;
  ueberfaellig: UeberfaelligZeile[];
  standorte: number;
  offeneMeldungen: number;
}): Response {
  const beendet = o.ueberfaellig.filter((u) => u.baustelle_beendet).length;

  const kopfKacheln = kacheln([
    { wert: o.einheiten, schild: 'Einheiten', zusatz: `auf ${o.standorte} Standorten`, ton: 'blau' },
    { wert: o.imLager, schild: 'im Lager', zusatz: 'verfügbar', ton: 'gruen' },
    { wert: o.aufBaustellen, schild: 'auf Baustellen', zusatz: 'draußen', ton: 'amber' },
    {
      wert: o.ueberfaellig.length,
      schild: 'überfällig',
      zusatz: beendet ? `davon ${beendet} auf beendeten Baustellen` : 'über der Schwelle',
      ton: o.ueberfaellig.length ? 'rot' : undefined,
    },
  ]);

  const zeilen = o.ueberfaellig.slice(0, 12).map((u) => [
    `<a href="/buero/einheit/${u.einheit_id}"><strong>${esc(u.code)}</strong></a>
     <span class="zweitzeile">${esc(u.bezeichnung)}</span>`,
    `${esc(u.standort)}${u.baustelle_beendet ? ` ${pille('beendet', 'warn')}` : ''}`,
    `${u.tage} T`,
    esc(u.zuletzt_gebucht_von ?? '—'),
  ]);

  const inhalt = `
${kopfzeile('Übersicht', 'Wo das Material steht und was zu lange draußen ist.')}
${kopfKacheln}
${o.offeneMeldungen > 0
    ? `<div class="notiz notiz-hinweis" style="margin-bottom:22px">
         <strong>${o.offeneMeldungen} offene Meldung${o.offeneMeldungen === 1 ? '' : 'en'} von der Baustelle</strong>
         <a href="/buero/meldungen">Meldungen ansehen →</a>
       </div>`
    : ''}
${abschnitt(
    { titel: 'Überfällig', beitext: o.ueberfaellig.length > 12
      ? `12 von ${o.ueberfaellig.length}` : undefined },
    o.ueberfaellig.length === 0
      ? `<div class="leer"><strong>Nichts überfällig</strong>
          Alles Material ist entweder im Lager oder noch nicht lange genug draußen.</div>`
      : tabelle(
          [{ titel: 'Einheit' }, { titel: 'Standort' }, { titel: 'Steht', zahl: true },
            { titel: 'Zuletzt gebucht' }],
          zeilen,
        ),
  )}`;
  return bueroSeite('Übersicht', '/buero', inhalt);
}

/* ------------------------------------------------------------ Bestand --- */

export function bestandSeite(zeilen: BestandZeile[], filter: string): Response {
  const proArtikel = new Map<string, BestandZeile[]>();
  for (const z of zeilen) {
    const liste = proArtikel.get(z.artikel) ?? [];
    liste.push(z);
    proArtikel.set(z.artikel, liste);
  }

  const bloecke = [...proArtikel.entries()].map(([artikel, orte]) => {
    const summe = orte.reduce((s, o) => s + o.menge, 0);
    const imLager = orte.filter((o) => o.standort_typ === 'lager')
      .reduce((s, o) => s + o.menge, 0);
    const einheit = orte[0]!.mengeneinheit;
    return abschnitt(
      {
        titel: artikel,
        beitext: `${formatMenge(imLager)} von ${formatMenge(summe)} ${einheit} im Lager`,
      },
      tabelle(
        [{ titel: 'Standort' }, { titel: 'Menge', zahl: true }],
        orte.map((o) => [
          `${esc(o.standort)} ${pille(o.standort_typ, o.standort_typ === 'lager' ? 'lager' : 'baustelle')}`,
          `<strong>${esc(formatMenge(o.menge))}</strong> <span class="gedaempft">${esc(o.mengeneinheit)}</span>`,
        ]),
      ),
    );
  }).join('');

  const inhalt = `
${kopfzeile('Bestand', 'Zählt Inhalt von Ladungsträgern und separat getaggte Einzelteile zusammen.')}
<form method="get" class="filter">
  <input type="text" name="q" placeholder="Artikel filtern …" value="${esc(filter)}">
  <button class="knopf knopf-zweit" type="submit">Filtern</button>
  ${filter ? '<a class="knopf knopf-still" href="/buero/bestand">Zurücksetzen</a>' : ''}
</form>
${zeilen.length === 0
    ? `<div class="abschnitt"><div class="leer"><strong>Kein Bestand</strong>
        ${filter ? 'Kein Artikel passt zum Filter.'
          : 'Sobald Einheiten mit Inhalt erfasst sind, steht hier die Summe.'}</div></div>`
    : bloecke}`;
  return bueroSeite('Bestand', '/buero/bestand', inhalt);
}

/* ---------------------------------------------------------- Einheiten --- */

export function einheitenSeite(
  einheiten: EinheitMitStandort[], standorte: Standort[], filter: string,
): Response {
  const zeilen = einheiten.map((e) => [
    `<a href="/buero/einheit/${e.id}"><strong>${esc(e.code)}</strong></a>`,
    `${esc(e.bezeichnung)}${e.zustand !== 'ok'
      ? ` ${pille(zustandText(e.zustand), 'warn')}` : ''}`,
    `${esc(e.standort_name)}<span class="zweitzeile">${esc(seitText(e.seit))}</span>`,
  ]);

  const optionen = standorte.map((s) =>
    `<option value="${s.id}">${esc(s.name)}</option>`).join('');

  const inhalt = `
${kopfzeile('Einheiten', 'Ladungsträger mit gezähltem Inhalt und Großteile. Jede bekommt beim Anlegen einen Tag-Code.',
    '<a class="knopf knopf-zweit" href="/buero/etiketten">Alle Etiketten drucken</a>')}
<form method="get" class="filter">
  <input type="text" name="q" placeholder="Code oder Bezeichnung …" value="${esc(filter)}">
  <button class="knopf knopf-zweit" type="submit">Suchen</button>
  ${filter ? '<a class="knopf knopf-still" href="/buero/einheiten">Zurücksetzen</a>' : ''}
</form>
${abschnitt(
    { titel: 'Bestand an Einheiten', beitext: `${einheiten.length} Stück` },
    einheiten.length === 0
      ? `<div class="leer"><strong>Keine Einheiten</strong>
          ${filter ? 'Nichts passt zur Suche.' : 'Unten die erste Gitterbox anlegen.'}</div>`
      : tabelle([{ titel: 'Code' }, { titel: 'Bezeichnung' }, { titel: 'Standort' }], zeilen),
  )}
${abschnitt({ titel: 'Neue Einheit', gepolstert: true }, `
<form method="post" action="/buero/einheiten">
  <div class="feld"><label for="bez">Bezeichnung</label>
    <input type="text" id="bez" name="bezeichnung" required
      placeholder="z. B. Gitterbox Rahmen 2,00 m"></div>
  <div class="felder-zwei">
    <div class="feld"><label for="code">Code</label>
      <input type="text" id="code" name="code" required placeholder="z. B. GB-047"></div>
    <div class="feld"><label for="typ">Art</label>
      <select id="typ" name="typ">
        <option value="traeger">Ladungsträger</option>
        <option value="einzelteil">Einzelteil</option>
      </select></div>
  </div>
  <div class="feld"><label for="st">Steht aktuell</label>
    <select id="st" name="standort_id">${optionen}</select></div>
  <button class="knopf knopf-lager" type="submit">Anlegen und Tag erzeugen</button>
</form>`)}`;
  return bueroSeite('Einheiten', '/buero/einheiten', inhalt);
}

export function einheitDetail(o: {
  einheit: EinheitMitStandort;
  inhalt: InhaltZeile[];
  historie: HistorieZeile[];
  artikel: Artikel[];
  tagCodes: string[];
  basisUrl: string;
  meldung?: string;
}): Response {
  const { einheit: e } = o;

  const tagZeilen = o.tagCodes.map((c) => [
    `<span class="kennung">${esc(c)}</span>`,
    `<span class="gedaempft klein">${esc(o.basisUrl)}/t/${esc(c)}</span>`,
  ]);

  const inhaltZeilen = o.inhalt.map((z) => [
    esc(z.name),
    `<strong>${esc(formatMenge(z.menge))}</strong> <span class="gedaempft">${esc(z.mengeneinheit)}</span>`,
    `<form method="post" action="/buero/einheit/${e.id}/inhalt">
       <input type="hidden" name="artikel_id" value="${z.artikel_id}">
       <input type="hidden" name="menge" value="0">
       <button class="knopf knopf-still" type="submit">entfernen</button></form>`,
  ]);

  const histZeilen = o.historie.map((h) => [
    esc(h.zeit.slice(0, 16).replace(' ', ' · ')),
    `${esc(h.von ?? '—')} → <strong>${esc(h.nach)}</strong>`,
    `${esc(h.wer ?? '—')} ${pille(h.quelle, 'ruhig')}`,
  ]);

  const artikelOptionen = o.artikel.map((a) =>
    `<option value="${a.id}">${esc(a.name)}</option>`).join('');

  const inhalt = `
${o.meldung ? notiz('erfolg', o.meldung) : ''}
${kopfzeile(e.code, `${e.bezeichnung} · ${e.standort_name} · ${seitText(e.seit)} · ${zustandText(e.zustand)}`,
    `<a class="knopf knopf-zweit" href="/buero/etiketten?einheit=${e.id}">Etikett drucken</a>
     <form method="post" action="/buero/einheit/${e.id}/tag">
       <button class="knopf knopf-still" type="submit">Ersatz-Tag</button></form>`)}

${abschnitt(
    { titel: 'Tags', beitext: 'Der Chip trägt diese URL' },
    o.tagCodes.length === 0
      ? `<div class="leer"><strong>Kein Tag zugeordnet</strong>Über „Ersatz-Tag" einen erzeugen.</div>`
      : tabelle([{ titel: 'Code' }, { titel: 'URL' }], tagZeilen),
  )}

${abschnitt(
    { titel: 'Inhalt', beitext: o.inhalt.length ? `${o.inhalt.length} Positionen` : undefined },
    (o.inhalt.length === 0
      ? `<div class="leer"><strong>Leer</strong>Unten Artikel und Menge eintragen.</div>`
      : tabelle([{ titel: 'Artikel' }, { titel: 'Menge', zahl: true }, { titel: '' }], inhaltZeilen)) +
    `<div class="koerper" style="border-top:1px solid var(--linie)">
    <form method="post" action="/buero/einheit/${e.id}/inhalt">
      <div class="felder-zwei">
        <div class="feld"><label for="art">Artikel</label>
          <select id="art" name="artikel_id">${artikelOptionen}</select></div>
        <div class="feld"><label for="menge">Menge</label>
          <input type="number" id="menge" name="menge" step="0.1" min="0" value="1"></div>
      </div>
      <button class="knopf knopf-zweit" type="submit">Inhalt setzen</button>
    </form></div>`,
  )}

${abschnitt(
    { titel: 'Historie', beitext: 'Jede Bewegung, lückenlos' },
    o.historie.length === 0
      ? `<div class="leer"><strong>Noch keine Bewegungen</strong></div>`
      : tabelle([{ titel: 'Wann' }, { titel: 'Bewegung' }, { titel: 'Wer' }], histZeilen),
  )}`;
  return bueroSeite(e.code, '/buero/einheiten', inhalt);
}

/* ---------------------------------------------------------- Standorte --- */

export function standorteSeite(standorte: Standort[]): Response {
  const zeilen = standorte.map((s) => [
    `<strong>${esc(s.name)}</strong>${s.adresse
      ? `<span class="zweitzeile">${esc(s.adresse)}</span>` : ''}`,
    pille(s.typ, s.typ === 'lager' ? 'lager' : 'baustelle') +
      (s.aktiv ? '' : ` ${pille('beendet', 'warn')}`),
    `<a href="/buero/etiketten?standort=${s.id}">Etikett</a>`,
    s.typ === 'baustelle' && s.aktiv
      ? `<form method="post" action="/buero/standorte/${s.id}/beenden">
           <button class="knopf knopf-still" type="submit">beenden</button></form>`
      : '',
  ]);

  const inhalt = `
${kopfzeile('Standorte',
    'Das Lager und die laufenden Baustellen. Jede erzeugt einen Standort-Tag: einmal am Bauzaun antippen, danach geht jede Einheit mit einem Tap dorthin.')}
${abschnitt(
    { titel: 'Alle Standorte', beitext: `${standorte.filter((s) => s.aktiv).length} aktiv` },
    tabelle(
      [{ titel: 'Name' }, { titel: 'Art' }, { titel: 'Tag' }, { titel: '' }],
      zeilen,
    ),
  )}
${abschnitt({ titel: 'Neuer Standort', gepolstert: true }, `
<form method="post" action="/buero/standorte">
  <div class="feld"><label for="n">Name</label>
    <input type="text" id="n" name="name" required placeholder="z. B. Elbchaussee 12"></div>
  <div class="feld"><label for="a">Adresse</label>
    <input type="text" id="a" name="adresse" placeholder="optional"></div>
  <div class="feld"><label for="t">Art</label>
    <select id="t" name="typ">
      <option value="baustelle">Baustelle</option>
      <option value="lager">Lager</option>
    </select></div>
  <div class="feld"><label for="lat">Koordinaten — sortiert die Auswahl auf dem Handy nach Nähe</label>
    <div class="felder-zwei">
      <input type="text" id="lat" name="lat" placeholder="Breite, z. B. 53.5511">
      <input type="text" name="lon" placeholder="Länge, z. B. 9.9937"></div></div>
  <button class="knopf knopf-lager" type="submit">Anlegen</button>
</form>`)}`;
  return bueroSeite('Standorte', '/buero/standorte', inhalt);
}

/* ------------------------------------------------------------ Artikel --- */

export function artikelSeite(artikel: Artikel[]): Response {
  const zeilen = artikel.map((a) => [
    `<strong>${esc(a.name)}</strong>`,
    pille(a.kategorie, 'ruhig'),
    esc(a.mengeneinheit),
  ]);

  const inhalt = `
${kopfzeile('Artikel', 'Der Materialstamm. Was hier steht, lässt sich als Inhalt einer Gitterbox erfassen.')}
${abschnitt(
    { titel: 'Materialstamm', beitext: `${artikel.length} Positionen` },
    tabelle([{ titel: 'Name' }, { titel: 'Kategorie' }, { titel: 'Einheit' }], zeilen),
  )}
${abschnitt({ titel: 'Neuer Artikel', gepolstert: true }, `
<form method="post" action="/buero/artikel">
  <div class="feld"><label for="an">Name</label>
    <input type="text" id="an" name="name" required placeholder="z. B. Rahmen 2,00 m"></div>
  <div class="felder-zwei">
    <div class="feld"><label for="ak">Kategorie</label>
      <input type="text" id="ak" name="kategorie" placeholder="z. B. rahmen"></div>
    <div class="feld"><label for="am">Mengeneinheit</label>
      <input type="text" id="am" name="mengeneinheit" value="Stk"></div>
  </div>
  <button class="knopf knopf-lager" type="submit">Anlegen</button>
</form>`)}`;
  return bueroSeite('Artikel', '/buero/artikel', inhalt);
}

/* --------------------------------------------------------- Auswertung --- */

export function auswertungSeite(
  vorhaltung: VorhaltungZeile[], verlust: VerlustZeile[], schwelle: number,
): Response {
  const vZeilen = vorhaltung.map((v) => [
    `<strong>${esc(v.standort)}</strong>${v.aktiv ? '' : ` ${pille('beendet', 'warn')}`}
     <span class="zweitzeile">erste Lieferung ${esc(v.erste_lieferung?.slice(0, 10) ?? '—')}</span>`,
    String(v.einheiten),
    `<strong>${v.tage_summe}</strong>`,
    String(v.tage_max),
  ]);

  const lZeilen = verlust.map((l) => [
    `<a href="/buero/einheit/${l.einheit_id}"><strong>${esc(l.code)}</strong></a>
     <span class="zweitzeile">${esc(l.bezeichnung)}</span>`,
    `${esc(l.standort)}${l.standort_beendet ? ` ${pille('beendet', 'warn')}` : ''}`,
    String(l.tage),
    `<span class="klein">${esc(l.inhalt ?? '—')}</span>`,
    esc(l.zuletzt_von ?? '—'),
  ]);

  const inhalt = `
${kopfzeile('Auswertung', 'Was die Mietdauer kostet und was vermutlich nicht zurückkommt.')}
${abschnitt(
    { titel: 'Vorhaltetage je Baustelle',
      beitext: 'Einheitentage = Summe über alle Einheiten' },
    vorhaltung.length === 0
      ? `<div class="leer"><strong>Noch keine Bewegungen auf Baustellen</strong>
          Sobald Material rausgeht und zurückkommt, steht hier die belastbare Mietdauer.</div>`
      : tabelle(
          [{ titel: 'Baustelle' }, { titel: 'Einheiten', zahl: true },
            { titel: 'Einheitentage', zahl: true }, { titel: 'Längste', zahl: true }],
          vZeilen,
        ),
  )}
${abschnitt(
    { titel: 'Vermutlicher Verlust',
      beitext: `ab ${schwelle} Tagen oder auf beendeter Baustelle` },
    verlust.length === 0
      ? `<div class="leer"><strong>Nichts auffällig</strong>
          Kein Material steht ungewöhnlich lange draußen.</div>`
      : tabelle(
          [{ titel: 'Einheit' }, { titel: 'Standort' }, { titel: 'Tage', zahl: true },
            { titel: 'Inhalt' }, { titel: 'Zuletzt gebucht' }],
          lZeilen,
        ),
  )}`;
  return bueroSeite('Auswertung', '/buero/auswertung', inhalt);
}

/* ---------------------------------------------------------- Meldungen --- */

export function meldungenSeite(meldungen: MeldungZeile[], alle: boolean): Response {
  const zeilen = meldungen.map((m) => [
    `<a href="/buero/einheit/${m.einheit_id}"><strong>${esc(m.code)}</strong></a>
     <span class="zweitzeile">${esc(m.bezeichnung)}</span>`,
    pille(m.art, m.art === 'ok' ? 'ok' : 'warn'),
    `${esc(m.text ?? '')}${m.foto_schluessel
      ? `<span class="zweitzeile"><a href="/foto/${esc(m.foto_schluessel)}">Foto ansehen</a></span>` : ''}`,
    `${esc(m.zeit.slice(0, 16))}<span class="zweitzeile">${esc(m.wer ?? '—')}</span>`,
    m.erledigt
      ? pille('erledigt', 'ok')
      : `<form method="post" action="/buero/meldung/${m.id}/erledigt">
           <button class="knopf knopf-still" type="submit">erledigt</button></form>`,
  ]);

  const inhalt = `
${kopfzeile('Meldungen', 'Schäden und Zustandsmeldungen von der Baustelle.',
    `<a class="knopf knopf-zweit" href="/buero/meldungen${alle ? '' : '?alle=1'}">${
      alle ? 'Nur offene' : 'Auch erledigte'}</a>`)}
${abschnitt(
    { titel: alle ? 'Alle Meldungen' : 'Offene Meldungen',
      beitext: `${meldungen.length} Stück` },
    meldungen.length === 0
      ? `<div class="leer"><strong>Keine Meldungen</strong>
          ${alle ? 'Es wurde noch nichts gemeldet.' : 'Nichts Offenes.'}</div>`
      : tabelle(
          [{ titel: 'Einheit' }, { titel: 'Art' }, { titel: 'Was' },
            { titel: 'Wann' }, { titel: '' }],
          zeilen,
        ),
  )}`;
  return bueroSeite('Meldungen', '/buero/meldungen', inhalt);
}

/* -------------------------------------------------------- Mitarbeiter --- */

export function mitarbeiterSeite(
  leute: Array<{ id: number; name: string; rolle: string; aktiv: number;
    einladung: string | null; token_hash: string | null; zuletzt_aktiv: string | null }>,
  basisUrl: string,
): Response {
  const zeilen = leute.map((m) => [
    `<strong>${esc(m.name)}</strong>${m.aktiv ? '' : ` ${pille('gesperrt', 'warn')}`}`,
    pille(m.rolle, 'ruhig'),
    m.token_hash
      ? pille('eingerichtet', 'ok')
      : m.einladung
        ? `<a href="${esc(basisUrl)}/einladung/${esc(m.einladung)}">Einladungslink</a>
           <span class="zweitzeile klein">einmal per WhatsApp schicken</span>`
        : '<span class="gedaempft">—</span>',
    esc(m.zuletzt_aktiv?.slice(0, 10) ?? '—'),
    `<form method="post" action="/buero/mitarbeiter/${m.id}/umschalten">
       <button class="knopf knopf-still" type="submit">${m.aktiv ? 'sperren' : 'freigeben'}</button></form>`,
  ]);

  const inhalt = `
${kopfzeile('Mitarbeiter',
    'Kein Passwort, kein Login: Wer den Einladungslink einmal antippt, ist auf diesem Handy dauerhaft erkannt. Handy weg oder Mitarbeiter raus → hier sperren.')}
${abschnitt(
    { titel: 'Alle', beitext: `${leute.filter((m) => m.aktiv).length} aktiv` },
    leute.length === 0
      ? `<div class="leer"><strong>Noch niemand angelegt</strong>
          Unten den ersten Kolonnenführer eintragen.</div>`
      : tabelle(
          [{ titel: 'Name' }, { titel: 'Rolle' }, { titel: 'Status' },
            { titel: 'Zuletzt' }, { titel: '' }],
          zeilen,
        ),
  )}
${abschnitt({ titel: 'Neuer Mitarbeiter', gepolstert: true }, `
<form method="post" action="/buero/mitarbeiter">
  <div class="feld"><label for="n">Name</label>
    <input type="text" id="n" name="name" required></div>
  <button class="knopf knopf-lager" type="submit">Anlegen und Einladung erzeugen</button>
</form>`)}`;
  return bueroSeite('Mitarbeiter', '/buero/mitarbeiter', inhalt);
}
