import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { calculateStats, packageSkill, validateSkill } from "../../evals/authoring.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function skill(frontmatter = "name: sample\ndescription: Use for <sample> work.\ndisable-model-invocation: true\ncustom: extension") {
	const root = await mkdtemp(join(tmpdir(), "cf-authoring-test-"));
	roots.push(root);
	const directory = join(root, "sample");
	await mkdir(directory);
	await writeFile(join(directory, "SKILL.md"), `---\n${frontmatter}\n---\n# Sample\n`);
	return { root, directory };
}

describe("native authoring helpers", () => {
	it.each([
		["validate"],
		["package", ".omp/skills/skill-creator"],
		["review", "/tmp/iteration"],
		["description-review", "/tmp/queries.json"],
	])("returns the documented usage status for missing %s inputs", (...args) => {
		const result = spawnSync(process.execPath, [fileURLToPath(new URL("../../src/cli.ts", import.meta.url)), "eval", ...args], { encoding: "utf8" });
		expect(result.status).toBe(2);
	});
	it("accepts native invocation metadata and extension keys without Anthropic character restrictions", async () => {
		const { directory } = await skill();
		const result = await validateSkill(directory);
		expect(result.name).toBe("sample");
		expect(result.description).toBe("Use for <sample> work.");
		expect(result.frontmatter["disable-model-invocation"]).toBe(true);
		expect(result.frontmatter.custom).toBe("extension");
	});
	it("rejects a mismatched catalog name and mistyped native invocation field", async () => {
		const { directory } = await skill("name: other\ndescription: Use for work.");
		await expect(validateSkill(directory)).rejects.toThrow("does not match directory");
		await writeFile(join(directory, "SKILL.md"), '---\nname: sample\ndescription: Use for work.\ndisable-model-invocation: "false"\n---\n');
		await expect(validateSkill(directory)).rejects.toThrow("must be a boolean");
	});
	it("rejects linked resources without overwriting an existing bundle", async () => {
		const { root, directory } = await skill();
		const output = join(root, "sample.skill");
		await writeFile(output, "previous bundle");
		await writeFile(join(root, "private.txt"), "not a skill resource");
		await symlink(join(root, "private.txt"), join(directory, "linked.txt"));
		await expect(packageSkill(directory, output)).rejects.toThrow("symbolic link");
		expect(await readFile(output, "utf8")).toBe("previous bundle");
	});
	it("reports sample rather than population deviation from actual observations", () => {
		expect(calculateStats([1, 2, 3])).toEqual({ mean: 2, stddev: 1, min: 1, max: 3 });
		expect(calculateStats([0.25])).toEqual({ mean: 0.25, stddev: 0, min: 0.25, max: 0.25 });
		expect(calculateStats([-2, 0, 2])).toEqual({ mean: 0, stddev: 2, min: -2, max: 2 });
	});
	it("rejects unavailable metric placeholders instead of returning estimated statistics", () => {
		expect(() => calculateStats([1, Number.NaN])).toThrow("finite numeric observations");
		expect(() => calculateStats([Infinity])).toThrow("finite numeric observations");
	});
});
