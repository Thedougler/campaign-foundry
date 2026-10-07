import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

/** One cookie as captured from a logged-in dndbeyond.com browser session. */
export interface Cookie {
	name: string;
	value: string;
	domain?: string;
	path?: string;
	expires?: number;
}

/** The persisted D&D Beyond login: every dndbeyond.com cookie the browser held. */
export interface DdbSession {
	cookies: Cookie[];
	/** ISO timestamp of when the cookies were captured. */
	savedAt: string;
}

/** Where the DM's DDB session lives: user-level, so it survives repo moves and serves every World. */
export function defaultSessionPath(): string {
	return join(homedir(), ".campaign-foundry", "ddb-session.json");
}

/** Saves the session and returns the path written. */
export async function saveSession(session: DdbSession, path: string = defaultSessionPath()): Promise<string> {
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, `${JSON.stringify(session, null, "\t")}\n`);
	return path;
}

/** The saved session, or undefined when the DM has not logged in yet. */
export async function loadSession(path: string = defaultSessionPath()): Promise<DdbSession | undefined> {
	try {
		const raw = JSON.parse(await readFile(path, "utf8")) as Partial<DdbSession>;
		if (!Array.isArray(raw.cookies)) return undefined;
		return { cookies: raw.cookies as Cookie[], savedAt: raw.savedAt ?? "" };
	} catch {
		return undefined;
	}
}

/** Only the cookies D&D Beyond set; a browser jar may hold cookies for other sites. */
export function dndbeyondCookies(cookies: Cookie[]): Cookie[] {
	return cookies.filter((c) => (c.domain ?? "").includes("dndbeyond.com"));
}

/** All cookies as one `Cookie` header value, in jar order. */
export function cookieHeader(cookies: Cookie[]): string {
	return cookies.map((c) => `${c.name}=${c.value}`).join("; ");
}

/** The long-lived login cookie that the cobalt token exchange consumes. */
export function cobaltSessionCookie(cookies: Cookie[]): Cookie | undefined {
	return cookies.find((c) => c.name === "CobaltSession");
}

/** The D&D Beyond account id from the `User.ID` cookie, when present and numeric. */
export function sessionUserId(cookies: Cookie[]): number | undefined {
	const raw = cookies.find((c) => c.name === "User.ID")?.value;
	if (raw === undefined) return undefined;
	const id = Number(raw);
	return Number.isInteger(id) && id > 0 ? id : undefined;
}
