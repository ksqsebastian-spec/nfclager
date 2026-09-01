-- NFC-Lagerverwaltung — Grundschema
-- Siehe KONZEPT.md Abschnitt 6.

-- Materialstamm: Rahmen 2,00 m, Belag 3,00 m, Diagonale ...
CREATE TABLE artikel (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  kategorie     TEXT    NOT NULL DEFAULT 'sonstiges',
  mengeneinheit TEXT    NOT NULL DEFAULT 'Stk',
  aktiv         INTEGER NOT NULL DEFAULT 1
);
CREATE UNIQUE INDEX idx_artikel_name ON artikel(name);

-- Lager, Baustellen, "unterwegs".
-- extern_id haelt die Tuer zu HERO offen, ohne dass wir heute etwas anbinden.
CREATE TABLE standort (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  typ        TEXT    NOT NULL CHECK (typ IN ('lager', 'baustelle', 'unterwegs')),
  adresse    TEXT,
  lat        REAL,
  lon        REAL,
  extern_id  TEXT,
  aktiv      INTEGER NOT NULL DEFAULT 1,
  angelegt_am TEXT   NOT NULL DEFAULT (datetime('now')),
  beendet_am TEXT
);
CREATE INDEX idx_standort_aktiv ON standort(aktiv, typ);

-- Das getaggte Ding: Gitterbox/Stapel (traeger) oder Treppenturm/Winde (einzelteil).
CREATE TABLE einheit (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  code        TEXT    NOT NULL,               -- sprechend, z.B. "GB-047"
  typ         TEXT    NOT NULL CHECK (typ IN ('traeger', 'einzelteil')),
  bezeichnung TEXT    NOT NULL,
  artikel_id  INTEGER REFERENCES artikel(id), -- nur bei Einzelteilen gesetzt
  standort_id INTEGER NOT NULL REFERENCES standort(id),
  seit        TEXT    NOT NULL DEFAULT (datetime('now')),
  zustand     TEXT    NOT NULL DEFAULT 'ok' CHECK (zustand IN ('ok', 'beschaedigt', 'reparatur', 'ausgemustert')),
  aktiv       INTEGER NOT NULL DEFAULT 1,
  angelegt_am TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE UNIQUE INDEX idx_einheit_code ON einheit(code);
CREATE INDEX idx_einheit_standort ON einheit(standort_id, aktiv);

-- Was liegt in einem Traeger drin.
CREATE TABLE inhalt (
  einheit_id INTEGER NOT NULL REFERENCES einheit(id) ON DELETE CASCADE,
  artikel_id INTEGER NOT NULL REFERENCES artikel(id),
  menge      REAL    NOT NULL,
  PRIMARY KEY (einheit_id, artikel_id)
);

-- Chip <-> Ziel. BEWUSST getrennt von einheit: ein abgerissener Tag darf die
-- Historie nicht mitnehmen. Ein Tag zeigt entweder auf eine Einheit oder auf
-- einen Standort (Baustellen-Session, KONZEPT.md Abschnitt 3).
CREATE TABLE tag (
  code           TEXT    PRIMARY KEY,          -- steht in der URL: /t/K7F2QX
  ziel_typ       TEXT    NOT NULL CHECK (ziel_typ IN ('einheit', 'standort')),
  ziel_id        INTEGER NOT NULL,
  chip_uid       TEXT,                         -- optional, beim Programmieren erfasst
  aktiv          INTEGER NOT NULL DEFAULT 1,
  programmiert_am TEXT   NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_tag_ziel ON tag(ziel_typ, ziel_id, aktiv);

CREATE TABLE mitarbeiter (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  token_hash    TEXT,                          -- sha256 des Geraetetokens
  einladung     TEXT,                          -- Einmalcode, wird bei Einloesung geleert
  rolle         TEXT    NOT NULL DEFAULT 'kolonne' CHECK (rolle IN ('kolonne', 'buero')),
  aktiv         INTEGER NOT NULL DEFAULT 1,
  angelegt_am   TEXT    NOT NULL DEFAULT (datetime('now')),
  zuletzt_aktiv TEXT
);
CREATE UNIQUE INDEX idx_mitarbeiter_token ON mitarbeiter(token_hash) WHERE token_hash IS NOT NULL;
CREATE UNIQUE INDEX idx_mitarbeiter_einladung ON mitarbeiter(einladung) WHERE einladung IS NOT NULL;

-- Das Protokoll. Hieraus faellt alles andere heraus: Bestand, Vorhaltezeit,
-- Ueberfaelligkeit, Verlust. Zeilen werden nie geaendert, nur storniert.
CREATE TABLE buchung (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  einheit_id       INTEGER NOT NULL REFERENCES einheit(id),
  von_standort_id  INTEGER REFERENCES standort(id),
  nach_standort_id INTEGER NOT NULL REFERENCES standort(id),
  zeit             TEXT    NOT NULL DEFAULT (datetime('now')),
  mitarbeiter_id   INTEGER REFERENCES mitarbeiter(id),
  quelle           TEXT    NOT NULL DEFAULT 'nfc' CHECK (quelle IN ('nfc', 'qr', 'manuell', 'mcp', 'import')),
  lat              REAL,
  lon              REAL,
  notiz            TEXT,
  storniert        INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_buchung_einheit ON buchung(einheit_id, zeit DESC);
CREATE INDEX idx_buchung_zeit ON buchung(zeit DESC);
CREATE INDEX idx_buchung_ziel ON buchung(nach_standort_id, zeit DESC);
