#!/usr/bin/env node
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { Command, Option } from "commander";
import { Ajv } from "ajv";
import { evidence, matches, normalise, quotaEvidence } from "./model-evidence.ts";
import type { AvailableModel, Benchmark, Report, Runtime } from "./model-evidence.ts";

const validator = new Ajv();
const usagePayload = validator.compile<{ reports: Report[] }>({
	type: "object",
	required: ["reports"],
	properties: {
		reports: {
			type: "array",
			items: {
				type: "object",
				required: ["provider", "fetchedAt", "limits"],
				properties: {
					provider: { type: "string" },
					fetchedAt: { type: "number" },
					limits: {
						type: "array",
						items: {
							type: "object",
							required: ["id", "scope", "amount"],
							properties: {
								id: { type: "string" },
								scope: { type: "object", required: ["provider"], properties: { provider: { type: "string" } } },
								amount: {
									type: "object",
									required: ["unit"],
									properties: {
										unit: { type: "string" },
										remainingFraction: { type: "number", minimum: 0, maximum: 1 },
									},
								},
							},
						},
					},
				},
			},
		},
	},
});
const modelsPayload = validator.compile<{ models: AvailableModel[] }>({
	type: "object",
	required: ["models"],
	properties: {
		models: {
			type: "array",
			items: {
				type: "object",
				required: ["selector", "provider", "id", "name", "thinking", "cost", "pricingStatus"],
				properties: {
					selector: { type: "string" },
					provider: { type: "string" },
					id: { type: "string" },
					name: { type: "string" },
					thinking: { anyOf: [{ type: "null" }, { type: "array", items: { type: "string" } }] },
					pricingStatus: { type: "string" },
					cost: {
						type: "object",
						required: ["input", "output", "cacheRead", "cacheWrite"],
						properties: {
							input: { type: "number" },
							output: { type: "number" },
							cacheRead: { type: "number" },
							cacheWrite: { type: "number" },
						},
					},
				},
			},
		},
	},
});

const cli = new Command()
	.name("bun run benchmarks")
	.description("Read-only writing benchmark evidence, omp quotas and token costs. JSON on stdout.")
	.argument("[action]", "lookup or usage", "lookup")
	.option("-m, --model <names...>", "model names, selectors or family substrings; omitted = all")
	.addOption(
		new Option("-b, --benchmark <name>", "writing benchmark").choices(["creative", "longform", "all"]).default("all"),
	)
	.option("--usage", "append configured omp model costs and quota windows")
	.option("--details", "all model benchmark scores, rubric, style and repetition diagnostics")
	.option("--variants", "include published suffixed runs even when an exact base model exists")
	.option(
		"--sort <field>",
		"creative, longform, model, remainingPercent, cost.<rate>, creative.<metric>, longform.<metric>",
	)
	.addOption(
		new Option("--order <direction>", "sort direction; scores descending, costs ascending").choices(["asc", "desc"]),
	)
	.option("--limit <number>", "rows per page; 0 = all", "20")
	.option("--offset <number>", "rows to skip", "0")
	.addHelpText(
		"after",
		`
Examples:
  bun run benchmarks --model claude-opus-5-5 glm-5.3 --usage --sort creative
  bun run benchmarks --model gpt-5-2025-08-07 --variants --details
  bun run benchmarks usage --model claude grok glm --sort cost.output
  bun run benchmarks --benchmark longform --sort longform --limit 10

Exact names precede substrings unless --variants. All numeric EQ-Bench metrics and sample links are retained.
Details also expose Sophon's general and writing benchmark catalogue, not just two headline scores.
Costs are omp's configured USD/million-token rates, not subscription fees. Unknown != unlimited/free.
Usage invokes omp's read-only administration commands, not a new agent session. Native model_evidence
uses the calling session's registry and provider-specific quota mapping instead.
Exit: 0 results, 1 missing query/lookup failure, 2 invalid arguments.`,
	);
cli.exitOverride();

try {
	cli.parse();
	const action = cli.args[0] ?? "lookup";
	if (action !== "lookup" && action !== "usage") cli.error("action must be lookup or usage");
	const options = cli.opts<{
		model?: string[];
		benchmark: Benchmark;
		usage?: boolean;
		details?: boolean;
		variants?: boolean;
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
	let runtime: Runtime | undefined;
	if (options.usage || action === "usage") {
		const run = promisify(execFile);
		const [usageResult, modelsResult] = await Promise.all([
			run("omp", ["usage", "--json", "--redact"], { timeout: 60_000, maxBuffer: 8_000_000 }),
			run("omp", ["models", "--json"], { timeout: 60_000, maxBuffer: 8_000_000 }),
		]);
		const usageData: unknown = JSON.parse(usageResult.stdout);
		const modelData: unknown = JSON.parse(modelsResult.stdout);
		if (!usagePayload(usageData))
			throw new Error(`Invalid omp usage JSON: ${validator.errorsText(usagePayload.errors)}`);
		if (!modelsPayload(modelData))
			throw new Error(`Invalid omp models JSON: ${validator.errorsText(modelsPayload.errors)}`);
		const reports = usageData.reports;
		const models = matches(modelData.models, options.model, (row) => [row.selector, row.name], options.variants);
		const quotas = quotaEvidence(reports);
		// The standalone CLI lacks the session's strategy mapper: keep only explicit model or account-wide scopes.
		const modelQuotas = Object.fromEntries(
			models.map((model) => [
				model.selector,
				quotas
					.filter(
						(quota) =>
							quota.scope.provider === model.provider &&
							(quota.scope.model === model.id || (!quota.scope.model && !quota.scope.tier && quota.scope.shared)),
					)
					.map((quota) => quota.ref),
			]),
		);
		runtime = { models, quotas, modelQuotas };
	}
	const result = await evidence(
		{
			models: options.model,
			benchmark: options.benchmark,
			details: options.details,
			variants: options.variants,
			sort: options.sort ?? (action === "usage" ? "model" : options.benchmark === "longform" ? "longform" : "creative"),
			order: options.order,
			limit,
			offset,
		},
		runtime,
		action === "usage",
	);
	if (runtime)
		result.notes.push(
			"Standalone usage maps explicit model/account-wide scopes only; use the native tool for provider-specific tier mapping.",
		);
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
