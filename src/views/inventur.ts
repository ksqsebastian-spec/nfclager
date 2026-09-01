import { esc, html, kopf, notiz, seite } from './layout';
import { sitzungsBanner } from './scan';
import type { InventurStand } from '../db';
import type { Standort } from '../types';
import type { Sitzung } from '../auth';

export function inventurAuswahl(
  standorte: Standort[], offene: Array<{ id: number; standort: string }>,
): Response {
  const inhalt = `
<h1>Inventur</h1>
<p class="still">Standort abtappen, live sehen was fehlt.</p>
${offene.length ? `
<h2 style="margin-top:22px">Läuft gerade</h2>
<ul class="wahl">${offene.map((o) =>
    `<li><a class="knopf knopf-haupt" href="/inventur/${o.id}">
       <span>${esc(o.standort)}</span>
       <span class="neben" style="color:rgba(255,255,255,.82)">fortsetzen</span></a></li>`,
  ).join('')}</ul>` : ''}
<h2 style="margin-top:22px">Neu starten</h2>
${standorte.length === 0
    ? `<div class="blatt"><p><strong>Keine Standorte angelegt.</strong></p></div>`
    : `<ul class="wahl">${standorte.map((s) =>
        `<li><form method="post" action="/inventur">
           <input type="hidden" name="standort_id" value="${s.id}">
           <button class="knopf knopf-zweit" type="submit">${esc(s.name)}</button>
         </form></li>`).join('')}</ul>`}
<a class="knopf knopf-still" href="/">Übersicht</a>`;
  return html(seite(inhalt, {
    titel: 'Inventur',
    kopf: kopf('Inventur', { href: '/', text: 'Übersicht' }),
  }));
}

export function inventurSeite(stand: InventurStand, sitzung: Sitzung | null): Response {
  const { inventur: i, gefunden, fehlend } = stand;
  const woanders = gefunden.filter((g) => g.war_woanders);

  // Nenner ist, was JETZT hier stehen müsste — inklusive der Einheiten, die
  // während der Zählung hierher umgebucht wurden. "3 von 4" bei 3 gefundenen
  // und 2 fehlenden wäre nur verwirrend.
  const gesamt = gefunden.length + fehlend.length;
  const anteil = gesamt > 0 ? Math.round((gefunden.length / gesamt) * 100) : 100;
  const beendet = i.beendet_am !== null;

  const liste = (
    eintraege: Array<{ code: string; bezeichnung: string }>, verlinkt: boolean,
  ) => `<ul class="stueckliste">${eintraege.map((x) => `<li>
      <span class="anzahl" style="flex-basis:78px">${verlinkt
        ? `<a href="/t/${esc(x.code)}"><span class="kennung">${esc(x.code)}</span></a>`
        : `<span class="kennung">${esc(x.code)}</span>`}</span>
      <span class="was">${esc(x.bezeichnung)}</span></li>`).join('')}</ul>`;

  const inhalt = `
<h1>${esc(i.standort ?? '')}</h1>
<p class="still">Inventur ${i.id}${beendet ? ' · abgeschlossen' : ''}</p>

<article class="blatt">
  <p style="font-size:32px;font-weight:700;letter-spacing:-.03em;line-height:1.1">
    ${gefunden.length} <span style="color:var(--ink3);font-weight:550">von ${gesamt}</span></p>
  <div class="balkenanzeige"><span style="width:${anteil}%"></span></div>
  <p class="still">${fehlend.length === 0
    ? 'Alles gefunden.'
    : `${fehlend.length} ${fehlend.length === 1 ? 'fehlt' : 'fehlen'} noch`}</p>
  ${i.soll_anzahl !== null && i.soll_anzahl !== gesamt
    ? `<p class="leise" style="margin-top:6px">Beim Start waren
        ${i.soll_anzahl} Einheiten hier verbucht.</p>` : ''}
</article>

${beendet
    ? notiz('hinweis', 'Abgeschlossen', ` am ${i.beendet_am!.slice(0, 16)}.`)
    : notiz('erfolg', 'Läuft', ' Einfach die Tags antippen — jede Einheit wird beim Scannen erfasst.')}

${woanders.length ? `
<article class="blatt">
  <h2>Hier gefunden, im System woanders</h2>
  <p class="leise" style="margin-top:4px">Automatisch hierher gebucht.</p>
  ${liste(woanders, false)}
</article>` : ''}

<article class="blatt">
  <h2>Fehlt noch (${fehlend.length})</h2>
  ${fehlend.length === 0
    ? '<p class="still" style="margin-top:8px">Nichts offen.</p>'
    : liste(fehlend, true)}
</article>

<article class="blatt">
  <h2>Erfasst (${gefunden.length})</h2>
  ${gefunden.length === 0
    ? '<p class="still" style="margin-top:8px">Noch nichts.</p>'
    : liste(gefunden.slice(0, 60), false)}
</article>

${beendet ? '' : `<form method="post" action="/inventur/${i.id}/abschliessen">
  <button class="knopf knopf-warn" type="submit">Inventur abschließen</button></form>`}
<a class="knopf knopf-still" href="/">Übersicht</a>`;

  return html(seite(inhalt, {
    titel: `Inventur ${i.standort ?? ''}`,
    kopf: kopf('Inventur', { href: '/inventur', text: 'Alle' }),
    banner: sitzungsBanner(sitzung),
  }));
}
