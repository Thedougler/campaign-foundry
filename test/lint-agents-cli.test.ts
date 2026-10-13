import { describe, expect, it } from "vitest";
import { capture } from "../scripts/lint/core.ts";

const adr = "docs/adr/0020-agent-text-passes-the-style-gate.md";

describe("lint agents explicit selection", () => {
	it("prints the skipped ADR path and the command that checks it", async () => {
		const result = await capture("bun", ["run", "lint", "agents", adr]);
		expect(result.status).toBe(0);
		expect(result.stdout).toContain(`skipped ${adr}`);
		expect(result.stdout).toContain(`bun run cfcli -- style "${adr}"`);
	});

	it("lists every skipped named path in text and JSON, routing Wiki paths to check", async () => {
		const wiki = "wiki/templates/pc.md";
		for (const json of [false, true]) {
			const result = await capture("bun", [
				"run",
				"lint",
				"agents",
				...(json ? ["--json"] : []),
				adr,
				wiki,
				"docs/adr",
			]);
			expect(result.status).toBe(0);
			const notes: string[] = json
				? JSON.parse(result.stdout).scopes.find((scope: { scope: string }) => scope.scope === "agents").notes
				: result.stdout.split("\n").filter((line) => line.startsWith("agents: skipped "));
			expect(notes).toHaveLength(3);
			expect(notes[0]).toContain(`skipped ${adr}`);
			expect(notes[0]).toContain(`bun run cfcli -- style "${adr}"`);
			expect(notes[1]).toContain(`skipped ${wiki}`);
			expect(notes[1]).toContain(`bun run cfcli -- check "${wiki}"`);
			expect(notes[2]).toContain("skipped docs/adr");
			expect(notes[2]).toContain('bun run cfcli -- style "docs/adr"');
		}
	});

	it("keeps missing paths as usage/tool errors rather than skip notices", async () => {
		const result = await capture("bun", ["run", "lint", "agents", "docs/adr/does-not-exist.md"]);
		expect(result.status).toBe(2);
		expect(result.stderr).toContain("no such path: docs/adr/does-not-exist.md");
		expect(result.stdout).not.toContain("skipped");
	});
});
