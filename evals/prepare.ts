#!/usr/bin/env bun
/** Private Session maintenance CLI. */
import "../src/env.ts";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { closeEvalSession, createEvalSession, reapEvalSessions } from "./workspaces.ts";

const USAGE = `Usage: bun run eval:prepare <operation> [options]
Private evaluator storage only; all Runner inputs remain in the live repository.

Operations (choose one):
  --session-start                 open an OS-temp Session; print {root}
  --session-close <root>          close a validated Session, idempotently
  --reap-stale                    select dead-owner Sessions
Options:
  --older-than-hours <hours>      minimum age for reaping (default: 24)
  --include-legacy               include unmarked roots older than 24 hours
  --dry-run                      preview stale roots
  --yes                          authorize stale-root removal
  -h, --help                     show this help

Examples:
  bun run eval:prepare --session-start
  bun run eval:prepare --session-close "$SESSION_ROOT"
  bun run eval:prepare --reap-stale --older-than-hours 24 --dry-run
  bun run eval:prepare --reap-stale --older-than-hours 24 --yes
`;

async function main(args: string[]): Promise<void> {
	try {
		const { values, positionals } = parseArgs({ args, allowPositionals: true, options: {
			"session-start": { type: "boolean" }, "session-close": { type: "string" },
			"reap-stale": { type: "boolean" }, "older-than-hours": { type: "string" },
			"include-legacy": { type: "boolean" }, "dry-run": { type: "boolean" }, yes: { type: "boolean" },
			help: { type: "boolean", short: "h" },
		} });
		if (values.help) { process.stdout.write(USAGE); return; }
		if (positionals.length || [values["session-start"], values["session-close"], values["reap-stale"]].filter(Boolean).length !== 1) {
			throw new Error("choose exactly one Session operation; see --help for examples");
		}
		if (!values["reap-stale"] && [values["older-than-hours"], values["include-legacy"], values["dry-run"], values.yes].some((value) => value !== undefined)) {
			throw new Error("reaping options require --reap-stale");
		}
		if (values["session-start"]) {
			process.stdout.write(`${JSON.stringify(await createEvalSession({ sessionId: `standalone-${randomUUID()}`, pid: process.ppid }))}\n`);
		} else if (values["session-close"]) {
			const root = values["session-close"];
			await closeEvalSession(root);
			process.stdout.write(`${JSON.stringify({ closed: true, root: resolve(root) })}\n`);
		} else {
			const age = values["older-than-hours"] ?? "24";
			const olderThanMs = Number(age) * 3_600_000;
			if (!age.trim() || !Number.isFinite(olderThanMs) || olderThanMs < 0) throw new Error("--older-than-hours must be finite and nonnegative");
			if (!values["dry-run"] && !values.yes) throw new Error("--yes is required for removal; use --dry-run to preview");
			process.stdout.write(`${JSON.stringify(await reapEvalSessions({ olderThanMs, dryRun: values["dry-run"] === true, includeLegacy: values["include-legacy"] === true }))}\n`);
		}
	} catch (error) {
		process.stderr.write(`Error: ${(error as Error).message}\n\n${USAGE}`);
		process.exitCode = 2;
	}
}

if (import.meta.main) void main(process.argv.slice(2));
