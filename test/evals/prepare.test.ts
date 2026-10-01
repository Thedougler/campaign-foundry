import { link, mkdir, mkdtemp, readFile, readdir, rm, stat, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { clonePreparedWorkspace, prepareCase, verifyWorkspace } from "../../evals/prepare.ts";

interface FixtureOptions {
	id?: string;
	sourcePages?: string[];
	rawSources?: string[];
	invalidRegex?: "canon" | "absent";
}

interface ReplayManifest {
	replaySources: Array<{ origin: string; scratchPath: string; archivePath: string; sha256: string }>;
}

interface Fixture {
	root: string;
	repositoryRoot: string;
	scratchParent: string;
	casesFile: string;
	sourcePage: string;
	archiveSource: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function replayManifest(value: unknown): ReplayManifest {
	if (!isRecord(value) || !Array.isArray(value.replaySources)) throw new Error("prepared manifest has no replaySources list");
	const sources: unknown[] = value.replaySources;
	return {
		replaySources: sources.map((source) => {
			if (!isRecord(source) || typeof source.origin !== "string" || typeof source.scratchPath !== "string" || typeof source.archivePath !== "string" || typeof source.sha256 !== "string") {
				throw new Error("prepared manifest has an invalid replay source");
			}
			return { origin: source.origin, scratchPath: source.scratchPath, archivePath: source.archivePath, sha256: source.sha256 };
		}),
	};
}

async function createFixture(options: FixtureOptions = {}): Promise<Fixture> {
	const root = await mkdtemp(join(tmpdir(), "eval-prepare-test-"));
	const repositoryRoot = join(root, "repo");
	const scratchParent = join(root, "runs");
	const casesFile = join(repositoryRoot, "cases.yaml");
	const sourcePage = join(repositoryRoot, "wiki", "World", "Source.md");
	const archiveSource = join(repositoryRoot, "archive", "original.md");
	await Promise.all([
		mkdir(join(repositoryRoot, "wiki", "World"), { recursive: true }),
		mkdir(join(repositoryRoot, "raw"), { recursive: true }),
		mkdir(join(repositoryRoot, "archive"), { recursive: true }),
		mkdir(join(repositoryRoot, ".qmd"), { recursive: true }),
		mkdir(scratchParent, { recursive: true }),
	]);
	await writeFile(sourcePage, "# Source\nReal source fact.\n");
	await writeFile(archiveSource, "# Archived input\nOriginal input remains immutable.\n");
	await writeFile(join(repositoryRoot, ".qmd", "index.yml"), `global_context: isolated test\ncollections:\n  wiki:\n    path: wiki\n    pattern: "**/*.md"\n    includeByDefault: true\n  raw:\n    path: raw\n    pattern: "**/*.md"\n    includeByDefault: false\n  archive:\n    path: archive\n    pattern: "**/*.md"\n    includeByDefault: false\n`);
	const id = options.id ?? "source-case";
	const sourcePages = options.sourcePages ?? ["World/Source.md"];
	const rawSources = options.rawSources ?? ["archive/original.md"];
	const lines = [
		`- id: ${id}`,
		"  prompt: Use the grounded source and keep its original immutable.",
		"  source_pages:",
		...sourcePages.map((page) => `    - ${page}`),
		"  raw_sources:",
		...rawSources.map((source) => `    - ${source}`),
	];
	if (options.invalidRegex) lines.push("  checks:", `    ${options.invalidRegex}:`, "      \"World/New Output.md\":", "        - '/(/'");
	await writeFile(casesFile, `${lines.join("\n")}\n`);
	return { root, repositoryRoot, scratchParent, casesFile, sourcePage, archiveSource };
}

async function withFixture(options: FixtureOptions, run: (fixture: Fixture) => Promise<void>): Promise<void> {
	const fixture = await createFixture(options);
	try {
		await run(fixture);
	} finally {
		await rm(fixture.root, { recursive: true, force: true });
	}
}

describe("evals/prepare.ts", () => {
	it("creates independent paired workspaces from a frozen real-source snapshot", async () => {
		await withFixture({}, async (fixture) => {
			const prepared = await prepareCase(fixture.casesFile, "source-case", {
				repositoryRoot: fixture.repositoryRoot,
				scratchParent: fixture.scratchParent,
			});
			const scratchConfig = await readFile(join(prepared.root, ".qmd", "index.yml"), "utf8");
			expect(scratchConfig).toMatch(/^    path: wiki$/m);
			expect(scratchConfig).toMatch(/^    path: raw$/m);
			expect(scratchConfig).toMatch(/^    path: archive$/m);
			expect(scratchConfig).not.toContain(fixture.repositoryRoot);
			const withRun = await clonePreparedWorkspace(prepared.root, { scratchParent: fixture.scratchParent });
			const baselineRun = await clonePreparedWorkspace(prepared.root, { scratchParent: fixture.scratchParent });
			const parsedManifest: unknown = JSON.parse(await readFile(prepared.manifest, "utf8"));
			const manifest = replayManifest(parsedManifest);
			const [replay] = manifest.replaySources;
			if (!replay) throw new Error("prepared manifest should include the selected Archive replay source");
			const originalText = "# Source\nReal source fact.\n";

			expect(withRun.root).not.toBe(baselineRun.root);
			expect(await readFile(join(withRun.root, replay.scratchPath), "utf8")).toBe("# Archived input\nOriginal input remains immutable.\n");

			const sourceStat = await stat(fixture.sourcePage);
			const scratchStat = await stat(join(withRun.wiki, "World", "Source.md"));
			expect([scratchStat.dev, scratchStat.ino]).not.toEqual([sourceStat.dev, sourceStat.ino]);
			expect(scratchStat.nlink).toBe(1);
			await writeFile(join(withRun.wiki, "World", "Source.md"), "Changed only in one paired workspace.\n");

			expect(await readFile(join(baselineRun.wiki, "World", "Source.md"), "utf8")).toBe(originalText);
			expect(await readFile(join(prepared.baseline, "World", "Source.md"), "utf8")).toBe(originalText);
			expect(await readFile(fixture.sourcePage, "utf8")).toBe(originalText);
			expect(await readFile(fixture.archiveSource, "utf8")).toBe("# Archived input\nOriginal input remains immutable.\n");
			await expect(verifyWorkspace(withRun.root)).resolves.toMatchObject({ ok: true });
			await expect(verifyWorkspace(baselineRun.root)).resolves.toMatchObject({ ok: true });
			await expect(verifyWorkspace(prepared.root)).resolves.toMatchObject({ ok: true });
		});
	});

	it("rejects unsafe source paths before creating a workspace", async () => {
		await withFixture({ sourcePages: ["../outside.md"] }, async (fixture) => {
			await expect(prepareCase(fixture.casesFile, "source-case", {
				repositoryRoot: fixture.repositoryRoot,
				scratchParent: fixture.scratchParent,
			})).rejects.toThrow(/unsafe path component/);
			expect(await readdir(fixture.scratchParent)).toEqual([]);
		});

		await withFixture({ rawSources: ["archive/../../wiki/World/Source.md"] }, async (fixture) => {
			await expect(prepareCase(fixture.casesFile, "source-case", {
				repositoryRoot: fixture.repositoryRoot,
				scratchParent: fixture.scratchParent,
			})).rejects.toThrow(/unsafe path component/);
			expect(await readdir(fixture.scratchParent)).toEqual([]);
		});
	});

	it("rejects symlinked and hard-linked original data", async () => {
		await withFixture({}, async (fixture) => {
			await link(fixture.sourcePage, join(fixture.repositoryRoot, "wiki", "World", "Hard link.md"));
			await expect(prepareCase(fixture.casesFile, "source-case", {
				repositoryRoot: fixture.repositoryRoot,
				scratchParent: fixture.scratchParent,
			})).rejects.toThrow(/hard-linked file/);
			expect(await readdir(fixture.scratchParent)).toEqual([]);
		});

		await withFixture({}, async (fixture) => {
			await symlink(fixture.sourcePage, join(fixture.repositoryRoot, "wiki", "World", "Symbolic link.md"));
			await expect(prepareCase(fixture.casesFile, "source-case", {
				repositoryRoot: fixture.repositoryRoot,
				scratchParent: fixture.scratchParent,
			})).rejects.toThrow(/contains a symlink/);
			expect(await readdir(fixture.scratchParent)).toEqual([]);
		});
	});

	it("compiles canon and absent regexes even when output pages do not exist", async () => {
		for (const kind of ["canon", "absent"] as const) {
			await withFixture({ invalidRegex: kind }, async (fixture) => {
				const expectedContext = new RegExp(`case "source-case" checks\\.${kind}\\["World/New Output\\.md"\\]: invalid regex`);
				await expect(prepareCase(fixture.casesFile, "source-case", {
					repositoryRoot: fixture.repositoryRoot,
					scratchParent: fixture.scratchParent,
				})).rejects.toThrow(expectedContext);
				expect(await readdir(fixture.scratchParent)).toEqual([]);
			});
		}
	});

	it("rejects changed original sources and a rewritten scratch QMD config", async () => {
		await withFixture({}, async (fixture) => {
			const prepared = await prepareCase(fixture.casesFile, "source-case", {
				repositoryRoot: fixture.repositoryRoot,
				scratchParent: fixture.scratchParent,
			});
			await writeFile(join(prepared.root, ".qmd", "index.yml"), "collections:\n  wiki:\n    path: /live/wiki\n");
			await expect(verifyWorkspace(prepared.root)).rejects.toThrow(/scratch \.qmd\/index\.yml changed/);
		});

		await withFixture({}, async (fixture) => {
			const prepared = await prepareCase(fixture.casesFile, "source-case", {
				repositoryRoot: fixture.repositoryRoot,
				scratchParent: fixture.scratchParent,
			});
			await writeFile(fixture.sourcePage, "Original source was changed outside the workspace.\n");
			await expect(verifyWorkspace(prepared.root)).rejects.toThrow(/source wiki changed: World\/Source\.md/);
		});
	});
});
