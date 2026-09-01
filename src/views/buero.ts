import { esc, html, kopf, seite } from './layout';
import { formatMenge, zustandText } from './scan';
import { seitText } from '../geo';
import type {
  BestandZeile, HistorieZeile, MeldungZeile, UeberfaelligZeile,
  VerlustZeile, VorhaltungZeile,
} from '../db';
import type { Artikel, EinheitMitStandort, InhaltZeile, Standort } from '../types';

const NAV = `<p style="margin:0 0 20px;display:flex;flex-wrap:wrap;gap:8px 16px;font-size:16px">
  <a href="/buero">Übersicht</a>
  <a href="/buero/bestand">Bestand</a>
  <a href="/buero/einheiten">Einheiten</a>
  <a href="/buero/standorte">Standorte</a>
  <a href="/buero/artikel">Artikel</a>
  <a href="/buero/auswertung">Auswertung</a>
  <a href="/buero/meldungen">Meldungen</a>
  <a href="/buero/mitarbeiter">Mitarbeiter</a>
</p>`;

function bueroSeite(titel: string, inhalt: string, status = 200): Response {
  return html(seite(NAV + inhalt, {
    titel: `${titel} · Büro`,
    kopf: kopf('Lager — Büro', { href: '/buero/abmelden', text: 'Abmelden' }),
  }), status);
}

export function anmeldung(fehler?: string): Response {
  const inhalt = `
<h1>Büro</h1>
${fehler ? `<div class="fehler">${esc(fehler)}</div>` : ''}
<form method="post" action="/buero/anmelden">
  <div class="feld"><label for="pw">Passwort</label>
    <input type="password" id="pw" name="passwort" autocomplete="current-password" required></div>
  <button class="knopf knopf-lager" type="submit">Anmelden</button>
</form>`;
  return html(seite(inhalt, { titel: 'Büro', kopf: kopf('Lager — Büro') }), fehler ? 401 : 200);
}

export function uebersicht(o: {
  einheiten: number;
  aufBaustellen: number;
  imLager: number;
  ueberfaellig: UeberfaelligZeile[];
  standorte: number;
}): Response {
  const zeilen = o.ueberfaellig.slice(0, 15).map((u) => `<tr>
    <td><a href="/buero/einheit/${u.einheit_id}">${esc(u.code)}</a><br>
      <span style="font-size:14px;color:#5a6472">${esc(u.bezeichnung)}</span></td>
    <td>${esc(u.standort)}${u.baustelle_beendet
      ? ' <span class="pill pill-warn">beendet</span>' : ''}</td>
    <td class="zahl">${u.tage} T</td>
    <td>${esc(u.zuletzt_gebucht_von ?? '—')}</td>
  </tr>`).join('');

  const inhalt = `
<h1>Übersicht</h1>
<div class="karte" style="display:flex;gap:24px;flex-wrap:wrap">
  <div><div style="font-size:32px;font-weight:700">${o.einheiten}</div>
    <div style="color:#5a6472">Einheiten</div></div>
  <div><div style="font-size:32px;font-weight:700">${o.imLager}</div>
    <div style="color:#5a6472">im Lager</div></div>
  <div><div style="font-size:32px;font-weight:700">${o.aufBaustellen}</div>
    <div style="color:#5a6472">auf Baustellen</div></div>
  <div><div style="font-size:32px;font-weight:700;${o.ueberfaellig.length
    ? 'color:#a3231d' : ''}">${o.ueberfaellig.length}</div>
    <div style="color:#5a6472">überfällig</div></div>
</div>

<h2>Überfällig</h2>
${o.ueberfaellig.length === 0
    ? '<p class="leer">Nichts überfällig. Gut.</p>'
    : `<div class="tabelle-rahmen"><table>
      <thead><tr><th>Einheit</th><th>Standort</th><th class="zahl">Steht</th>
        <th>Zuletzt gebucht</th></tr></thead>
      <tbody>${zeilen}</tbody></table></div>
      ${o.ueberfaellig.length > 15
        ? `<p style="margin-top:10px">… und ${o.ueberfaellig.length - 15} weitere.</p>` : ''}`}`;
  return bueroSeite('Übersicht', inhalt);
}

export function bestandSeite(zeilen: BestandZeile[], filter: string): Response {
  const proArtikel = new Map<string, { einheit: string; orte: BestandZeile[] }>();
  for (const z of zeilen) {
    const e = proArtikel.get(z.artikel) ?? { einheit: z.mengeneinheit, orte: [] };
    e.orte.push(z);
    proArtikel.set(z.artikel, e);
  }

  const bloecke = [...proArtikel.entries()].map(([artikel, { einheit, orte }]) => {
    const summe = orte.reduce((s, o) => s + o.menge, 0);
    const imLager = orte.filter((o) => o.standort_typ === 'lager')
      .reduce((s, o) => s + o.menge, 0);
    const zeilenHtml = orte.map((o) => `<tr>
      <td>${esc(o.standort)} <span class="pill pill-${o.standort_typ === 'lager'
        ? 'lager' : 'baustelle'}">${esc(o.standort_typ)}</span></td>
      <td class="zahl">${esc(formatMenge(o.menge))}</td></tr>`).join('');
    return `<h2>${esc(artikel)}
      <span style="font-weight:400;font-size:16px;color:#5a6472">
        — ${esc(formatMenge(imLager))} von ${esc(formatMenge(summe))} ${esc(einheit)} im Lager</span></h2>
      <div class="tabelle-rahmen"><table><tbody>${zeilenHtml}</tbody></table></div>`;
  }).join('');

  const inhalt = `
<h1>Bestand</h1>
<form method="get" class="feld">
  <input type="text" name="q" placeholder="Artikel filtern …" value="${esc(filter)}">
</form>
${zeilen.length === 0 ? '<p class="leer">Kein Bestand erfasst.</p>' : bloecke}`;
  return bueroSeite('Bestand', inhalt);
}

export function einheitenSeite(
  einheiten: EinheitMitStandort[], standorte: Standort[], filter: string,
): Response {
  const zeilen = einheiten.map((e) => `<tr>
    <td><a href="/buero/einheit/${e.id}">${esc(e.code)}</a></td>
    <td>${esc(e.bezeichnung)}${e.zustand !== 'ok'
      ? ` <span class="pill pill-warn">${esc(zustandText(e.zustand))}</span>` : ''}</td>
    <td>${esc(e.standort_name)}<br>
      <span style="font-size:14px;color:#5a6472">${esc(seitText(e.seit))}</span></td>
  </tr>`).join('');

  const optionen = standorte.map((s) =>
    `<option value="${s.id}">${esc(s.name)}</option>`).join('');

  const inhalt = `
<h1>Einheiten <span style="font-weight:400;color:#5a6472">(${einheiten.length})</span></h1>
<form method="get" class="feld">
  <input type="text" name="q" placeholder="Code oder Bezeichnung …" value="${esc(filter)}">
</form>
${einheiten.length === 0
    ? '<p class="leer">Keine Einheiten gefunden.</p>'
    : `<div class="tabelle-rahmen"><table>
        <thead><tr><th>Code</th><th>Bezeichnung</th><th>Standort</th></tr></thead>
        <tbody>${zeilen}</tbody></table></div>`}

<h2>Neue Einheit</h2>
<form method="post" action="/buero/einheiten">
  <div class="feld"><label for="bez">Bezeichnung</label>
    <input type="text" id="bez" name="bezeichnung" required
      placeholder="z. B. Gitterbox Rahmen 2,00 m"></div>
  <div class="feld"><label for="code">Code</label>
    <input type="text" id="code" name="code" required placeholder="z. B. GB-047"></div>
  <div class="feld"><label for="typ">Art</label>
    <select id="typ" name="typ">
      <option value="traeger">Ladungsträger (Gitterbox, Stapel, Bündel)</option>
      <option value="einzelteil">Einzelteil (Treppenturm, Winde …)</option>
    </select></div>
  <div class="feld"><label for="st">Steht aktuell</label>
    <select id="st" name="standort_id">${optionen}</select></div>
  <button class="knopf knopf-lager" type="submit">Anlegen und Tag erzeugen</button>
</form>`;
  return bueroSeite('Einheiten', inhalt);
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
  const inhaltZeilen = o.inhalt.map((z) => `<tr>
    <td>${esc(z.name)}</td><td class="zahl">${esc(formatMenge(z.menge))} ${esc(z.mengeneinheit)}</td>
    <td class="zahl"><form method="post" action="/buero/einheit/${e.id}/inhalt">
      <input type="hidden" name="artikel_id" value="${z.artikel_id}">
      <input type="hidden" name="menge" value="0">
      <button class="knopf knopf-still" style="min-height:36px;font-size:14px;margin:0"
        type="submit">entfernen</button></form></td>
  </tr>`).join('');

  const histZeilen = o.historie.map((h) => `<tr>
    <td>${esc(h.zeit.slice(0, 16).replace(' ', ' · '))}</td>
    <td>${esc(h.von ?? '—')} → <strong>${esc(h.nach)}</strong></td>
    <td>${esc(h.wer ?? '—')} <span style="color:#5a6472">${esc(h.quelle)}</span></td>
  </tr>`).join('');

  const artikelOptionen = o.artikel.map((a) =>
    `<option value="${a.id}">${esc(a.name)}</option>`).join('');

  const tags = o.tagCodes.map((c) =>
    `<li><span class="code">${esc(c)}</span>
      <span style="color:#5a6472;font-size:14px">${esc(o.basisUrl)}/t/${esc(c)}</span></li>`,
  ).join('');

  const inhalt = `
${o.meldung ? `<div class="erfolg">${esc(o.meldung)}</div>` : ''}
<h1>${esc(e.code)}</h1>
<p style="font-size:20px;margin-bottom:4px">${esc(e.bezeichnung)}</p>
<p style="color:#5a6472">${esc(e.standort_name)} · ${esc(seitText(e.seit))} ·
  ${esc(zustandText(e.zustand))}</p>

<h2>Tags</h2>
${o.tagCodes.length === 0
    ? '<p class="leer">Kein Tag zugeordnet.</p>'
    : `<ul class="liste" style="list-style:none">${tags}</ul>`}
<p style="display:flex;gap:8px;flex-wrap:wrap">
  <a class="knopf knopf-zweit" style="width:auto;min-height:48px;font-size:16px"
    href="/buero/etiketten?einheit=${e.id}">Etikett drucken</a>
  <form method="post" action="/buero/einheit/${e.id}/tag" style="margin:0">
    <button class="knopf knopf-still" style="width:auto;min-height:48px;font-size:16px"
      type="submit">Ersatz-Tag erzeugen</button></form>
</p>

<h2>Inhalt</h2>
${o.inhalt.length === 0
    ? '<p class="leer">Leer.</p>'
    : `<div class="tabelle-rahmen"><table><tbody>${inhaltZeilen}</tbody></table></div>`}
<form method="post" action="/buero/einheit/${e.id}/inhalt" style="margin-top:12px">
  <div class="feld"><label for="art">Artikel</label>
    <select id="art" name="artikel_id">${artikelOptionen}</select></div>
  <div class="feld"><label for="menge">Menge</label>
    <input type="number" id="menge" name="menge" step="0.1" min="0" value="1"></div>
  <button class="knopf knopf-zweit" type="submit">Inhalt setzen</button>
</form>

<h2>Historie</h2>
${o.historie.length === 0
    ? '<p class="leer">Noch keine Bewegungen.</p>'
    : `<div class="tabelle-rahmen"><table>
        <thead><tr><th>Wann</th><th>Bewegung</th><th>Wer</th></tr></thead>
        <tbody>${histZeilen}</tbody></table></div>`}`;
  return bueroSeite(e.code, inhalt);
}

export function standorteSeite(standorte: Standort[]): Response {
  const zeilen = standorte.map((s) => `<tr>
    <td>${esc(s.name)}<br><span style="font-size:14px;color:#5a6472">${esc(s.adresse ?? '')}</span></td>
    <td><span class="pill pill-${s.typ === 'lager' ? 'lager' : 'baustelle'}">${esc(s.typ)}</span></td>
    <td>${s.aktiv ? '' : '<span class="pill pill-warn">beendet</span>'}</td>
    <td><a href="/buero/etiketten?standort=${s.id}">Etikett</a></td>
    <td>${s.typ === 'baustelle' && s.aktiv
      ? `<form method="post" action="/buero/standorte/${s.id}/beenden">
           <button class="knopf knopf-still" style="min-height:36px;font-size:14px;margin:0"
             type="submit">beenden</button></form>` : ''}</td>
  </tr>`).join('');

  const inhalt = `
<h1>Standorte</h1>
<div class="tabelle-rahmen"><table>
  <thead><tr><th>Name</th><th>Art</th><th></th><th></th><th></th></tr></thead>
  <tbody>${zeilen}</tbody></table></div>

<h2>Neuer Standort</h2>
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
  <div class="feld"><label for="lat">Koordinaten (optional, für Sortierung nach Nähe)</label>
    <div style="display:flex;gap:8px">
      <input type="text" id="lat" name="lat" placeholder="Breite, z. B. 53.5511">
      <input type="text" name="lon" placeholder="Länge, z. B. 9.9937"></div></div>
  <button class="knopf knopf-lager" type="submit">Anlegen</button>
</form>`;
  return bueroSeite('Standorte', inhalt);
}

export function mitarbeiterSeite(
  leute: Array<{ id: number; name: string; rolle: string; aktiv: number;
    einladung: string | null; token_hash: string | null; zuletzt_aktiv: string | null }>,
  basisUrl: string,
): Response {
  const zeilen = leute.map((m) => {
    const status = m.token_hash
      ? `<span class="pill pill-lager">eingerichtet</span>`
      : m.einladung
        ? `<a href="${esc(basisUrl)}/einladung/${esc(m.einladung)}">Einladungslink</a>`
        : '—';
    return `<tr>
      <td>${esc(m.name)}${m.aktiv ? '' : ' <span class="pill pill-warn">gesperrt</span>'}</td>
      <td>${esc(m.rolle)}</td>
      <td>${status}</td>
      <td>${esc(m.zuletzt_aktiv?.slice(0, 10) ?? '—')}</td>
      <td><form method="post" action="/buero/mitarbeiter/${m.id}/umschalten">
        <button class="knopf knopf-still" style="min-height:36px;font-size:14px;margin:0"
          type="submit">${m.aktiv ? 'sperren' : 'freigeben'}</button></form></td>
    </tr>`;
  }).join('');

  const inhalt = `
<h1>Mitarbeiter</h1>
<p style="color:#5a6472">Einladungslink einmal per WhatsApp schicken. Wer ihn antippt,
  ist auf diesem Handy dauerhaft eingerichtet — kein Passwort, kein Login.</p>
<div class="tabelle-rahmen"><table>
  <thead><tr><th>Name</th><th>Rolle</th><th>Status</th><th>Zuletzt</th><th></th></tr></thead>
  <tbody>${zeilen}</tbody></table></div>

<h2>Neuer Mitarbeiter</h2>
<form method="post" action="/buero/mitarbeiter">
  <div class="feld"><label for="n">Name</label>
    <input type="text" id="n" name="name" required></div>
  <button class="knopf knopf-lager" type="submit">Anlegen und Einladung erzeugen</button>
</form>`;
  return bueroSeite('Mitarbeiter', inhalt);
}

export function artikelSeite(artikel: Artikel[]): Response {
  const zeilen = artikel.map((a) => `<tr>
    <td>${esc(a.name)}</td><td>${esc(a.kategorie)}</td><td>${esc(a.mengeneinheit)}</td>
  </tr>`).join('');
  const inhalt = `
<h1>Artikel <span style="font-weight:400;color:#5a6472">(${artikel.length})</span></h1>
<p style="color:#5a6472">Der Materialstamm. Was hier steht, kann als Inhalt einer
  Gitterbox erfasst werden.</p>
${artikel.length === 0 ? '<p class="leer">Noch keine Artikel.</p>'
    : `<div class="tabelle-rahmen"><table>
        <thead><tr><th>Name</th><th>Kategorie</th><th>Einheit</th></tr></thead>
        <tbody>${zeilen}</tbody></table></div>`}

<h2>Neuer Artikel</h2>
<form method="post" action="/buero/artikel">
  <div class="feld"><label for="an">Name</label>
    <input type="text" id="an" name="name" required placeholder="z. B. Rahmen 2,00 m"></div>
  <div class="feld"><label for="ak">Kategorie</label>
    <input type="text" id="ak" name="kategorie" placeholder="z. B. rahmen"></div>
  <div class="feld"><label for="am">Mengeneinheit</label>
    <input type="text" id="am" name="mengeneinheit" value="Stk"></div>
  <button class="knopf knopf-lager" type="submit">Anlegen</button>
</form>`;
  return bueroSeite('Artikel', inhalt);
}

export function auswertungSeite(
  vorhaltung: VorhaltungZeile[], verlust: VerlustZeile[], schwelle: number,
): Response {
  const vZeilen = vorhaltung.map((v) => `<tr>
    <td>${esc(v.standort)}${v.aktiv ? '' : ' <span class="pill pill-warn">beendet</span>'}</td>
    <td class="zahl">${v.einheiten}</td>
    <td class="zahl">${v.tage_summe}</td>
    <td class="zahl">${v.tage_max}</td>
    <td>${esc(v.erste_lieferung?.slice(0, 10) ?? '—')}</td>
  </tr>`).join('');

  const lZeilen = verlust.map((l) => `<tr>
    <td><a href="/buero/einheit/${l.einheit_id}">${esc(l.code)}</a><br>
      <span style="font-size:14px;color:#5a6472">${esc(l.bezeichnung)}</span></td>
    <td>${esc(l.standort)}${l.standort_beendet
      ? ' <span class="pill pill-warn">beendet</span>' : ''}</td>
    <td class="zahl">${l.tage}</td>
    <td style="font-size:14px">${esc(l.inhalt ?? '—')}</td>
    <td>${esc(l.zuletzt_von ?? '—')}</td>
  </tr>`).join('');

  const inhalt = `
<h1>Auswertung</h1>

<h2>Vorhaltetage je Baustelle</h2>
<p style="color:#5a6472">Summe über alle Einheiten (Einheitentage) — die Zahl, die bei
  Streit über die Mietdauer zählt, nicht die Kalenderdauer der Baustelle.</p>
${vorhaltung.length === 0 ? '<p class="leer">Noch keine Bewegungen auf Baustellen.</p>'
    : `<div class="tabelle-rahmen"><table>
        <thead><tr><th>Baustelle</th><th class="zahl">Einheiten</th>
          <th class="zahl">Einheitentage</th><th class="zahl">längste</th>
          <th>erste Lieferung</th></tr></thead>
        <tbody>${vZeilen}</tbody></table></div>`}

<h2>Vermutlicher Verlust <span style="font-weight:400;font-size:16px;color:#5a6472">
  (ab ${schwelle} Tagen oder auf beendeter Baustelle)</span></h2>
${verlust.length === 0 ? '<p class="leer">Nichts. Gut.</p>'
    : `<div class="tabelle-rahmen"><table>
        <thead><tr><th>Einheit</th><th>Standort</th><th class="zahl">Tage</th>
          <th>Inhalt</th><th>Zuletzt gebucht</th></tr></thead>
        <tbody>${lZeilen}</tbody></table></div>`}`;
  return bueroSeite('Auswertung', inhalt);
}

export function meldungenSeite(meldungen: MeldungZeile[], alle: boolean): Response {
  const zeilen = meldungen.map((m) => `<tr>
    <td>${esc(m.zeit.slice(0, 16))}</td>
    <td><a href="/buero/einheit/${m.einheit_id}">${esc(m.code)}</a><br>
      <span style="font-size:14px;color:#5a6472">${esc(m.bezeichnung)}</span></td>
    <td><span class="pill ${m.art === 'ok' ? 'pill-lager' : 'pill-warn'}">${esc(m.art)}</span></td>
    <td>${esc(m.text ?? '')}${m.foto_schluessel
      ? `<br><a href="/foto/${esc(m.foto_schluessel)}">Foto</a>` : ''}</td>
    <td>${esc(m.wer ?? '—')}</td>
    <td>${m.erledigt ? '' : `<form method="post" action="/buero/meldung/${m.id}/erledigt">
      <button class="knopf knopf-still" style="min-height:36px;font-size:14px;margin:0"
        type="submit">erledigt</button></form>`}</td>
  </tr>`).join('');

  const inhalt = `
<h1>Meldungen</h1>
<p><a href="/buero/meldungen${alle ? '' : '?alle=1'}">${alle
    ? 'Nur offene zeigen' : 'Auch erledigte zeigen'}</a></p>
${meldungen.length === 0 ? '<p class="leer">Keine Meldungen.</p>'
    : `<div class="tabelle-rahmen"><table>
        <thead><tr><th>Wann</th><th>Einheit</th><th>Art</th><th>Was</th><th>Wer</th><th></th></tr></thead>
        <tbody>${zeilen}</tbody></table></div>`}`;
  return bueroSeite('Meldungen', inhalt);
}
