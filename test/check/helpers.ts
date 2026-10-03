import { execFile } from "node:child_process";
import { cp, mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const here = dirname(fileURLToPath(import.meta.url));
export const repoRoot = resolve(here, "../..");
export const fixtures = join(here, "fixtures");
export const realTemplates = join(repoRoot, "wiki/templates");

export interface CliResult {
	code: number;
	stdout: string;
	stderr: string;
}

/** Runs `node src/cli.ts <args>` exactly as an agent would, from `cwd`. */
export async function cf(args: string[], cwd: string = repoRoot, stdin = ""): Promise<CliResult> {
	try {
		const pending = run("node", [join(repoRoot, "src/cli.ts"), ...args], { cwd });
		pending.child.stdin?.end(stdin);
		const { stdout, stderr } = await pending;
		return { code: 0, stdout, stderr };
	} catch (error) {
		const e = error as { code?: number; stdout?: string; stderr?: string };
		return { code: typeof e.code === "number" ? e.code : 1, stdout: e.stdout ?? "", stderr: e.stderr ?? "" };
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

/** The generated root and Aldermoor `index.md` of a fixture, keyed by path relative to `dir`. */
export async function readIndexes(dir: string): Promise<Map<string, string>> {
	const out = new Map<string, string>();
	for (const p of ["wiki/index.md", "wiki/Aldermoor/index.md"]) out.set(p, await readFile(join(dir, p), "utf8"));
	return out;
}

/** Findings for a page: a leading "/" matches by path suffix, otherwise the path is relative to the fixture's `wiki/`. */
export function findingsFor(report: JsonReport, page: string): JsonFinding[] {
	return report.findings.filter((f) => (page.startsWith("/") ? f.path.endsWith(page) : f.path === `wiki/${page}`));
}
