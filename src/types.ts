export interface Env {
  DB: D1Database;
  SESSIONS: KVNamespace;
  FIRMA: string;
  FIRMA_TELEFON: string;
  /** Passwort fuer die Buero-Oberflaeche. Als Secret setzen. */
  ADMIN_PASSWORT?: string;
  /** Bearer-Token fuer /mcp. Als Secret setzen. */
  MCP_TOKEN?: string;
}

export type StandortTyp = 'lager' | 'baustelle' | 'unterwegs';
export type EinheitTyp = 'traeger' | 'einzelteil';
export type Quelle = 'nfc' | 'qr' | 'manuell' | 'mcp' | 'import';

export interface Standort {
  id: number;
  name: string;
  typ: StandortTyp;
  adresse: string | null;
  lat: number | null;
  lon: number | null;
  extern_id: string | null;
  aktiv: number;
  angelegt_am: string;
  beendet_am: string | null;
}

export interface Einheit {
  id: number;
  code: string;
  typ: EinheitTyp;
  bezeichnung: string;
  artikel_id: number | null;
  standort_id: number;
  seit: string;
  zustand: string;
  aktiv: number;
  angelegt_am: string;
}

export interface Artikel {
  id: number;
  name: string;
  kategorie: string;
  mengeneinheit: string;
  aktiv: number;
}

export interface Mitarbeiter {
  id: number;
  name: string;
  rolle: 'kolonne' | 'buero';
  aktiv: number;
}

export interface InhaltZeile {
  artikel_id: number;
  name: string;
  menge: number;
  mengeneinheit: string;
}

/** Einheit samt aufgeloestem Standort — was die Scan-Seite braucht. */
export interface EinheitMitStandort extends Einheit {
  standort_name: string;
  standort_typ: StandortTyp;
}

export interface Buchung {
  id: number;
  einheit_id: number;
  von_standort_id: number | null;
  nach_standort_id: number;
  zeit: string;
  mitarbeiter_id: number | null;
  quelle: Quelle;
  notiz: string | null;
  storniert: number;
}
