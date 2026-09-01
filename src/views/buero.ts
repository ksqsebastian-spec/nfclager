import {
  block, esc, html, kopf, kopfzeile, marke, notiz, seite, tabelle, zahlen,
} from './layout';
import { formatMenge, meldungsArt, zustandText } from './scan';
import { NAME, zeichen } from './marke';
import { seitText } from '../geo';
import type {
  BestandZeile, HistorieZeile, MeldungZeile, UeberfaelligZeile,
  VerlustZeile, VorhaltungZeile,
} from '../db';
import type { Artikel, EinheitMitStandort, InhaltZeile, Standort } from '../types';

/**
 * Drei Reiter, nicht acht.
 *
 * Vorher gab es Übersicht, Bestand, Einheiten, Standorte, Artikel, Auswertung,
 * Meldungen und Mitarbeiter — für ein Lager mit ein paar hundert Gitterboxen.
 * Die Hälfte davon war dieselbe Zahl aus einem anderen Blickwinkel. Jetzt:
 * was ist los, was liegt wo, und einmal einrichten.
 */
const REITER: Array<[string, string]> = [
  ['/buero', 'Übersicht'],
  ['/buero/lager', 'Lager'],
  ['/buero/einstellungen', 'Einstellungen'],
];

function gestell(titel: string, pfad: string, inhalt: string, status = 200): Response {
  const reiter = REITER.map(([href, text]) => {
    const aktiv = href === '/buero' ? pfad === '/buero' : pfad.startsWith(href);
    return `<a href="${esc(href)}"${aktiv ? ' class="aktiv"' : ''}>${esc(text)}</a>`;
  }).join('');

  return html(seite(`
<header class="buerokopf">
  <div class="oben">
    <span class="marke">${zeichen(21, 'currentColor')}${esc(NAME)}</span>
    <a class="abmelden" href="/buero/abmelden">Abmelden</a>
  </div>
  <nav class="reiter">${reiter}</nav>
</header>
<main class="inhalt">${inhalt}</main>`,
    { titel: `${titel} · ${NAME}`, roh: true },
  ), status);
}

export function anmeldung(fehler?: string): Response {
  const inhalt = `
<h1>${esc(NAME)}</h1>
<p class="still">Gerüstlager der J. Werner Gerüstbau</p>
${fehler ? notiz('fehler', fehler) : ''}
<form method="post" action="/buero/anmelden">
  <div class="feld"><label for="pw">Passwort</label>
    <input type="password" id="pw" name="passwort" autocomplete="current-password" required></div>
  <button class="knopf knopf-lager" type="submit">Anmelden</button>
</form>`;
  return html(seite(inhalt, { titel: `Büro · ${NAME}`, kopf: kopf() }), fehler ? 401 : 200);
}

/* ═══════════════════════════════════════════════════════════ Übersicht ══ */

/** Alles, was heute jemanden interessiert, auf einem Blatt. */
export function uebersicht(o: {
  einheiten: number;
  aufBaustellen: number;
  imLager: number;
  standorte: number;
  ueberfaellig: UeberfaelligZeile[];
  meldungen: MeldungZeile[];
  vorhaltung: VorhaltungZeile[];
}): Response {
  const beendet = o.ueberfaellig.filter((u) => u.baustelle_beendet).length;

  const ueberfaelligZeilen = o.ueberfaellig.map((u) => [
    `<a href="/buero/einheit/${u.einheit_id}"><strong>${esc(u.code)}</strong></a>
     <span class="zweitzeile">${esc(u.bezeichnung)}</span>`,
    `${esc(u.standort)}${u.baustelle_beendet ? ` ${marke('beendet', 'warn')}` : ''}`,
    `<strong>${u.tage}</strong>`,
    esc(u.zuletzt_gebucht_von ?? '—'),
  ]);

  const meldungsZeilen = o.meldungen.map((m) => [
    `<a href="/buero/einheit/${m.einheit_id}"><strong>${esc(m.code)}</strong></a>
     <span class="zweitzeile">${esc(m.bezeichnung)}</span>`,
    marke(meldungsArt(m.art), m.art === 'ok' ? 'ok' : 'warn'),
    `${esc(m.text ?? '')}${m.foto_schluessel
      ? `<span class="zweitzeile"><a href="/foto/${esc(m.foto_schluessel)}">Foto</a></span>` : ''}`,
    `${esc(m.zeit.slice(0, 10))}<span class="zweitzeile">${esc(m.wer ?? '—')}</span>`,
    `<form method="post" action="/buero/meldung/${m.id}/erledigt">
       <button class="knopf knopf-zweit" type="submit">erledigt</button></form>`,
  ]);

  const vorhaltungsZeilen = o.vorhaltung.map((v) => [
    `<strong>${esc(v.standort)}</strong>${v.aktiv ? '' : ` ${marke('beendet', 'warn')}`}`,
    String(v.einheiten),
    `<strong>${v.tage_summe}</strong>`,
    String(v.tage_max),
  ]);

  const inhalt = `
${kopfzeile('Übersicht')}
${zahlen([
    { wert: o.imLager, wort: 'im Lager', zusatz: 'verfügbar' },
    { wert: o.aufBaustellen, wort: 'draußen', zusatz: `auf ${o.standorte} Standorten` },
    { wert: o.ueberfaellig.length, wort: 'überfällig',
      zusatz: beendet ? `${beendet} auf beendeten Baustellen` : 'über der Schwelle',
      achtung: o.ueberfaellig.length > 0 },
    { wert: o.meldungen.length, wort: 'Meldungen', zusatz: 'offen',
      achtung: o.meldungen.length > 0 },
  ])}

${block({ titel: 'Überfällig', beitext: 'länger als 8 Wochen draußen oder auf beendeter Baustelle' },
    o.ueberfaellig.length === 0
      ? `<div class="leer"><strong>Nichts überfällig</strong>Alles Material ist im Lager oder
          noch nicht lange genug draußen.</div>`
      : tabelle(
          [{ titel: 'Einheit' }, { titel: 'Standort' }, { titel: 'Tage', zahl: true },
            { titel: 'Zuletzt gebucht' }],
          ueberfaelligZeilen,
        ))}

${block({ titel: 'Offene Meldungen', beitext: 'Schäden von der Baustelle' },
    o.meldungen.length === 0
      ? `<div class="leer"><strong>Keine Meldungen</strong>Nichts Offenes.</div>`
      : tabelle(
          [{ titel: 'Einheit' }, { titel: 'Art' }, { titel: 'Was' }, { titel: 'Wann' }, { titel: '' }],
          meldungsZeilen,
        ))}

${block({ titel: 'Vorhaltetage', beitext: 'Einheitentage = Summe über alle Einheiten' },
    o.vorhaltung.length === 0
      ? `<div class="leer"><strong>Noch keine Bewegungen</strong>Sobald Material rausgeht und
          zurückkommt, steht hier die belastbare Mietdauer.</div>`
      : tabelle(
          [{ titel: 'Baustelle' }, { titel: 'Einheiten', zahl: true },
            { titel: 'Einheitentage', zahl: true }, { titel: 'Längste', zahl: true }],
          vorhaltungsZeilen,
        ))}`;
  return gestell('Übersicht', '/buero', inhalt);
}

/* ═══════════════════════════════════════════════════════════════ Lager ══ */

/**
 * Einheiten und Bestand waren zwei Menüpunkte für dieselben Daten. Jetzt eine
 * Seite mit einem Umschalter: Kisten zählen oder Material summieren.
 */
export function lagerSeite(o: {
  sicht: 'einheiten' | 'artikel';
  einheiten: EinheitMitStandort[];
  bestand: BestandZeile[];
  standorte: Standort[];
  filter: string;
}): Response {
  const umschalter = (['einheiten', 'artikel'] as const).map((s) =>
    `<a class="knopf ${o.sicht === s ? 'knopf-lager' : 'knopf-zweit'}"
        href="/buero/lager?sicht=${s}${o.filter ? `&q=${encodeURIComponent(o.filter)}` : ''}">
       ${s === 'einheiten' ? 'Nach Einheit' : 'Nach Artikel'}</a>`).join('');

  const einheitenZeilen = o.einheiten.map((e) => [
    `<a href="/buero/einheit/${e.id}"><strong class="mono">${esc(e.code)}</strong></a>`,
    `${esc(e.bezeichnung)}${e.zustand !== 'ok' ? ` ${marke(zustandText(e.zustand), 'warn')}` : ''}`,
    `${esc(e.standort_name)}<span class="zweitzeile">${esc(seitText(e.seit))}</span>`,
  ]);

  // Bestand: je Artikel eine Zeile, Lagerbestand gegen Gesamtbestand.
  const proArtikel = new Map<string, BestandZeile[]>();
  for (const z of o.bestand) {
    const liste = proArtikel.get(z.artikel) ?? [];
    liste.push(z);
    proArtikel.set(z.artikel, liste);
  }
  const bestandZeilen = [...proArtikel.entries()].map(([artikel, orte]) => {
    const summe = orte.reduce((s, x) => s + x.menge, 0);
    const imLager = orte.filter((x) => x.standort_typ === 'lager').reduce((s, x) => s + x.menge, 0);
    const draussen = orte.filter((x) => x.standort_typ !== 'lager');
    return [
      `<strong>${esc(artikel)}</strong>`,
      `<strong>${esc(formatMenge(imLager))}</strong>`,
      esc(formatMenge(summe - imLager)),
      esc(formatMenge(summe)),
      draussen.length
        ? `<span class="leise">${draussen.map((x) =>
            `${esc(x.standort)} (${formatMenge(x.menge)})`).join(' · ')}</span>`
        : '',
    ];
  });

  const optionen = o.standorte.map((s) =>
    `<option value="${s.id}">${esc(s.name)}</option>`).join('');

  const inhalt = `
${kopfzeile('Lager', undefined,
    `<a class="knopf knopf-zweit" href="/buero/etiketten">Etiketten drucken</a>`)}
<div class="filter">
  ${umschalter}
  <form method="get" style="display:flex;gap:12px;flex:1;min-width:240px">
    <input type="hidden" name="sicht" value="${esc(o.sicht)}">
    <input type="text" name="q" placeholder="Suchen …" value="${esc(o.filter)}">
    <button class="knopf knopf-zweit" type="submit">Suchen</button>
  </form>
</div>

${o.sicht === 'artikel'
    ? block({ titel: 'Material', beitext: `${bestandZeilen.length} Artikel im Umlauf` },
        bestandZeilen.length === 0
          ? `<div class="leer"><strong>Kein Bestand</strong>Sobald Einheiten mit Inhalt erfasst
              sind, steht hier die Summe.</div>`
          : tabelle(
              [{ titel: 'Artikel' }, { titel: 'Lager', zahl: true }, { titel: 'Draußen', zahl: true },
                { titel: 'Gesamt', zahl: true }, { titel: 'Wo draußen' }],
              bestandZeilen,
            ))
    : block({ titel: 'Einheiten', beitext: `${o.einheiten.length} Stück` },
        o.einheiten.length === 0
          ? `<div class="leer"><strong>Keine Einheiten</strong>${o.filter
              ? 'Nichts passt zur Suche.' : 'Unten die erste Gitterbox anlegen.'}</div>`
          : tabelle([{ titel: 'Code' }, { titel: 'Bezeichnung' }, { titel: 'Standort' }],
              einheitenZeilen))}

${block({ titel: 'Neue Einheit', gepolstert: true }, `
<form method="post" action="/buero/lager">
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
  return gestell('Lager', '/buero/lager', inhalt);
}

export function einheitDetail(o: {
  einheit: EinheitMitStandort;
  inhalt: InhaltZeile[];
  historie: HistorieZeile[];
  artikel: Artikel[];
  tagCodes: string[];
  basisUrl: string;
}): Response {
  const { einheit: e } = o;

  const inhaltZeilen = o.inhalt.map((z) => [
    esc(z.name),
    `<strong>${esc(formatMenge(z.menge))}</strong> <span class="leise">${esc(z.mengeneinheit)}</span>`,
    `<form method="post" action="/buero/einheit/${e.id}/inhalt">
       <input type="hidden" name="artikel_id" value="${z.artikel_id}">
       <input type="hidden" name="menge" value="0">
       <button class="knopf knopf-zweit" type="submit">entfernen</button></form>`,
  ]);

  const histZeilen = o.historie.map((h) => [
    `<span class="mono">${esc(h.zeit.slice(0, 16))}</span>`,
    `${esc(h.von ?? '—')} → <strong>${esc(h.nach)}</strong>`,
    `${esc(h.wer ?? '—')} ${marke(h.quelle, 'ruhig')}`,
  ]);

  const artikelOptionen = o.artikel.map((a) =>
    `<option value="${a.id}">${esc(a.name)}</option>`).join('');

  const tagListe = o.tagCodes.map((c) =>
    `<li><span class="mono"><strong>${esc(c)}</strong></span>
       <span class="leise">${esc(o.basisUrl)}/t/${esc(c)}</span></li>`).join('');

  const inhalt = `
${kopfzeile(e.code,
    `${e.bezeichnung} · ${e.standort_name} · ${seitText(e.seit)} · ${zustandText(e.zustand)}`,
    `<a class="knopf knopf-zweit" href="/buero/etiketten?einheit=${e.id}">Etikett drucken</a>
     <form method="post" action="/buero/einheit/${e.id}/tag">
       <button class="knopf knopf-zweit" type="submit">Ersatz-Tag</button></form>`)}

${block({ titel: 'Inhalt', gepolstert: true },
    (o.inhalt.length === 0
      ? `<div class="leer"><strong>Leer</strong>Unten Artikel und Menge eintragen.</div>`
      : tabelle([{ titel: 'Artikel' }, { titel: 'Menge', zahl: true }, { titel: '' }], inhaltZeilen)) +
    `<form method="post" action="/buero/einheit/${e.id}/inhalt" style="margin-top:22px">
      <div class="felder-zwei">
        <div class="feld"><label for="art">Artikel</label>
          <select id="art" name="artikel_id">${artikelOptionen}</select></div>
        <div class="feld"><label for="menge">Menge</label>
          <input type="number" id="menge" name="menge" step="0.1" min="0" value="1"></div>
      </div>
      <button class="knopf knopf-zweit" type="submit">Inhalt setzen</button>
    </form>`)}

${block({ titel: 'Tags', beitext: 'der Chip trägt diese URL', gepolstert: true },
    o.tagCodes.length === 0
      ? `<div class="leer"><strong>Kein Tag</strong>Oben über „Ersatz-Tag" einen erzeugen.</div>`
      : `<ul class="stueckliste" style="border-top:0;margin-top:0">${tagListe}</ul>`)}

${block({ titel: 'Historie', beitext: 'jede Bewegung, lückenlos' },
    o.historie.length === 0
      ? `<div class="leer"><strong>Noch keine Bewegungen</strong></div>`
      : tabelle([{ titel: 'Wann' }, { titel: 'Bewegung' }, { titel: 'Wer' }], histZeilen))}`;
  return gestell(e.code, '/buero/lager', inhalt);
}

/* ═══════════════════════════════════════════════════════ Einstellungen ══ */

/** Standorte, Artikel und Mitarbeiter — alles, was man einmal einrichtet. */
export function einstellungen(o: {
  standorte: Standort[];
  artikel: Artikel[];
  leute: Array<{ id: number; name: string; rolle: string; aktiv: number;
    einladung: string | null; token_hash: string | null; zuletzt_aktiv: string | null }>;
  basisUrl: string;
}): Response {
  const standortZeilen = o.standorte.map((s) => [
    `<strong>${esc(s.name)}</strong>${s.adresse
      ? `<span class="zweitzeile">${esc(s.adresse)}</span>` : ''}`,
    marke(s.typ, s.typ === 'lager' ? 'voll' : 'ruhig') +
      (s.aktiv ? '' : ` ${marke('beendet', 'warn')}`),
    `<a href="/buero/etiketten?standort=${s.id}">Etikett</a>`,
    s.typ === 'baustelle' && s.aktiv
      ? `<form method="post" action="/buero/standorte/${s.id}/beenden">
           <button class="knopf knopf-zweit" type="submit">beenden</button></form>` : '',
  ]);

  const leuteZeilen = o.leute.map((m) => [
    `<strong>${esc(m.name)}</strong>${m.aktiv ? '' : ` ${marke('gesperrt', 'warn')}`}`,
    m.token_hash
      ? marke('eingerichtet', 'ok')
      : m.einladung
        ? `<a href="${esc(o.basisUrl)}/einladung/${esc(m.einladung)}">Einladungslink</a>`
        : '<span class="leise">—</span>',
    esc(m.zuletzt_aktiv?.slice(0, 10) ?? '—'),
    `<form method="post" action="/buero/mitarbeiter/${m.id}/umschalten">
       <button class="knopf knopf-zweit" type="submit">${
         m.aktiv ? 'sperren' : 'freigeben'}</button></form>`,
  ]);

  const artikelZeilen = o.artikel.map((a) => [
    `<strong>${esc(a.name)}</strong>`,
    esc(a.kategorie),
    esc(a.mengeneinheit),
  ]);

  const inhalt = `
${kopfzeile('Einstellungen')}

${block({ titel: 'Standorte', beitext: `${o.standorte.filter((s) => s.aktiv).length} aktiv · jeder erzeugt einen Standort-Tag`, gepolstert: true },
    tabelle([{ titel: 'Name' }, { titel: 'Art' }, { titel: 'Tag' }, { titel: '' }], standortZeilen) +
    `<form method="post" action="/buero/standorte" style="margin-top:24px">
      <div class="felder-zwei">
        <div class="feld"><label for="n">Name</label>
          <input type="text" id="n" name="name" required placeholder="z. B. Elbchaussee 12"></div>
        <div class="feld"><label for="a">Adresse</label>
          <input type="text" id="a" name="adresse" placeholder="optional"></div>
      </div>
      <div class="felder-zwei">
        <div class="feld"><label for="t">Art</label>
          <select id="t" name="typ">
            <option value="baustelle">Baustelle</option>
            <option value="lager">Lager</option>
          </select></div>
        <div class="feld"><label for="lat">Koordinaten — sortiert die Auswahl nach Nähe</label>
          <div class="felder-zwei">
            <input type="text" id="lat" name="lat" placeholder="53.5511">
            <input type="text" name="lon" placeholder="9.9937"></div></div>
      </div>
      <button class="knopf knopf-lager" type="submit">Standort anlegen</button>
    </form>`)}

${block({ titel: 'Mitarbeiter', beitext: 'Einladungslink einmal schicken — kein Passwort, kein Login', gepolstert: true },
    tabelle([{ titel: 'Name' }, { titel: 'Status' }, { titel: 'Zuletzt' }, { titel: '' }], leuteZeilen) +
    `<form method="post" action="/buero/mitarbeiter" style="margin-top:24px">
      <div class="feld"><label for="mn">Name</label>
        <input type="text" id="mn" name="name" required></div>
      <button class="knopf knopf-lager" type="submit">Anlegen und Einladung erzeugen</button>
    </form>`)}

${block({ titel: 'Artikel', beitext: `${o.artikel.length} Positionen im Materialstamm`, gepolstert: true },
    tabelle([{ titel: 'Name' }, { titel: 'Kategorie' }, { titel: 'Einheit' }], artikelZeilen) +
    `<form method="post" action="/buero/artikel" style="margin-top:24px">
      <div class="felder-zwei">
        <div class="feld"><label for="an">Name</label>
          <input type="text" id="an" name="name" required placeholder="z. B. Rahmen 2,00 m"></div>
        <div class="feld"><label for="am">Mengeneinheit</label>
          <input type="text" id="am" name="mengeneinheit" value="Stk"></div>
      </div>
      <div class="feld"><label for="ak">Kategorie</label>
        <input type="text" id="ak" name="kategorie" placeholder="z. B. rahmen"></div>
      <button class="knopf knopf-lager" type="submit">Artikel anlegen</button>
    </form>`)}

${block({ titel: 'Vermuteter Verlust', beitext: 'nur zur Kenntnis — Details auf der Übersicht' },
    `<p class="still" style="padding:18px 0">Material, das seit über 120 Tagen draußen steht
      oder auf einer beendeten Baustelle liegt, findest du auf der
      <a href="/buero">Übersicht</a> unter „Überfällig".</p>`)}`;
  return gestell('Einstellungen', '/buero/einstellungen', inhalt);
}

/** Nur noch für den MCP-Server und alte Lesezeichen gebraucht. */
export function verlustListe(zeilen: VerlustZeile[], schwelle: number): Response {
  const lZeilen = zeilen.map((l) => [
    `<a href="/buero/einheit/${l.einheit_id}"><strong>${esc(l.code)}</strong></a>
     <span class="zweitzeile">${esc(l.bezeichnung)}</span>`,
    `${esc(l.standort)}${l.standort_beendet ? ` ${marke('beendet', 'warn')}` : ''}`,
    String(l.tage),
    `<span class="leise">${esc(l.inhalt ?? '—')}</span>`,
    esc(l.zuletzt_von ?? '—'),
  ]);
  const inhalt = `
${kopfzeile('Vermuteter Verlust', `ab ${schwelle} Tagen oder auf beendeter Baustelle`)}
<div style="margin-top:26px">
${zeilen.length === 0
    ? `<div class="leer"><strong>Nichts auffällig</strong></div>`
    : tabelle(
        [{ titel: 'Einheit' }, { titel: 'Standort' }, { titel: 'Tage', zahl: true },
          { titel: 'Inhalt' }, { titel: 'Zuletzt gebucht' }],
        lZeilen)}
</div>`;
  return gestell('Verlust', '/buero', inhalt);
}
