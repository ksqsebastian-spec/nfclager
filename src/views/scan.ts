import { esc, html, kopf, seite } from './layout';
import { seitText } from '../geo';
import type { EinheitMitStandort, InhaltZeile, Standort } from '../types';
import type { Sitzung } from '../auth';

export interface Aktion {
  art: 'haupt' | 'lager' | 'zweit' | 'still';
  label: string;
  unter?: string;
  /** Direktbuchung per Formular ... */
  zielId?: number;
  /** ... oder Weiterleitung auf die Standortauswahl. */
  href?: string;
}

/**
 * Welche Knoepfe die Scan-Seite zeigt.
 *
 * Bewusst als reine Funktion: das ist die Stelle, an der sich entscheidet, ob
 * der Mann auf der Baustelle einen Tap braucht oder drei. Getestet in
 * test/aktionen.test.ts.
 */
export function aktionenFuer(
  einheit: EinheitMitStandort,
  sitzung: Sitzung | null,
  lager: Standort | null,
): Aktion[] {
  const aktionen: Aktion[] = [];
  const imLager = einheit.standort_typ === 'lager';
  const inSitzung = sitzung !== null && sitzung.standortId === einheit.standort_id;

  // Laufende Baustellen-Sitzung und die Einheit ist noch nicht hier:
  // ein Tap, kein Auswaehlen. Das ist der schnelle Weg.
  if (sitzung && !inSitzung) {
    aktionen.push({
      art: 'haupt',
      label: 'Hierher buchen',
      unter: sitzung.name,
      zielId: sitzung.standortId,
    });
  }

  // Rueckweg ins Lager — der haeufigste Vorgang ueberhaupt.
  if (lager && einheit.standort_id !== lager.id) {
    aktionen.push({
      art: sitzung || aktionen.length ? 'lager' : 'haupt',
      label: 'Zurück ins Lager',
      unter: sitzung ? lager.name : undefined,
      zielId: lager.id,
    });
  }

  aktionen.push({
    art: aktionen.length === 0 ? 'haupt' : 'zweit',
    label: imLager ? 'Auf Baustelle buchen' : 'Auf andere Baustelle',
    href: `/t/${einheit.code}/wohin`,
  });

  return aktionen;
}

function inhaltListe(inhalt: InhaltZeile[]): string {
  if (inhalt.length === 0) return '';
  return `<ul class="inhalt">${inhalt.map((z) =>
    `<li><span class="menge">${esc(formatMenge(z.menge))}×</span> ${esc(z.name)}</li>`,
  ).join('')}</ul>`;
}

export function formatMenge(m: number): string {
  return Number.isInteger(m) ? String(m) : m.toFixed(1).replace('.', ',');
}

function knopf(a: Aktion, code: string): string {
  const klasse = `knopf knopf-${a.art}`;
  const beschriftung = `${esc(a.label)}${a.unter ? `<small>${esc(a.unter)}</small>` : ''}`;
  if (a.href) return `<a class="${klasse}" href="${esc(a.href)}">${beschriftung}</a>`;
  return `<form method="post" action="/api/buchung">
    <input type="hidden" name="code" value="${esc(code)}">
    <input type="hidden" name="ziel" value="${a.zielId}">
    <button class="${klasse}" type="submit">${beschriftung}</button>
  </form>`;
}

export function sitzungsBanner(sitzung: Sitzung | null): string {
  if (!sitzung) return '';
  const restMin = Math.max(0, Math.round((sitzung.bis - Date.now()) / 60_000));
  const rest = restMin >= 60
    ? `noch ${Math.floor(restMin / 60)} Std ${restMin % 60} Min`
    : `noch ${restMin} Min`;
  return `<div class="sitzung"><div class="zeile">
    <span>📍 ${esc(sitzung.name)} · ${esc(rest)}</span>
    <a href="/sitzung/beenden">beenden</a>
  </div></div>`;
}

export function einheitSeite(o: {
  einheit: EinheitMitStandort;
  inhalt: InhaltZeile[];
  aktionen: Aktion[];
  sitzung: Sitzung | null;
  meldung?: { art: 'erfolg' | 'hinweis' | 'fehler'; text: string };
  stornoId?: number;
}): Response {
  const { einheit: e } = o;
  const meldung = o.meldung
    ? `<div class="${o.meldung.art}">${esc(o.meldung.text)}</div>` : '';
  const storno = o.stornoId
    ? `<form method="post" action="/api/storno">
         <input type="hidden" name="id" value="${o.stornoId}">
         <input type="hidden" name="code" value="${esc(e.code)}">
         <button class="knopf knopf-still" type="submit">↩ Rückgängig</button>
       </form>` : '';

  const inhalt = `
${meldung}
<div class="karte">
  <span class="code">${esc(e.code)}</span>
  <p class="gross" style="margin-top:10px">${esc(e.bezeichnung)}</p>
  ${inhaltListe(o.inhalt)}
  <div class="ort">
    <b>${esc(e.standort_name)}</b>
    <span class="seit">${esc(seitText(e.seit))}</span>
  </div>
  ${e.zustand !== 'ok'
    ? `<p style="margin-top:12px"><span class="pill pill-warn">${esc(zustandText(e.zustand))}</span></p>`
    : ''}
</div>
${o.aktionen.map((a) => knopf(a, e.code)).join('')}
${storno}
<p class="fuss"><a href="/">Übersicht</a></p>`;

  return html(seite(inhalt, {
    titel: `${e.code} · ${e.bezeichnung}`,
    kopf: kopf('Lager', { href: '/', text: 'Übersicht' }),
    banner: sitzungsBanner(o.sitzung),
  }));
}

export function zustandText(z: string): string {
  return { ok: 'in Ordnung', beschaedigt: 'beschädigt', reparatur: 'in Reparatur',
    ausgemustert: 'ausgemustert' }[z] ?? z;
}

/** Standortauswahl — nach Entfernung sortiert, wenn das Handy die Position liefert. */
export function wohinSeite(o: {
  code: string;
  bezeichnung: string;
  standorte: Array<Standort & { entfernungKm?: number }>;
  sitzung: Sitzung | null;
  hatPosition: boolean;
}): Response {
  const eintraege = o.standorte.map((s) => {
    const entf = s.entfernungKm !== undefined
      ? `<span class="entf">${s.entfernungKm < 1
          ? `${Math.round(s.entfernungKm * 1000)} m entfernt`
          : `${s.entfernungKm.toFixed(1).replace('.', ',')} km entfernt`}</span>`
      : s.adresse ? `<span class="entf">${esc(s.adresse)}</span>` : '';
    return `<li><form method="post" action="/api/buchung">
      <input type="hidden" name="code" value="${esc(o.code)}">
      <input type="hidden" name="ziel" value="${s.id}">
      <button class="knopf ${s.typ === 'lager' ? 'knopf-lager' : 'knopf-zweit'}" type="submit">
        ${esc(s.name)}${entf}
      </button></form></li>`;
  }).join('');

  // Ohne Position alphabetisch — die Seite funktioniert auch ohne JavaScript,
  // sie ist dann nur eine Zeile laenger zu lesen.
  const skript = o.hatPosition ? '' : `<script>
navigator.geolocation && navigator.geolocation.getCurrentPosition(function(p){
  var u = new URL(location.href);
  u.searchParams.set('lat', p.coords.latitude.toFixed(5));
  u.searchParams.set('lon', p.coords.longitude.toFixed(5));
  location.replace(u);
}, function(){}, {enableHighAccuracy:false, timeout:4000, maximumAge:120000});
</script>`;

  const inhalt = `
<h1>Wohin?</h1>
<p style="color:#5a6472;margin-bottom:20px">${esc(o.bezeichnung)}</p>
${o.standorte.length === 0
    ? '<p class="leer">Keine aktiven Standorte angelegt.</p>'
    : `<ul class="liste">${eintraege}</ul>`}
<a class="knopf knopf-still" href="/t/${esc(o.code)}">Abbrechen</a>`;

  return html(seite(inhalt, {
    titel: 'Wohin?',
    kopf: kopf('Ziel wählen', { href: `/t/${o.code}`, text: 'Zurück' }),
    banner: sitzungsBanner(o.sitzung),
    scripte: skript,
  }));
}

/** Was ein Fremder sieht, der den Tag antippt. Kostet nichts, holt gelegentlich Material zurueck. */
export function fremdSeite(e: EinheitMitStandort, firma: string, telefon: string): Response {
  const inhalt = `
<div class="karte" style="text-align:center">
  <p class="gross">Eigentum der</p>
  <p class="gross" style="color:#12508f">${esc(firma)}</p>
  <p style="font-size:19px;margin-top:16px">${esc(e.bezeichnung)}<br>
    <span class="code" style="margin-top:8px">${esc(e.code)}</span></p>
  <p style="margin-top:24px;font-size:18px">Gefunden? Bitte melden:</p>
  <a class="knopf knopf-lager" href="tel:${esc(telefon.replace(/\s/g, ''))}">
    ${esc(telefon)}</a>
</div>
<p class="fuss">Mitarbeiter? Dann fehlt auf diesem Handy die Einrichtung —
  bitte im Büro melden.</p>`;
  return html(seite(inhalt, { titel: firma, kopf: kopf(firma) }));
}

export function unbekannterTag(code: string): Response {
  const inhalt = `
<div class="fehler"><strong>Unbekannter Tag</strong><br>
  Der Code <span class="code">${esc(code)}</span> ist nicht vergeben.</div>
<p>Vertippt? Code hier eingeben:</p>
<form method="get" action="/t">
  <div class="feld"><input type="text" name="code" autocapitalize="characters"
    autocomplete="off" placeholder="z. B. K7F2QX" value="${esc(code)}"></div>
  <button class="knopf knopf-lager" type="submit">Suchen</button>
</form>
<a class="knopf knopf-still" href="/">Übersicht</a>`;
  return html(seite(inhalt, { titel: 'Unbekannter Tag', kopf: kopf('Lager') }), 404);
}
