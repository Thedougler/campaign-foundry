import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { cf } from "../check/helpers.ts";
import { packageSkill, validateSkill } from "../../evals/authoring.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function skill(
	frontmatter = "name: sample\ndescription: Use for <sample> work.\ndisable-model-invocation: true\ncustom: extension",
) {
	const root = await mkdtemp(join(tmpdir(), "cf-authoring-test-"));
	roots.push(root);
	const directory = join(root, "sample");
	await mkdir(directory);
	await writeFile(join(directory, "SKILL.md"), `---\n${frontmatter}\n---\n# Sample\n`);
	return { root, directory };
}

async function linkedSkill(files: Record<string, string>) {
	const { directory } = await skill();
	for (const [name, content] of Object.entries(files)) {
		await mkdir(join(directory, dirname(name)), { recursive: true });
		await writeFile(join(directory, name), content);
	}
	return directory;
}

describe("native authoring helpers", () => {
	it.each([
		["validate"],
		["package", ".omp/skills/skill-creator"],
		["review", "/tmp/iteration"],
		["description-review", "/tmp/queries.json"],
	])("returns the documented usage status for missing %s inputs", async (...args) => {
		const result = await cf(["eval", ...args]);
		expect(result.code).toBe(2);
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
		await writeFile(
			join(directory, "SKILL.md"),
			'---\nname: sample\ndescription: Use for work.\ndisable-model-invocation: "false"\n---\n',
		);
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
describe("skill reference checks", () => {
	it("rejects a relative link to a missing file, naming file, line, link and reason", async () => {
		const { directory } = await skill();
		await writeFile(
			join(directory, "SKILL.md"),
			"---\nname: sample\ndescription: Use for <sample> work.\ndisable-model-invocation: true\ncustom: extension\n---\n# Sample\nSee the [guide](references/guide.md) first.\n",
		);
		await expect(validateSkill(directory)).rejects.toThrow(
			"SKILL.md:8: [guide](references/guide.md) — target does not exist",
		);
	});
	it("rejects anchors no heading slugs to, in SKILL.md and in a linked skill-local file", async () => {
		const directory = await linkedSkill({
			"references/guide.md": "# Guide\n\n## Real section\n\nSee [also](#nope).\n",
		});
		await writeFile(
			join(directory, "SKILL.md"),
			"---\nname: sample\ndescription: Use for <sample> work.\n---\n# Sample\nRead [the guide](references/guide.md#wrong-anchor).\n[jump](#gone)\n",
		);
		const result = validateSkill(directory);
		await expect(result).rejects.toThrow(
			"SKILL.md:6: [the guide](references/guide.md#wrong-anchor) — no heading slugs to #wrong-anchor",
		);
		await expect(result).rejects.toThrow("SKILL.md:7: [jump](#gone) — no heading slugs to #gone");
		await expect(result).rejects.toThrow("references/guide.md:5: [also](#nope) — no heading slugs to #nope");
	});
	it("passes with valid file, directory, heading, anchor-only and scheme links, and never scans second-level files", async () => {
		const directory = await linkedSkill({
			"references/guide.md": "# Guide\n\n## Real section\n\nNothing deeper to see.\n",
			"deep.md": "# Deep\n\nSee the [ghost](ghost.md) notes.\n",
			"ghost.md":
				"# Ghost\n\n[missing](missing.md) and `skill://no-such` sit in a second-level file that must stay unchecked.\n",
		});
		await writeFile(
			join(directory, "SKILL.md"),
			"---\nname: sample\ndescription: Use for <sample> work.\n---\n# Sample\n\n[guide](references/guide.md#real-section), [refs](references), [deep](deep.md), [top](#sample), [web](https://example.com/a), [internal](skill://lint), [past](history://x), and code `[skip](references/nothing.md)`.\n",
		);
		await expect(validateSkill(directory)).resolves.toMatchObject({ name: "sample" });
	});
});
describe("skill:// reference checks", () => {
	it("fails the CLI with exit 1 on an unknown skill, naming file and line", async () => {
		const { directory } = await skill();
		await writeFile(
			join(directory, "SKILL.md"),
			"---\nname: sample\ndescription: Use for <sample> work.\n---\n# Sample\nRead `skill://does-not-exist` first.\n",
		);
		const result = await cf(["eval", "validate", directory]);
		expect(result.code).toBe(1);
		expect(result.stdout).toContain(
			"SKILL.md:6: skill://does-not-exist — no skill 'does-not-exist' in .omp/skills or .agents/skills",
		);
	});
	it("accepts repo skills, files inside them and allowlisted external skills", async () => {
		const { directory } = await skill();
		await writeFile(
			join(directory, "SKILL.md"),
			"---\nname: sample\ndescription: Use for <sample> work.\n---\n# Sample\n\n`skill://lint`, `skill://lint/prose.md`, `skill://ingest/references/ledger.md`, `skill://run-evals` and `skill://find-skills` all resolve.\n",
		);
		await expect(validateSkill(directory)).resolves.toMatchObject({ name: "sample" });
	});
	it("rejects a reference whose path is no file in the named skill", async () => {
		const { directory } = await skill();
		await writeFile(
			join(directory, "SKILL.md"),
			"---\nname: sample\ndescription: Use for <sample> work.\n---\n# Sample\n\nThe bar is `skill://lint/prose`, and `skill://lint/missing.md` too.\n",
		);
		await expect(validateSkill(directory)).rejects.toThrow(
			"SKILL.md:7: skill://lint/prose — no file 'prose' in skill 'lint'",
		);
		await expect(validateSkill(directory)).rejects.toThrow(
			"SKILL.md:7: skill://lint/missing.md — no file 'missing.md' in skill 'lint'",
		);
	});
	it("scans references/** even when SKILL.md never links them", async () => {
		const directory = await linkedSkill({ "references/deep.md": "# Deep\n\nSee `skill://nope`.\n" });
		await expect(validateSkill(directory)).rejects.toThrow(
			"references/deep.md:3: skill://nope — no skill 'nope' in .omp/skills or .agents/skills",
		);
	});
});
