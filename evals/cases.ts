/** Shared case metadata validation for eval runs and authoring gates. */
import { existsSync, readFileSync } from "node:fs";
import YAML from "yaml";
import { UsageError } from "../src/check/errors.ts";
import { wikiPagePath } from "./outputs.ts";
export interface Checks {
	pages?: string[];
	sections?: Record<string, string[]>;
	canon?: Record<string, string[]>;
	absent?: Record<string, string[]>;
}

export interface Case {
	id: string;
	prompt: string;
	/** Marks a case for the smart test subject (agent smart-test-subject) instead of test-subject. */
	subject?: "smart";
	source_pages?: string[];
	raw_sources?: string[];
	/** Repo-relative files under the skill's `evals/fixtures/`, listed on the Runner's and grader's `Sources:` lines. */
	fixtures?: string[];
	checks?: Checks;
	rubrics?: string[];
}

function fail(message: string, hint = ""): never {
	throw new UsageError(message, hint);
}
const CHECK_KEYS = ["pages", "sections", "canon", "absent"];

function isStringList(value: unknown): value is string[] {
	return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isPageMap(value: unknown): value is Record<string, string[]> {
	return (
		typeof value === "object" && value !== null && !Array.isArray(value) && Object.values(value).every(isStringList)
	);
}

/** Reads and validates a cases file. Throws a UsageError naming the first problem. */
export function loadCases(file: string): Case[] {
	if (!existsSync(file)) fail(`cases file not found: ${file}`);
	let data: unknown;
	try {
		data = YAML.parse(readFileSync(file, "utf8"));
	} catch (error) {
		fail(`${file}: invalid cases YAML: ${error instanceof Error ? error.message : String(error)}`);
	}
	if (!Array.isArray(data)) fail(`${file}: expected a list of cases`);
	const seen = new Set<string>();
	for (const [index, entry] of data.entries()) {
		const item = entry as Record<string, unknown> | null;
		const where = `${file}: case #${index + 1}`;
		if (typeof item !== "object" || item === null) fail(`${where}: expected a mapping`);
		if (typeof item.id !== "string" || item.id === "") fail(`${where}: "id" must be a non-empty string`);
		if (seen.has(item.id)) fail(`${where}: duplicate id "${item.id}"`);
		seen.add(item.id);
		if (typeof item.prompt !== "string" || item.prompt === "")
			fail(`${where} ("${item.id}"): "prompt" must be a non-empty string`);
		if (item.rubrics !== undefined && !isStringList(item.rubrics))
			fail(`${where} ("${item.id}"): "rubrics" must be a list of strings`);
		if (item.subject !== undefined && item.subject !== "smart")
			fail(`${where} ("${item.id}"): "subject" must be "smart" when set`);
		for (const key of Object.keys(item)) {
			if (!["id", "prompt", "subject", "source_pages", "raw_sources", "fixtures", "checks", "rubrics"].includes(key))
				fail(`${where}: unknown case field "${key}"`);
		}
		for (const key of ["source_pages", "raw_sources", "fixtures"]) {
			if (item[key] !== undefined && !isStringList(item[key])) fail(`${where}: ${key} must be a list of paths`);
		}
		for (const path of (item.source_pages as string[] | undefined) ?? []) wikiPagePath(path);
		for (const path of (item.raw_sources as string[] | undefined) ?? []) {
			if (!/^(raw|archive)\/.+/u.test(path)) fail(`${where}: raw_sources must identify raw/ or archive/ inputs`);
			wikiPagePath(path);
		}
		for (const path of (item.fixtures as string[] | undefined) ?? []) {
			if (!/^\.(agents|omp)\/skills\/[^/]+\/evals\/fixtures\/.+/u.test(path))
				fail(
					`${where}: fixtures must sit under a skill's evals/fixtures/`,
					"Example: .agents/skills/item-design/evals/fixtures/playful-cloud.md",
				);
			wikiPagePath(path);
		}
		const checks = item.checks as Record<string, unknown> | undefined;
		if (checks === undefined) continue;
		if (typeof checks !== "object" || checks === null) fail(`${where} ("${item.id}"): "checks" must be a mapping`);
		for (const key of Object.keys(checks)) {
			if (!CHECK_KEYS.includes(key))
				fail(`${where} ("${item.id}"): unknown check "${key}" (use ${CHECK_KEYS.join(", ")})`);
		}
		if (checks.pages !== undefined && !isStringList(checks.pages))
			fail(`${where} ("${item.id}"): checks.pages must be a list of paths`);
		for (const key of ["sections", "canon", "absent"]) {
			if (checks[key] !== undefined && !isPageMap(checks[key]))
				fail(`${where} ("${item.id}"): checks.${key} must map a page path to a list of strings`);
		}
	}
	return data as Case[];
}
