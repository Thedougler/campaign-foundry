import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { loadCases } from "../../evals/check.ts";
import { assertSourcesUnchanged, recordSourceHashes } from "../../evals/sources.ts";
import { allocateEvalRun, closeEvalSession, createEvalSession } from "../../evals/workspaces.ts";

const roots: string[] = [];
afterEach(async () => { await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true }))); });

describe("live source drift", () => {
	it("stores only hashes and invalidates changed or removed Wiki/Raw/Archive inputs", async () => {
		const root = await mkdtemp(join(tmpdir(), "eval-source-test-"));
		roots.push(root);
		const session = await createEvalSession({ sessionId: "drift-test", pid: process.pid });
		try {
			const run = await allocateEvalRun(session.root);
			await Promise.all([mkdir(join(root, "wiki/World"), { recursive: true }), mkdir(join(root, "raw")), mkdir(join(root, "archive"))]);
			await Promise.all([writeFile(join(root, "wiki/World/Source.md"), "live page"), writeFile(join(root, "raw/input.md"), "raw input"), writeFile(join(root, "archive/input.md"), "archived input")]);
			const item = { id: "drift", prompt: "Read these", source_pages: ["World/Source"], raw_sources: ["raw/input.md", "archive/input.md"] };
			const hashes = await recordSourceHashes(root, item, run.controlRoot);
			expect(Object.keys(hashes)).toEqual(["wiki/World/Source.md", "raw/input.md", "archive/input.md"]);
			expect(Object.values(hashes).every((hash) => /^[a-f0-9]{64}$/u.test(hash))).toBe(true);
			expect(JSON.parse(await readFile(join(run.controlRoot, "source-hashes.json"), "utf8"))).toEqual(hashes);
			expect(await readdir(session.root)).toEqual(expect.arrayContaining(["control", "audit"]));
			expect(await readdir(session.root)).not.toContain("worlds");
			await expect(assertSourcesUnchanged(root, hashes)).resolves.toBeUndefined();
			await writeFile(join(root, "wiki/World/Source.md"), "changed");
			await expect(assertSourcesUnchanged(root, hashes)).rejects.toThrow("INVALIDATED: live source drift: wiki/World/Source.md");
			await writeFile(join(root, "wiki/World/Source.md"), "live page");
			await rm(join(root, "archive/input.md"));
			await expect(assertSourcesUnchanged(root, hashes)).rejects.toThrow("archive/input.md");
		} finally { await closeEvalSession(session.root); }
	});
	it("rejects removed seed fields and unsafe source paths", async () => {
		const root = await mkdtemp(join(tmpdir(), "eval-case-test-")); roots.push(root);
		const path = join(root, "cases.yaml");
		await writeFile(path, "- id: old\n  prompt: Read\n  seed_callouts: []\n");
		expect(() => loadCases(path)).toThrow('unknown case field "seed_callouts"');
		await writeFile(path, "- id: bad\n  prompt: Read\n  source_pages: [../outside]\n");
		expect(() => loadCases(path)).toThrow("unsafe Wiki-relative");
	});
});
