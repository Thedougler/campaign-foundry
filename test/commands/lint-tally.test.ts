import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { cf } from "../check/helpers.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

function toolResult(blocks: unknown[]): string {
	return JSON.stringify({
		type: "message",
		message: { role: "toolResult", toolCallId: "t1", toolName: "edit", content: blocks },
	});
}

function wikiCheck(payload: Record<string, unknown>): { type: string; text: string } {
	return { type: "text", text: `\n[wiki-check]\n${JSON.stringify(payload)}` };
}

function finding(rule: string, path: string): Record<string, unknown> {
	return { rule, path, line: 3, severity: "warning", message: "A recognisable mistake" };
}

async function session(name: string, lines: string[]): Promise<string> {
	const dir = await mkdtemp(join(tmpdir(), "cf-lint-tally-"));
	roots.push(dir);
	const file = join(dir, name);
	await writeFile(file, `${lines.join("\n")}\n`);
	return file;
}

describe("cfcli lint-tally", () => {
	it("counts the first wiki-check per page, ignores later re-checks, and skips not-checked results", async () => {
		const one = await session("one.jsonl", [
			JSON.stringify({ type: "message", message: { role: "user", content: "Go." } }),
			toolResult([
				{ type: "text", text: "wrote the page" },
				wikiCheck({
					hook: "wiki-check",
					pages: ["wiki/A.md"],
					status: "capped",
					totalFindings: 5,
					findings: [finding("Style.R1", "wiki/A.md"), finding("Style.R1", "wiki/A.md")],
					omittedFindings: 3,
				}),
			]),
			toolResult([wikiCheck({ hook: "wiki-check", pages: ["wiki/B.md"], status: "clean", totalFindings: 0, findings: [] })]),
			toolResult([wikiCheck({ hook: "wiki-check", pages: ["wiki/A.md"], status: "clean", totalFindings: 0, findings: [] })]),
		]);
		const two = await session("two.jsonl", [
			toolResult([
				wikiCheck({ hook: "wiki-check", pages: ["wiki/D.md"], status: "not-checked", failure: "timeout" }),
			]),
			toolResult([
				wikiCheck({
					hook: "wiki-check",
					pages: ["wiki/A.md", "wiki/C.md"],
					status: "findings",
					totalFindings: 2,
					findings: [finding("Style.R1", "wiki/A.md"), finding("Style.R2", "wiki/C.md")],
					omittedFindings: 0,
				}),
			]),
			toolResult([
				wikiCheck({
					hook: "wiki-check",
					pages: ["wiki/D.md"],
					status: "findings",
					totalFindings: 1,
					findings: [finding("Style.R2", "wiki/D.md")],
					omittedFindings: 0,
				}),
			]),
		]);
		const { code, stdout } = await cf(["lint-tally", one, two]);
		expect(code).toBe(0);
		expect(stdout).toContain("Style.R1  findings=3  sessions=2  pages=2\n");
		expect(stdout).toContain("Style.R2  findings=2  sessions=1  pages=2\n");
		expect(stdout).toContain("sessions=2 pages=5 findings=5 omitted=3\n");
		expect(stdout.indexOf("Style.R1")).toBeLessThan(stdout.indexOf("Style.R2"));
	});

	it("prints machine-readable JSON and counts sessions as distinct files", async () => {
		const one = await session("one.jsonl", [
			toolResult([wikiCheck({ hook: "wiki-check", pages: ["wiki/A.md"], status: "findings", totalFindings: 1, findings: [finding("Style.R1", "wiki/A.md")] })]),
		]);
		const two = await session("two.jsonl", [
			JSON.stringify({ type: "message", message: { role: "assistant", content: "mentions [wiki-check] in prose only" } }),
		]);
		const { code, stdout } = await cf(["lint-tally", one, two, "--json"]);
		expect(code).toBe(0);
		const tally = JSON.parse(stdout) as {
			rules: { rule: string; findings: number; sessions: number; pages: number }[];
			sessions: number;
			pages: number;
			findings: number;
			omitted: number;
		};
		expect(tally).toEqual({
			rules: [{ rule: "Style.R1", findings: 1, sessions: 1, pages: 1 }],
			sessions: 2,
			pages: 1,
			findings: 1,
			omitted: 0,
		});
	});

	it("exits 2 on an unreadable file", async () => {
		const { code, stderr } = await cf(["lint-tally", "/nonexistent/session.jsonl"]);
		expect(code).toBe(2);
		expect(stderr).toContain("Cannot read session file");
		expect(stderr).toContain("bun run cfcli -- lint-tally");
	});
});
