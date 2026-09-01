-- Phase 2/3: Inventur, Schadensmeldungen, woechentlicher Ueberfaellig-Lauf.

-- Ein Inventurlauf je Standort. Waehrend er laeuft, zaehlt jeder Scan als
-- "gefunden"; am Ende ist die Differenz zum Soll die Fehlliste.
CREATE TABLE inventur (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  standort_id    INTEGER NOT NULL REFERENCES standort(id),
  gestartet_am   TEXT    NOT NULL DEFAULT (datetime('now')),
  gestartet_von  INTEGER REFERENCES mitarbeiter(id),
  beendet_am     TEXT,
  soll_anzahl    INTEGER,
  ist_anzahl     INTEGER,
  notiz          TEXT
);
CREATE INDEX idx_inventur_offen ON inventur(standort_id, beendet_am);

CREATE TABLE inventur_treffer (
  inventur_id INTEGER NOT NULL REFERENCES inventur(id) ON DELETE CASCADE,
  einheit_id  INTEGER NOT NULL REFERENCES einheit(id),
  zeit        TEXT    NOT NULL DEFAULT (datetime('now')),
  -- Einheit stand laut System woanders und wurde hier gefunden.
  war_woanders INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (inventur_id, einheit_id)
);

-- Schadens- und Zustandsmeldungen, optional mit Foto in R2.
CREATE TABLE meldung (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  einheit_id     INTEGER NOT NULL REFERENCES einheit(id),
  art            TEXT    NOT NULL CHECK (art IN ('beschaedigt', 'reparatur', 'ok', 'hinweis')),
  text           TEXT,
  foto_schluessel TEXT,
  zeit           TEXT    NOT NULL DEFAULT (datetime('now')),
  mitarbeiter_id INTEGER REFERENCES mitarbeiter(id),
  erledigt       INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_meldung_offen ON meldung(erledigt, zeit DESC);
CREATE INDEX idx_meldung_einheit ON meldung(einheit_id, zeit DESC);

-- Protokoll des woechentlichen Laufs: erlaubt "neu seit letzter Woche"
-- statt jede Woche dieselbe Liste zu schicken.
CREATE TABLE ueberfaellig_lauf (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  zeit     TEXT    NOT NULL DEFAULT (datetime('now')),
  anzahl   INTEGER NOT NULL,
  neu      INTEGER NOT NULL DEFAULT 0,
  codes    TEXT    NOT NULL DEFAULT '',
  gemeldet INTEGER NOT NULL DEFAULT 0
);
