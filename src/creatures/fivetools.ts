import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "tinyglobby";
import { parse } from "yaml";
import { UsageError } from "../check/errors.ts";
import type { FivetoolsMonster } from "./convert.ts";

export const FIVETOOLS_REPO = "https://github.com/5etools-mirror-3/5etools-src.git";
export const FIVETOOLS_COMMIT = "8c026b807fac21862a309379a0c3228a0683198b";
export const TTRPG_CONVERT_VERSION = "3.3.2";

const TEMPLATE = fileURLToPath(new URL("./ttrpg-monster.txt", import.meta.url));

function git(args: string[], cwd?: string): string {
	const result = spawnSync("git", args, { cwd, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
	if (result.error) throw new UsageError(result.error.message, `git ${args.join(" ")}`);
	if (result.status !== 0) {
		throw new UsageError((result.stderr || result.stdout).trim() || `git ${args[0]} failed`, `git ${args.join(" ")}`);
	}
	return result.stdout;
}

/** `<root>/.cache/5etools-src`, cloned and pinned when missing or off the commit. */
export async function ensureFivetoolsData(root: string): Promise<string> {
	const dir = join(root, ".cache/5etools-src");
	if (!existsSync(dir)) {
		git(["clone", "--depth", "1", "--filter=blob:none", "--sparse", FIVETOOLS_REPO, dir]);
		git(["sparse-checkout", "set", "--no-cone", "/data/"], dir);
	}
	const head = git(["rev-parse", "HEAD"], dir).trim();
	if (head !== FIVETOOLS_COMMIT) {
		git(["fetch", "--depth", "1", "origin", FIVETOOLS_COMMIT], dir);
		git(["checkout", "--detach", "FETCH_HEAD"], dir);
	}
	return dir;
}

function checkTtrpgConvert(): void {
	const result = spawnSync("ttrpg-convert", ["--version"], { encoding: "utf8" });
	if (result.error || result.status !== 0) {
		throw new UsageError("ttrpg-convert is not installed.", "brew install ebullient/tap/ttrpg-convert-cli");
	}
	const output = `${result.stdout}\n${result.stderr}`;
	if (!output.includes(`version ${TTRPG_CONVERT_VERSION}`)) {
		const found = /version\s+(\S+)/.exec(output)?.[1] ?? (output.trim() || "unknown");
		throw new UsageError(
			`ttrpg-convert version ${found} is not the pinned version ${TTRPG_CONVERT_VERSION}.`,
			`brew install ebullient/tap/ttrpg-convert-cli`,
		);
	}
}

function sourceOf(data: Record<string, unknown>, path: string): string {
	const source = data.source;
	if (Array.isArray(source) && typeof source[0] === "string") return source[0];
	if (typeof source === "string" && source) return source;
	const base = basename(path, ".md");
	const dash = base.lastIndexOf("-");
	return dash >= 0 ? base.slice(dash + 1) : "";
}

function parseRendered(text: string): Record<string, unknown> | undefined {
	const fence = /```statblock\s*\n([\s\S]*?)```/.exec(text);
	const yamlText = fence?.[1] ?? text.replace(/^---[\s\S]*?---\s*/, "");
	try {
		const data = parse(yamlText);
		if (data && typeof data === "object" && !Array.isArray(data) && "name" in data && typeof data.name === "string") {
			return { ...data };
		}
	} catch {
		return undefined;
	}
	return undefined;
}

/** Book and adventure id → full name from the pinned 5etools data. */
export async function loadBookNames(dataDir: string): Promise<Map<string, string>> {
	const names = new Map<string, string>();
	for (const [file, key] of [
		["data/books.json", "book"],
		["data/adventures.json", "adventure"],
	] as const) {
		const catalog: unknown = JSON.parse(await readFile(join(dataDir, file), "utf8"));
		if (!catalog || typeof catalog !== "object") continue;
		const record = catalog as Record<string, unknown>;
		const list = record[key];
		if (!Array.isArray(list)) continue;
		for (const entry of list) {
			if (
				entry &&
				typeof entry === "object" &&
				"id" in entry &&
				"name" in entry &&
				typeof entry.id === "string" &&
				typeof entry.name === "string"
			) {
				names.set(entry.id, entry.name);
			}
		}
	}
	return names;
}

/** Render requested monsters with ttrpg-convert; keyed `name|source` in lowercase. */
export async function renderStatblocks(
	monsters: FivetoolsMonster[],
	dataDir: string,
): Promise<Map<string, Record<string, unknown>>> {
	checkTtrpgConvert();
	const tmp = await mkdtemp(join(tmpdir(), "cf-creatures-"));
	try {
		const configPath = join(tmp, "config.json");
		const outDir = join(tmp, "out");
		await writeFile(
			configPath,
			`${JSON.stringify({
				include: monsters.map((monster) => `monster|${monster.name.toLowerCase()}|${monster.source.toLowerCase()}`),
				excludePattern: ["^(?!spell\\|).*"],
				template: { monster: TEMPLATE },
				paths: { compendium: "c/", rules: "r/" },
			})}\n`,
		);
		const result = spawnSync("ttrpg-convert", ["-c", configPath, "-o", outDir, dataDir], {
			encoding: "utf8",
			maxBuffer: 64 * 1024 * 1024,
		});
		if (result.status !== 0) {
			throw new Error((result.stderr || result.stdout).trim() || "ttrpg-convert failed");
		}
		const files = existsSync(outDir) ? await glob("**/bestiary/**/*.md", { cwd: outDir, onlyFiles: true }) : [];
		const rendered = new Map<string, Record<string, unknown>>();
		for (const file of files) {
			const data = parseRendered(await readFile(join(outDir, file), "utf8"));
			if (!data) continue;
			const source = sourceOf(data, file);
			rendered.set(`${String(data.name)}|${source}`.toLowerCase(), data);
		}
		return rendered;
	} finally {
		await rm(tmp, { recursive: true, force: true });
	}
}
