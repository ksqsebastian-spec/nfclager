# deploy/

`worker.js` ist das gebaute, minifizierte Bundle. Es liegt hier nur, weil der
Erst-Deploy ohne `wrangler login` (kein Browser verfügbar) über die Cloudflare-API
lief und das Bundle dafür über eine abrufbare URL erreichbar sein musste.

**Im Normalbetrieb wird diese Datei nicht gebraucht.** Wer `wrangler` eingeloggt
hat, deployt mit `npm run deploy` direkt aus `src/`. Neu erzeugen mit:

    npx wrangler deploy --dry-run --outdir=deploy --minify
