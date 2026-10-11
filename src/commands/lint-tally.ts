import { readFile } from "node:fs/promises";
import { Command } from "commander";
import { UsageError } from "../check/run.ts";
import { CF } from "./kit.ts";

interface LintTallyFlags {
	json?: boolean;
}

interface RuleTally {
	findings: number;
	sessions: Set<string>;
	pages: Set<string>;
}

export interface LintTally {
	rules: { rule: string; findings: number; sessions: number; pages: number }[];
	sessions: number;
	pages: number;
	findings: number;
	omitted: number;
}

const EXAMPLE = `${CF} lint-tally ~/.omp/agent/sessions/-campaign-foundry/<timestamp>_<session-id>/<Agent>.jsonl`;

/** The block `.omp/hooks/post/wiki-check.ts` appends to one tool result: the marker, then one JSON object. */
const MARKER = "\n[wiki-check]\n";

function textBlocks(content: unknown): string[] {
	if (typeof content === "string") return [content];
	if (!Array.isArray(content)) return [];
	return content.flatMap((block): string[] => {
		if (typeof block !== "object" || block === null || !("text" in block)) return [];
		return typeof block.text === "string" ? [block.text] : [];
	});
}

/** The first JSON object in `text` from its first `{`, so trailing prose never breaks the parse. */
function firstJsonObject(text: string): Record<string, unknown> | undefined {
	const start = text.indexOf("{");
	if (start === -1) return undefined;
	let depth = 0;
	let quoted = false;
	let escaped = false;
	for (let index = start; index < text.length; index++) {
		const character = text[index]!;
		if (quoted) {
			if (escaped) escaped = false;
			else if (character === "\\") escaped = true;
			else if (character === '"') quoted = false;
			continue;
		}
		if (character === '"') quoted = true;
		else if (character === "{") depth++;
		else if (character === "}") {
			depth--;
			if (depth === 0) {
				const parsed: Record<string, unknown> | null = JSON.parse(text.slice(start, index + 1));
				return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? parsed : undefined;
			}
		}
	}
	return undefined;
}

/** One session's contribution: the first wiki-check per page, so the tally shows drafts before repairs. */
function tallySession(
	name: string,
	text: string,
	byRule: Map<string, RuleTally>,
	pages: Set<string>,
	omitted: { count: number },
): void {
	const seen = new Set<string>();
	for (const line of text.split("\n")) {
		if (!line.includes("[wiki-check]")) continue;
		let entry: unknown;
		try {
			entry = JSON.parse(line);
		} catch {
			continue;
		}
		if (typeof entry !== "object" || entry === null || !("type" in entry) || !("message" in entry)) continue;
		if (entry.type !== "message") continue;
		const message = entry.message;
		if (typeof message !== "object" || message === null || !("role" in message) || !("content" in message)) continue;
		if (message.role !== "toolResult") continue;
		for (const block of textBlocks(message.content)) {
			const marker = block.indexOf(MARKER);
			if (marker === -1) continue;
			const feedback = firstJsonObject(block.slice(marker + MARKER.length));
			if (feedback === undefined || feedback.status === "not-checked") continue;
			const checked = Array.isArray(feedback.pages) ? feedback.pages.filter((p): p is string => typeof p === "string") : [];
			const fresh = checked.filter((page) => !seen.has(page));
			if (fresh.length === 0) continue;
			for (const page of fresh) {
				seen.add(page);
				pages.add(`${name}\u0000${page}`);
			}
			const counted = new Set(fresh);
			for (const raw of Array.isArray(feedback.findings) ? feedback.findings : []) {
				if (typeof raw !== "object" || raw === null || !("rule" in raw) || !("path" in raw)) continue;
				if (typeof raw.rule !== "string" || typeof raw.path !== "string" || !counted.has(raw.path)) continue;
				const tally = byRule.get(raw.rule) ?? { findings: 0, sessions: new Set<string>(), pages: new Set<string>() };
				tally.findings++;
				tally.sessions.add(name);
				tally.pages.add(`${name}\u0000${raw.path}`);
				byRule.set(raw.rule, tally);
			}
			if (typeof feedback.omittedFindings === "number") omitted.count += feedback.omittedFindings;
		}
	}
}

/** Tally the wiki-check hook's first page-check per page per session file, by lint rule. */
export async function lintTally(files: string[]): Promise<LintTally> {
	if (files.length === 0) throw new UsageError("No session files given.", EXAMPLE);
	const byRule = new Map<string, RuleTally>();
	const pages = new Set<string>();
	const omitted = { count: 0 };
	for (const [index, file] of files.entries()) {
		let text: string;
		try {
			text = await readFile(file, "utf8");
		} catch (error) {
			throw new UsageError(`Cannot read session file ${file}: ${(error as Error).message}`, EXAMPLE);
		}
		tallySession(`${index}:${file}`, text, byRule, pages, omitted);
	}
	const rules = [...byRule.entries()]
		.map(([rule, tally]) => ({ rule, findings: tally.findings, sessions: tally.sessions.size, pages: tally.pages.size }))
		.sort((a, b) => b.sessions - a.sessions || b.findings - a.findings || a.rule.localeCompare(b.rule));
	return {
		rules,
		sessions: files.length,
		pages: pages.size,
		findings: rules.reduce((total, rule) => total + rule.findings, 0),
		omitted: omitted.count,
	};
}

export function lintTallyCommand(): Command {
	return new Command("lint-tally")
		.description(
			"Tally the wiki-check hook's first page check per page per omp session jsonl: the lint errors production drafts make, by rule.",
		)
		.argument("<session.jsonl...>", "omp session transcript files, subagent or top-level")
		.option("--json", "print {rules:[{rule,findings,sessions,pages}], sessions, pages, findings, omitted}")
		.addHelpText(
			"after",
			`
Reads each omp session transcript and finds the [wiki-check] block the wiki-check hook appends to
a tool result. Only the first check of a page in a session counts, so the tally shows each draft as
its agent wrote it, before repairs; a later re-check of the same page, clean or not, is ignored.
not-checked results are skipped; capped results count and their omittedFindings are summed.
Sessions live under ~/.omp/agent/sessions/<encoded-cwd>/, subagents beside their parent session
file as <timestamp>_<session-id>/<Agent>.jsonl. Exit codes: 0 tallied (even with zero findings),
2 no inputs or an unreadable file.

Examples:
  ${EXAMPLE}
  ${CF} lint-tally one.jsonl another.jsonl --json`,
		)
		.action(async (files: string[], flags: LintTallyFlags) => {
			const tally = await lintTally(files);
			if (flags.json) {
				process.stdout.write(`${JSON.stringify(tally, null, 2)}\n`);
				return;
			}
			for (const rule of tally.rules)
				process.stdout.write(`${rule.rule}  findings=${rule.findings}  sessions=${rule.sessions}  pages=${rule.pages}\n`);
			process.stdout.write(
				`sessions=${tally.sessions} pages=${tally.pages} findings=${tally.findings} omitted=${tally.omitted}\n`,
			);
		});
}
