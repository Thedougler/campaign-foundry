import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, repoRoot } from "./check/helpers.ts";

/**
 * One place for the agent-facing CLI discoverability contract: every covered
 * command is listed at the top level, its `--help` carries Examples, and a
 * representative usage error exits 2 with an example invocation on stderr.
 */
type CommandCase = {
	/** Token under Commands: in top-level `--help`. */
	listed: string;
	/** Args that print this command's `--help`. */
	help: string[];
	/** Representative usage error: exit 2 with an example on stderr. */
	usage: string[];
	/** Substring or pattern that must appear in the usage-error stderr. */
	example: string | RegExp;
};

const narrationVault = join(repoRoot, "test/narration/fixtures/wiki");
const narrationRoot = join(repoRoot, "test/narration/fixtures");
const wikiVault = join(repoRoot, "wiki");

const COMMANDS: CommandCase[] = [
	{
		listed: "backup",
		help: ["backup"],
		usage: ["backup", "--bogus"],
		example: /--help/,
	},
	{
		listed: "check",
		help: ["check"],
		usage: ["check", "--layer", "nope"],
		example: "cf check --layer template",
	},
	{
		listed: "index",
		help: ["index"],
		usage: ["index", "--vault", "/no/such/folder"],
		example: "bun run cf -- index --vault <folder>",
	},
	{
		listed: "find",
		help: ["find"],
		usage: ["find"],
		example: /--help/,
	},
	{
		listed: "revealed",
		help: ["revealed"],
		usage: ["revealed", "--campaign", "Nope", "--vault", wikiVault, "--root", repoRoot],
		example: 'bun run cf -- revealed --campaign "Shattered Sea"',
	},
	{
		listed: "log",
		help: ["log"],
		usage: ["log"],
		example: "bun run cf -- log --campaign",
	},
	{
		listed: "encounter-budget",
		help: ["encounter-budget"],
		usage: ["encounter-budget"],
		example: "bun run cf -- encounter-budget",
	},
	{
		listed: "eval",
		help: ["eval", "extract"],
		usage: [
			"eval",
			"extract",
			"Crossing",
			"--callout",
			"No Such Slot",
			"--vault",
			narrationVault,
			"--root",
			narrationRoot,
		],
		example: "bun run cf -- eval extract",
	},
	{
		listed: "ddb",
		help: ["ddb"],
		usage: ["ddb", "--bogus"],
		example: /--help/,
	},
	{
		listed: "foundry",
		help: ["foundry"],
		usage: ["foundry", "--bogus"],
		example: /--help/,
	},
];

describe("CLI help and usage contracts", () => {
	it("lists every covered command in top-level help", async () => {
		const { code, stdout } = await cf(["--help"]);
		expect(code).toBe(0);
		for (const { listed } of COMMANDS) {
			expect(stdout, listed).toMatch(new RegExp(`^\\s+${listed}\\b`, "m"));
		}
	});

	it.each(COMMANDS)("$listed --help includes Examples", async ({ help }) => {
		const { code, stdout } = await cf([...help, "--help"]);
		expect(code).toBe(0);
		expect(stdout).toContain("Examples:");
	});

	it.each(COMMANDS)("$listed usage error exits 2 with an example invocation", async ({ usage, example }) => {
		const { code, stderr } = await cf(usage);
		expect(code).toBe(2);
		expect(stderr.length).toBeGreaterThan(0);
		if (typeof example === "string") expect(stderr).toContain(example);
		else expect(stderr).toMatch(example);
	});
});
