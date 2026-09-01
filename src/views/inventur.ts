import { esc, html, kopf, seite } from './layout';
import { sitzungsBanner } from './scan';
import type { InventurStand } from '../db';
import type { Standort } from '../types';
import type { Sitzung } from '../auth';

export function inventurAuswahl(standorte: Standort[], offene: Array<{ id: number; standort: string }>): Response {
  const inhalt = `
<h1>Inventur</h1>
${offene.length ? `<h2>Läuft gerade</h2><ul class="liste">${offene.map((o) =>
    `<li><a class="knopf knopf-haupt" href="/inventur/${o.id}">${esc(o.standort)}</a></li>`,
  ).join('')}</ul>` : ''}
<h2>Neu starten</h2>
<p style="color:#5a6472">Danach jede Einheit antippen. Was am Ende offen bleibt, ist die Fehlliste.</p>
<ul class="liste">${standorte.map((s) =>
    `<li><form method="post" action="/inventur">
       <input type="hidden" name="standort_id" value="${s.id}">
       <button class="knopf knopf-zweit" type="submit">${esc(s.name)}</button></form></li>`,
  ).join('')}</ul>
<a class="knopf knopf-still" href="/">Übersicht</a>`;
  return html(seite(inhalt, { titel: 'Inventur', kopf: kopf('Inventur', { href: '/', text: 'Übersicht' }) }));
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

  const inhalt = `
<h1>${esc(i.standort ?? '')}</h1>
<div class="karte">
  <p class="gross">${gefunden.length} von ${gesamt}</p>
  <div style="background:#e6e9ee;border-radius:99px;height:14px;overflow:hidden;margin:10px 0">
    <div style="background:#0a7d3c;height:100%;width:${anteil}%"></div>
  </div>
  <p style="color:#5a6472;margin:0">${fehlend.length === 0
    ? 'Alles gefunden.' : `${fehlend.length} ${fehlend.length === 1 ? 'fehlt' : 'fehlen'} noch`}</p>
  ${i.soll_anzahl !== null && i.soll_anzahl !== gesamt
    ? `<p style="color:#5a6472;margin:6px 0 0;font-size:15px">Beim Start waren
        ${i.soll_anzahl} Einheiten hier verbucht.</p>` : ''}
</div>

${beendet
  ? `<div class="hinweis">Abgeschlossen am ${esc(i.beendet_am!.slice(0, 16))}.</div>`
  : `<p style="color:#5a6472">Einfach die Tags antippen — jede Einheit wird beim Scannen erfasst.</p>`}

${woanders.length ? `<h2>Hier gefunden, im System woanders (${woanders.length})</h2>
<ul class="inhalt">${woanders.map((g) =>
    `<li><span class="code">${esc(g.code)}</span> ${esc(g.bezeichnung)}</li>`).join('')}</ul>
<p style="color:#5a6472;font-size:15px">Diese Einheiten wurden automatisch hierher gebucht.</p>` : ''}

<h2>Fehlt noch (${fehlend.length})</h2>
${fehlend.length === 0
  ? '<p class="leer">Nichts offen.</p>'
  : `<ul class="inhalt">${fehlend.map((f) =>
      `<li><a href="/t/${esc(f.code)}"><span class="code">${esc(f.code)}</span></a>
        ${esc(f.bezeichnung)}</li>`).join('')}</ul>`}

<h2>Erfasst (${gefunden.length})</h2>
${gefunden.length === 0
  ? '<p class="leer">Noch nichts.</p>'
  : `<ul class="inhalt">${gefunden.slice(0, 60).map((g) =>
      `<li><span class="code">${esc(g.code)}</span> ${esc(g.bezeichnung)}</li>`).join('')}</ul>`}

${beendet ? '' : `<form method="post" action="/inventur/${i.id}/abschliessen" style="margin-top:24px">
  <button class="knopf knopf-warn" type="submit">Inventur abschließen</button></form>`}
<a class="knopf knopf-still" href="/">Übersicht</a>`;

  return html(seite(inhalt, {
    titel: `Inventur ${i.standort ?? ''}`,
    kopf: kopf('Inventur', { href: '/inventur', text: 'Alle' }),
    banner: sitzungsBanner(sitzung),
  }));
}
