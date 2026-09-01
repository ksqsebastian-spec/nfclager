# Lagerverwaltung mit NFC — J. Werner Gerüstbau

Konzept, Stand 2026-09-01. Noch nicht gebaut — Diskussionsgrundlage.

---

## 1. Die eine Entscheidung, die alles bestimmt

Auf dem iPhone gibt es **kein** NFC-Scannen aus dem Browser heraus. Die Web-NFC-API
(`NDEFReader`) läuft ausschließlich in Chromium-Browsern auf Android. Safari, und damit
auch Chrome/Firefox auf iOS (alle laufen unter der Haube auf WebKit), kennen sie nicht.
Kein Flag, keine Einstellung, kein Workaround. Weltweite Browser-Unterstützung liegt bei
rund 6 %.

Ein Ablauf "Website öffnen → Scan-Knopf drücken → Tag ans Handy" fällt für iPhones also aus.

**Die Lösung dreht die Richtung um: nicht das Handy scannt den Tag, sondern der Tag öffnet
das Handy.**

Auf jedem NFC-Chip steht als Inhalt eine URL:

```
https://lager.werner.hamburg/t/K7F2QX
```

Was dann passiert:

| Gerät | Ablauf |
|---|---|
| **iPhone XS und neuer** | Handy entsperrt in der Hand, Tag antippen → iOS erkennt den URL-Record und zeigt oben ein Banner → antippen → Safari öffnet genau diese Einheit. Keine App, keine Installation, nichts einzurichten. |
| **Android** | Identisch — Tag antippen, Chrome öffnet die Seite. **Zusätzlich**: ist die Seite schon offen, geht per Web NFC Dauer-Scan: Tag an Tag an Tag, ohne die Seite zu verlassen. |
| **iPhone älter als XS / NFC aus** | QR-Code auf demselben Aufkleber als Rückfallebene. Kamera auf, fertig. |

Damit ist der Grundablauf auf **allen** Handys derselbe und braucht null Schulung. Android
bekommt oben drauf einen Turbo fürs Massenabfertigen im Lager.

Ehrlich dazugesagt: Auf dem iPhone sind es pro Einheit drei Interaktionen (Banner antippen,
Seite lädt, Knopf), auf Android eine. Bei einzelnen Teilen auf der Baustelle ist das egal,
beim Ausladen eines vollen LKW nicht. Was dagegen hilft, steht in **Abschnitt 3a**.

Jeder Tag bekommt zusätzlich **beides**: NFC-Chip und aufgedruckten QR + Klartext-Code
(`K7F2QX`). Wenn der Chip mal hin ist, tippt man sechs Zeichen ein. Nie eine Sackgasse.

---

## 2. Was einen Tag bekommt

Gerüstbau heißt Massenware: zehntausende Rahmen, Beläge, Diagonalen, Verstrebungen. Jedes
Einzelteil zu taggen wäre bei ~2 € pro Industrie-Tag fünfstellig teuer, und die Tags
überleben Umschlag, Anhänger und Winter nicht.

Getaggt wird deshalb die **Einheit**, und die gibt es in zwei Sorten:

**a) Ladungsträger** — Gitterbox, Stapel, Palette, Bündel. Der Tag hängt am Träger,
im System steht der gezählte Inhalt:

> **GB-047** — Gitterbox
> 40× Rahmen 2,00 m · 12× Diagonale 3,00 m
> Standort: Baustelle Elbchaussee 12, seit 34 Tagen

**b) Großteile / Wertteile** — Treppenturm, Fahrgerüst, Motorwinde, Wetterschutz-Bauteile,
Bauaufzug. Ein Tag, ein Ding.

Der Inhalt eines Trägers wird beim Packen einmal erfasst und ändert sich selten. Wenn doch,
lässt er sich auf derselben Seite korrigieren. Das ist der ehrliche Kompromiss: nicht
stückgenau, aber kistengenau — und kistengenau ist ungefähr 90 % des Nutzens zu 3 % der
Kosten.

**Erweiterung später ohne Umbau:** Das Schema kennt Einzelteile bereits als eigenen Typ.
Wenn ihr in zwei Jahren doch Rahmen einzeln taggen wollt, ist das ein Datensatz mehr, keine
neue Software.

---

## 3. Der Ablauf auf der Baustelle

### Standard: ein Tap, ein Ergebnis

Tag antippen → Seite geht auf → **zwei Knöpfe, sonst nichts:**

```
┌──────────────────────────────────┐
│  GB-047 · Gitterbox              │
│  40× Rahmen 2,00 m               │
│  12× Diagonale 3,00 m            │
│                                  │
│  Steht auf: Elbchaussee 12       │
│  seit 34 Tagen                   │
├──────────────────────────────────┤
│                                  │
│   ┌────────────────────────┐     │
│   │   ZURÜCK INS LAGER     │     │
│   └────────────────────────┘     │
│                                  │
│   ┌────────────────────────┐     │
│   │   AUF ANDERE BAUSTELLE │     │
│   └────────────────────────┘     │
│                                  │
└──────────────────────────────────┘
```

Ein Tap = gebucht. Grüne Bestätigung, 30 Sekunden lang ein **Rückgängig**-Knopf. Kein
Formular, kein Datum, keine Uhrzeit, keine Menge — alles das weiß das System selbst.

Muss doch eine Baustelle gewählt werden, kommt eine kurze Liste, **nach Entfernung
sortiert** (Handy-Standort). Die Baustelle, auf der man gerade steht, ist fast immer die
oberste. Ein Tap.

### Turbo: Baustellen-Tag als Session

An Bauzaun, Materialcontainer oder Bauwagen hängt ein **Standort-Tag**. Ablauf beim Abladen:

1. Standort-Tag antippen → "Du bist auf Elbchaussee 12" (gilt 4 Stunden)
2. Danach jede Gitterbox antippen → **ein Tap, keine Auswahl mehr**, Ziel steht schon fest

40 Einheiten abladen dauert so 40 Antipper. Auf Android mit Dauer-Scan noch schneller: Seite
einmal offen, dann nur noch Tags ans Handy halten.

Das ist der Ablauf, der das Ding wirklich idiotensicher macht. Falsche Baustelle
auszuwählen wird praktisch unmöglich, weil man sie gar nicht mehr auswählt.

### Kein Netz auf der Baustelle

Buchungen laufen in eine lokale Warteschlange im Handy und gehen raus, sobald wieder Empfang
ist. Der Mann sieht "gespeichert, wird übertragen" — für ihn ändert sich nichts. Das ist auf
Baustellen kein Sonderfall, sondern Normalbetrieb.

### Wenn ein Fremder scannt

Tippt jemand ohne Berechtigung den Tag an, sieht er keine Buchungsknöpfe, sondern:

> **Eigentum der J. Werner Gerüstbau GmbH & Co. KG**
> Hamburg · 040 …
> Gefunden? Bitte melden.

Kostet nichts und holt gelegentlich Material zurück.

---

## 3a. Massenscannen auf dem iPhone — drei Wege

Native iOS-Apps **können** NFC lesen; CoreNFC gibt es seit iOS 11. Die Einschränkung aus
Abschnitt 1 gilt ausschließlich dem Browser. Für den Ablauf beim Be- und Entladen, wo 40
Einheiten am Stück durchlaufen, gibt es damit drei Möglichkeiten:

### Weg A — Banner-Weg, so wie oben (Empfehlung für den Start)
Keine Installation, keine Kosten, funktioniert am Tag der Inbetriebnahme auf jedem Handy.
Für einzelne Einheiten draußen völlig ausreichend. Für den vollen LKW zäh.

### Weg B — ein Android-Gerät als Scan-Station im Lager
Massenscannen passiert fast immer am selben Ort: im Lager beim Beladen. Draußen sind es pro
Baustelle eine Handvoll Einheiten. Ein einfaches Android-Handy oder -Tablet, das im Lager
liegt, löst damit das Mengenproblem vollständig — mit Web-NFC-Dauerscan, Tag an Tag an Tag.

**Kosten: 150–200 € einmalig.** Kein Apple-Konto, kein Rollout, keine App auf 20 Geräten.
Die iPhones draußen machen weiter Weg A. Preis-Leistungs-Sieger und der Grund, warum die
App-Frage warten kann.

### Weg C — eigene App per Capacitor
Capacitor wickelt **genau dieselbe Web-App** ein, die der Worker ausliefert. Kein zweites
Frontend, kein Rewrite — dieselbe Codebasis plus NFC-Plugin (z. B. Capawesome, deckt iOS,
Android und Web mit einer API ab).

Ablauf auf dem iPhone dann: App auf → „Scannen" → Apples System-Dialog erscheint → Tag für
Tag antippen. Mit `invalidateAfterFirstRead: false` liest eine Sitzung **beliebig viele Tags
am Stück, bis zum 60-Sekunden-Limit**. Für 40 Gitterboxen ist das ein anderer Tag.

Der Aufwand liegt nicht in der Entwicklung, sondern in der Verteilung:

- 99 €/Jahr Apple Developer Program
- Verteilung über App Store oder Apple Business Manager — TestFlight scheidet aus,
  Builds laufen nach 90 Tagen ab
- Installation und Pflege auf jedem Diensthandy
- Jedes Update geht durch die Review

### Warum das jetzt nicht entschieden werden muss

Tag-Inhalt, Datenmodell, Worker, Datenbank und MCP sind in allen drei Wegen **identisch**.
Die App wäre später ein zusätzliches Frontend auf denselben API-Endpunkten, kein Umbau. Es
geht also nichts verloren, wenn wir mit A + B starten und C erst bauen, falls die Kolonnen
im Praxistest sagen, dass es nervt.

**Für das Beschreiben der Tags** nutzen wir ohnehin eine fertige App (NFC Tools, NXP
TagWriter) — 500 Tags einmal programmieren und schreibschützen. Dafür sind die gut, für den
Tagesablauf nicht: sie lesen den Tag und zeigen die URL, die man dann noch antippen muss.
Das sind mehr Schritte als das Banner von selbst.

---

## 4. Wer darf buchen

Kein Login mit Benutzername und Passwort — das ist auf einer Baustelle mit Handschuhen der
sichere Weg in die Nichtbenutzung.

Stattdessen: Jeder Mitarbeiter bekommt **einmalig** einen Einladungslink (WhatsApp vom
Büro). Einmal antippen, das Handy merkt sich einen Token. Ab da ist er dauerhaft erkannt,
jede Buchung trägt seinen Namen. Handy weg oder Mitarbeiter raus → Token im Büro sperren.

---

## 5. Was das Ganze eigentlich bringt

Alle vier Ziele hängen an **einer** Datenstruktur — dem Buchungsprotokoll. Jede Buchung ist
eine Zeile: welche Einheit, von wo, nach wo, wann, wer. Daraus fällt alles andere heraus:

| Ziel | Wie es entsteht |
|---|---|
| **Verlust stoppen** | Einheiten, die auf einer abgeschlossenen Baustelle stehen, oder seit X Wochen ohne Rückbuchung. Wöchentliche Überfällig-Liste. Wer zuletzt gebucht hat, steht dran — nicht um Schuld zu verteilen, sondern um nachfragen zu können, solange sich noch jemand erinnert. |
| **Vorhaltezeiten** | Differenz zwischen Raus- und Rückbuchung, je Einheit und Baustelle. Ergibt einen lückenlosen, zeitgestempelten Nachweis — genau das, was bei Streit über die Mietdauer fehlt. |
| **Bestand & Disposition** | Summe des Lagerbestands über alle Einheiten. "Reichen 400 Rahmen für den Auftrag Osdorf?" wird eine Abfrage statt eines Anrufs. |
| **Inventur** | Inventurmodus: Lager abtappen, das System zeigt live, was noch fehlt. Was am Ende offen ist, ist die Differenz — kein Zettel, keine Nachbearbeitung. |

Der eigentliche Hebel ist Nummer 1. Materialverlust ist im Gerüstbau eine der größten
stillen Kostenstellen, und die Frage "wo ist das eigentlich geblieben" ist heute meist
sechs Monate nach dem Verschwinden nicht mehr beantwortbar.

---

## 6. Technik

Gleiches Muster wie eure bestehenden Worker (`tuerwerk`, `mikdaten`):

```
Cloudflare Worker  (Hono)
├── /t/:code           Scan-Seite, serverseitig gerendertes HTML
├── /api/*             Buchungen vom Handy
├── /mcp               MCP-Server, Streamable HTTP + Bearer
└── /admin/*           Büro-Oberfläche
      │
      ├── D1        Einheiten, Artikel, Standorte, Buchungen
      ├── KV        Sessions, Gerätetokens, Baustellen-Session
      └── R2        Fotos (Schäden, Ablieferungsnachweise)
```

**Bewusst serverseitig gerendertes HTML, keine SPA.** Auf einer Baustelle mit einem Balken
Empfang gewinnt eine 8-KB-Seite gegen ein 300-KB-JavaScript-Bundle jedes Mal. Service Worker
nur fürs Offline-Queueing.

### Datenmodell (Kern)

| Tabelle | Zweck |
|---|---|
| `artikel` | Materialstamm: Rahmen 2,00 m, Belag 3,00 m, Diagonale … mit Mengeneinheit |
| `einheit` | Das getaggte Ding: Code, Typ (Träger/Einzelteil), aktueller Standort, Zustand |
| `inhalt` | Was in einem Träger liegt: Einheit × Artikel × Menge |
| `standort` | Lager, Baustellen, "unterwegs". Mit `extern_id` für spätere HERO-Zuordnung |
| `buchung` | Das Protokoll. Einheit, von, nach, wann, wer, Quelle, optional Geoposition |
| `tag` | Chip-UID ↔ Einheit. **Getrennt von der Einheit**, damit ein kaputter Tag ersetzt werden kann, ohne die Historie zu verlieren |
| `mitarbeiter` | Name, Gerätetoken, aktiv |

Ein Detail mit großer Wirkung: In der URL steht der **Tag-Code**, nicht die Einheiten-ID.
Tag abgerissen → neuen Tag draufkleben, im Büro der Einheit zuordnen, alles bleibt
zusammenhängend. Bei zehntausenden Umschlägen pro Jahr wird das definitiv gebraucht.

### Tag-Hardware

Papieraufkleber überleben eine Gerüstbau-Baustelle nicht. Was funktioniert:

- **On-Metal-NFC-Tags, IP68, NTAG213** — 25–35 mm, Industriequalität. Gitterboxen sind aus
  Stahl, und Metall killt normale NFC-Antennen komplett. On-Metal ist hier keine Option,
  sondern Voraussetzung.
- **Preis:** rund 1,40–2,60 € pro Stück, mit Mengenrabatt Richtung 1,40 €. Bei 500 Einheiten
  also grob **700–1.300 €** einmalig plus Reserve für Verlust.
- **Befestigung:** genietet, geschraubt oder mit Industriekleber — nicht nur geklebt.
- **Nach dem Beschreiben schreibgeschützt setzen**, damit niemand versehentlich oder
  absichtlich eine fremde URL draufschreibt.

Bezugsquellen mit passendem Sortiment sind z. B. Shop NFC (IT), Confidex Ironside, HID
Global. Vor der Großbestellung: **10 Stück Muster bestellen und an einer echten Gitterbox
testen** — Lesereichweite auf Stahl variiert stark je nach Modell und Montageort.

---

## 7. MCP-Server

Ihr habt schon `hero-mcp`, `sevdesk-mcp`, `mikdaten`, `tuerwerk` an `mcp-hub`. Der
Lager-Server kommt im selben Stil dazu — deutsche Tool-Namen, Streamable HTTP unter `/mcp`,
Bearer-Auth.

Dass Anbindungen **nur über MCP** laufen sollen, macht die Sache angenehm einfach: Das
Lagertool bleibt eigenständig, kennt HERO nicht und muss keine fremde API pflegen. Die
Verbindung entsteht auf Claude-Ebene — beide Server hängen am Hub, und Claude bringt die
Daten zusammen:

> *"Welche Baustellen aus HERO sind abgeschlossen, aber es steht noch Material drauf?"*

Claude fragt HERO nach Projektstatus, das Lager nach Beständen, und legt beides übereinander.
Kein Integrationscode, keine Synchronisation, kein Datenabgleich, der schiefgehen kann.

### Werkzeuge

**Lesen**
| Tool | Zweck |
|---|---|
| `bestand` | Was liegt wo — gefiltert nach Artikel, Standort, Typ |
| `einheit` | Alles zu einer Einheit inkl. voller Bewegungshistorie |
| `baustelle_bestand` | Was steht auf Baustelle X, seit wann, wie viele Vorhaltetage |
| `ueberfaellig` | Material über der Schwelle draußen, oder auf beendeter Baustelle |
| `vorhaltung` | Vorhaltetage je Baustelle/Zeitraum — Grundlage für die Abrechnung |
| `verlust` | Nicht zurückgekehrtes Material, nach Zeitraum, Baustelle oder Kolonne |
| `suche` | Freitext über Einheiten, Artikel, Standorte |

**Schreiben**
| Tool | Zweck |
|---|---|
| `buchung_anlegen` | Umbuchung oder Korrektur aus dem Büro heraus |
| `einheit_anlegen` | Neue Gitterbox/Großteil samt Inhalt |
| `inhalt_aendern` | Inhalt eines Trägers korrigieren |
| `standort_anlegen` | Neue Baustelle |
| `tag_zuordnen` | Ersatztag auf bestehende Einheit |
| `inventur_start` / `inventur_abschluss` | Inventurlauf mit Soll-/Ist-Abgleich |

Damit kann Reno im Chat fragen *"was steht seit über acht Wochen draußen"* oder *"wie viele
Rahmen 2 m sind frei"* und bekommt die Antwort, ohne irgendeine Oberfläche zu öffnen.

---

## 8. Vorgehen

**Phase 1 — nutzbar** ✅ gebaut
Tag-Schema und URL-Struktur · Scan-Seite mit zwei Knöpfen · Standortliste nach Entfernung ·
Bestandsübersicht fürs Büro · MCP lesend · Scan-Station für Android (Weg B)

**Phase 2 — schnell** ✅ gebaut
Baustellen-Session-Tag · Offline-Warteschlange · Inhaltsverwaltung für Träger ·
wöchentlicher Überfällig-Lauf · MCP schreibend

**Phase 3 — auswertbar** ✅ gebaut
Vorhaltungsauswertung für die Abrechnung · Inventurmodus · Foto bei der Schadensmeldung ·
Verlustliste je Baustelle

**Offen — bewusst nicht gebaut**
- *Capacitor-Wrapper (Weg C)* für die iPhone-Kolonnen. Entscheidung erst nach dem
  Praxistest, auf Basis echter Rückmeldung statt Vermutung. Der Aufwand liegt im
  Apple Developer Program und im Verteilweg, nicht im Code.
- *Ersterfassung*: 20 Muster-Tags an einer Kolonne testen, dann Lager abtaggen.
  Das ist Handarbeit vor Ort, keine Software.
- *E-Mail für den Wochenlauf*: der Lauf schreibt seinen Stand in die Datenbank und
  kann einen Webhook (Slack/Teams) bedienen. Echte E-Mail bräuchte einen Versanddienst;
  ohne einen solchen wäre die Zustellung nicht verlässlich, und eine Meldung, die
  vielleicht ankommt, ist schlimmer als keine.

Wichtig für Phase 1: **eine Kolonne, echte Baustelle, zwei Wochen.** Wenn der Ablauf da nicht
von selbst läuft, hilft kein zusätzliches Feature — dann stimmt der Ablauf nicht, und das
merkt man nur draußen, nicht am Schreibtisch.

---

## 9. Offen — vor dem Bau zu klären

1. **Wie viele Einheiten** ungefähr? Das bestimmt Tag-Budget und ob die Ersterfassung ein
   Nachmittag oder eine Woche ist.
2. **Wie viele Baustellen** laufen gleichzeitig? Bei über ~30 braucht die Standortliste
   eine Suche, darunter reicht Sortierung nach Entfernung.
3. **Gibt es heute schon eine Materialliste** (Excel, HERO-Artikelstamm)? Dann Import statt
   Abtippen.
4. **Wer erfasst die Ersterfassung?** Realistisch ein bis zwei Tage zu zweit im Lager:
   Tag drauf, Inhalt zählen, buchen.
5. **Domain** — Vorschlag: kurze eigene Domain oder Subdomain unter
   `j-werner-geruestbau.de`. Steht als Klartext unter dem QR, sollte kurz sein.
6. **Sind auch Subunternehmer/Fremdkolonnen** im Spiel? Wenn ja, brauchen die Tokens mit
   eingeschränkten Rechten.
7. **Wo passiert das Massenscannen wirklich?** Wenn fast nur im Lager, reicht Weg B und die
   App-Frage erledigt sich. Wenn Kolonnen auch draußen regelmäßig 30+ Einheiten am Stück
   buchen, wird Weg C relevant. Das ist die einzige Frage, die den Zuschnitt noch verändert.
