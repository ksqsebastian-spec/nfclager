/**
 * Nimmt jede Seite in hell und dunkel, am Schreibtisch und auf dem Handy auf.
 *
 * Gedacht zum Hinsehen statt Behaupten: der unsichtbar gebliebene
 * "Scannen beenden"-Knopf (eigene display-Regel schlug [hidden]) war auf
 * keinem anderen Weg zu finden.
 *
 * Voraussetzung: `npx wrangler dev --port 8788 --local` läuft mit
 * eingespielten Beispieldaten aus seed.sql.
 */
import { chromium } from 'playwright';
const B = 'http://127.0.0.1:8788';
const OUT = process.env.SHOT_OUT ?? './.screenshots';
import { mkdirSync } from 'node:fs';
mkdirSync(OUT, { recursive: true });

import { execSync } from 'node:child_process';
execSync(`npx wrangler d1 execute nfclager --local --command "UPDATE mitarbeiter SET token_hash=NULL, einladung='bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' WHERE id=2"`,
  { stdio: 'ignore', env: { ...process.env, CI: '1', WRANGLER_SEND_METRICS: 'false' } });

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

async function schuss(name, pfad, opts = {}) {
  const ctx = await browser.newContext({
    viewport: opts.viewport ?? { width: 1280, height: 900 },
    colorScheme: opts.dark ? 'dark' : 'light',
    deviceScaleFactor: 2,
  });
  if (opts.cookie) await ctx.addCookies([{ ...opts.cookie, domain: '127.0.0.1', path: '/' }]);
  const p = await ctx.newPage();
  const r = await p.goto(B + pfad, { waitUntil: 'networkidle' });
  await p.waitForTimeout(120);
  await p.screenshot({ path: `${OUT}/${name}.png`, fullPage: opts.full ?? true });
  console.log(String(r.status()).padEnd(4), name.padEnd(28), pfad);
  await ctx.close();
}

// Anmeldung holen
const ctx = await browser.newContext();
const p = await ctx.newPage();
await p.goto(B + '/buero');
await p.fill('#pw', 'test1234');
await p.click('button[type=submit]');
await p.waitForLoadState('networkidle');
const bueroCookie = (await ctx.cookies()).find((c) => c.name === 'wgl_buero');
await p.goto(B + '/einladung/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
const maCookie = (await ctx.cookies()).find((c) => c.name === 'wgl_ma');
await ctx.close();

const bu = { name: bueroCookie.name, value: bueroCookie.value };
const ma = { name: maCookie.name, value: maCookie.value };
const handy = { width: 390, height: 844 };

await schuss('buero-uebersicht',      '/buero',            { cookie: bu });
await schuss('buero-uebersicht-dark', '/buero',            { cookie: bu, dark: true });
await schuss('buero-einheiten',       '/buero/einheiten',  { cookie: bu });
await schuss('buero-bestand',         '/buero/bestand',    { cookie: bu });
await schuss('buero-auswertung',      '/buero/auswertung', { cookie: bu });
await schuss('buero-meldungen',       '/buero/meldungen',  { cookie: bu });
await schuss('buero-standorte',       '/buero/standorte',  { cookie: bu });
await schuss('buero-einheit',         '/buero/einheit/4',  { cookie: bu });
await schuss('buero-mobil',           '/buero',            { cookie: bu, viewport: handy });

await schuss('scan-einheit',          '/t/W2XKFG',  { cookie: ma, viewport: handy });
await schuss('scan-einheit-dark',     '/t/W2XKFG',  { cookie: ma, viewport: handy, dark: true });
await schuss('scan-wohin',            '/t/W2XKFG/wohin', { cookie: ma, viewport: handy });
await schuss('scan-start',            '/',          { cookie: ma, viewport: handy });
await schuss('scan-fremd',            '/t/W2XKFG',  { viewport: handy });
await schuss('scan-melden',           '/t/W2XKFG/melden', { cookie: ma, viewport: handy });
await schuss('scan-station',          '/scan',      { cookie: ma, viewport: handy });
await schuss('scan-inventur',         '/inventur',  { cookie: ma, viewport: handy });

await browser.close();
