import type { Command } from "commander";
import { describe, expect, it } from "vitest";
import { commands } from "../src/commands/index.ts";
import { cf } from "./check/helpers.ts";

function commandPaths(command: Command, parents: string[] = []): string[][] {
	const path = [...parents, command.name()];
	return [path, ...command.commands.flatMap((child) => commandPaths(child, path))];
}

describe("CLI help", () => {
	it("top-level --help exits 0", async () => {
		expect((await cf(["--help"])).code).toBe(0);
	});

	it.each(commands)("$name and its subcommands accept --help", async ({ load }) => {
		for (const path of commandPaths(await load())) {
			expect((await cf([...path, "--help"])).code, path.join(" ")).toBe(0);
		}
	});
});
