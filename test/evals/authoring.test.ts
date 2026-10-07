import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { packageSkill, validateSkill } from "../../evals/authoring.ts";

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
});
