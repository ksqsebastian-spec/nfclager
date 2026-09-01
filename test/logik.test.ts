import { describe, expect, it } from 'vitest';
import { aktionenFuer } from '../src/views/scan';
import { istTagCode, kanonisch, tagCodeErzeugen, tagCodeNormalisieren } from '../src/codes';
import { entfernungKm, seitText, tageSeit } from '../src/geo';
import type { EinheitMitStandort, Standort } from '../src/types';

const LAGER: Standort = {
  id: 1, name: 'Lager', typ: 'lager', adresse: null, lat: null, lon: null,
  extern_id: null, aktiv: 1, angelegt_am: '', beendet_am: null,
};

function einheit(standortId: number, typ: 'lager' | 'baustelle'): EinheitMitStandort {
  return {
    id: 10, code: 'GB-001', typ: 'traeger', bezeichnung: 'Gitterbox',
    artikel_id: null, standort_id: standortId, seit: '2026-08-01 08:00:00',
    zustand: 'ok', aktiv: 1, angelegt_am: '', standort_name: 'X', standort_typ: typ,
  };
}

describe('aktionenFuer', () => {
  it('macht das Buchen mit laufender Sitzung zu einem Tap', () => {
    const a = aktionenFuer(einheit(1, 'lager'),
      { standortId: 7, name: 'Elbchaussee 12', bis: Date.now() + 1e6 }, LAGER);
    expect(a[0]?.art).toBe('haupt');
    expect(a[0]?.zielId).toBe(7);
    expect(a[0]?.unter).toBe('Elbchaussee 12');
  });

  it('bietet ohne Sitzung den Rueckweg ins Lager als Hauptknopf an', () => {
    const a = aktionenFuer(einheit(7, 'baustelle'), null, LAGER);
    expect(a[0]?.art).toBe('haupt');
    expect(a[0]?.label).toBe('Zurück ins Lager');
    expect(a[0]?.zielId).toBe(LAGER.id);
  });

  it('bietet im Lager keinen Knopf ins Lager an', () => {
    const a = aktionenFuer(einheit(1, 'lager'), null, LAGER);
    expect(a.some((x) => x.zielId === LAGER.id)).toBe(false);
    expect(a[0]?.label).toBe('Auf Baustelle buchen');
    expect(a[0]?.art).toBe('haupt');
  });

  it('zeigt keinen Hierher-Knopf, wenn die Einheit schon am Sitzungsort steht', () => {
    const a = aktionenFuer(einheit(7, 'baustelle'),
      { standortId: 7, name: 'Elbchaussee 12', bis: Date.now() + 1e6 }, LAGER);
    expect(a.some((x) => x.label === 'Hierher buchen')).toBe(false);
    expect(a[0]?.label).toBe('Zurück ins Lager');
  });

  it('kommt ohne angelegtes Lager klar', () => {
    const a = aktionenFuer(einheit(7, 'baustelle'), null, null);
    expect(a).toHaveLength(1);
    expect(a[0]?.href).toBe('/t/GB-001/wohin');
  });

  it('gibt immer mindestens einen Weg zum Ziel', () => {
    for (const sitzung of [null, { standortId: 1, name: 'L', bis: Date.now() + 1e6 }]) {
      for (const [id, typ] of [[1, 'lager'], [7, 'baustelle']] as const) {
        expect(aktionenFuer(einheit(id, typ), sitzung, LAGER).length).toBeGreaterThan(0);
      }
    }
  });
});

describe('Tag-Codes', () => {
  it('erzeugt gueltige Codes ohne verwechselbare Zeichen', () => {
    for (let i = 0; i < 500; i++) {
      const c = tagCodeErzeugen();
      expect(istTagCode(c)).toBe(true);
      expect(c).not.toMatch(/[01OIL AEU Y]/);
    }
  });

  it('biegt typische Vertipper gerade', () => {
    expect(tagCodeNormalisieren('k7f2qx')).toBe('K7F2QX');
    expect(tagCodeNormalisieren('0IL')).toBe('DJJ');       // O->D, I->J, L->J
    expect(tagCodeNormalisieren('k7f-2 qx')).toBe('K7F2QX');
  });

  it('laesst sprechende Einheitencodes unangetastet', () => {
    // Die Vertipper-Korrektur wuerde "GB-001" zu "GBDDJ" machen. Sie darf
    // deshalb nie die erste Lesart sein — die Grundform behaelt den Code.
    expect(kanonisch('GB-001')).toBe('GB-001');
    expect(kanonisch(' gb-001 ')).toBe('GB-001');
    expect(kanonisch('ST-101')).toBe('ST-101');
  });

  it('erlaubt Tag-Codes ausserhalb des Generator-Alphabets', () => {
    // Geklebte Tags duerfen nicht unlesbar werden, nur weil sich der
    // Generator aendert. kanonisch() filtert deshalb nicht nach Alphabet.
    expect(kanonisch('BAUST3')).toBe('BAUST3');
    expect(kanonisch('LAGER1')).toBe('LAGER1');
  });

  it('kollidiert bei 5000 Codes nicht', () => {
    const menge = new Set<string>();
    for (let i = 0; i < 5000; i++) menge.add(tagCodeErzeugen());
    expect(menge.size).toBe(5000);
  });
});

describe('Geo und Zeit', () => {
  it('rechnet Hamburger Entfernungen plausibel', () => {
    // Lager Werner-Siemens-Str. -> Elbchaussee, Luftlinie gut 11 km
    const km = entfernungKm(53.5265, 10.0824, 53.5462, 9.9236);
    expect(km).toBeGreaterThan(9);
    expect(km).toBeLessThan(13);
  });

  it('zaehlt Tage ab dem Buchungszeitpunkt', () => {
    const jetzt = new Date('2026-09-01T12:00:00Z');
    expect(tageSeit('2026-09-01 08:00:00', jetzt)).toBe(0);
    expect(tageSeit('2026-08-30 08:00:00', jetzt)).toBe(2);
    expect(seitText('2026-09-01 08:00:00', jetzt)).toBe('seit heute');
    expect(seitText('2026-08-31 08:00:00', jetzt)).toBe('seit gestern');
    expect(seitText('2026-07-29 08:00:00', jetzt)).toBe('seit 34 Tagen');
  });
});
