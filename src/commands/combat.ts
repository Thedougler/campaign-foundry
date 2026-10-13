import { Command } from "commander";
import { execFileSync } from "node:child_process";
import { glob, stat } from "node:fs/promises";
import { join } from "node:path";
import { runCombat } from "../combat/engine/index.ts";
import { compilePage, MissingStatblockError } from "../combat/import/index.ts";
import type { Combatant } from "../combat/model.ts";
import { CF } from "./kit.ts";

export function combatCommand(): Command {
	const command = new Command("combat")
		.description(
			"Combat sim: compile canonical Wiki Combatants. Run a subcommand with --help for options and examples.",
		)
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} combat compile wiki/shattered-sea/Creatures\n  ${CF} combat compile --help`,
		);
	command
		.command("compile")
		.description(
			"Compile Creature, NPC and PC statblock fences. Exits 0 when every selected page compiles, 1 when any page fails, 2 usage error.",
		)
		.argument("<page...>", "Wiki page paths, directories or quoted globs")
		.option("--json", "print Combatants as a JSON array instead of text")
		.addHelpText(
			"after",
			`
What it does:
  Reads the statblock fence under ## Statblock or ## Sheet on each page. Prints core numbers,
  Actions (one line each), and Unmodelled features by name. Never writes pages or reads D&D Beyond.
  A failed page is named on stderr; the remaining pages still compile.
  Directories and quoted globs skip pages without a fence, naming each on stderr. Explicit page
  paths fail without a fence. Quote globs: shell-expanded paths count as explicit pages.

Exit codes:
  0  every page compiled    1  a page failed    2  usage error

Examples:
  ${CF} combat compile wiki/shattered-sea/Creatures
  ${CF} combat compile "wiki/shattered-sea/Creatures/*.md"
  ${CF} combat compile "wiki/shattered-sea/PCs/delmar-fisk.md" --json`,
		)
		.action(async (paths: string[], flags: { json?: boolean }) => {
			const combatants: Combatant[] = [];
			let failed = 0;
			let skipped = 0;
			for (const input of paths) {
				try {
					const pattern = /[*?[\]{}]/.test(input);
					const directory = !pattern && (await stat(input)).isDirectory();
					const selected =
						pattern || directory
							? (await Array.fromAsync(glob(directory ? join(input, "*.md") : input))).sort()
							: [input];
					if (!selected.length) throw new Error(`${input}: no pages matched`);
					for (const path of selected) {
						try {
							combatants.push(await compilePage(path));
						} catch (error) {
							if ((pattern || directory) && error instanceof MissingStatblockError) {
								skipped++;
								process.stderr.write(`${path}: no Statblock, skipped\n`);
							} else {
								failed++;
								process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
							}
						}
					}
				} catch (error) {
					failed++;
					process.stderr.write(`${input}: ${error instanceof Error ? error.message : String(error)}\n`);
				}
			}
			if (flags.json) process.stdout.write(`${JSON.stringify(combatants, null, 2)}\n`);
			else {
				for (const c of combatants) {
					process.stdout.write(
						`${c.name}  AC ${c.ac}, HP ${c.hp}, initiative ${c.initiative >= 0 ? "+" : ""}${c.initiative}, ${c.size}, speed ${Object.entries(
							c.speeds,
						)
							.map(([mode, feet]) => `${mode} ${feet} ft.`)
							.join(", ")}\n  ${c.source.path}\n`,
					);
					for (const a of c.actions)
						process.stdout.write(
							`  ${a.cost}${a.legendaryCost ? ` (${a.legendaryCost})` : ""}: ${a.name} — ${a.primitives.map((p) => JSON.stringify(p)).join("; ")}\n`,
						);
					process.stdout.write(`  Unmodelled: ${c.unmodelled.map((f) => f.name).join(", ") || "none"}\n`);
				}
				process.stdout.write(`\n${combatants.length} compiled, ${skipped} skipped, ${failed} failed\n`);
			}
			process.exitCode = failed ? 1 : 0;
		});
	command
		.command("run")
		.description("Play seeded Trials of two or more sides. Exits 0 on a completed run, 2 usage error.")
		.requiredOption("--side <page...>", "one side's pages; repeat the flag once per side (supports page=N copies)")
		.option(
			"--count <page=N>",
			"name copies of one page, such as dravosi-deckhand=4",
			(value: string, previous: string[]) => [...previous, value],
			[],
		)
		.requiredOption("--trials <n>", "number of Trials to play", (value: string) => Number.parseInt(value, 10))
		.requiredOption("--seed <s>", "run seed; identical seeds and pages replay bit-identically")
		.option("--json", "print the full result as JSON instead of text")
		.addHelpText(
			"after",
			`
What it does:
  Compiles every page, then plays the fight with the default greedy Policy for each side until
  one side is down. PCs use 2024 death saves; other Combatants die at 0 HP. Until issue #96
  every enemy is treated as in range of every attack (recorded in the run's provenance).

Exit codes:
  0  run completed    1  a page failed to compile    2  usage error

Examples:
  ${CF} combat run --side "wiki/shattered-sea/PCs/delmar-fisk.md" --side "wiki/shattered-sea/Creatures/bloodhawk.md" --trials 200 --seed demo-1v1
  ${CF} combat run --side "wiki/shattered-sea/PCs/*.md" --side "wiki/shattered-sea/Creatures/grung-creature.md" --count grung-creature=4 --trials 500 --seed party-v-patrol --json`,
		)
		.action(async (flags: { count: string[]; trials: number; seed: string; json?: boolean }) => {
			// Commander flattens repeated variadic options, so side membership is read from argv:
			// every `--side` occurrence starts one side, and its pages run to the next flag.
			const tokens = process.argv.slice(2);
			const sidesArg: string[][] = [];
			for (let i = 0; i < tokens.length; i++) {
				if (tokens[i] === "--side") {
					const group: string[] = [];
					for (let j = i + 1; j < tokens.length && !tokens[j]!.startsWith("-"); j++) group.push(tokens[j]!);
					sidesArg.push(group);
				} else if (tokens[i]!.startsWith("--side=")) sidesArg.push([tokens[i]!.slice("--side=".length)]);
			}
			if (sidesArg.length < 2 || sidesArg.some((side) => side.length === 0)) {
				process.stderr.write(
					`Error: --side is required at least twice, once per side with at least one page each.\n  ${CF} combat run --side <page...> --side <page...> --trials N --seed S\n`,
				);
				process.exitCode = 2;
				return;
			}
			if (!Number.isSafeInteger(flags.trials) || flags.trials < 1) {
				process.stderr.write(
					`Error: --trials must be a positive integer.\n  ${CF} combat run --side <page...> --side <page...> --trials 200 --seed demo\n`,
				);
				process.exitCode = 2;
				return;
			}
			const copies = new Map<string, number>();
			for (const entry of flags.count) {
				const [page, count] = entry.split("=");
				const amount = Number.parseInt(count ?? "", 10);
				const name = page?.replace(/\.md$/, "").split("/").pop();
				if (!name || !Number.isSafeInteger(amount) || amount < 1) {
					process.stderr.write(
						`Error: --count takes page=N with N a positive integer, got '${entry}'.\n  ${CF} combat run --side <pages...> --count ${name ?? "page"}=4 --trials N --seed S\n`,
					);
					process.exitCode = 2;
					return;
				}
				copies.set(name, amount);
			}
			let failed = false;
			const sides: Combatant[][] = [];
			for (const side of sidesArg) {
				const compiled: Combatant[] = [];
				for (const input of side) {
					try {
						const pattern = /[*?[\]{}]/.test(input);
						const directory = !pattern && (await stat(input)).isDirectory();
						const selected =
							pattern || directory
								? (await Array.fromAsync(glob(directory ? join(input, "*.md") : input))).sort()
								: [input];
						if (!selected.length) throw new Error(`${input}: no pages matched`);
						for (const path of selected) {
							try {
								compiled.push(await compilePage(path));
							} catch (error) {
								if ((pattern || directory) && error instanceof MissingStatblockError) {
									process.stderr.write(`${path}: no Statblock, skipped\n`);
									continue;
								}
								throw error;
							}
						}
					} catch (error) {
						failed = true;
						process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
					}
				}
				sides.push(compiled);
			}
			if (failed || sides.some((side) => side.length === 0)) {
				process.stderr.write(`Error: every side needs at least one compiled Combatant.\n`);
				process.exitCode = 1;
				return;
			}
			const expanded = sides.map((side) =>
				side.flatMap((c) =>
					Array.from({ length: copies.get(c.source.path.replace(/\.md$/, "").split("/").pop() ?? "") ?? 1 }, () => c),
				),
			);
			const started = performance.now();
			const result = runCombat(expanded, { trials: flags.trials, seed: flags.seed });
			const seconds = (performance.now() - started) / 1000;
			const commit = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
			const provenance = {
				engineVersion: commit,
				seed: flags.seed,
				pages: sides.flatMap((side, i) => side.map((c) => ({ side: i, path: c.source.path, hash: c.source.hash }))),
				command: tokens.join(" "),
				assumption: "until #96, every enemy is in range of every attack and aura",
			};
			if (flags.json) process.stdout.write(`${JSON.stringify({ ...result, provenance }, null, 2)}\n`);
			else {
				for (const side of result.sides)
					process.stdout.write(
						`side ${side.side + 1}: ${(side.winRate * 100).toFixed(1)}% (${side.wins}/${result.trials})\n`,
					);
				if (result.draws) process.stdout.write(`draws: ${((result.draws / result.trials) * 100).toFixed(1)}%\n`);
				if (result.capped) process.stdout.write(`round-capped: ${result.capped}/${result.trials}\n`);
				process.stdout.write(
					`rounds: mean ${result.rounds.mean.toFixed(2)}, min ${result.rounds.min}, max ${result.rounds.max}\n`,
				);
				for (const c of result.combatants)
					process.stdout.write(
						`  [side ${c.side + 1}] ${c.name} — deaths ${(c.deathRate * 100).toFixed(1)}%, downs ${(c.downRate * 100).toFixed(1)}%  (${c.path})\n`,
					);
				process.stdout.write(
					`throughput: ${Math.round(result.trials / Math.max(seconds, 0.001))} trials/s\nprovenance: ${commit.slice(0, 12)} seed ${flags.seed} | ${provenance.assumption}\n`,
				);
			}
		});
	return command;
}
