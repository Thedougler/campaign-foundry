import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { operationalInstructions, parseJsonObject, resolveSkillEval } from "../../evals/run.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

describe("evals/run.ts", () => {
	it("resolves theatre-of-the-mind cases and SKILL.md, compiling every regex", () => {
		const target = resolveSkillEval("theatre-of-the-mind", { repositoryRoot: repoRoot });
		expect(target.casesFile).toBe(join(repoRoot, ".agents/skills/theatre-of-the-mind/evals/cases.yaml"));
		expect(target.skillRoot).toBe(join(repoRoot, ".agents/skills/theatre-of-the-mind"));
		expect(target.cases.map((item) => item.id)).toEqual(["narration-slots", "fatespinner-chat", "gold-caste-handout"]);
	});

	it("keeps runner operational text free of private checks and rubrics", () => {
		const text = operationalInstructions("/tmp/world", join(repoRoot, ".agents/skills/theatre-of-the-mind"));
		expect(text).toContain("Write root $W: /tmp/world");
		expect(text).toContain("theatre-of-the-mind");
		expect(text).not.toMatch(/rubric/i);
		expect(text).not.toMatch(/\[!narration\\]/);
		expect(text).not.toContain("eval:check");
	});

	it("parses prepare JSON that follows an env banner", () => {
		const payload = parseJsonObject('◇ injected env (1) from .env\n{"root":"/tmp/session"}\n', "", 0, "session-start");
		expect(payload.root).toBe("/tmp/session");
	});

	it("names a missing skill as PREPARATION", () => {
		expect(() => resolveSkillEval("no-such-skill", { repositoryRoot: repoRoot })).toThrow(/PREPARATION: no cases.yaml/);
	});
});
