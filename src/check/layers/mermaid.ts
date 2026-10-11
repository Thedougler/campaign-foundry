import type { RootContent } from "mdast";
import type { Page } from "../../vault/types.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";

const LAYER = "mermaid";

/** One fenced `mermaid` block: its code and the 1-based line of its opening fence. */
interface Diagram {
	code: string;
	line: number;
}

function walk(node: RootContent, visit: (n: RootContent) => void): void {
	visit(node);
	if ("children" in node) for (const child of node.children) walk(child as RootContent, visit);
}

/** Every fenced ```mermaid block on the page, wherever it sits (lists, blockquotes, sections). */
function diagramsOf(page: Page): Diagram[] {
	const found: Diagram[] = [];
	for (const child of page.tree.children) {
		walk(child, (node) => {
			if (node.type !== "code" || !node.position) return;
			if (node.lang?.trim().toLowerCase() !== "mermaid") return;
			found.push({ code: node.value, line: node.position.start.line });
		});
	}
	return found;
}

type Parser = (text: string) => Promise<unknown>;

let parser: Promise<Parser> | undefined;

/**
 * mermaid's parser, loaded once, on demand. The library bundles DOMPurify, which builds itself from the
 * global scope the moment the module evaluates and needs a DOM; in plain Node several diagram kinds
 * (flowchart, timeline, mindmap, journey, pie, …) then throw `DOMPurify.sanitize is not a function`.
 * jsdom lends the import a window, and the globals go straight back: DOMPurify keeps the one it captured.
 *
 * Both imports stay dynamic: mermaid's module must not evaluate before jsdom's window is installed, and a
 * vault without a diagram must not pay the multi-hundred-millisecond jsdom+mermaid load on every check.
 */
function loadParser(): Promise<Parser> {
	parser ??= (async () => {
		// jsdom's DOMWindow and lib.dom's `Window` are structurally incompatible globals; write-through
		// record access is the honest shape for installing and restoring them.
		const globals = globalThis as unknown as Record<string, unknown>;
		const keys = ["window", "document", "Element"] as const;
		const saved: Record<(typeof keys)[number], unknown> = {
			window: globals.window,
			document: globals.document,
			Element: globals.Element,
		};
		const { JSDOM } = await import("jsdom");
		const dom = new JSDOM("");
		globals.window = dom.window;
		globals.document = dom.window.document;
		globals.Element = dom.window.Element;
		try {
			const mermaid = (await import("mermaid")).default;
			mermaid.initialize({ startOnLoad: false });
			return (text: string) => mermaid.parse(text);
		} finally {
			for (const [key, value] of Object.entries(saved)) {
				if (value === undefined) delete globals[key];
				else globals[key] = value;
			}
		}
	})();
	return parser;
}

/** The parser's message on one line, without jison's caret row, capped for a finding. */
function oneLine(message: string): string {
	const text = message
		.split("\n")
		.filter((line) => !/^\s*-*\^*\s*$/.test(line))
		.join(" ")
		.replace(/\s+/g, " ")
		.trim();
	return text.length > 240 ? `${text.slice(0, 237)}...` : text;
}

export async function run(ctx: CheckContext): Promise<Finding[]> {
	const findings: Finding[] = [];
	const diagrams: { path: string; diagram: Diagram }[] = [];
	for (const page of ctx.pages) {
		for (const diagram of diagramsOf(page)) diagrams.push({ path: ctx.display(page.path), diagram });
	}
	if (diagrams.length === 0) return findings;
	const parse = await loadParser();
	for (const { path, diagram } of diagrams) {
		if (diagram.code.trim() === "") {
			findings.push({
				layer: LAYER,
				severity: "error",
				rule: "parse-error",
				path,
				line: diagram.line,
				message: "The mermaid block is empty.",
				hint: "Write a diagram inside the fence, e.g. `flowchart TD` and one `A --> B` line, or delete the block.",
			});
			continue;
		}
		try {
			await parse(diagram.code);
		} catch (error) {
			const detail = oneLine(error instanceof Error ? error.message : String(error));
			findings.push({
				layer: LAYER,
				severity: "error",
				rule: "parse-error",
				path,
				line: diagram.line,
				message: `Mermaid block does not parse: ${detail}`,
				hint: "Fix the diagram until it renders; Obsidian shows this same error above the block. The first line names the diagram type (`flowchart TD`, `sequenceDiagram`, `timeline`, …) and every line must follow that type's syntax. Reference: https://mermaid.js.org/",
			});
		}
	}
	return findings;
}

export const mermaidLayer: Layer = {
	name: LAYER,
	scope: "page",
	description: "Every fenced mermaid diagram parses; a block Obsidian cannot render fails the gate.",
	run,
};
