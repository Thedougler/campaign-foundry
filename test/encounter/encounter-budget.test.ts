import { describe, expect, it } from "vitest";
import { cf } from "../check/helpers.ts";

const levels5x4 = ["encounter-budget", "--levels", "5,5,5,5", "--level-offset", "0"];

describe("cf encounter-budget: party budgets", () => {
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
		const { code, stdout } = await cf(["encounter-budget", "--party-level", "5", "--party-size", "4", "--level-offset", "0"]);
		expect(code).toBe(0);
		expect(stdout).toContain("4 characters, level 5");
		expect(stdout).toContain("High 4400");
	});
});

describe("cf encounter-budget: exact and just-over High", () => {
	it("labels total XP equal to High as High", async () => {
		// 4×5th High budget is 4400; 4×1100 XP is exact High.
		const { code, stdout } = await cf([...levels5x4, "--creature", "Bulette,5,1800,1", "--creature", "Chuul,4,1100,1", "--creature", "Orc,1/2,100,15"]);
		expect(code).toBe(0);
		expect(stdout).toMatch(/\*\*Total: 4400 XP \(High difficulty\)\*\*/);
	});

	it("labels one XP over High as Beyond High", async () => {
		const { code, stdout } = await cf([...levels5x4, "--creature", "Bulette,5,1800,1", "--creature", "Chuul,4,1100,1", "--creature", "Orc,1/2,100,15", "--creature", "Giant Rat,1/8,25,1"]);
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
		const exact = await cf([...levels5x4, "--monsters", JSON.stringify([{ name: "Probe", cr: "0", xp: 3000, count: 1 }])]);
		expect(exact.stdout).toMatch(/\*\*Total: 3000 XP \(Moderate difficulty\)\*\*/);
		const over = await cf([...levels5x4, "--monsters", JSON.stringify([{ name: "Probe", cr: "0", xp: 3001, count: 1 }])]);
		expect(over.stdout).toMatch(/\*\*Total: 3001 XP \(High difficulty\)\*\*/);
	});
});

describe("cf encounter-budget: target and copy block", () => {
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
		expect(stdout).toContain("Party budgets (4 characters, level 5): Low 2000, Moderate 3000, High 4400");
	});
});

describe("cf encounter-budget: help and usage", () => {
	it("documents options, exit codes and examples", async () => {
		const { code, stdout } = await cf(["encounter-budget", "--help"]);
		expect(code).toBe(0);
		for (const option of ["--levels", "--party-level", "--party-size", "--level-offset", "--creature", "--monsters", "--target", "--json"]) {
			expect(stdout).toContain(option);
		}
		expect(stdout).toContain("Examples:");
		expect(stdout).toContain("Exit codes:");
		expect(stdout).toMatch(/^ {2}cf encounter-budget /m);
	});

	it("is listed in cf --help", async () => {
		expect((await cf(["--help"])).stdout).toContain("encounter-budget");
	});

	it("exits 2 with an example when party input is missing", async () => {
		const { code, stderr } = await cf(["encounter-budget"]);
		expect(code).toBe(2);
		expect(stderr).toContain("cf encounter-budget");
	});

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
