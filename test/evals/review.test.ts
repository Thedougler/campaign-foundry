import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { generateDescriptionReview } from "../../evals/review.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("description review inputs", () => {
	it("rejects a string trigger verdict rather than treating false as truthy", async () => {
		const root = await mkdtemp(join(tmpdir(), "cf-review-test-"));
		roots.push(root);
		const queries = join(root, "queries.json");
		await writeFile(queries, JSON.stringify([{ query: "Describe an NPC", should_trigger: "false" }]));
		await expect(
			generateDescriptionReview({
				queries,
				skillName: "npc-design",
				description: "Design an NPC.",
				static: join(root, "review.html"),
			}),
		).rejects.toThrow("should_trigger: boolean");
	});

	it("writes a standalone query editor for valid trigger cases", async () => {
		const root = await mkdtemp(join(tmpdir(), "cf-review-test-"));
		roots.push(root);
		const queries = join(root, "queries.json");
		await writeFile(
			queries,
			JSON.stringify([
				{ query: "Design an NPC", should_trigger: true },
				{ query: "Roll initiative", should_trigger: false },
			]),
		);
		const result = await generateDescriptionReview({
			queries,
			skillName: "npc-design",
			description: "Design an NPC.",
			static: join(root, "review.html"),
		});
		expect(result.count).toBe(2);
		expect(result.review).toBe(join(root, "review.html"));
		const page = await readFile(join(root, "review.html"), "utf8");
		expect(page).toContain("const EMBEDDED_DATA = JSON.parse(");
		expect(page).not.toContain("/*__EMBEDDED_DATA__*/");
	});
});
