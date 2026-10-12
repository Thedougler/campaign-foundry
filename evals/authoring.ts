// SPDX-License-Identifier: Apache-2.0
// Adapted from Anthropic's skills/skill-creator validation helpers:
// https://github.com/anthropics/skills/tree/main/skills/skill-creator
// Modified for native omp frontmatter and TypeScript.
// License: https://www.apache.org/licenses/LICENSE-2.0

import { existsSync, type Stats } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { parse } from "yaml";
import { UsageError } from "../src/check/errors.ts";
import { findRepoRoot } from "../src/commands/kit.ts";
import {
	NON_RELATIVE,
	brokenSkillLinks,
	decodedPath,
	forEachVisibleLine,
	loadSkillScope,
	markdownLinks,
	skillSourceFiles,
} from "./skill-graph.ts";
import type { MarkdownLink } from "./skill-graph.ts";
import { loadCases } from "./cases.ts";

export interface SkillValidation {
	skillDir: string;
	skillFile: string;
	name: string;
	description: string;
	frontmatter: Record<string, unknown>;
}

function errorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

/** Broken Markdown or `skill://` references in a skill: findings printed with exit code 1, not a usage error. */
export class SkillReferenceError extends Error {}

/** Validate native omp metadata without constraining extension-specific keys. */
export async function validateSkill(skillDirectory: string, options: { root?: string } = {}): Promise<SkillValidation> {
	const skillDir = resolve(skillDirectory);
	const skillFile = join(skillDir, "SKILL.md");
	const hint = `Fix ${skillFile}, then run cfcli eval validate ${JSON.stringify(skillDir)}.`;
	let content: string;
	try {
		if (!(await stat(skillDir)).isDirectory()) {
			throw new UsageError(
				`Skill path is not a directory: ${skillDir}`,
				"Pass the directory containing SKILL.md, not the file itself.",
			);
		}
		content = await readFile(skillFile, "utf8");
	} catch (error) {
		if (error instanceof UsageError) throw error;
		throw new UsageError(
			`Cannot read skill ${skillDir}: ${errorMessage(error)}`,
			"Pass an existing, readable skill directory containing SKILL.md. Example: cfcli eval validate .omp/skills/skill-creator",
		);
	}
	const match = /^\uFEFF?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(content);
	if (!match) {
		throw new UsageError(
			`Missing or incomplete YAML frontmatter in ${skillFile}.`,
			`Start SKILL.md with a --- delimited YAML mapping containing name and description. ${hint}`,
		);
	}
	let parsed: unknown;
	try {
		parsed = parse(match[1]!);
	} catch (error) {
		throw new UsageError(`Invalid YAML frontmatter in ${skillFile}: ${errorMessage(error)}`, hint);
	}
	if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
		throw new UsageError(`Frontmatter in ${skillFile} must be a YAML mapping.`, hint);
	}
	const frontmatter = parsed as Record<string, unknown>;
	const { name, description } = frontmatter;
	if (typeof name !== "string" || name.trim().length === 0) {
		throw new UsageError(
			`Frontmatter name in ${skillFile} must be a nonempty string.`,
			`Set name: ${JSON.stringify(basename(skillDir))}. ${hint}`,
		);
	}
	if (name !== basename(skillDir)) {
		throw new UsageError(
			`Frontmatter name ${JSON.stringify(name)} does not match directory ${JSON.stringify(basename(skillDir))}.`,
			`Set name: ${JSON.stringify(basename(skillDir))}, or rename the skill directory to match. ${hint}`,
		);
	}
	if (typeof description !== "string" || description.trim().length === 0) {
		throw new UsageError(
			`Frontmatter description in ${skillFile} must be a nonempty string.`,
			`Describe when the skill should be invoked. ${hint}`,
		);
	}
	for (const key of ["hide", "alwaysApply", "disableModelInvocation", "disable-model-invocation", "user-invocable"]) {
		if (key in frontmatter && typeof frontmatter[key] !== "boolean") {
			throw new UsageError(
				`Frontmatter ${key} in ${skillFile} must be a boolean.`,
				`Use ${key}: true or ${key}: false (without quotes), or remove the optional field. ${hint}`,
			);
		}
	}
	if ("argument-hint" in frontmatter && typeof frontmatter["argument-hint"] !== "string") {
		throw new UsageError(`Frontmatter argument-hint in ${skillFile} must be a string.`, hint);
	}
	if (
		"globs" in frontmatter &&
		(!Array.isArray(frontmatter.globs) || frontmatter.globs.some((glob) => typeof glob !== "string"))
	) {
		throw new UsageError(`Frontmatter globs in ${skillFile} must be an array of strings.`, hint);
	}
	const casesFile = join(skillDir, "evals", "cases.yaml");
	if (existsSync(casesFile)) loadCases(casesFile);
	const scope = await loadSkillScope(options.root ?? findRepoRoot(process.cwd()));
	const sourceFiles = await skillSourceFiles(skillDir, content);
	const breaks = [
		...(await brokenMarkdownReferences(sourceFiles)).map(
			(brk) => `  ${brk.file}:${brk.line}: [${brk.text}](${brk.destination}) — ${brk.reason}`,
		),
		...(await brokenSkillLinks(skillDir, scope, content)).map(
			(brk) => `  ${brk.file}:${brk.line}: ${brk.reference} — ${brk.reason}`,
		),
	];
	if (breaks.length > 0) {
		throw new SkillReferenceError(`Broken references in ${skillDir}:\n${breaks.join("\n")}`);
	}
	return { skillDir, skillFile, name, description, frontmatter };
}

interface ReferenceBreak {
	file: string;
	line: number;
	text: string;
	destination: string;
	reason: string;
}

/** GitHub's heading anchor rule: lowercase, drop punctuation except hyphens and spaces, spaces become hyphens. */
function headingSlug(heading: string): string {
	return heading
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N} -]/gu, "")
		.replace(/ /g, "-");
}

/** Heading anchors a Markdown file answers to; repeated headings get GitHub's -1, -2 suffixes. */
export function headingAnchors(content: string): Set<string> {
	const counts = new Map<string, number>();
	forEachVisibleLine(content, (line) => {
		const heading = /^ {0,3}#{1,6}[ \t]+(.+?)[ \t]*#*[ \t]*$/.exec(line);
		if (!heading) return;
		const base = headingSlug(heading[1]!);
		if (base === "") return;
		counts.set(base, (counts.get(base) ?? 0) + 1);
	});
	return new Set(
		[...counts].flatMap(([base, count]) =>
			Array.from({ length: count }, (_, seen) => (seen === 0 ? base : `${base}-${seen}`)),
		),
	);
}

/**
 * Broken relative references in a skill's scanned files: a path that resolves to nothing, or a
 * Markdown anchor no heading slugs to.
 */
async function brokenMarkdownReferences(sourceFiles: Map<string, string>): Promise<ReferenceBreak[]> {
	const breaks: ReferenceBreak[] = [];
	const anchorCache = new Map<string, Promise<Set<string>>>();
	const anchorsOf = (path: string): Promise<Set<string>> => {
		let anchors = anchorCache.get(path);
		if (anchors === undefined) {
			anchors = readFile(path, "utf8").then(headingAnchors);
			anchorCache.set(path, anchors);
		}
		return anchors;
	};
	const check = async (sourcePath: string, display: string, link: MarkdownLink): Promise<void> => {
		const destination = link.destination;
		if (destination === "" || NON_RELATIVE.test(destination)) return;
		const hash = destination.indexOf("#");
		const anchor = hash === -1 ? undefined : destination.slice(hash + 1);
		const rawPath = hash === -1 ? destination : destination.slice(0, hash);
		const target = rawPath === "" ? sourcePath : resolve(dirname(sourcePath), decodedPath(rawPath));
		let info: Stats;
		try {
			info = await stat(target);
		} catch {
			breaks.push({ file: display, line: link.line, text: link.text, destination, reason: "target does not exist" });
			return;
		}
		if (anchor === undefined || anchor === "" || !info.isFile() || !/\.md$/i.test(target)) return;
		if (!(await anchorsOf(target)).has(anchor)) {
			breaks.push({
				file: display,
				line: link.line,
				text: link.text,
				destination,
				reason: `no heading slugs to #${anchor}`,
			});
		}
	};
	for (const [path, display] of sourceFiles) {
		const content = await readFile(path, "utf8");
		for (const link of markdownLinks(content)) await check(path, display, link);
	}
	return breaks;
}
