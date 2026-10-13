import { access } from "node:fs/promises";
import { isAbsolute, join, normalize } from "node:path";
import { parseDocument, visit } from "yaml";
import { findTemplate } from "../../vault/vault.ts";
import type { Page, Template } from "../../vault/types.ts";
import type { CheckContext, Finding, Fix, FixResult, Layer } from "../types.ts";
import { isSharedRootFolder } from "../placement-table.ts";
import { quoteList, suggest } from "../util.ts";
import { isFixedPage } from "../views.ts";

const LAYER = "template";

const RETIRED_HEADINGS: Record<string, string> = {
	"At a glance":
		"Deprecated section: 'At a glance'. Migrate now to the shape of wiki/templates/<type>.md and follow its skill. Delete this section; move any fact no other part of the page holds into the section where it belongs.",
	Play: "Deprecated section: 'Play'. Migrate now to the shape of wiki/templates/<type>.md and follow its skill. Delete this section; move any fact no other part of the page holds into the specific section whose job it is.",
	Depth:
		"Deprecated: Depth. Migrate to the shape of wiki/templates/<type>.md — see the page kind's design skill; facts move to the specific section whose job they are.",
	"In use":
		"Deprecated: In use. Migrate to the shape of wiki/templates/Item.md — see item-design; move rules into Properties, rulings into Rulings and spoken description into the First look entry.",
	Story:
		"Deprecated: Story. Migrate to the shape of wiki/templates/PC.md — see pull-pcs; move the character's past into Backstory and their aims and ties into Goals and bonds.",
	Changes:
		"Deprecated: Changes. Migrate to the shape of wiki/templates/Recap.md — see ingest; move state changes into Changes to the World.",
	Next: "Deprecated: Next. Migrate to the shape of wiki/templates/hot.md — see prep-session; move the Party's position, Prep and Hook links and open questions into Next Session.",
};

interface Resolved {
	page: Page;
	template: Template;
}

function isBlank(value: unknown): boolean {
	return value === undefined || value === null || (typeof value === "string" && value.trim() === "");
}

function validTypes(ctx: CheckContext): string {
	return quoteList(ctx.templates.types.keys());
}

/** Resolves each page to its template, or reports why it has none. */
function resolvePages(ctx: CheckContext, findings: Finding[]): Resolved[] {
	const resolved: Resolved[] = [];
	for (const page of ctx.pages) {
		if (isFixedPage(page)) continue;
		const at = (rule: string, line: number, message: string, hint: string): void => {
			findings.push({ layer: LAYER, severity: "error", rule, path: ctx.display(page.path), line, message, hint });
		};
		for (const heading of page.headings) {
			if (heading.depth !== 2) continue;
			const message = RETIRED_HEADINGS[heading.text.trim()];
			if (message) at("retired-heading", heading.line, message, message.slice(message.indexOf("Migrate")));
		}
		if (page.frontmatterError) {
			at(
				"invalid-frontmatter",
				1,
				`Frontmatter does not parse: ${page.frontmatterError}.`,
				'Fix the YAML between the opening and closing `---`; quote values that contain `:` or start with `[[`, e.g. `parent: "[[The Shattered Sea]]"`.',
			);
			continue;
		}
		const fm = page.frontmatter;
		if (!fm) {
			at(
				"missing-frontmatter",
				1,
				"Page has no frontmatter.",
				`Start the page with a property block naming its page kind, e.g.\n---\ntype: NPC\nsummary: One line.\nsources: []\nrevealed: ""\n---\nValid types: ${validTypes(ctx)}.`,
			);
			continue;
		}
		const typeLine = page.frontmatterKeyLines.type ?? 1;
		const type = fm.type;
		if (isBlank(type) || typeof type !== "string") {
			at(
				"missing-type",
				typeLine,
				"Property `type` is missing.",
				`Add \`type: <page kind>\`. Valid types: ${validTypes(ctx)}.`,
			);
			continue;
		}
		const kinds = ctx.templates.types.get(type);
		if (!kinds) {
			const near = suggest(type, ctx.templates.types.keys());
			at(
				"unknown-type",
				typeLine,
				`Unknown type \`${type}\`.`,
				`${near ? `Did you mean \`type: ${near}\`? ` : ""}Valid types: ${validTypes(ctx)}.`,
			);
			continue;
		}
		const kind = isBlank(fm.kind) ? undefined : fm.kind;
		const kindLine = page.frontmatterKeyLines.kind ?? typeLine;
		if (kinds.length === 0) {
			if (kind !== undefined)
				at(
					"unexpected-kind",
					kindLine,
					`Type \`${type}\` has no kinds, but the page sets \`kind: ${String(kind)}\`.`,
					`Remove the \`kind\` property; only ${quoteList([...ctx.templates.types].filter(([, k]) => k.length > 0).map(([t]) => t))} take a kind.`,
				);
			const template = findTemplate(ctx.templates, type);
			if (template) resolved.push({ page, template });
			continue;
		}
		if (kind === undefined || typeof kind !== "string") {
			at(
				"missing-kind",
				typeLine,
				`Type \`${type}\` needs a \`kind\`.`,
				`Add \`kind: <kind>\`. Valid kinds for ${type}: ${quoteList(kinds)}.`,
			);
			continue;
		}
		const template = findTemplate(ctx.templates, type, kind);
		if (!template) {
			const near = suggest(kind, kinds);
			at(
				"unknown-kind",
				kindLine,
				`Unknown kind \`${kind}\` for type \`${type}\`.`,
				`${near ? `Did you mean \`kind: ${near}\`? ` : ""}Valid kinds for ${type}: ${quoteList(kinds)}.`,
			);
			continue;
		}
		resolved.push({ page, template });
	}
	return resolved;
}

async function pathExists(path: string): Promise<boolean> {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}

async function checkSources(ctx: CheckContext, { page }: Resolved, out: Finding[]): Promise<void> {
	const fm = page.frontmatter ?? {};
	if (!("sources" in fm)) return;
	const line = page.frontmatterKeyLines.sources ?? 1;
	const at = (rule: string, message: string, hint: string): void => {
		out.push({ layer: LAYER, severity: "error", rule, path: ctx.display(page.path), line, message, hint });
	};
	const sources = fm.sources;
	if (!Array.isArray(sources)) {
		at(
			"sources-type",
			"Property `sources` must be a list.",
			"Use `sources: []` when nothing was ingested, or list archived Raw as plain strings, e.g.\nsources:\n  - archive/session-11-transcript.md",
		);
		return;
	}
	await Promise.all(
		sources.map(async (source) => {
			if (typeof source !== "string") {
				at(
					"sources-type",
					`A \`sources\` entry is not a string: ${JSON.stringify(source)}.`,
					"Write each source as a plain string path, e.g. `- archive/session-11-transcript.md`, not a wikilink.",
				);
				return;
			}
			const clean = normalize(source);
			if (isAbsolute(source) || !source.startsWith("archive/") || clean.startsWith("..")) {
				at(
					"sources-path",
					`Source \`${source}\` is not a repo-relative \`archive/\` path.`,
					"Sources are the archived Raw a page was built from, written from the repo root, e.g. `archive/session-11-transcript.md`.",
				);
				return;
			}
			if (!(await pathExists(join(ctx.root, clean)))) {
				at(
					"sources-path",
					`Source \`${source}\` does not exist.`,
					`Ingest moves Raw to \`archive/\`; check the file name (ls archive/) or drop the entry. Looked in ${ctx.root}.`,
				);
			}
		}),
	);
}

/** True when the heading at `headingIndex` has no content in its section, subsections included. */
function emptyHeadings(page: Page): typeof page.headings {
	const children = page.tree.children;
	return page.headings.filter((h) => {
		for (let i = h.index + 1; i < children.length; i++) {
			const node = children[i];
			if (!node) break;
			if (node.type === "heading") {
				if (node.depth <= h.depth) break;
				continue;
			}
			return false;
		}
		return true;
	});
}

function missingKeys(page: Page, template: Template): Template["keys"] {
	const shared = isSharedRootFolder(page.path.split("/")[0] ?? "");
	return template.keys.filter(
		({ key }) => !(key in (page.frontmatter ?? {})) && !(shared && template.campaignBound.has(key)),
	);
}

function checkPage(ctx: CheckContext, { page, template }: Resolved, out: Finding[]): void {
	const fm = page.frontmatter ?? {};
	const path = ctx.display(page.path);
	const add = (rule: string, line: number, message: string, hint: string): void => {
		out.push({ layer: LAYER, severity: "error", rule, path, line, message, hint });
	};
	const example = (key: string): string => {
		const value = template.keys.find((k) => k.key === key)?.value;
		return Array.isArray(value) ? `${key}: []` : `${key}: ""`;
	};

	if (fm.type === "NPC" && "creature" in fm) {
		add(
			"retired-property",
			page.frontmatterKeyLines.creature ?? 1,
			"NPC property `creature` is retired.",
			"Remove `creature` and follow templates/NPC.md and skill://npc-design. If this NPC needs statistics, put its own Fantasy Statblocks fence under the optional `## Statblock` section.",
		);
	}

	const missing = missingKeys(page, template).map((k) => k.key);
	for (const key of missing) {
		add(
			"missing-key",
			1,
			`Property \`${key}\` is missing (required by templates/${template.name}.md).`,
			`Add \`${example(key)}\` to the frontmatter; a blank value is fine unless the key is \`summary\` or \`title\`. \`cfcli check --fix\` adds it.`,
		);
	}
	if ("title" in fm) {
		const line = page.frontmatterKeyLines.title ?? 1;
		if (typeof fm.title !== "string" && !isBlank(fm.title)) {
			add(
				"title-type",
				line,
				"Property `title` must be a string.",
				'Set the page display name, e.g. `title: "Mara Voss"`.',
			);
		} else if (isBlank(fm.title)) {
			add(
				"blank-title",
				line,
				"Property `title` is blank.",
				'Set the page display name, e.g. `title: "Mara Voss"`; the filename is only its stable slug.',
			);
		} else if (/\r|\n/.test(fm.title as string)) {
			add("title-multiline", line, "Property `title` spans more than one line.", "Keep the display name on one line.");
		}
	}
	if ("summary" in fm) {
		const line = page.frontmatterKeyLines.summary ?? 1;
		const summary = fm.summary;
		if (typeof summary !== "string" && !isBlank(summary)) {
			add(
				"summary-type",
				line,
				"Property `summary` must be a string.",
				'Write one line of text, e.g. `summary: "A walled river port that taxes every barge."`.',
			);
		} else if (isBlank(summary)) {
			if (!isSharedRootFolder(page.path.split("/")[0] ?? "")) {
				add(
					"blank-summary",
					line,
					"Property `summary` is blank.",
					'Write the page in one line; index pages are generated from it, e.g. `summary: "A walled river port that taxes every barge."`.',
				);
			}
		} else if (/\n/.test((summary as string).trim())) {
			add(
				"summary-multiline",
				line,
				"Property `summary` spans more than one line.",
				"Cut it to a single line of plain text; put the rest in the page body.",
			);
		}
	}

	const headings2 = page.headings.filter((h) => h.depth === 2);
	if (fm.type === "PC") {
		const sheet = headings2.find((h) => h.text === "Sheet");
		if (sheet) {
			const end = page.headings.find((h) => h.line > sheet.line && h.depth <= 2)?.line ?? Infinity;
			const hasStatblock = page.tree.children.some(
				(node) =>
					node.type === "code" &&
					node.lang === "statblock" &&
					(node.position?.start.line ?? 0) > sheet.line &&
					(node.position?.start.line ?? Infinity) < end,
			);
			if (!hasStatblock) {
				const message =
					"Deprecated: PC sheet bullets. Migrate to the shape of wiki/templates/PC.md — run pull-pcs for a public character, or statblock-design (references/fence.md § PC sheet) for a private one; move AC, HP, speed, saves, passive Perception and the ability scores into the fence.";
				add("retired-shape", sheet.line, message, message.slice(message.indexOf("Migrate")));
			}
		}
	}
	const order = template.sections.map((s) => `\`${s}\`${template.optional.has(s) ? " (optional)" : ""}`).join(", ");
	let lastIndex = -1;
	let lastName = "";
	for (const section of template.sections) {
		const at = headings2.findIndex((h) => h.text === section);
		if (at === -1) {
			if (template.optional.has(section)) continue;
			const previous = template.sections[template.sections.indexOf(section) - 1];
			add(
				"missing-section",
				1,
				`Missing section \`## ${section}\` (required by templates/${template.name}.md).`,
				`Add \`## ${section}\` ${previous ? `after \`## ${previous}\`` : "first"}; the template's section order is ${order}.`,
			);
			continue;
		}
		if (at < lastIndex) {
			add(
				"section-order",
				headings2[at]?.line ?? 1,
				`Section \`## ${section}\` comes before \`## ${lastName}\`, but the template puts it after.`,
				`Move \`## ${section}\` below \`## ${lastName}\`. Template order: ${order}.`,
			);
			continue;
		}
		lastIndex = at;
		lastName = section;
	}

	const present = new Map(page.callouts.map((c) => [c.type, c]));
	for (const type of template.callouts) {
		if (present.has(type) || template.optionalCallouts.has(type)) continue;
		const callout = template.page.callouts.find((c) => c.type === type);
		const home = template.page.headings.filter((h) => h.depth === 2 && h.line < (callout?.line ?? 0)).at(-1)?.text;
		const title = callout?.title ?? "Title";
		add(
			"missing-callout",
			1,
			`Missing \`[!${type}]\` callout (required by templates/${template.name}.md).`,
			`Add a callout ${home ? `under \`## ${home}\`` : `where templates/${template.name}.md puts it`}, e.g.\n> [!${type}] ${title}\n> Spoken text for the table.`,
		);
	}
	for (const callout of page.callouts) {
		if (callout.body === "" && template.callouts.includes(callout.type)) {
			add(
				"empty-callout",
				callout.line,
				`The \`[!${callout.type}]\` callout has no text.`,
				`Write the callout body on the lines under it, each starting with \`> \`.`,
			);
		}
	}

	for (const comment of page.comments) {
		add(
			"leftover-comment",
			comment.line,
			"Leftover `%% %%` authoring guidance.",
			"Delete the comment; a finished page keeps none. `cfcli check --fix` strips it.",
		);
	}
	for (const line of page.frontmatterCommentLines) {
		add(
			"leftover-comment",
			line,
			"Leftover `#` template guidance; a page's frontmatter keeps none.",
			"Delete the YAML comment, keeping the property value. `cfcli check --fix` strips it.",
		);
	}
	for (const heading of emptyHeadings(page)) {
		const hint =
			heading.depth >= 3
				? "Write content under it or delete the heading; `###` headings are optional structure. `cfcli check --fix` removes it."
				: template.optional.has(heading.text)
					? `Write content under it or delete the heading; templates/${template.name}.md marks \`## ${heading.text}\` optional. \`cfcli check --fix\` removes it.`
					: `Write the section's content; a \`##\` section is required by templates/${template.name}.md so it cannot be dropped.`;
		add(
			"empty-heading",
			heading.line,
			`Heading \`${"#".repeat(heading.depth)} ${heading.text}\` has no content.`,
			hint,
		);
	}
}

export function run(ctx: CheckContext): Promise<Finding[]> | Finding[] {
	const findings: Finding[] = [];
	const resolved = resolvePages(ctx, findings);
	for (const r of resolved) checkPage(ctx, r, findings);
	return Promise.all(resolved.map((r) => checkSources(ctx, r, findings))).then(() => findings);
}

// ---- fixes -----------------------------------------------------------------------------------

type Range = [number, number];

/** Merges overlapping ranges. */
function mergeRanges(ranges: Range[]): Range[] {
	const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
	const merged: Range[] = [];
	for (const r of sorted) {
		const last = merged[merged.length - 1];
		if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
		else merged.push([r[0], r[1]]);
	}
	return merged;
}

/** The range covering whole lines `first..last` (1-based), swallowing following blank lines when the block sits after a blank line. */
function lineRange(lines: string[], offsets: number[], first: number, last: number): Range {
	const start = offsets[first - 1] ?? 0;
	let endLine = last;
	const prevBlank = first === 1 || (lines[first - 2] ?? "").trim() === "";
	if (prevBlank) while (endLine < lines.length && (lines[endLine] ?? "").trim() === "") endLine++;
	const end =
		endLine < lines.length
			? (offsets[endLine] ?? 0)
			: offsets[lines.length - 1]! + (lines[lines.length - 1] ?? "").length;
	return [start, end];
}

function blankValue(value: unknown): unknown {
	if (Array.isArray(value)) return [];
	if (typeof value === "string") return "";
	return null;
}

function fixFrontmatter(source: string, keys: Template["keys"], stripComments: boolean): string {
	const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
	if (!match) return source;
	const doc = parseDocument(match[1] ?? "");
	for (const { key, value } of keys) doc.set(key, blankValue(value));
	if (stripComments) {
		doc.comment = null;
		doc.commentBefore = null;
		visit(doc, {
			Node(_key, node) {
				delete node.comment;
				delete node.commentBefore;
			},
		});
	}
	const yaml = doc.toString({ nullStr: "" }).trimEnd();
	return `---\n${yaml}\n---${source.slice(match[0].length)}`;
}

export function fix(ctx: CheckContext): FixResult {
	const findings: Finding[] = [];
	const fixes: Fix[] = [];
	for (const resolved of resolvePages(ctx, findings)) {
		const { page, template } = resolved;
		const notes: string[] = [];
		let source = page.source;

		const lines = source.split("\n");
		const offsets: number[] = [];
		let at = 0;
		for (const line of lines) {
			offsets.push(at);
			at += line.length + 1;
		}
		const deletions: Range[] = [];
		for (const comment of page.comments) {
			const before = source.slice(offsets[comment.line - 1] ?? 0, comment.start);
			const afterEnd = source.indexOf("\n", comment.end);
			const after = source.slice(comment.end, afterEnd === -1 ? source.length : afterEnd);
			if (/^[ \t>]*$/.test(before) && /^[ \t\r]*$/.test(after)) {
				deletions.push(lineRange(lines, offsets, comment.line, comment.endLine));
			} else {
				const lead = /[ \t]*$/.exec(before)?.[0].length ?? 0;
				deletions.push([comment.start - (after.trim() === "" ? lead : 0), comment.end]);
			}
		}
		if (page.comments.length > 0)
			notes.push(`stripped ${page.comments.length} leftover %% %% comment${page.comments.length === 1 ? "" : "s"}`);
		const empties = emptyHeadings(page).filter((h) => h.depth >= 3 || (h.depth === 2 && template.optional.has(h.text)));
		for (const heading of empties) deletions.push(lineRange(lines, offsets, heading.line, heading.line));
		if (empties.length > 0)
			notes.push(
				`removed ${empties.length} empty heading${empties.length === 1 ? "" : "s"} (${empties.map((h) => h.text).join(", ")})`,
			);

		for (const [start, end] of mergeRanges(deletions).reverse()) source = source.slice(0, start) + source.slice(end);

		const missing = missingKeys(page, template);
		const stripComments = page.frontmatterCommentLines.length > 0;
		if (missing.length > 0 || stripComments) source = fixFrontmatter(source, missing, stripComments);
		if (stripComments)
			notes.push(
				`stripped ${page.frontmatterCommentLines.length} leftover YAML comment${page.frontmatterCommentLines.length === 1 ? "" : "s"}`,
			);
		if (missing.length > 0) {
			notes.push(
				`added blank ${missing.length === 1 ? "property" : "properties"} ${missing.map((k) => k.key).join(", ")}`,
			);
		}
		if (notes.length === 0 || source === page.source) continue;
		fixes.push({
			layer: LAYER,
			rule: "conformance",
			path: ctx.display(page.path),
			description: notes.join("; "),
			edit: { type: "write", path: page.path, content: source },
		});
	}
	return { fixes };
}

export const templateLayer: Layer = {
	name: LAYER,
	scope: "page",
	description: "Each page matches its kind's template: properties, sections, callouts, no leftover guidance.",
	run,
	fix,
};
