import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { cf } from "../check/helpers.ts";
import { buildSkillGraph } from "../../evals/skill-graph.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

/** A throwaway repository root holding `.omp/skills`, `.agents/skills` and `wiki/templates`. */
async function graphRoot() {
	const root = await mkdtemp(join(tmpdir(), "cf-skill-graph-test-"));
	roots.push(root);
	await mkdir(join(root, ".omp/skills/alpha"), { recursive: true });
	await mkdir(join(root, ".agents/skills/beta"), { recursive: true });
	await mkdir(join(root, "wiki/templates"), { recursive: true });
	await writeFile(join(root, "wiki/templates/NPC.md"), "# NPC\n");
	return root;
}

describe("skill graph", () => {
	it("derives links from skill:// references and bare backticked names, and templates from mentions", async () => {
		const root = await graphRoot();
		await writeFile(
			join(root, ".omp/skills/alpha/SKILL.md"),
			"---\nname: alpha\ndescription: Use for alpha work.\n---\n# Alpha\n\nHand off to `skill://beta`, then follow `beta` again.\nWrite pages from `wiki/templates/NPC.md` and from `templates/NPC.md`.\n",
		);
		await writeFile(
			join(root, ".agents/skills/beta/SKILL.md"),
			"---\nname: beta\ndescription: Use for beta work.\n---\n# Beta\n",
		);
		expect(await buildSkillGraph(root)).toEqual([
			{ skill: "alpha", links: ["beta"], templates: ["wiki/templates/NPC.md"] },
			{ skill: "beta", links: [], templates: [] },
		]);
	});
	it("keeps unknown names, self-links, fenced placeholders and allowlisted externals out of the edges that need no directory", async () => {
		const root = await graphRoot();
		await writeFile(
			join(root, ".omp/skills/alpha/SKILL.md"),
			"---\nname: alpha\ndescription: Use for alpha work.\n---\n# Alpha\n\n`alpha` points at itself, `skill://alpha` too, and `skill://find-skills` is external.\n\n```markdown\n`skill://beta`\n```\n\n`no-such-skill` and `skill://no-such-skill` are unknown.\n",
		);
		await writeFile(
			join(root, ".agents/skills/beta/SKILL.md"),
			"---\nname: beta\ndescription: Use for beta work.\n---\n# Beta\n",
		);
		expect(await buildSkillGraph(root)).toEqual([
			{ skill: "alpha", links: ["find-skills"], templates: [] },
			{ skill: "beta", links: [], templates: [] },
		]);
	});
	it("reads bare names and templates from references/** files", async () => {
		const root = await graphRoot();
		await mkdir(join(root, ".omp/skills/alpha/references"), { recursive: true });
		await writeFile(
			join(root, ".omp/skills/alpha/SKILL.md"),
			"---\nname: alpha\ndescription: Use for alpha work.\n---\n# Alpha\nSee the [guide](references/guide.md).\n",
		);
		await writeFile(
			join(root, ".omp/skills/alpha/references/guide.md"),
			"# Guide\n\nClose per `beta` in `templates/NPC.md` shape.\n",
		);
		await writeFile(
			join(root, ".agents/skills/beta/SKILL.md"),
			"---\nname: beta\ndescription: Use for beta work.\n---\n# Beta\n",
		);
		expect(await buildSkillGraph(root)).toEqual([
			{ skill: "alpha", links: ["beta"], templates: ["wiki/templates/NPC.md"] },
			{ skill: "beta", links: [], templates: [] },
		]);
	});
	it("prints every repo skill as JSON through the CLI, with lint holding at least 19 inbound edges", async () => {
		const result = await cf(["eval", "graph"]);
		expect(result.code).toBe(0);
		const entries = JSON.parse(result.stdout) as { skill: string; links: string[]; templates: string[] }[];
		expect(entries.length).toBeGreaterThan(10);
		for (const entry of entries) {
			expect(typeof entry.skill).toBe("string");
			expect(Array.isArray(entry.links)).toBe(true);
			expect(Array.isArray(entry.templates)).toBe(true);
		}
		// Issue #52 acceptance: the writing chain closes every page through lint, so its inbound edges stay high.
		expect(entries.filter((entry) => entry.links.includes("lint")).length).toBeGreaterThanOrEqual(19);
	});
});
