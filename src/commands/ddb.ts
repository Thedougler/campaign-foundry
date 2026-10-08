import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Command } from "commander";
import { UsageError } from "../check/run.ts";
import { DdbAuth, DdbAuthError } from "../ddb/auth.ts";
import { loadCapture, REDACTED, replay } from "../ddb/capture.ts";
import type { CaptureFile } from "../ddb/capture.ts";
import { DdbCaptureError } from "../ddb/capture.ts";
import { findHomebrewMonster, readMonster } from "../ddb/monster.ts";
import { cobaltSessionCookie, defaultSessionPath, loadSession, sessionUserId } from "../ddb/session.ts";
import type { DdbSession } from "../ddb/session.ts";
import { DdbTransportError } from "../ddb/transport.ts";
import type { Transport } from "../ddb/transport.ts";
import { verifyMonster } from "../ddb/verify.ts";
import type { CanonicalMonster, VerifyReport } from "../ddb/verify.ts";
import { applyMonsterCanonical, createMonsterCopy, creationHasDeleteAction, deleteMonster } from "../ddb/write.ts";

/** What a ddb runner did: the exit code the action sets, plus the lines to print. */
export interface DdbCliResult {
	exitCode: number;
	/** stdout lines. */
	out: string[];
	/** stderr lines: message first, remedy indented under it. */
	err: string[];
}

/** The seams tests inject: where the session comes from, and how a transport is built. */
export interface DdbCliDeps {
	session: (path: string) => Promise<DdbSession | undefined>;
	transport: (session: DdbSession) => Transport;
}

/** The standalone transport: direct HTTP with the stored session. Outside an omp session there is no browser fallback. */
function standaloneTransport(session: DdbSession): Transport {
	return { fetch, auth: new DdbAuth(session, fetch) };
}

const standaloneDeps: DdbCliDeps = { session: loadSession, transport: standaloneTransport };

/** Every runner reports a missing session the same way: exit 1 plus the Authentication remedy. */
function noSession(path: string): DdbCliResult {
	return {
		exitCode: 1,
		out: [],
		err: [`No D&D Beyond session is stored at ${path}.`, "  Save the DM's login once: the Authentication section of `cf ddb --help` has the steps."],
	};
}

/** Flags shared by every ddb subcommand. */
interface SessionFlag {
	session?: string;
	json?: boolean;
}

function sessionPathOf(flag: string | undefined): string {
	return flag ? resolve(flag) : defaultSessionPath();
}

export async function runDdbStatus(flags: SessionFlag): Promise<DdbCliResult> {
	const path = sessionPathOf(flags.session);
	const session = await loadSession(path);
	if (!session) {
		const absent = { session: "absent", path };
		const err = noSession(path).err;
		return flags.json ? { exitCode: 1, out: [JSON.stringify(absent)], err } : { exitCode: 1, out: [], err };
	}
	const cobalt = cobaltSessionCookie(session.cookies);
	const userId = sessionUserId(session.cookies);
	if (flags.json) {
		return {
			exitCode: 0,
			out: [JSON.stringify({ session: "present", path, savedAt: session.savedAt, cookies: session.cookies.length, cobaltSession: cobalt !== undefined, ...(userId === undefined ? {} : { userId }) })],
			err: [],
		};
	}
	return {
		exitCode: 0,
		out: [
			`D&D Beyond session  ${path}`,
			`  saved at  ${session.savedAt || "(unknown)"}`,
			`  cookies   ${session.cookies.length} dndbeyond.com cookie(s)`,
			`  login     CobaltSession ${cobalt ? "present" : "MISSING (re-login)"}, user id ${userId ?? "(unknown)"}`,
		],
		err: [],
	};
}

const CANONICAL_EXAMPLE = '{ "name": "Young Bloodhawk", "size": "Medium", "ac": "14 (natural armor)", "hp": 39, "hitDice": "6d8 + 12", "stats": [14, 18, 14, 3, 16, 7] }';

/** Reads the canonical monster file, refusing any shape the adapter cannot verify against. */
async function loadCanonical(path: string): Promise<CanonicalMonster> {
	let raw: string;
	try {
		raw = await readFile(path, "utf8");
	} catch {
		throw new UsageError(`No canonical monster file at \`${path}\`.`, `Pass --file with the Wiki statblock as canonical JSON: ${CANONICAL_EXAMPLE}`);
	}
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch (error) {
		throw new UsageError(`The canonical monster file \`${path}\` is not valid JSON: ${(error as Error).message}`, `The shape is: ${CANONICAL_EXAMPLE}`);
	}
	const record = parsed as Partial<Record<keyof CanonicalMonster, unknown>>;
	for (const field of ["name", "size", "ac", "hitDice"] as const) {
		if (typeof record[field] !== "string" || (record[field] as string).trim() === "") {
			throw new UsageError(`The canonical monster \`${path}\` has no \`${field}\`.`, `Every monster needs name, size, ac and hitDice: ${CANONICAL_EXAMPLE}`);
		}
	}
	if (record.hp !== undefined && typeof record.hp !== "number") {
		throw new UsageError(`The canonical monster \`${path}\` has a non-numeric hp.`, `hp is the average hit points, e.g. 39: ${CANONICAL_EXAMPLE}`);
	}
	if (record.stats !== undefined && (!Array.isArray(record.stats) || record.stats.length !== 6 || record.stats.some((s) => typeof s !== "number"))) {
		throw new UsageError(`The canonical monster \`${path}\` has no six-number stats array.`, `stats is Str Dex Con Int Wis Cha, e.g. [14, 18, 14, 3, 16, 7]: ${CANONICAL_EXAMPLE}`);
	}
	return {
		name: record.name as string,
		size: record.size as string,
		ac: record.ac as string,
		hp: record.hp as number | undefined,
		hitDice: record.hitDice as string,
		stats: record.stats as number[] | undefined,
	};
}

interface VerifyFlags extends SessionFlag {
	id?: string;
	name?: string;
	file?: string;
}

function verifyLines(what: string, report: VerifyReport): string[] {
	const lines = [`verify  ${what}`];
	if (report.message) lines.push(`  ${report.message}`);
	for (const field of report.fields) {
		lines.push(`  ${field.field.padEnd(8)} ${field.match ? "ok      " : "MISMATCH"}  ${field.match ? field.expected : `expected ${field.expected}, got ${field.actual}`}`);
	}
	const matched = report.fields.filter((f) => f.match).length;
	lines.push(
		report.ok
			? `verified  ${matched}/${report.fields.length} fields match`
			: `verify failed  ${report.fields.length - matched} of ${report.fields.length} fields mismatch`,
	);
	return lines;
}

async function verifyRun(flags: VerifyFlags, deps: DdbCliDeps): Promise<DdbCliResult> {
	const example = "cf ddb verify --id 4000001 --file monster.json";
	if ((flags.id === undefined) === (flags.name === undefined)) {
		throw new UsageError("Name exactly one monster to verify: --id <ddb-id> or --name <exact-name>.", example);
	}
	if (flags.file === undefined) {
		throw new UsageError("No --file given.", `Pass the canonical monster JSON: cf ddb verify --id 4000001 --file monster.json  (${CANONICAL_EXAMPLE})`);
	}
	if (flags.id !== undefined && !/^\d+$/.test(flags.id)) {
		throw new UsageError(`--id \`${flags.id}\` is not a D&D Beyond monster id.`, "Pass the numeric id, e.g. --id 4000001");
	}
	const canonical = await loadCanonical(resolve(flags.file));
	const path = sessionPathOf(flags.session);
	const session = await deps.session(path);
	if (!session) return noSession(path);
	const id = flags.id !== undefined ? Number(flags.id) : undefined;
	try {
		const record = id !== undefined ? await readMonster(deps.transport(session), id) : await findHomebrewMonster(deps.transport(session), flags.name ?? "");
		const what = id !== undefined ? `id ${flags.id}` : `name "${flags.name}"`;
		const report = verifyMonster(canonical, record, id);
		return { exitCode: report.ok ? 0 : 1, out: verifyLines(what, report), err: [] };
	} catch (error) {
		if (error instanceof DdbAuthError || error instanceof DdbTransportError) {
			return { exitCode: 1, out: [], err: [error.message, `  ${error.hint}`] };
		}
		throw error;
	}
}

/** Verifies a D&D Beyond monster read-back against the canonical monster file. */
export async function runDdbVerify(flags: VerifyFlags, deps: DdbCliDeps = standaloneDeps): Promise<DdbCliResult> {
	try {
		return await verifyRun(flags, deps);
	} catch (error) {
		if (error instanceof UsageError) return { exitCode: 2, out: [], err: [error.message, `  ${error.hint}`] };
		throw error;
	}
}

/** Maps a write-path failure to exit 1 with its remedy, so runners stay one-liners. */
function writeFailure(error: unknown): DdbCliResult {
	if (error instanceof DdbAuthError || error instanceof DdbTransportError || error instanceof DdbCaptureError) {
		return { exitCode: 1, out: [], err: [error.message, `  ${error.hint}`] };
	}
	throw error;
}

const WRITE_GATE_LINE = "Writes reach the DM's real D&D Beyond account; nothing leaves this machine until you re-run with --yes.";

/** Reads and verifies one monster after a write, printing id, url and the field report. */
async function verifyReadback(transport: Transport, id: number, canonical: CanonicalMonster): Promise<DdbCliResult> {
	const record = await readMonster(transport, id);
	const report = verifyMonster(canonical, record, id);
	const lines = [`verify   id ${id}`];
	if (record?.url !== undefined) lines.push(`D&D Beyond  ${record.url}`);
	return { exitCode: report.ok ? 0 : 1, out: [...lines, ...verifyLines(`id ${id}`, report).slice(1)], err: [] };
}

interface CreateFlags extends SessionFlag {
	file?: string;
	from?: string;
	yes?: boolean;
}

/** Creates a homebrew monster from canonical JSON: copy the base, save the canonical fields, verify the read-back. */
export async function runDdbCreate(flags: CreateFlags, deps: DdbCliDeps = standaloneDeps): Promise<DdbCliResult> {
	try {
		const example = "cf ddb create --from 16810 --file monster.json --yes";
		if (flags.file === undefined) {
			throw new UsageError("No --file given.", `Pass the canonical monster JSON: ${example}  (${CANONICAL_EXAMPLE})`);
		}
		if (flags.from === undefined || !/^\d+$/.test(flags.from)) {
			throw new UsageError(`--from \`${flags.from ?? "(none)"}\` is not a base monster id.`, "Pass the numeric id of the monster to copy, e.g. --from 16810 (Blood Hawk)");
		}
		const canonical = await loadCanonical(resolve(flags.file));
		if (!flags.yes) {
			return {
				exitCode: 2,
				out: [
					`Create plan for "${canonical.name}" from base monster ${flags.from}`,
					"  1. copy the base monster into a new private homebrew monster (contract: src/ddb/contracts/monster/create.json)",
					"  2. save the canonical fields onto the copy's builder form (contract: src/ddb/contracts/monster/update.json)",
					"  3. read the monster back and verify field by field",
					WRITE_GATE_LINE,
				],
				err: [],
			};
		}
		const path = sessionPathOf(flags.session);
		const session = await deps.session(path);
		if (!session) return noSession(path);
		const transport = deps.transport(session);
		const created = await createMonsterCopy(transport, Number(flags.from));
		const lines = [`created  ${created.id}  (copy of base ${flags.from})`];
		const saved = await applyMonsterCanonical(transport, created.id, canonical);
		lines.push(`saved    ${created.id}  ${canonical.name}  (${saved.fields} builder fields posted)`);
		const verified = await verifyReadback(transport, created.id, canonical);
		return { ...verified, out: [...lines, ...verified.out] };
	} catch (error) {
		if (error instanceof UsageError) return { exitCode: 2, out: [], err: [error.message, `  ${error.hint}`] };
		return writeFailure(error);
	}
}

interface UpdateFlags extends SessionFlag {
	id?: string;
	file?: string;
	yes?: boolean;
}

/** Saves canonical JSON onto an existing homebrew monster, then verifies the read-back. */
export async function runDdbUpdate(flags: UpdateFlags, deps: DdbCliDeps = standaloneDeps): Promise<DdbCliResult> {
	try {
		const example = "cf ddb update --id 4000001 --file monster.json --yes";
		if (flags.id === undefined || !/^\d+$/.test(flags.id)) {
			throw new UsageError(`--id \`${flags.id ?? "(none)"}\` is not a D&D Beyond monster id.`, "Pass the numeric id, e.g. --id 4000001");
		}
		if (flags.file === undefined) {
			throw new UsageError("No --file given.", `Pass the canonical monster JSON: ${example}  (${CANONICAL_EXAMPLE})`);
		}
		const canonical = await loadCanonical(resolve(flags.file));
		const id = Number(flags.id);
		if (!flags.yes) {
			return {
				exitCode: 2,
				out: [
					`Update plan for monster ${id}: "${canonical.name}"`,
					"  1. parse the live builder form and override the canonical fields (contract: src/ddb/contracts/monster/update.json)",
					"  2. read the monster back and verify field by field",
					WRITE_GATE_LINE,
				],
				err: [],
			};
		}
		const path = sessionPathOf(flags.session);
		const session = await deps.session(path);
		if (!session) return noSession(path);
		const transport = deps.transport(session);
		const saved = await applyMonsterCanonical(transport, id, canonical);
		const lines = [`saved    ${id}  ${canonical.name}  (${saved.fields} builder fields posted)`];
		const verified = await verifyReadback(transport, id, canonical);
		return { ...verified, out: [...lines, ...verified.out] };
	} catch (error) {
		if (error instanceof UsageError) return { exitCode: 2, out: [], err: [error.message, `  ${error.hint}`] };
		return writeFailure(error);
	}
}

interface DeleteFlags extends SessionFlag {
	id?: string;
	yes?: boolean;
}

/** Deletes one homebrew monster through the captured delete flow, then confirms it is gone. */
export async function runDdbDelete(flags: DeleteFlags, deps: DdbCliDeps = standaloneDeps): Promise<DdbCliResult> {
	try {
		if (flags.id === undefined || !/^\d+$/.test(flags.id)) {
			throw new UsageError(`--id \`${flags.id ?? "(none)"}\` is not a D&D Beyond monster id.`, "Pass the numeric id, e.g. --id 4000001");
		}
		const id = Number(flags.id);
		if (!flags.yes) {
			return {
				exitCode: 2,
				out: [
					`Delete plan for monster ${id}`,
					"  1. confirm the creation page offers the delete action",
					"  2. POST the delete with the session's RequestVerificationToken (contract: src/ddb/contracts/monster/delete.json)",
					"  3. confirm the creation page no longer offers the delete action",
					WRITE_GATE_LINE,
				],
				err: [],
			};
		}
		const path = sessionPathOf(flags.session);
		const session = await deps.session(path);
		if (!session) return noSession(path);
		const transport = deps.transport(session);
		await deleteMonster(transport, id);
		if (await creationHasDeleteAction(transport, id)) {
			return {
				exitCode: 1,
				out: [`deleted  ${id}`, "  the POST answered, but the creation page still offers the delete action"],
				err: ["  the delete contract may be stale; re-capture it (src/ddb/contracts/monster/delete.json has the procedure)"],
			};
		}
		return { exitCode: 0, out: [`deleted  ${id}`, "confirmed gone  the creation page no longer offers the delete action"], err: [] };
	} catch (error) {
		if (error instanceof UsageError) return { exitCode: 2, out: [], err: [error.message, `  ${error.hint}`] };
		return writeFailure(error);
	}
}

/** First bytes of a captured body, so plans stay readable without dumping payloads. */
function preview(text: string, max: number): string {
	const one = text.replace(/\s+/g, " ").trim();
	return one.length <= max ? one : `${one.slice(0, max)}…`;
}

function replayPlan(path: string, capture: CaptureFile): string[] {
	const lines = [`Replay plan for ${path}  (${capture.requests.length} request(s), captured ${capture.capturedAt || "(unknown date)"})${capture.notes ? ` — ${capture.notes}` : ""}`];
	capture.requests.forEach((captured, i) => {
		lines.push(`  ${i + 1}. ${captured.method} ${captured.url}`);
		if (captured.body !== undefined) lines.push(`     body  ${preview(captured.body, 120)}`);
		const live = Object.entries(captured.headers)
			.filter(([, value]) => value === REDACTED)
			.map(([name]) => name.toLowerCase());
		if (live.length > 0) lines.push(`     session headers re-filled live: ${live.join(", ")}`);
	});
	lines.push("Nothing leaves this machine until you re-run with --yes; after it finishes, verify with `cf ddb verify`.");
	return lines;
}

/** Prints the plan, or with --yes performs the captured writes one request at a time, stopping at the first refusal. */
export async function runDdbReplay(flags: SessionFlag & { yes?: boolean }, capturePath: string, deps: DdbCliDeps = standaloneDeps): Promise<DdbCliResult> {
	const path = resolve(capturePath);
	let capture: CaptureFile;
	try {
		capture = await loadCapture(path);
	} catch (error) {
		if (error instanceof DdbCaptureError) return { exitCode: 2, out: [], err: [error.message, `  ${error.hint}`] };
		throw error;
	}
	if (!flags.yes) return { exitCode: 2, out: replayPlan(path, capture), err: [] };
	const sessionPath = sessionPathOf(flags.session);
	const session = await deps.session(sessionPath);
	if (!session) return noSession(sessionPath);
	const outcomes = await replay(deps.transport(session), capture);
	const lines = outcomes.map(
		(outcome, i) =>
			`${outcome.ok ? "done" : "FAILED"}  ${i + 1}. ${outcome.request.method} ${outcome.request.url}` +
			(outcome.ok
				? outcome.response === undefined
					? ""
					: `  -> ${preview(JSON.stringify(outcome.response), 100)}`
				: `  HTTP ${outcome.status ?? "?"}: ${outcome.message ?? "no message"}`),
	);
	const refusal = outcomes.find((outcome) => !outcome.ok);
	return {
		exitCode: refusal === undefined ? 0 : 1,
		out: lines,
		err: refusal === undefined ? [] : [...(refusal.hint === undefined ? [] : [`  ${refusal.hint}`]), "  replay stopped at the first refusal; nothing after it ran"],
	};
}

function print(result: DdbCliResult): void {
	if (result.out.length > 0) process.stdout.write(`${result.out.join("\n")}\n`);
	if (result.err.length > 0) process.stderr.write(`${result.err.join("\n")}\n`);
	process.exitCode = result.exitCode;
}

const AUTHENTICATION_HELP = `
Authentication (once per login; \`cf ddb status\` confirms it):
  1. In an omp session: browser.open({ name: "ddb-login", url: "https://www.dndbeyond.com/sign-in", headed: true, persist: true })
  2. The DM signs in; the agent then saves every dndbeyond.com cookie the tab holds:
     saveSession({ cookies: dndbeyondCookies(await tab.cookies()), savedAt: new Date().toISOString() })
  3. Confirm: cf ddb status
  The session file is ~/.campaign-foundry/ddb-session.json (any subcommand takes --session <path>).
  Official-content reads need no login; private homebrew reads and every write need it.`;

const CAPTURE_HELP = `
Capture (once per content type; produces the write contracts under src/ddb/contracts/):
  1. In an omp browser session with request recording on, create and edit one private homebrew monster.
  2. Collect the *.dndbeyond.com POST/PUT/PATCH/DELETE traffic: method, url, headers, body, status, response preview.
  3. Redact cookie/authorization/token/csrf header values to "<session>" and save a cf-ddb-capture file.
  4. Commit the contract as src/ddb/contracts/<type>/<op>.json beside the adapter.`;

export function ddbCommand(): Command {
	const ddb = new Command("ddb")
		.description(
			"D&D Beyond homebrew adapter: create, update, delete and verify homebrew monsters from the Wiki's canonical JSON, and replay captured write contracts. Writes are gated: every write command shows its plan until --yes.",
		)
		.addHelpText(
			"after",
			`
${AUTHENTICATION_HELP}

${CAPTURE_HELP}

Writes are gated:
  create, update, delete and replay print their plan and exit 2; only --yes reaches D&D Beyond, one
  request at a time, stopping at the first refusal. Every write is as good as its read-back: each
  write command verifies what it wrote before exiting 0.

Examples:
  cf ddb status                                          is the DM's login stored?
  cf ddb status --json                                   machine-readable session state
  cf ddb verify --id 4000001 --file monster.json         verify a read-back by id
  cf ddb verify --name "cf-test Bloodhawk" --file monster.json
  cf ddb create --from 16810 --file monster.json --yes   copy a base monster, save, verify
  cf ddb update --id 4000001 --file monster.json --yes   save canonical fields, verify
  cf ddb delete --id 4000001 --yes                       delete and confirm gone
  cf ddb replay captures/monster-create.json             prints the plan; reaches nothing
  cf ddb replay captures/monster-create.json --yes       performs the write on the DM's account`,
		);

	ddb
		.command("status")
		.description("Show the stored D&D Beyond session. Exits 0 stored, 1 none (with the login steps), 2 usage error.")
		.option("--session <path>", "the session file (default: ~/.campaign-foundry/ddb-session.json)")
		.option("--json", "print machine-readable JSON instead of text")
		.addHelpText(
			"after",
			`
Examples:
  cf ddb status
  cf ddb status --json
  cf ddb status --session ~/.campaign-foundry/ddb-session.json`,
		)
		.action(async (flags: SessionFlag) => print(await runDdbStatus(flags)));

	ddb
		.command("verify")
		.description("Verify a monster read back from D&D Beyond against the canonical monster JSON. Exits 0 match, 1 mismatch or refusal, 2 usage error.")
		.option("--id <ddb-id>", "the D&D Beyond monster id to read back")
		.option("--name <exact-name>", "the exact homebrew monster name to find and read back")
		.option("--file <canonical.json>", "the canonical monster JSON (required)", "monster.json")
		.option("--session <path>", "the session file (default: ~/.campaign-foundry/ddb-session.json)")
		.addHelpText(
			"after",
			`
Canonical monster JSON is the Wiki statblock, not D&D Beyond's payload:
  { "name": "Young Bloodhawk", "size": "Medium", "ac": "14 (natural armor)", "hp": 39, "hitDice": "6d8 + 12", "stats": [14, 18, 14, 3, 16, 7] }

Private homebrew read-backs need the DM's session; official monsters do not.

Examples:
  cf ddb verify --id 4000001 --file monster.json
  cf ddb verify --name "cf-test Bloodhawk" --file monster.json
  cf ddb verify --name "cf-test Bloodhawk" --file monster.json --session ~/ddb-session.json`,
		)
		.action(async (flags: VerifyFlags) => print(await runDdbVerify(flags)));

	ddb
		.command("create")
		.description("Create a homebrew monster from canonical JSON (copy a base monster, save the fields, verify). Prints its plan; only --yes writes. Exits 0 verified, 1 refusal or mismatch, 2 plan shown or usage error.")
		.option("--from <ddb-id>", "the base monster id to copy, e.g. 16810 (Blood Hawk)")
		.option("--file <canonical.json>", "the canonical monster JSON (required)", "monster.json")
		.option("--yes", "actually reach D&D Beyond: performs the writes (DM approval required)")
		.option("--session <path>", "the session file (default: ~/.campaign-foundry/ddb-session.json)")
		.addHelpText(
			"after",
			`
Create works like the site's own form: copy a base monster, then save the canonical fields onto the
copy, then read the monster back and verify field by field. The new monster's D&D Beyond id and url
print on success. Test writes carry a cf-test name and are deleted after verifying.

Examples:
  cf ddb create --from 16810 --file monster.json
  cf ddb create --from 16810 --file monster.json --yes`,
		)
		.action(async (flags: CreateFlags) => print(await runDdbCreate(flags)));

	ddb
		.command("update")
		.description("Save canonical JSON onto an existing homebrew monster and verify the read-back. Prints its plan; only --yes writes. Exits 0 verified, 1 refusal or mismatch, 2 plan shown or usage error.")
		.option("--id <ddb-id>", "the D&D Beyond monster id to update (required)")
		.option("--file <canonical.json>", "the canonical monster JSON (required)", "monster.json")
		.option("--yes", "actually reach D&D Beyond: performs the write (DM approval required)")
		.option("--session <path>", "the session file (default: ~/.campaign-foundry/ddb-session.json)")
		.addHelpText(
			"after",
			`
Update parses the live builder form, overrides the canonical fields and posts the complete form the
way the site's own Save does; it never writes official (non-homebrew) monsters.

Examples:
  cf ddb update --id 4000001 --file monster.json
  cf ddb update --id 4000001 --file monster.json --yes`,
		)
		.action(async (flags: UpdateFlags) => print(await runDdbUpdate(flags)));

	ddb
		.command("delete")
		.description("Delete one homebrew monster and confirm it is gone. Prints its plan; only --yes writes. Exits 0 deleted and confirmed, 1 refusal, 2 plan shown or usage error.")
		.option("--id <ddb-id>", "the D&D Beyond monster id to delete (required)")
		.option("--yes", "actually reach D&D Beyond: performs the delete (DM approval required)")
		.option("--session <path>", "the session file (default: ~/.campaign-foundry/ddb-session.json)")
		.addHelpText(
			"after",
			`
Delete runs the site's own confirmation flow (creation-page modal + RequestVerificationToken) and
confirms the deletion on the creation page: monster-service keeps serving deleted monsters from its
CDN, so the action links are the reliable oracle.

Examples:
  cf ddb delete --id 4000001
  cf ddb delete --id 4000001 --yes`,
		)
		.action(async (flags: DeleteFlags) => print(await runDdbDelete(flags)));

	ddb
		.command("replay")
		.description("Print a capture's replay plan; with --yes perform the writes. Exits 0 done, 1 refused, 2 plan shown or usage error.")
		.argument("<capture>", "the cf-ddb-capture file to replay")
		.option("--yes", "actually reach D&D Beyond: performs the captured writes (DM approval required)")
		.option("--session <path>", "the session file (default: ~/.campaign-foundry/ddb-session.json)")
		.addHelpText(
			"after",
			`
The plan prints one line per captured request with its body and which session headers get re-filled
live. Without --yes nothing leaves this machine; with --yes requests run one at a time in capture
order and replay stops at the first refusal.

Examples:
  cf ddb replay captures/monster-create.json
  cf ddb replay captures/monster-create.json --yes`,
		)
		.action(async (capture: string, flags: SessionFlag & { yes?: boolean }) => print(await runDdbReplay(flags, capture)));

	return ddb;
}
