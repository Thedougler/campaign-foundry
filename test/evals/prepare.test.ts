import { execFile } from "node:child_process";
import { chmod, link, mkdir, mkdtemp, readFile, readdir, realpath, rm, stat, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { clonePreparedWorkspace, prepareCase, verifyWorkspace } from "../../evals/prepare.ts";
import { closeEvalSession, createEvalSession } from "../../evals/workspaces.ts";

const execFileAsync = promisify(execFile);
const PREPARE_CLI = fileURLToPath(new URL("../../evals/prepare.ts", import.meta.url));

interface FixtureOptions {
	id?: string;
	sourcePages?: string[];
	rawSources?: string[];
	invalidRegex?: "canon" | "absent";
	sourceText?: string;
	seedCallouts?: Array<{ page: string; title: string; body: string }>;
	missingQmdIndex?: boolean;
	missingQmdConfig?: boolean;
	privateCriteria?: boolean;
}

interface ReplayManifest {
	replaySources: Array<{ origin: string; scratchPath: string; archivePath: string; sha256: string }>;
}

interface Fixture {
	root: string;
	repositoryRoot: string;
	sessionRoot: string;
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
	const session = await createEvalSession({ sessionId: root, pid: process.pid });
	const casesFile = join(repositoryRoot, "cases.yaml");
	const sourcePage = join(repositoryRoot, "wiki", "World", "Source.md");
	const archiveSource = join(repositoryRoot, "archive", "original.md");
	await Promise.all([
		mkdir(join(repositoryRoot, "wiki", "World"), { recursive: true }),
		mkdir(join(repositoryRoot, "raw"), { recursive: true }),
		mkdir(join(repositoryRoot, "archive"), { recursive: true }),
		mkdir(join(repositoryRoot, ".qmd"), { recursive: true }),
	]);
	const canonicalRepo = await realpath(repositoryRoot);
	await writeFile(sourcePage, options.sourceText ?? "# Source\nReal source fact.\n");
	await writeFile(archiveSource, "# Archived input\nOriginal input remains immutable.\n");
	if (!options.missingQmdConfig) await writeFile(join(repositoryRoot, ".qmd", "index.yml"), `global_context: fixture\ncollections:\n  wiki:\n    path: wiki\n    pattern: "**/*.md"\n    includeByDefault: true\n  raw:\n    path: raw\n    pattern: "**/*.md"\n    includeByDefault: false\n  archive:\n    path: archive\n    pattern: "**/*.md"\n    includeByDefault: false\n`);
	if (!options.missingQmdIndex) await writeFile(join(repositoryRoot, ".qmd", "index.sqlite"), "fixture live QMD index\n");
	const id = options.id ?? "source-case";
	const sourcePages = options.sourcePages ?? ["World/Source.md"];
	const rawSources = options.rawSources ?? ["archive/original.md"];
	const lines = [
		`- id: ${id}`,
		`  prompt: ${JSON.stringify("Use the grounded source and keep its original immutable.")}`,
		"  source_pages:",
		...sourcePages.map((page) => `    - ${JSON.stringify(page)}`),
		"  raw_sources:",
		...rawSources.map((source) => `    - ${JSON.stringify(source)}`),
	];
	if (options.seedCallouts) {
		lines.push("  seed_callouts:");
		for (const seed of options.seedCallouts) {
			lines.push(`    - page: ${JSON.stringify(seed.page)}`, `      title: ${JSON.stringify(seed.title)}`, `      body: ${JSON.stringify(seed.body)}`);
		}
	}
	if (options.privateCriteria) lines.push(
		"  checks:",
		"    pages:",
		`      - ${JSON.stringify("World/Source.md")}`,
		"  rubrics:",
		`    - ${JSON.stringify("Preserve the actual source fact.")}`,
	);
	if (options.invalidRegex) lines.push("  checks:", `    ${options.invalidRegex}:`, "      \"World/New Output.md\":", "        - '/(/'");
	await writeFile(casesFile, `${lines.join("\n")}\n`);
	return {
		root,
		repositoryRoot: canonicalRepo,
		sessionRoot: session.root,
		casesFile: join(canonicalRepo, "cases.yaml"),
		sourcePage: join(canonicalRepo, "wiki", "World", "Source.md"),
		archiveSource: join(canonicalRepo, "archive", "original.md"),
	};
}

async function withFixture(options: FixtureOptions, run: (fixture: Fixture) => Promise<void>): Promise<void> {
	const fixture = await createFixture(options);
	try {
		await run(fixture);
	} finally {
		await closeEvalSession(fixture.sessionRoot);
		await rm(fixture.root, { recursive: true, force: true });
	}
}

describe("evals/prepare.ts", () => {
	it("creates private control data and safe Runner input for independent paired Worlds", async () => {
		await withFixture({ privateCriteria: true }, async (fixture) => {
			const prepared = await prepareCase(fixture.casesFile, "source-case", {
				repositoryRoot: fixture.repositoryRoot,
				sessionRoot: fixture.sessionRoot,
			});
			const withRun = await clonePreparedWorkspace(prepared.root, { sessionRoot: fixture.sessionRoot });
			const baselineRun = await clonePreparedWorkspace(prepared.root, { sessionRoot: fixture.sessionRoot });
			const parsedManifest: unknown = JSON.parse(await readFile(prepared.manifest, "utf8"));
			const manifest = replayManifest(parsedManifest);
			const [replay] = manifest.replaySources;
			if (!replay) throw new Error("prepared manifest should include the selected Archive replay source");
			const originalText = "# Source\nReal source fact.\n";
			const expectedArchiveReplay = "# Archived input\nOriginal input remains immutable.\n";

			expect(withRun.root).not.toBe(baselineRun.root);
			expect(prepared.root).toBe(join(fixture.sessionRoot, "worlds", basename(prepared.root)));
			await expect(verifyWorkspace(`${prepared.root}/../${basename(prepared.root)}`)).rejects.toThrow(/traversal/);
			expect(prepared.qmd).toEqual({ mode: "live-read-only", index: join(fixture.repositoryRoot, ".qmd", "index.sqlite") });
			await expect(readdir(join(prepared.root, ".qmd"))).rejects.toMatchObject({ code: "ENOENT" });
			expect(prepared.manifest).toBe(join(fixture.sessionRoot, "control", basename(prepared.root), "manifest.json"));
			expect(prepared.baseline).toBe(join(fixture.sessionRoot, "control", basename(prepared.root), "baseline", "wiki"));
			const privateRecord = JSON.parse(await readFile(prepared.manifest, "utf8")) as Record<string, unknown>;
			expect(privateRecord).toMatchObject({
				schemaVersion: 2,
				sessionRoot: fixture.sessionRoot,
				workspaceRoot: prepared.root,
				caseInput: { checks: { pages: ["World/Source.md"] }, rubrics: ["Preserve the actual source fact."] },
			});
			await expect(readFile(join(prepared.root, ".eval", "manifest.json"), "utf8")).rejects.toMatchObject({ code: "ENOENT" });

			const descriptorSource = await readFile(prepared.runnerInput, "utf8");
			const descriptor = JSON.parse(descriptorSource) as Record<string, unknown>;
			expect(Object.keys(descriptor).sort()).toEqual(["caseId", "outputPaths", "prompt", "replaySources", "startHere"]);
			expect(descriptor).toMatchObject({
				caseId: "source-case",
				prompt: "Use the grounded source and keep its original immutable.",
				startHere: ["World/Source.md"],
				replaySources: [{ input: replay.scratchPath, archiveDestination: replay.archivePath }],
				outputPaths: {
					workspace: prepared.root,
					wiki: prepared.wiki,
					raw: prepared.raw,
					archive: prepared.archive,
					output: join(prepared.root, ".eval", "output.md"),
				},
			});
			const descriptorText = JSON.stringify(descriptor);
			for (const privateTerm of ["checks", "rubrics", "cases.yaml", "baseline", "control", "Grades", "history", "Preserve the actual source fact."]) {
				expect(descriptorText).not.toContain(privateTerm);
			}
			expect((await stat(prepared.runnerInput)).mode & 0o222).toBe(0);
			const writeError = await writeFile(prepared.runnerInput, "changed").then(() => undefined, (error: NodeJS.ErrnoException) => error);
			if (writeError) expect(["EACCES", "EPERM"]).toContain(writeError.code);
			else {
				await chmod(prepared.runnerInput, 0o600);
				await writeFile(prepared.runnerInput, descriptorSource);
				await chmod(prepared.runnerInput, 0o444);
			}
			expect(await readFile(prepared.runnerInput, "utf8")).toBe(descriptorSource);
			expect(await readFile(join(withRun.root, replay.scratchPath), "utf8")).toBe(expectedArchiveReplay);
			const sourceStat = await stat(fixture.sourcePage);
			const scratchStat = await stat(join(withRun.wiki, "World", "Source.md"));
			expect([scratchStat.dev, scratchStat.ino]).not.toEqual([sourceStat.dev, sourceStat.ino]);
			expect(scratchStat.nlink).toBe(1);
			await writeFile(join(withRun.wiki, "World", "Source.md"), "Changed only in one paired workspace.\n");

			expect(await readFile(join(baselineRun.wiki, "World", "Source.md"), "utf8")).toBe(originalText);
			expect(await readFile(join(prepared.baseline, "World", "Source.md"), "utf8")).toBe(originalText);
			expect(await readFile(fixture.sourcePage, "utf8")).toBe(originalText);
			expect(await readFile(fixture.archiveSource, "utf8")).toBe(expectedArchiveReplay);
			await expect(verifyWorkspace(withRun.root)).resolves.toMatchObject({ ok: true });
			await expect(verifyWorkspace(baselineRun.root)).resolves.toMatchObject({ ok: true });
			await expect(verifyWorkspace(prepared.root)).resolves.toMatchObject({ ok: true });
		});
	});

	it("rejects unsafe paths, symlinks, hardlinks, and invalid regexes before leaving allocations", async () => {
		await withFixture({ sourcePages: ["../outside.md"] }, async (fixture) => {
			await expect(prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot })).rejects.toThrow(/unsafe path component/);
			expect(await readdir(join(fixture.sessionRoot, "worlds"))).toEqual([]);
		});

		await withFixture({ rawSources: ["archive/../../wiki/World/Source.md"] }, async (fixture) => {
			await expect(prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot })).rejects.toThrow(/unsafe path component/);
			expect(await readdir(join(fixture.sessionRoot, "worlds"))).toEqual([]);
		});

		await withFixture({ seedCallouts: [{ page: "../outside.md", title: "First sight", body: "Draft." }] }, async (fixture) => {
			await expect(prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot })).rejects.toThrow(/unsafe path component/);
			expect(await readdir(join(fixture.sessionRoot, "worlds"))).toEqual([]);
		});

		await withFixture({}, async (fixture) => {
			await link(fixture.sourcePage, join(fixture.repositoryRoot, "wiki", "World", "Hard link.md"));
			await expect(prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot })).rejects.toThrow(/hard-linked file/);
			expect(await readdir(join(fixture.sessionRoot, "worlds"))).toEqual([]);
		});

		await withFixture({}, async (fixture) => {
			await symlink(fixture.sourcePage, join(fixture.repositoryRoot, "wiki", "World", "Symbolic link.md"));
			await expect(prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot })).rejects.toThrow(/contains a symlink/);
			expect(await readdir(join(fixture.sessionRoot, "worlds"))).toEqual([]);
		});

		for (const kind of ["canon", "absent"] as const) {
			await withFixture({ invalidRegex: kind }, async (fixture) => {
				await expect(prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot })).rejects.toThrow(/invalid regex/);
				expect(await readdir(join(fixture.sessionRoot, "worlds"))).toEqual([]);
			});
		}
	});

	it("detects source drift and rejects missing live QMD resources", async () => {
		await withFixture({}, async (fixture) => {
			const prepared = await prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot });
			await writeFile(fixture.sourcePage, "Original source changed outside this run.\n");
			await expect(verifyWorkspace(prepared.root)).rejects.toThrow(/source wiki changed: World\/Source\.md/);
		});

		await withFixture({}, async (fixture) => {
			const prepared = await prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot });
			await writeFile(join(fixture.repositoryRoot, ".qmd", "index.sqlite"), "changed live index\n");
			await expect(verifyWorkspace(prepared.root)).rejects.toThrow(/source changed after preparation/);
		});

		await withFixture({}, async (fixture) => {
			const prepared = await prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot });
			await writeFile(fixture.casesFile, "- id: source-case\n  prompt: changed\n  source_pages:\n    - World/Source.md\n");
			await expect(verifyWorkspace(prepared.root)).rejects.toThrow(/source changed after preparation/);
		});

		await withFixture({}, async (fixture) => {
			const prepared = await prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot });
			await writeFile(join(fixture.repositoryRoot, ".qmd", "index.yml"), "global_context: changed\n");
			await expect(verifyWorkspace(prepared.root)).rejects.toThrow(/source changed after preparation/);
		});

		await withFixture({ missingQmdIndex: true }, async (fixture) => {
			await expect(prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot })).rejects.toThrow(/PREPARATION.*live QMD index/);
			expect(await readdir(join(fixture.sessionRoot, "worlds"))).toEqual([]);
		});

		await withFixture({ missingQmdConfig: true }, async (fixture) => {
			await expect(prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot })).rejects.toThrow(/PREPARATION.*live QMD config/);
			expect(await readdir(join(fixture.sessionRoot, "worlds"))).toEqual([]);
		});
	});

	it("seeds only a unique narration callout body and freezes the seeded page for clones", async () => {
		const source = "---\nkind: fixture\n---\n# Source\n\nIntro.\n\n> [!narration] First sight\n> Existing first line.\n> Existing second line.\n\n```statblock\nname: Keep me\n```\n\nEnding.\n";
		await withFixture({ sourceText: source, seedCallouts: [{ page: "World/Source.md", title: "First sight", body: "Draft." }] }, async (fixture) => {
			const prepared = await prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot });
			const seeded = "---\nkind: fixture\n---\n# Source\n\nIntro.\n\n> [!narration] First sight\n> Draft.\n\n```statblock\nname: Keep me\n```\n\nEnding.\n";
			expect(await readFile(join(prepared.wiki, "World", "Source.md"), "utf8")).toBe(seeded);
			expect(await readFile(join(prepared.baseline, "World", "Source.md"), "utf8")).toBe(seeded);
			expect(await readFile(fixture.sourcePage, "utf8")).toBe(source);
			const clone = await clonePreparedWorkspace(prepared.root, { sessionRoot: fixture.sessionRoot });
			expect(await readFile(join(clone.wiki, "World", "Source.md"), "utf8")).toBe(seeded);
			expect(await readFile(join(clone.baseline, "World", "Source.md"), "utf8")).toBe(seeded);
		});
	});

	it("removes partial World and control allocations after missing or ambiguous seed targets", async () => {
		for (const sourceText of ["# Source\nNo narration here.\n", "# Source\n\n> [!narration] First sight\n> One.\n\n> [!narration] First sight\n> Two.\n"]) {
			await withFixture({ sourceText, seedCallouts: [{ page: "World/Source.md", title: "First sight", body: "Draft." }] }, async (fixture) => {
				await expect(prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot })).rejects.toThrow(/PREPARATION.*matched/);
				expect(await readdir(join(fixture.sessionRoot, "worlds"))).toEqual([]);
				expect(await readdir(join(fixture.sessionRoot, "control"))).toEqual([]);
			});
		}
	});

	it("removes only the failed run from a supplied Session", async () => {
		await withFixture({}, async (fixture) => {
			const prepared = await prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot });
			const failedCases = join(fixture.repositoryRoot, "failed-seed.yaml");
			await writeFile(failedCases, [
				"- id: failed-seed",
				"  prompt: \"Do the requested work.\"",
				"  source_pages:",
				"    - World/Source.md",
				"  seed_callouts:",
				"    - page: World/Source.md",
				"      title: Missing target",
				"      body: Draft.",
			].join("\n") + "\n");
			await expect(prepareCase(failedCases, "failed-seed", { repositoryRoot: fixture.repositoryRoot, sessionRoot: fixture.sessionRoot })).rejects.toThrow(/PREPARATION.*matched/);
			expect(await readdir(join(fixture.sessionRoot, "worlds"))).toEqual([basename(prepared.root)]);
			expect(await readdir(join(fixture.sessionRoot, "control"))).toEqual([basename(prepared.root)]);
			await expect(verifyWorkspace(prepared.root)).resolves.toMatchObject({ ok: true });
		});
	});

	it("keeps successful standalone sessions open and closes failed standalone sessions", async () => {
		const originalTmpdir = process.env.TMPDIR;
		const isolatedTempRoot = await mkdtemp(join(tmpdir(), "eval-prepare-standalone-test-"));
		process.env.TMPDIR = isolatedTempRoot;
		try {
			await withFixture({}, async (fixture) => {
				const beforeEmptyPrepare = (await readdir(isolatedTempRoot)).filter((name) => name.startsWith("campaign-foundry-eval-")).sort();
				await expect(prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot, sessionRoot: "" })).rejects.toThrow(/absolute/);
				expect((await readdir(isolatedTempRoot)).filter((name) => name.startsWith("campaign-foundry-eval-")).sort()).toEqual(beforeEmptyPrepare);
				const prepared = await prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot });
				const beforeEmptyClone = (await readdir(isolatedTempRoot)).filter((name) => name.startsWith("campaign-foundry-eval-")).sort();
				await expect(clonePreparedWorkspace(prepared.root, { sessionRoot: "" })).rejects.toThrow(/absolute/);
				expect((await readdir(isolatedTempRoot)).filter((name) => name.startsWith("campaign-foundry-eval-")).sort()).toEqual(beforeEmptyClone);
				try {
					const owner = JSON.parse(await readFile(join(prepared.sessionRoot, ".session.json"), "utf8")) as Record<string, unknown>;
					expect(prepared.sessionRoot).not.toBe(fixture.sessionRoot);
					expect(owner.pid).toBe(process.pid);
					expect(await readdir(prepared.root)).toContain("wiki");
				} finally {
					await closeEvalSession(prepared.sessionRoot);
				}
			});

			await withFixture({ sourceText: "# Source\nNo narration here.\n", seedCallouts: [{ page: "World/Source.md", title: "First sight", body: "Draft." }] }, async (fixture) => {
				const before = (await readdir(isolatedTempRoot)).filter((name) => name.startsWith("campaign-foundry-eval-")).sort();
				await expect(prepareCase(fixture.casesFile, "source-case", { repositoryRoot: fixture.repositoryRoot })).rejects.toThrow(/PREPARATION.*matched/);
				const after = (await readdir(isolatedTempRoot)).filter((name) => name.startsWith("campaign-foundry-eval-")).sort();
				expect(after).toEqual(before);
			});
		} finally {
			if (originalTmpdir === undefined) delete process.env.TMPDIR;
			else process.env.TMPDIR = originalTmpdir;
			await rm(isolatedTempRoot, { recursive: true, force: true });
		}
	});

	it("documents lifecycle commands and enforces reap-only options", async () => {
		const { stdout: help } = await execFileAsync(process.execPath, [PREPARE_CLI, "--help"], { encoding: "utf8" });
		for (const example of ["--session-start", "--session-close", "--reap-stale", "--cases", "--from", "--verify"]) {
			expect(String(help)).toContain(example);
		}

		const { stdout } = await execFileAsync(process.execPath, [PREPARE_CLI, "--session-start"], { encoding: "utf8" });
		const session = JSON.parse(String(stdout).trim()) as { root: string };
		try {
			expect(session.root).toContain("campaign-foundry-eval-");
			let failure: { code?: number | string | null; stderr?: string } | undefined;
			try {
				await execFileAsync(process.execPath, [PREPARE_CLI, "--session-start", "--older-than-hours", "24"], { encoding: "utf8" });
			} catch (error) {
				failure = error as { code?: number | string | null; stderr?: string };
			}
			expect(failure?.code).toBe(2);
			expect(String(failure?.stderr)).toContain("require --reap-stale");
			const { stdout: closeOutput } = await execFileAsync(process.execPath, [PREPARE_CLI, "--session-close", session.root], { encoding: "utf8" });
			expect(JSON.parse(String(closeOutput).trim())).toEqual({ closed: session.root });
			await expect(readdir(session.root)).rejects.toMatchObject({ code: "ENOENT" });
		} finally {
			await closeEvalSession(session.root);
		}
	});

});

