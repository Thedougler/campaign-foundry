import { appendFile, mkdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";

/** One Agent operation, as `log.md` records it (docs/wiki-layout.md, "index, log and hot"). */
export interface LogEntry {
	/** Real-world date of the operation. */
	date: Date;
	operation: "ingest" | "prep" | "push" | "audit" | "pull" | "query";
	title: string;
	/** Names of the pages touched, written as `[[Page]]` bullets. */
	pages: string[];
}

/**
 * Where an operation is recorded. `cf pull` writes through this interface so the shared `cf log` helper can replace
 * `fileOperationLog` without touching the pull code.
 */
export interface OperationLog {
	/** Appends the entry to the World's `log.md` and returns the log's vault-relative path. */
	append(world: string, entry: LogEntry): Promise<string>;
}

/** `YYYY-MM-DD` in local time, the real-world date the Wiki log uses. */
export function logDate(date: Date): string {
	const pad = (n: number): string => String(n).padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatEntry(entry: LogEntry): string {
	return `## [${logDate(entry.date)}] ${entry.operation} | ${entry.title}\n\n${entry.pages.map((p) => `- [[${p}]]`).join("\n")}\n`;
}

/** Appends entries to `<vault>/<World>/log.md`, creating it when the World has none yet. */
export function fileOperationLog(vaultDir: string): OperationLog {
	return {
		async append(world, entry) {
			const path = `${world}/log.md`;
			const file = join(vaultDir, path);
			await mkdir(dirname(file), { recursive: true });
			const existing = await readFile(file, "utf8").catch(() => "");
			const gap = existing === "" ? "" : existing.endsWith("\n") ? "\n" : "\n\n";
			await appendFile(file, `${gap}${formatEntry(entry)}`);
			return path;
		},
	};
}
