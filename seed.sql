-- Beispieldaten zum Ausprobieren. NICHT auf der Produktivdatenbank ausfuehren.
-- Tag-Codes sind hier fest vergeben, damit man sie beim Testen abtippen kann;
-- im Betrieb wuerfelt die Anwendung sie.

INSERT INTO artikel (name, kategorie, mengeneinheit) VALUES
  ('Rahmen 2,00 m',            'rahmen',   'Stk'),
  ('Rahmen 1,00 m',            'rahmen',   'Stk'),
  ('Rahmen 0,66 m',            'rahmen',   'Stk'),
  ('Stahlbelag 3,00 m',        'belag',    'Stk'),
  ('Stahlbelag 2,50 m',        'belag',    'Stk'),
  ('Alu-Belag Durchstieg 3,00 m','belag',  'Stk'),
  ('Diagonale 3,00 m',         'aussteifung','Stk'),
  ('Geländerholm 3,00 m',      'gelaender','Stk'),
  ('Bordbrett 3,00 m',         'gelaender','Stk'),
  ('Fußspindel',               'fuss',     'Stk'),
  ('Gerüstrohr 3,00 m',        'rohr',     'Stk'),
  ('Normalkupplung',           'kupplung', 'Stk'),
  ('Treppenturm-Modul',        'treppe',   'Stk');

INSERT INTO standort (name, typ, adresse, lat, lon) VALUES
  ('Lager Werner-Siemens-Str.', 'lager',     'Werner-Siemens-Str. 105, 22113 Hamburg', 53.5265, 10.0824),
  ('Elbchaussee 12',            'baustelle', 'Elbchaussee 12, 22765 Hamburg',          53.5462, 9.9236),
  ('Osdorfer Landstr. 44',      'baustelle', 'Osdorfer Landstr. 44, 22549 Hamburg',    53.5738, 9.8672),
  ('Bötelkamp 31',              'baustelle', 'Bötelkamp 31, 22529 Hamburg',            53.5966, 9.9520);

INSERT INTO einheit (code, typ, bezeichnung, standort_id, seit) VALUES
  ('GB-001', 'traeger',    'Gitterbox Rahmen 2,00 m',     1, datetime('now','-3 days')),
  ('GB-002', 'traeger',    'Gitterbox Rahmen 2,00 m',     1, datetime('now','-3 days')),
  ('GB-003', 'traeger',    'Gitterbox Rahmen 1,00 m',     1, datetime('now','-12 days')),
  ('GB-004', 'traeger',    'Gitterbox Beläge 3,00 m',     2, datetime('now','-67 days')),
  ('GB-005', 'traeger',    'Gitterbox Beläge 3,00 m',     2, datetime('now','-67 days')),
  ('GB-006', 'traeger',    'Gitterbox Diagonalen',        3, datetime('now','-9 days')),
  ('GB-007', 'traeger',    'Gitterbox Geländer/Bordbrett',3, datetime('now','-9 days')),
  ('GB-008', 'traeger',    'Gitterbox Kleinteile',        4, datetime('now','-95 days')),
  ('ST-101', 'einzelteil', 'Treppenturm 8 m',             2, datetime('now','-67 days')),
  ('ST-102', 'einzelteil', 'Treppenturm 6 m',             1, datetime('now','-20 days'));

UPDATE einheit SET artikel_id = 13 WHERE code IN ('ST-101','ST-102');

INSERT INTO inhalt (einheit_id, artikel_id, menge) VALUES
  (1, 1, 40), (2, 1, 40), (3, 2, 48),
  (4, 4, 30), (4, 5, 12),
  (5, 4, 30), (5, 6, 8),
  (6, 7, 60),
  (7, 8, 45), (7, 9, 45),
  (8, 10, 120), (8, 12, 200);

INSERT INTO tag (code, ziel_typ, ziel_id) VALUES
  ('K7F2QX', 'einheit', 1), ('M4NPTB', 'einheit', 2), ('R9HDJC', 'einheit', 3),
  ('W2XKFG', 'einheit', 4), ('B6QMVN', 'einheit', 5), ('T3JRCP', 'einheit', 6),
  ('D8WGKS', 'einheit', 7), ('F5VBQZ', 'einheit', 8), ('H2NMXT', 'einheit', 9),
  ('J7CDRW', 'einheit', 10),
  ('LAGER1', 'standort', 1), ('BAUST2', 'standort', 2),
  ('BAUST3', 'standort', 3), ('BAUST4', 'standort', 4);

INSERT INTO mitarbeiter (name, einladung, rolle) VALUES
  ('Reno Maack',  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'buero'),
  ('Kolonne 1',   'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 'kolonne'),
  ('Kolonne 2',   'cccccccccccccccccccccccccccccccc', 'kolonne');

-- Ersterfassung als Protokollzeilen, damit die Historie nicht bei null anfaengt.
INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id, zeit, quelle, notiz)
SELECT id, NULL, standort_id, seit, 'import', 'Ersterfassung' FROM einheit;
