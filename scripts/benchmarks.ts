#!/usr/bin/env node
import { Command, Option } from "commander";
import { evidence, normalise } from "./model-evidence.ts";
import type { Benchmark } from "./model-evidence.ts";

const cli = new Command()
	.name("bun run benchmarks")
	.description("Read-only EQ-Bench creative and longform writing scores. JSON on stdout.")
	.option("-m, --model <names...>", "published model names or substrings; omitted = all")
	.addOption(
		new Option("-b, --benchmark <name>", "writing benchmark").choices(["creative", "longform", "all"]).default("all"),
	)
	.option("--details", "all model benchmark scores, rubric, style and repetition diagnostics")
	.option("--variants", "include published suffixed runs even when an exact base model exists")
	.option("--exclude-model <names...>", "drop rows whose model name contains any of these substrings")
	.option("--sort <field>", "creative, longform, model, creative.<metric>, longform.<metric>")
	.addOption(new Option("--order <direction>", "sort direction; scores descending").choices(["asc", "desc"]))
	.option("--limit <number>", "rows per page; 0 = all", "20")
	.option("--offset <number>", "rows to skip", "0")
	.addHelpText(
		"after",
		`
Examples:
  bun run benchmarks --model claude-opus-5-5 gpt-6-sol grok-4.7 glm-5.3
  bun run benchmarks --model gpt-5-2025-08-07 --variants --details
  bun run benchmarks --exclude-model fable --sort creative --limit 0
  bun run benchmarks --benchmark longform --sort longform --limit 10

Exact names precede substrings unless --variants. All numeric EQ-Bench metrics and sample links are retained.
Queries filtered out by --exclude-model are not "missing".
Details also expose Sophon's general and writing benchmark catalogue, not just two headline scores.
Quota, pricing and thinking levels: omp usage --json, omp models --json.
Exit: 0 results, 1 missing query/lookup failure, 2 invalid arguments.`,
	);
cli.exitOverride();

try {
	cli.parse();
	const options = cli.opts<{
		model?: string[];
		benchmark: Benchmark;
		details?: boolean;
		variants?: boolean;
		excludeModel?: string[];
		sort?: string;
		order?: "asc" | "desc";
		limit: string;
		offset: string;
	}>();
	const limit = Number(options.limit),
		offset = Number(options.offset);
	if (
		!/^\d+$/.test(options.limit) ||
		!/^\d+$/.test(options.offset) ||
		!Number.isSafeInteger(limit) ||
		!Number.isSafeInteger(offset)
	)
		cli.error("limit and offset must be non-negative integers");
	if (options.model?.some((query) => !normalise(query))) cli.error("model queries must contain letters or numbers");
	const result = await evidence({
		models: options.model,
		benchmark: options.benchmark,
		details: options.details,
		variants: options.variants,
		sort: options.sort,
		order: options.order,
		excludeModels: options.excludeModel,
		limit,
		offset,
	});
	process.stdout.write(`${JSON.stringify(result)}\n`);
	if (result.missing.length) {
		process.stderr.write(`No result for: ${result.missing.join(", ")}\n`);
		process.exitCode = 1;
	}
} catch (error) {
	if (error && typeof error === "object" && "code" in error && String(error.code).startsWith("commander.")) {
		process.exitCode = error.code === "commander.helpDisplayed" ? 0 : 2;
	} else {
		process.stderr.write(`Model evidence lookup failed: ${error instanceof Error ? error.message : String(error)}\n`);
		process.exitCode = 1;
	}
}
