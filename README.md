# nfclager — Lagerverwaltung mit NFC

Cloudflare Worker für J. Werner Gerüstbau. Gitterboxen und Großteile tragen einen
NFC-Tag; antippen bucht sie zwischen Lager und Baustellen. Ein MCP-Server macht
Bestand, Vorhaltezeiten und überfälliges Material im Chat abfragbar.

Konzept und Begründung der Architekturentscheidungen: **[KONZEPT.md](KONZEPT.md)**.
Diese Datei beschreibt nur Betrieb und Inbetriebnahme.

## Was steht (Phase 1)

- **Scan-Seite** `/t/:code` — zwei Knöpfe, ein Tap gebucht, 30 Sekunden Rückgängig
- **Baustellen-Sitzung** — Standort-Tag antippen, danach geht jede Einheit mit einem Tap dorthin (4 Std)
- **Standortauswahl nach Entfernung** — die Baustelle, auf der man steht, steht oben
- **Scan-Station** `/scan` — Web-NFC-Dauerscan für Android (Weg B aus dem Konzept)
- **Büro** `/buero` — Bestand, Einheiten, Standorte, Mitarbeiter, Etikettendruck
- **MCP** `/mcp` — lesend: `bestand`, `einheit`, `baustelle_bestand`, `ueberfaellig`, `suche`

Offen für Phase 2: Offline-Warteschlange, Überfällig-Mail, MCP schreibend.

## Inbetriebnahme

```bash
npm install

# D1 und KV anlegen, die ausgegebenen IDs in wrangler.jsonc eintragen
npx wrangler d1 create nfclager
npx wrangler kv namespace create SESSIONS

npx wrangler d1 migrations apply nfclager --remote

# Geheimnisse setzen
npx wrangler secret put ADMIN_PASSWORT   # Zugang zur Büro-Oberfläche
npx wrangler secret put MCP_TOKEN        # Bearer-Token für /mcp

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
| `src/views/druck.ts` | Etikettenbogen |
| `migrations/` | D1-Schema |

Serverseitig gerendertes HTML, kein Framework im Browser, keine Webfonts. Die
Scan-Seite liegt unter 10 KB — auf der Baustelle mit einem Balken Empfang ist das
der Unterschied zwischen benutzbar und nicht benutzbar.
