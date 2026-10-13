import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { commands } from "../src/commands/index.ts";
import { cf, repoRoot, vaultFlags } from "./check/helpers.ts";

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
const cleanRoot = join(repoRoot, "test/check/fixtures/clean");
const cleanVault = join(cleanRoot, "wiki");

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
		example: "cfcli check --layer template",
	},
	{
		listed: "index",
		help: ["index"],
		usage: ["index", "--vault", "/no/such/folder"],
		example: "bun run cfcli -- index --vault <folder>",
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
		usage: ["revealed", "--campaign", "Nope", "--vault", cleanVault, "--root", cleanRoot],
		example: /revealed --campaign/,
	},
	{
		listed: "log",
		help: ["log"],
		usage: ["log", ...vaultFlags(cleanRoot)],
		example: "bun run cfcli -- log --campaign",
	},
	{
		listed: "encounter-budget",
		help: ["encounter-budget"],
		usage: ["encounter-budget"],
		example: "bun run cfcli -- encounter-budget",
	},
	{
		listed: "lint-tally",
		help: ["lint-tally"],
		usage: ["lint-tally", "/no/such/session.jsonl"],
		example: "bun run cfcli -- lint-tally",
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
		example: "bun run cfcli -- eval extract",
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

	it.each(commands)("dispatches `$name` to the command its module builds", async ({ name, load }) => {
		expect((await load()).name()).toBe(name);
	});

	it("isolates a failed command loader and retains it in top-level help", async () => {
		const bench = commands.find((entry) => entry.name === "bench")!;
		const loader = vi.spyOn(bench, "load").mockRejectedValue(new SyntaxError("broken module"));
		try {
			for (const args of [
				["check", "--help"],
				["help", "check"],
			]) {
				const result = await cf(args);
				expect(result.code).toBe(0);
				expect(result.stdout).toContain("Usage: cfcli check");
			}
			expect(loader).not.toHaveBeenCalled();
			const listing = await cf(["--help"]);
			expect(listing.code).toBe(0);
			expect(listing.stdout).toMatch(/bench\s+\(failed to load: broken module\)/);
			const unknown = await cf(["benc"]);
			expect(unknown.code).toBe(2);
			expect(unknown.stderr).toContain("Did you mean bench?");
			await expect(cf(["bench", "status"])).rejects.toThrow("broken module");
		} finally {
			loader.mockRestore();
		}
	});

	it("prints a subcommand's help through `help <name>`", async () => {
		const { code, stdout } = await cf(["help", "check"]);
		expect(code).toBe(0);
		expect(stdout).toContain("Usage: cfcli check");
	});
	it("suggests registered commands for an unknown name", async () => {
		const { code, stderr } = await cf(["chekc"]);
		expect(code).toBe(2);
		expect(stderr).toContain("Did you mean check?");
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
