import { cp, mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runCli } from "../../src/cli.ts";
const here = dirname(fileURLToPath(import.meta.url));
export const repoRoot = resolve(here, "../..");
export const fixtures = join(here, "fixtures");
export const realTemplates = join(repoRoot, "wiki/templates");

export interface CliResult {
	code: number;
	stdout: string;
	stderr: string;
}

/** Runs one cf invocation in this process: the same program `node src/cli.ts` runs, minus the process. */
export async function cf(args: string[], cwd: string = repoRoot, stdin = ""): Promise<CliResult> {
	const run = await runCli(args, { cwd, stdin });
	return { code: run.code, stdout: run.stdout, stderr: run.stderr };
}

/**
 * One cf invocation with process env entries set just for the call: how tests put a stub `vale` on
 * PATH, hide it, or hand the command extra variables. Each entry is restored afterwards, `undefined`
 * meaning removed for the call.
 */
export async function cfWithEnv(
	args: string[],
	env: Record<string, string | undefined>,
	cwd: string = repoRoot,
	stdin = "",
): Promise<CliResult> {
	const saved: Record<string, string | undefined> = {};
	for (const name of Object.keys(env)) saved[name] = process.env[name];
	try {
		for (const [name, value] of Object.entries(env)) {
			if (value === undefined) delete process.env[name];
			else process.env[name] = value;
		}
		return await cf(args, cwd, stdin);
	} finally {
		for (const [name, value] of Object.entries(saved)) {
			if (value === undefined) delete process.env[name];
			else process.env[name] = value;
		}
	}
}

export interface JsonFinding {
	layer: string;
	rule: string;
	severity: "error" | "warning";
	path: string;
	line: number;
	message: string;
	hint: string;
}

export interface JsonReport {
	ok: boolean;
	findings: JsonFinding[];
	fixes: { layer: string; rule: string; path: string; description: string }[];
	counts: { findings: number; fixes: number; pages: number };
}

/** `cf check` over a fixture, with the real templates, as JSON. */
export async function checkFixture(
	fixture: string,
	extra: string[] = [],
): Promise<CliResult & { report: JsonReport }> {
	const root = join(fixtures, fixture);
	const result = await cf(
		["check", "--json", "--vault", join(root, "wiki"), "--root", root, "--templates", realTemplates, ...extra],
		root,
	);
	return { ...result, report: JSON.parse(result.stdout) as JsonReport };
}

/** Copies a fixture to a temp dir so `--fix` can rewrite it. Skips `.cache`: other tests write it concurrently. */
export async function copyFixture(fixture: string): Promise<string> {
	const dir = await mkdtemp(join(tmpdir(), "cf-check-"));
	await cp(join(fixtures, fixture), dir, { recursive: true, filter: (src) => basename(src) !== ".cache" });
	return dir;
}

/** The `--vault`/`--root` flags that point a command at a (copied) fixture. */
export function vaultFlags(dir: string): string[] {
	return ["--vault", join(dir, "wiki"), "--root", dir];
}

/** The generated root and campaign-folder `index.md` of a fixture, keyed by path relative to `dir`. */
export async function readIndexes(dir: string): Promise<Map<string, string>> {
	const out = new Map<string, string>();
	for (const p of ["wiki/index.md", "wiki/ashes-of-the-crown/index.md"]) out.set(p, await readFile(join(dir, p), "utf8"));
	return out;
}

/** Findings for a page: a leading "/" matches by path suffix, otherwise the path is relative to the fixture's `wiki/`. */
export function findingsFor(report: JsonReport, page: string): JsonFinding[] {
	return report.findings.filter((f) => (page.startsWith("/") ? f.path.endsWith(page) : f.path === `wiki/${page}`));
}
