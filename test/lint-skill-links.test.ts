import {
	cpSync,
	existsSync,
	mkdirSync,
	mkdtempSync,
	readlinkSync,
	rmSync,
	symlinkSync,
	unlinkSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { capture, REPO_ROOT } from "../scripts/lint/core.ts";

const roots: string[] = [];
afterEach(() => {
	for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

function fixture(): string {
	const root = mkdtempSync(join(tmpdir(), "lint-skill-links-"));
	roots.push(root);
	mkdirSync(join(root, "scripts"));
	cpSync(join(REPO_ROOT, "scripts/lint.ts"), join(root, "scripts/lint.ts"));
	cpSync(join(REPO_ROOT, "scripts/lint"), join(root, "scripts/lint"), { recursive: true });
	for (const path of ["node_modules", "src", "evals"]) symlinkSync(join(REPO_ROOT, path), join(root, path));
	for (const path of ["package.json", "skills-lock.json", ".lint-agents.json"]) {
		cpSync(join(REPO_ROOT, path), join(root, path));
	}
	mkdirSync(join(root, ".claude/skills"), { recursive: true });
	for (const name of ["missing", "kept"]) {
		mkdirSync(join(root, ".agents/skills", name), { recursive: true });
		writeFileSync(join(root, ".agents/skills", name, "SKILL.md"), `# ${name}\n`);
		symlinkSync(`../../.agents/skills/${name}`, join(root, ".claude/skills", name));
	}
	// A directory without SKILL.md is not a skill.
	mkdirSync(join(root, ".agents/skills/not-a-skill"));
	return root;
}

describe("Claude skill link drift", () => {
	it("reports a missing and dead link, then bun run fix repairs both idempotently", async () => {
		const root = fixture();
		const missing = join(root, ".claude/skills/missing");
		const dead = join(root, ".claude/skills/dead");
		unlinkSync(missing);
		symlinkSync("../../.agents/skills/not-a-skill", dead);

		const before = await capture("bun", ["run", "lint", "agents", ".claude/skills"], { cwd: root });
		expect(before.stderr).not.toContain("agents: error:");
		expect(before.status).toBe(1);
		expect(before.stdout).toContain(".claude/skills/missing:1 skill-links/missing");
		expect(before.stdout).toContain(".claude/skills/dead:1 skill-links/dead");
		expect(before.stdout).toContain("agents: 2 findings in 2 files");
		expect(existsSync(missing)).toBe(false);
		expect(readlinkSync(dead)).toBe("../../.agents/skills/not-a-skill");

		const fixed = await capture("bun", ["run", "fix", "agents", ".claude/skills"], { cwd: root });
		expect(fixed.stderr).not.toContain("error:");
		expect(fixed.status).toBe(0);
		expect(fixed.stdout).toContain("agents: ok (0 files), 2 fixed");
		expect(readlinkSync(missing)).toBe("../../.agents/skills/missing");
		expect(existsSync(join(missing, "SKILL.md"))).toBe(true);
		expect(existsSync(dead)).toBe(false);
		expect(() => readlinkSync(dead)).toThrow();
		expect(readlinkSync(join(root, ".claude/skills/kept"))).toBe("../../.agents/skills/kept");
		expect(existsSync(join(root, ".claude/skills/not-a-skill"))).toBe(false);

		const after = await capture("bun", ["run", "lint", "agents", "--json", ".claude/skills"], { cwd: root });
		expect(after.status).toBe(0);
		const report = JSON.parse(after.stdout);
		expect(report.ok).toBe(true);
		expect(report.scopes.find((scope: { scope: string }) => scope.scope === "agents").findings).toEqual([]);
		const again = await capture("bun", ["run", "fix", "agents", ".claude/skills"], { cwd: root });
		expect(again.status).toBe(0);
		expect(again.stdout).not.toContain("fixed  ");
	});
});
