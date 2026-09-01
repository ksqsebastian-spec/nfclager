import { esc, html, kopf, marke, notiz, seite } from './layout';
import { seitText } from '../geo';
import type { EinheitMitStandort, InhaltZeile, Standort } from '../types';
import type { Sitzung } from '../auth';

export interface Aktion {
  art: 'haupt' | 'lager' | 'zweit' | 'still';
  label: string;
  unter?: string;
  /** Direktbuchung per Formular ... */
  zielId?: number;
  /** ... Weiterleitung auf die Standortauswahl ... */
  href?: string;
  /** ... oder ein anderer Endpunkt, etwa die Inventur. */
  posten?: { url: string; felder: Record<string, string> };
}

/**
 * Welche Knöpfe die Scan-Seite zeigt.
 *
 * Bewusst als reine Funktion: das ist die Stelle, an der sich entscheidet, ob
 * der Mann auf der Baustelle einen Tap braucht oder drei. Getestet in
 * test/logik.test.ts.
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
  // ein Tap, kein Auswählen. Das ist der schnelle Weg.
  if (sitzung && !inSitzung) {
    aktionen.push({
      art: 'haupt',
      label: 'Hierher buchen',
      unter: sitzung.name,
      zielId: sitzung.standortId,
    });
  }

  // Rückweg ins Lager — der häufigste Vorgang überhaupt.
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

export function formatMenge(m: number): string {
  return Number.isInteger(m) ? String(m) : m.toFixed(1).replace('.', ',');
}

/** Rohwerte aus der Datenbank gehören nicht auf den Bildschirm. */
export function meldungsArt(a: string): string {
  return { beschaedigt: 'beschädigt', reparatur: 'Reparatur', ok: 'in Ordnung',
    hinweis: 'Hinweis' }[a] ?? a;
}

export function zustandText(z: string): string {
  return { ok: 'in Ordnung', beschaedigt: 'beschädigt', reparatur: 'in Reparatur',
    ausgemustert: 'ausgemustert' }[z] ?? z;
}

function stueckliste(inhalt: InhaltZeile[]): string {
  if (inhalt.length === 0) return '';
  return `<ul class="stueckliste">${inhalt.map((z) =>
    `<li><span class="anzahl">${esc(formatMenge(z.menge))}×</span>` +
    `<span class="was">${esc(z.name)}</span></li>`,
  ).join('')}</ul>`;
}

function knopf(a: Aktion, code: string): string {
  const klasse = `knopf knopf-${a.art}`;
  const beschriftung = `${esc(a.label)}${a.unter ? `<small>${esc(a.unter)}</small>` : ''}`;
  if (a.href) return `<a class="${klasse}" href="${esc(a.href)}">${beschriftung}</a>`;

  const url = a.posten?.url ?? '/api/buchung';
  const felder = a.posten?.felder ?? { code, ziel: String(a.zielId) };
  // data-buchung markiert nur Buchungen — die Warteschlange soll keine
  // Inventurtreffer aufsammeln, die offline ohnehin sinnlos wären.
  const marke = a.posten ? '' : ' data-buchung';
  const versteckt = Object.entries(felder).map(([n, w]) =>
    `<input type="hidden" name="${esc(n)}" value="${esc(w)}">`).join('');
  return `<form method="post" action="${esc(url)}"${marke}>${versteckt}
    <button class="${klasse}" type="submit">${beschriftung}</button>
  </form>`;
}

/** Während einer laufenden Inventur ersetzt dieser Knopf das Buchen. */
export function inventurAktion(inventurId: number, code: string, standort: string): Aktion {
  return {
    art: 'haupt',
    label: '✓ Hier gefunden',
    unter: `Inventur ${standort}`,
    posten: { url: '/api/inventur/treffer', felder: { code, inventur: String(inventurId) } },
  };
}

export function sitzungsBanner(sitzung: Sitzung | null): string {
  if (!sitzung) return '';
  const restMin = Math.max(0, Math.round((sitzung.bis - Date.now()) / 60_000));
  const rest = restMin >= 60
    ? `noch ${Math.floor(restMin / 60)} Std ${restMin % 60} Min`
    : `noch ${restMin} Min`;
  return `<div class="sitzung"><div class="innen">
    <span>📍 ${esc(sitzung.name)}</span>
    <span>${esc(rest)} · <a href="/sitzung/beenden">beenden</a></span>
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
    ? notiz(o.meldung.art, o.meldung.text)
    : '';
  const storno = o.stornoId
    ? `<form method="post" action="/api/storno">
         <input type="hidden" name="id" value="${o.stornoId}">
         <input type="hidden" name="code" value="${esc(e.code)}">
         <button class="knopf knopf-still" type="submit">↩ Rückgängig</button>
       </form>` : '';

  const inhalt = `
${meldung}
<article class="blatt">
  <span class="kennung">${esc(e.code)}</span>
  <h1 class="titel-gross">${esc(e.bezeichnung)}</h1>
  ${e.zustand !== 'ok'
    ? `<p style="margin-top:12px">${marke(zustandText(e.zustand), 'warn')}</p>` : ''}
  ${stueckliste(o.inhalt)}
  <div class="standzeit">
    <span class="wo">${esc(e.standort_name)}</span>
    <span class="wie-lang">${esc(seitText(e.seit))}</span>
  </div>
</article>
${o.aktionen.map((a) => knopf(a, e.code)).join('')}
${storno}
<a class="knopf knopf-still" href="/t/${esc(e.code)}/melden">Schaden melden</a>
<p class="fussnote" id="wgl-wartestand" hidden></p>`;

  return html(seite(inhalt, {
    titel: `${e.code} · ${e.bezeichnung}`,
    kopf: kopf(undefined, { href: '/', text: 'Übersicht' }),
    banner: sitzungsBanner(o.sitzung),
    scripte: '<script src="/app.js"></script>',
  }));
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
    const neben = s.entfernungKm !== undefined
      ? (s.entfernungKm < 1
          ? `${Math.round(s.entfernungKm * 1000)} m entfernt`
          : `${s.entfernungKm.toFixed(1).replace('.', ',')} km entfernt`)
      : s.adresse ?? '';
    return `<li><form method="post" action="/api/buchung" data-buchung>
      <input type="hidden" name="code" value="${esc(o.code)}">
      <input type="hidden" name="ziel" value="${s.id}">
      <button class="knopf ${s.typ === 'lager' ? 'knopf-lager' : 'knopf-zweit'}" type="submit">
        <span>${esc(s.name)}</span>
        ${neben ? `<span class="neben">${esc(neben)}</span>` : ''}
      </button></form></li>`;
  }).join('');

  // Ohne Position alphabetisch — die Seite funktioniert auch ohne JavaScript,
  // sie ist dann nur eine Zeile länger zu lesen.
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
<p class="still">${esc(o.bezeichnung)}</p>
${o.standorte.length === 0
    ? `<div class="blatt"><p><strong>Keine Standorte angelegt.</strong></p>
       <p class="leise" style="margin-top:6px">Das Büro muss zuerst
       Baustellen anlegen.</p></div>`
    : `<ul class="wahl">${eintraege}</ul>`}
<a class="knopf knopf-still" href="/t/${esc(o.code)}">Abbrechen</a>
<p class="fussnote" id="wgl-wartestand" hidden></p>`;

  return html(seite(inhalt, {
    titel: 'Wohin?',
    kopf: kopf('Ziel wählen', { href: `/t/${o.code}`, text: 'Zurück' }),
    banner: sitzungsBanner(o.sitzung),
    scripte: `<script src="/app.js"></script>${skript}`,
  }));
}

/** Was ein Fremder sieht. Kostet nichts, holt gelegentlich Material zurück. */
export function fremdSeite(e: EinheitMitStandort, firma: string, telefon: string): Response {
  const inhalt = `
<article class="blatt" style="text-align:center">
  <p class="still" style="font-size:15px">Eigentum der</p>
  <h1 style="font-size:24px;margin-top:6px">${esc(firma)}</h1>
  <div class="standzeit">
    <span class="wo">${esc(e.bezeichnung)}</span>
    <p style="margin-top:12px"><span class="kennung">${esc(e.code)}</span></p>
  </div>
</article>
<p style="text-align:center" class="still">Gefunden? Bitte melden:</p>
<a class="knopf knopf-haupt" href="tel:${esc(telefon.replace(/\s/g, ''))}">${esc(telefon)}</a>
<p class="fussnote">Mitarbeiter? Dann fehlt auf diesem Handy die Einrichtung —
  bitte im Büro melden.</p>`;
  return html(seite(inhalt, { titel: firma, kopf: kopf(firma) }));
}

export function unbekannterTag(code: string): Response {
  const inhalt = `
${notiz('fehler', 'Unbekannter Tag', `Der Code ${code} ist nicht vergeben.`)}
<form method="get" action="/t">
  <div class="feld"><label for="code">Vertippt? Code vom Aufkleber eingeben</label>
    <input type="text" id="code" name="code" autocapitalize="characters"
      autocomplete="off" placeholder="z. B. K7F2QX" value="${esc(code)}"></div>
  <button class="knopf knopf-lager" type="submit">Suchen</button>
</form>
<a class="knopf knopf-still" href="/">Übersicht</a>`;
  return html(seite(inhalt, { titel: 'Unbekannter Tag', kopf: kopf() }), 404);
}

/** Schaden oder Zustand melden — vier Knöpfe plus optional ein Foto. */
export function meldenSeite(e: EinheitMitStandort, fotoMoeglich: boolean): Response {
  const inhalt = `
<h1>Melden</h1>
<p class="still">${esc(e.code)} · ${esc(e.bezeichnung)}</p>
<form method="post" action="/t/${esc(e.code)}/melden" enctype="multipart/form-data">
  <div class="blatt">
    <div class="feld"><label for="art">Was ist los?</label>
      <select id="art" name="art">
        <option value="beschaedigt">Beschädigt</option>
        <option value="reparatur">Muss in die Reparatur</option>
        <option value="hinweis">Nur ein Hinweis</option>
        <option value="ok">Wieder in Ordnung</option>
      </select></div>
    <div class="feld"><label for="text">Kurz was (optional)</label>
      <input type="text" id="text" name="text" placeholder="z. B. Belag verbogen"></div>
    ${fotoMoeglich ? `<div class="feld"><label for="foto">Foto (optional)</label>
      <input type="file" id="foto" name="foto" accept="image/*" capture="environment"></div>` : ''}
  </div>
  <button class="knopf knopf-haupt" type="submit">Melden</button>
</form>
<a class="knopf knopf-still" href="/t/${esc(e.code)}">Abbrechen</a>`;
  return html(seite(inhalt, {
    titel: 'Melden',
    kopf: kopf('Melden', { href: `/t/${e.code}`, text: 'Zurück' }),
  }));
}
