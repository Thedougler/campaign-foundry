/** The Agent operations a World's `log.md` records, in the order `docs/wiki-layout.md` lists them. */
export const LOG_OPS = ["ingest", "prep", "push", "audit", "pull", "query"] as const;
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
