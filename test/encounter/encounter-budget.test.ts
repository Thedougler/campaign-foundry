import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, type JsonReport, realTemplates, vaultFlags } from "../check/helpers.ts";

const levels5x4 = ["encounter-budget", "--levels", "5,5,5,5", "--level-offset", "0"];

describe("cfcli encounter-budget: party budgets", () => {
	it("sums SRD 5.2 per-character Low/Moderate/High for four 5th-level PCs", async () => {
		const { code, stdout } = await cf(levels5x4);
		expect(code).toBe(0);
		expect(stdout).toContain("Low 2000");
		expect(stdout).toContain("Moderate 3000");
		expect(stdout).toContain("High 4400");
	});

	it("budgets four 5th-level PCs as 6th by default (+1 combat offset)", async () => {
		const { code, stdout } = await cf(["encounter-budget", "--levels", "5,5,5,5"]);
		expect(code).toBe(0);
		expect(stdout).toContain("4 characters, level 6 (recorded 5, 5, 5, 5; +1 combat offset)");
		expect(stdout).toContain("Low 2400");
		expect(stdout).toContain("Moderate 4000");
		expect(stdout).toContain("High 5600");
	});

	it("accepts --party-level with --party-size", async () => {
		const { code, stdout } = await cf([
			"encounter-budget",
			"--party-level",
			"5",
			"--party-size",
			"4",
			"--level-offset",
			"0",
		]);
		expect(code).toBe(0);
		expect(stdout).toContain("4 characters, level 5");
		expect(stdout).toContain("High 4400");
	});
});

describe("cfcli encounter-budget: exact and just-over High", () => {
	it("labels total XP equal to High as High", async () => {
		// 4×5th High budget is 4400; 4×1100 XP is exact High.
		const { code, stdout } = await cf([
			...levels5x4,
			"--creature",
			"Bulette,5,1800,1",
			"--creature",
			"Chuul,4,1100,1",
			"--creature",
			"Orc,1/2,100,15",
		]);
		expect(code).toBe(0);
		expect(stdout).toMatch(/\*\*Total: 4400 XP \(High difficulty\)\*\*/);
	});

	it("labels one XP over High as Beyond High", async () => {
		const { code, stdout } = await cf([
			...levels5x4,
			"--creature",
			"Bulette,5,1800,1",
			"--creature",
			"Chuul,4,1100,1",
			"--creature",
			"Orc,1/2,100,15",
			"--creature",
			"Giant Rat,1/8,25,1",
		]);
		// 4400 + 25 = 4425, clearly over. Also probe 4401 via JSON.
		expect(code).toBe(0);
		expect(stdout).toMatch(/\*\*Total: 4425 XP \(Beyond High difficulty\)\*\*/);
		const exactOver = await cf([
			...levels5x4,
			"--monsters",
			JSON.stringify([{ name: "Probe", cr: "0", xp: 4401, count: 1 }]),
		]);
		expect(exactOver.code).toBe(0);
		expect(exactOver.stdout).toMatch(/\*\*Total: 4401 XP \(Beyond High difficulty\)\*\*/);
	});

	it("labels total XP equal to Moderate as Moderate, and one over as High", async () => {
		const exact = await cf([
			...levels5x4,
			"--monsters",
			JSON.stringify([{ name: "Probe", cr: "0", xp: 3000, count: 1 }]),
		]);
		expect(exact.stdout).toMatch(/\*\*Total: 3000 XP \(Moderate difficulty\)\*\*/);
		const over = await cf([
			...levels5x4,
			"--monsters",
			JSON.stringify([{ name: "Probe", cr: "0", xp: 3001, count: 1 }]),
		]);
		expect(over.stdout).toMatch(/\*\*Total: 3001 XP \(High difficulty\)\*\*/);
	});
});

describe("cfcli encounter-budget: target and copy block", () => {
	it("prints XP over or under a named band without failing the run", async () => {
		const exact = await cf([...levels5x4, "--target", "low", "--creature", "Orc,1/2,100,20"]);
		expect(exact.code).toBe(0);
		expect(exact.stdout).toContain("Vs low: exact");
		const over = await cf([...levels5x4, "--target", "low", "--creature", "Orc,1/2,100,21"]);
		expect(over.code).toBe(0);
		expect(over.stdout).toContain("Vs low: 100 XP over");
	});

	it("prints a Balance block agents can copy into the Scene", async () => {
		const { stdout } = await cf([...levels5x4, "--creature", "Orc,1/2,100,3"]);
		expect(stdout).toContain("- 3 × Orc (CR 1/2, 100 XP each) = 300 XP");
		expect(stdout).toContain("Party budgets against 3 × Orc (4 characters, level 5)");
		expect(stdout).toContain("  - Low 2000 XP");
		expect(stdout).toContain("  - Moderate 3000 XP");
		expect(stdout).toContain("  - High 4400 XP");
	});

	it("pastes different forces for the same Party into Scene Balance sections without style or boilerplate findings", async () => {
		const root = await mkdtemp(join(tmpdir(), "cf-encounter-balance-"));
		try {
			await mkdir(join(root, "wiki/Scenes"), { recursive: true });
			for (const [slug, creature] of [
				["orc-ambush", "Orc,1/2,100,3"],
				["goblin-raid", "Goblin,1/4,50,6"],
			] as const) {
				const { code, stdout } = await cf(["encounter-budget", "--levels", "5,5,5,5", "--creature", creature]);
				expect(code).toBe(0);
				const marker = "--- Encounter Balance (copy into ### Balance) ---\n";
				expect(stdout).toContain(marker);
				const balance = stdout.split(marker)[1]!;
				for (const [band, xp] of [
					["Low", 2400],
					["Moderate", 4000],
					["High", 5600],
				]) {
					expect(balance).toContain(`${band} ${xp}`);
				}
				await writeFile(
					join(root, `wiki/Scenes/${slug}.md`),
					`---\ntype: Scene\nkind: Cliffhanger\ntitle: ${slug}\n---\n\n## Encounter\n\n### Balance\n\n${balance}`,
				);
			}
			const result = await cf([
				"check",
				"--json",
				"--layer",
				"style",
				"--layer",
				"boilerplate",
				...vaultFlags(root),
				"--templates",
				realTemplates,
			]);
			const report = JSON.parse(result.stdout) as JsonReport;
			expect(report.counts.pages).toBe(2);
			expect(report.findings.map(({ layer, rule, line }) => ({ layer, rule, line }))).toEqual([]);
			expect(result.code).toBe(0);
		} finally {
			await rm(root, { recursive: true, force: true });
		}
	});
});

describe("cfcli encounter-budget: usage errors", () => {
	it("exits 2 for a fractional party size, out-of-range level, or negative XP", async () => {
		const size = await cf(["encounter-budget", "--party-level", "5", "--party-size", "4.5"]);
		expect(size.code).toBe(2);
		const level = await cf(["encounter-budget", "--party-level", "21", "--party-size", "4"]);
		expect(level.code).toBe(2);
		expect(level.stderr).toContain("1 to 20");
		const xp = await cf([...levels5x4, "--creature", "Probe,0,-100,1"]);
		expect(xp.code).toBe(2);
		expect(xp.stderr).toContain("xp at least 0");
	});
});

describe("cfcli encounter-budget: XP derived from CR", () => {
	it("derives XP from the SRD 5.2.1 table when the xp field is empty or absent", async () => {
		const cr12 = await cf([...levels5x4, "--creature", "Malone,12,,1"]);
		expect(cr12.code).toBe(0);
		expect(cr12.stdout).toContain("- 1 × Malone (CR 12, 8400 XP each) = 8400 XP");
		const fraction = await cf([...levels5x4, "--monsters", JSON.stringify([{ name: "Orc", cr: "1/2", count: 2 }])]);
		expect(fraction.code).toBe(0);
		expect(fraction.stdout).toContain("- 2 × Orc (CR 1/2, 100 XP each) = 200 XP");
		const zero = await cf([
			...levels5x4,
			"--monsters",
			JSON.stringify([{ name: "Awakened Shrub", cr: "0", count: 1 }]),
		]);
		expect(zero.code).toBe(0);
		expect(zero.stdout).toContain("- 1 × Awakened Shrub (CR 0, 10 XP each) = 10 XP");
	});

	it("lets a given XP override the table", async () => {
		const flag = await cf([...levels5x4, "--creature", "Veteran,3,3000,1"]);
		expect(flag.code).toBe(0);
		expect(flag.stdout).toContain("- 1 × Veteran (CR 3, 3000 XP each) = 3000 XP");
		const json = await cf([
			...levels5x4,
			"--monsters",
			JSON.stringify([{ name: "Veteran", cr: "3", xp: 3000, count: 1 }]),
			"--json",
		]);
		expect(json.code).toBe(0);
		expect(json.stdout).toContain('"xp": 3000');
	});

	it("exits 2 naming the CR when no XP is given and the CR is not in the table", async () => {
		const flag = await cf([...levels5x4, "--creature", "Weird,1/3,,1"]);
		expect(flag.code).toBe(2);
		expect(flag.stderr).toContain("`1/3`");
		const monsters = await cf([...levels5x4, "--monsters", JSON.stringify([{ name: "Weird", cr: "31", count: 1 }])]);
		expect(monsters.code).toBe(2);
		expect(monsters.stderr).toContain("`31`");
	});
});
