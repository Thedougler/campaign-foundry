import { existsSync } from "node:fs";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

/** The Agent operations a World's `log.md` records, in the order `docs/wiki-layout.md` lists them. */
export const LOG_OPS = ["create", "ingest", "prep", "push", "audit", "pull", "query"] as const;
export type LogOp = (typeof LOG_OPS)[number];

/** `## [YYYY-MM-DD] op | Title`. The op is captured loosely so the gate can name a wrong one. */
export const ENTRY_HEADING = /^## \[(\d{4}-\d{2}-\d{2})\] (\S+) \| (\S.*)$/;
/** `- [[Page]]`, the only bullet shape an entry holds. */
export const ENTRY_BULLET = /^- \[\[([^\]]+)\]\]$/;

export const isLogOp = (value: string): value is LogOp => (LOG_OPS as readonly string[]).includes(value);

/** True for a real calendar date written `YYYY-MM-DD`. */
export function isRealDate(value: string): boolean {
	const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
	if (!m) return false;
	const [year, month, day] = [Number(m[1]), Number(m[2]), Number(m[3])];
	const d = new Date(Date.UTC(year, month - 1, day));
	return d.getUTCFullYear() === year && d.getUTCMonth() === month - 1 && d.getUTCDate() === day;
}

/** Today's real-world date in the local time zone, as `YYYY-MM-DD`. */
export function today(now: Date = new Date()): string {
	const pad = (n: number): string => String(n).padStart(2, "0");
	return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export interface LogEntry {
	date: string;
	op: string;
	title: string;
	/** Page names from the entry's `- [[Page]]` bullets. */
	pages: string[];
}

export function formatEntry(entry: LogEntry): string {
	return [`## [${entry.date}] ${entry.op} | ${entry.title}`, "", ...entry.pages.map((p) => `- [[${p}]]`)].join("\n");
}

/** Reads the entries of a log leniently: headings in the entry format start an entry, wikilink bullets join it, all else is skipped. */
export function parseEntries(source: string): LogEntry[] {
	const entries: LogEntry[] = [];
	for (const line of source.split("\n")) {
		const heading = ENTRY_HEADING.exec(line);
		if (heading) {
			entries.push({ date: heading[1]!, op: heading[2]!, title: heading[3]!.trim(), pages: [] });
			continue;
		}
		const bullet = ENTRY_BULLET.exec(line.trimEnd());
		if (bullet && entries.length > 0) entries.at(-1)!.pages.push(bullet[1]!);
	}
	return entries;
}

export type AppendResult =
	| { status: "already-logged"; path: string }
	| { status: "logged" | "would-log"; path: string; rotated?: { from: string; to: string } }
	| { status: "error"; message: string; hint: string };

export interface AppendOptions {
	dryRun?: boolean;
	/** Turns a vault-relative path into the form shown in messages (default: as is). */
	show?: (path: string) => string;
	/** A command the caller can point at in error hints. */
	example?: string;
}

/**
 * Appends an entry to `<vault>/<World>/log.md`, the one place the log's rules live (`cf log` and `cf pull` both call it):
 * repeating the last entry is a no-op, an entry dated before the last is refused because the log is append-only and in
 * date order, and an entry from a later year first rotates the log to `log-<year>.md`. Creates `log.md` when absent.
 */
export async function appendLogEntry(vaultDir: string, world: string, entry: LogEntry, options: AppendOptions = {}): Promise<AppendResult> {
	const show = options.show ?? ((p: string): string => p);
	const example = options.example ?? `cf log --world ${world} --op ${entry.op} --title "${entry.title}"`;
	const path = `${world}/log.md`;
	const file = join(vaultDir, path);
	const source = await readFile(file, "utf8").catch(() => "");
	const last = parseEntries(source).at(-1);

	if (last && last.date === entry.date && last.op === entry.op && last.title === entry.title && [...last.pages].sort().join("\n") === [...entry.pages].sort().join("\n")) {
		return { status: "already-logged", path };
	}
	if (last && last.date > entry.date) {
		return {
			status: "error",
			message: `The last entry in ${show(path)} is dated ${last.date}, later than ${entry.date}; the log is append-only and in date order.`,
			hint: `Use a --date of ${last.date} or later. ${example} --date ${last.date}`,
		};
	}

	let base = source;
	let rotated: { from: string; to: string } | undefined;
	if (last && last.date.slice(0, 4) < entry.date.slice(0, 4)) {
		const to = `${world}/log-${last.date.slice(0, 4)}.md`;
		if (existsSync(join(vaultDir, to))) {
			return { status: "error", message: `Cannot rotate ${show(path)}: ${show(to)} already exists.`, hint: `Merge or move ${show(to)} yourself, then run the command again.` };
		}
		rotated = { from: path, to };
		if (!options.dryRun) await rename(file, join(vaultDir, to));
		base = "";
	}
	const text = base.trim() === "" ? `${formatEntry(entry)}\n` : `${base.trimEnd()}\n\n${formatEntry(entry)}\n`;
	if (!options.dryRun) {
		await mkdir(dirname(file), { recursive: true });
		await writeFile(file, text);
	}
	return { status: options.dryRun ? "would-log" : "logged", path, ...(rotated ? { rotated } : {}) };
}
