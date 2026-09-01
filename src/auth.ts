import { mitarbeiterPerTokenHash } from './db';
import { sha256 } from './codes';
import type { Env, Mitarbeiter } from './types';

export const COOKIE_MITARBEITER = 'wgl_ma';
export const COOKIE_BUERO = 'wgl_buero';

/** Baustellen-Session: nach dem Antippen eines Standort-Tags 4 Stunden gueltig. */
export const SITZUNG_SEKUNDEN = 4 * 60 * 60;

export function cookieLesen(req: Request, name: string): string | null {
  const header = req.headers.get('Cookie');
  if (!header) return null;
  for (const teil of header.split(';')) {
    const [k, ...rest] = teil.trim().split('=');
    if (k === name) return decodeURIComponent(rest.join('='));
  }
  return null;
}

export function cookieSetzen(name: string, wert: string, maxAgeSek: number): string {
  return `${name}=${encodeURIComponent(wert)}; Path=/; Max-Age=${maxAgeSek}; ` +
    `HttpOnly; Secure; SameSite=Lax`;
}

export function cookieLoeschen(name: string): string {
  return `${name}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

export async function angemeldeterMitarbeiter(
  req: Request, env: Env,
): Promise<Mitarbeiter | null> {
  const token = cookieLesen(req, COOKIE_MITARBEITER);
  if (!token) return null;
  return mitarbeiterPerTokenHash(env, await sha256(token));
}

/* ------------------------------------------------- Baustellen-Sitzung --- */

export interface Sitzung {
  standortId: number;
  name: string;
  bis: number;
}

const sitzungsSchluessel = (mitarbeiterId: number) => `sitzung:${mitarbeiterId}`;

export async function sitzungLesen(env: Env, mitarbeiterId: number): Promise<Sitzung | null> {
  const roh = await env.SESSIONS.get(sitzungsSchluessel(mitarbeiterId));
  if (!roh) return null;
  const s = JSON.parse(roh) as Sitzung;
  return s.bis > Date.now() ? s : null;
}

export async function sitzungSetzen(
  env: Env, mitarbeiterId: number, standortId: number, name: string,
): Promise<Sitzung> {
  const s: Sitzung = { standortId, name, bis: Date.now() + SITZUNG_SEKUNDEN * 1000 };
  await env.SESSIONS.put(sitzungsSchluessel(mitarbeiterId), JSON.stringify(s), {
    expirationTtl: SITZUNG_SEKUNDEN,
  });
  return s;
}

export async function sitzungBeenden(env: Env, mitarbeiterId: number): Promise<void> {
  await env.SESSIONS.delete(sitzungsSchluessel(mitarbeiterId));
}

/* ----------------------------------------------------- Buero / Zugriff --- */

export async function istBuero(req: Request, env: Env): Promise<boolean> {
  const passwort = env.ADMIN_PASSWORT;
  if (!passwort) return false;
  const cookie = cookieLesen(req, COOKIE_BUERO);
  return cookie !== null && cookie === (await sha256(passwort));
}

/** Zeitkonstanter Vergleich, damit das Passwort nicht ueber Laufzeit erratbar ist. */
export function gleichSicher(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
