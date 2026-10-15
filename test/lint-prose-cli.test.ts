import { cp, mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { capture, REPO_ROOT } from "../scripts/lint/core.ts";

let repo: string;
beforeAll(async () => {
	repo = await mkdtemp(join(tmpdir(), "lint-prose-repo-"));
	await mkdir(join(repo, "scripts"));
	await cp(join(REPO_ROOT, "scripts/lint.ts"), join(repo, "scripts/lint.ts"));
	await cp(join(REPO_ROOT, "scripts/lint"), join(repo, "scripts/lint"), { recursive: true });
	for (const path of ["node_modules", "src", "evals"]) await symlink(join(REPO_ROOT, path), join(repo, path));
	for (const path of ["package.json", "bun.lock", "skills-lock.json", ".lint-agents.json", ".gitignore"]) {
		await cp(join(REPO_ROOT, path), join(repo, path));
	}
	// The real CLI and Vale check these drafts with an empty, isolated Wiki context.
	await mkdir(join(repo, "wiki"));
});
afterAll(async () => rm(repo, { recursive: true, force: true }));

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("lint prose explicit files", () => {
	it.each(["gitignored", "outside-repo"])("checks a named %s draft", async (location) => {
		const parent = location === "gitignored" ? join(repo, ".cache") : tmpdir();
		await mkdir(parent, { recursive: true });
		const root = await mkdtemp(join(parent, "lint-prose-"));
		roots.push(root);
		const file = join(root, "draft.md");
		await writeFile(file, "The PC holds the line.\n");
		const input = location === "gitignored" ? relative(repo, file) : file;
		const result = await capture("bun", ["run", "lint", "prose", input], { cwd: repo });
		expect(result.status).toBe(1);
		expect(result.stdout).toContain("style/ai-tells.FigurativeHolds");
		expect(result.stdout).toContain(location === "gitignored" ? input : file);
		expect(result.stdout).not.toContain("prose: ok (0 files)");
		expect(result.stderr).not.toContain("path is outside the repo");
	});

	it.each(["gitignored", "outside-repo"])("counts a clean named %s draft in JSON", async (location) => {
		const parent = location === "gitignored" ? join(repo, ".cache") : tmpdir();
		await mkdir(parent, { recursive: true });
		const root = await mkdtemp(join(parent, "lint-prose-"));
		roots.push(root);
		const file = join(root, "clean.md");
		await writeFile(file, "The door opens.\n");
		const input = location === "gitignored" ? relative(repo, file) : file;
		const result = await capture("bun", ["run", "lint", "prose", "--json", input], { cwd: repo });
		expect(result.status).toBe(0);
		expect(JSON.parse(result.stdout).scopes).toContainEqual(
			expect.objectContaining({ scope: "prose", ok: true, files: 1, failures: [] }),
		);
	});

	it("names a missing file instead of reporting an empty success", async () => {
		const root = await mkdtemp(join(tmpdir(), "lint-prose-"));
		roots.push(root);
		const result = await capture("bun", ["run", "lint", "prose", join(root, "missing.md")], { cwd: repo });
		expect(result.status).toBe(2);
		expect(result.stderr).toContain("missing.md");
		expect(result.stdout).not.toContain("prose: ok (0 files)");
	});

	it("names a file that is not markdown instead of reporting an empty success", async () => {
		const root = await mkdtemp(join(tmpdir(), "lint-prose-"));
		roots.push(root);
		const file = join(root, "draft.txt");
		await writeFile(file, "The PC holds the line.\n");
		const result = await capture("bun", ["run", "lint", "prose", file], { cwd: repo });
		expect(result.status).toBe(2);
		expect(result.stderr).toContain("draft.txt");
		expect(result.stdout).not.toContain("prose: ok (0 files)");
	});
});
