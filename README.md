# nfclager — Lagerverwaltung mit NFC

Cloudflare Worker für J. Werner Gerüstbau. Gitterboxen und Großteile tragen einen
NFC-Tag; antippen bucht sie zwischen Lager und Baustellen. Ein MCP-Server macht
Bestand, Vorhaltezeiten und überfälliges Material im Chat abfragbar.

Konzept und Begründung der Architekturentscheidungen: **[KONZEPT.md](KONZEPT.md)**.
Diese Datei beschreibt nur Betrieb und Inbetriebnahme.

## Was steht

**Auf der Baustelle**
- **Scan-Seite** `/t/:code` — zwei Knöpfe, ein Tap gebucht, Rückgängig binnen 15 Minuten
- **Baustellen-Sitzung** — Standort-Tag antippen, danach geht jede Einheit mit einem Tap dorthin (4 Std)
- **Standortauswahl nach Entfernung** — die Baustelle, auf der man steht, steht oben
- **Offline** — ohne Netz öffnet die Hülle aus dem Cache, zeigt die Einheit aus dem
  letzten Abzug und legt die Buchung in eine Warteschlange. Übertragung, sobald
  wieder Empfang da ist — mit dem Zeitpunkt des Scans, nicht dem der Übertragung
- **Schaden melden** `/t/:code/melden` — vier Knöpfe, optional Foto, setzt den Zustand
- **Inventur** `/inventur` — Standort abtappen, live sehen was fehlt. Einheiten, die
  laut System woanders stehen, werden automatisch hierher gebucht
- **Scan-Station** `/scan` — Web-NFC-Dauerscan für Android (Weg B aus dem Konzept)

**Im Büro** `/buero`
- Bestand, Einheiten, Standorte, Artikel, Mitarbeiter, Etikettendruck mit QR
- **Auswertung** — Vorhaltetage je Baustelle, vermuteter Materialverlust
- **Meldungen** — offene Schäden mit Fotos
- **Wochenlauf** — montags 6 Uhr UTC; meldet nur, was seit dem letzten Lauf NEU
  überfällig ist. Optionaler Webhook (`MELDUNG_WEBHOOK`) nach Slack oder Teams

**MCP** `/mcp` — 17 Werkzeuge
- lesend: `bestand`, `einheit`, `baustelle_bestand`, `ueberfaellig`, `vorhaltung`,
  `verlust`, `meldungen`, `suche`, `inventur_stand`
- schreibend: `buchung_anlegen`, `einheit_anlegen`, `inhalt_setzen`,
  `standort_anlegen`, `standort_beenden`, `tag_zuordnen`, `inventur_start`,
  `inventur_abschluss`

## Inbetriebnahme

```bash
npm install

# D1 und KV anlegen, die ausgegebenen IDs in wrangler.jsonc eintragen
npx wrangler d1 create nfclager
npx wrangler kv namespace create SESSIONS
npx wrangler r2 bucket create nfclager-fotos

npx wrangler d1 migrations apply nfclager --remote

# Geheimnisse setzen
npx wrangler secret put ADMIN_PASSWORT   # Zugang zur Büro-Oberfläche
npx wrangler secret put MCP_TOKEN        # Bearer-Token für /mcp
npx wrangler secret put MELDUNG_WEBHOOK  # optional: Slack/Teams für den Wochenlauf

npx wrangler deploy
```

Danach im Büro anlegen, in dieser Reihenfolge:

1. **Lager** unter `/buero/standorte` — der erste Standort vom Typ `lager` ist das
   Hauptlager und damit das Ziel des Knopfes „Zurück ins Lager".
2. **Baustellen** — Koordinaten eintragen, wenn die Sortierung nach Nähe greifen soll.
3. **Artikel** — der Materialstamm liegt in `seed.sql` als Vorlage bereit.
4. **Einheiten** — jede erzeugt automatisch einen Tag-Code.
5. **Mitarbeiter** — Einladungslink einmal per WhatsApp schicken, fertig.

### Lokal ausprobieren

```bash
npx wrangler d1 migrations apply nfclager --local
npx wrangler d1 execute nfclager --local --file=./seed.sql
printf 'ADMIN_PASSWORT=test1234\nMCP_TOKEN=test-mcp-token\n' > .dev.vars
npx wrangler dev
```

Beispieldaten: Einladungslink `/einladung/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb` (Kolonne 1),
Einheiten-Tags `K7F2QX` … `J7CDRW`, Standort-Tags `LAGER1`, `BAUST2`–`BAUST4`.

## Tags programmieren

1. `/buero/etiketten` öffnen — Bogen mit QR, Klartextcode und Firmenzeile, auf
   wetterfestes Material drucken.
2. Chips mit **NFC Tools** (Android/iOS) oder **NXP TagWriter** beschreiben: einen
   **URI-Record** mit derselben URL wie im QR, also `https://<domain>/t/<CODE>`.
3. **Schreibschutz setzen.** Danach kann niemand mehr eine fremde URL draufschreiben.

Hardware: **On-Metal-Tags, IP68, NTAG213**. Gitterboxen sind aus Stahl — normale
NFC-Antennen funktionieren dort nicht. Vor der Großbestellung zehn Muster an einer
echten Gitterbox testen; die Lesereichweite auf Stahl schwankt stark je nach Modell
und Montageort.

## MCP anbinden

```
URL:    https://<domain>/mcp
Header: Authorization: Bearer <MCP_TOKEN>
```

Streamable HTTP, JSON-RPC — dasselbe Muster wie `tuerwerk` und `mikdaten`, lässt
sich also genauso an `mcp-hub` hängen. Der Server ist bewusst nur lesend: Buchungen
entstehen durch Scannen vor Ort, nicht im Chat.

Anbindungen an HERO oder sevdesk laufen **nicht** über Code in diesem Worker,
sondern auf Claude-Ebene über beide MCP-Server gleichzeitig — siehe KONZEPT.md
Abschnitt 7.

## Entwicklung

```bash
npm run typecheck
npm test
npm run build      # Trockenlauf des Deploys
```

## Aufbau

| Datei | Zweck |
|---|---|
| `src/index.ts` | Routen |
| `src/db.ts` | Abfragen — Bestand, Überfälligkeit, Buchen, Stornieren |
| `src/mcp.ts` | MCP-Server |
| `src/auth.ts` | Gerätetokens, Baustellen-Sitzung, Bürozugang |
| `src/codes.ts` | Tag-Codes erzeugen und Eingaben auflösen |
| `src/views/scan.ts` | Scan-Seite; `aktionenFuer()` entscheidet über die Knöpfe |
| `src/views/buero.ts` | Büro-Oberfläche |
| `src/views/station.ts` | Web-NFC-Dauerscan |
| `src/views/inventur.ts` | Inventurlauf |
| `src/views/offline.ts` | Service Worker, Warteschlange, Offline-Hülle |
| `src/views/druck.ts` | Etikettenbogen |
| `migrations/` | D1-Schema |

Serverseitig gerendertes HTML, kein Framework im Browser, keine Webfonts. Die
Scan-Seite liegt unter 10 KB — auf der Baustelle mit einem Balken Empfang ist das
der Unterschied zwischen benutzbar und nicht benutzbar.

Der Kernablauf (Tag antippen, Knopf drücken, gebucht) läuft als normaler
Formular-POST **ohne JavaScript**. `app.js` macht ihn nur robust: Warteschlange,
Offline-Hülle, Schnappschuss. Fällt das Skript aus, bucht die Seite weiterhin.
