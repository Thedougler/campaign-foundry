import { generateIndexes } from "../../vault/indexes.ts";
import type { CheckContext, Finding, Fix, Layer } from "../types.ts";
import { isTarget } from "../util.ts";

const LAYER = "index";

interface Drift {
	path: string;
	rule: "missing" | "stale";
	/** 1-based line of the first difference. */
	line: number;
	message: string;
}

/** Every generated index that is missing or differs from what `cf index` would write. */
function drift(ctx: CheckContext): (Drift & { content: string })[] {
	const out: (Drift & { content: string })[] = [];
	for (const [path, content] of generateIndexes(ctx.vault)) {
		if (!isTarget(ctx, path)) continue;
		const page = ctx.vault.pageByPath.get(path);
		if (page === undefined) {
			out.push({ path, rule: "missing", line: 1, message: `\`${path}\` does not exist; it is generated from every page's summary.`, content });
		} else if (page.source !== content) {
			const have = page.source.split("\n");
			const want = content.split("\n");
			let i = 0;
			while (i < want.length && i < have.length && have[i] === want[i]) i++;
			const detail = i < want.length ? `expected \`${want[i]}\`` : "it has extra lines at the end";
			out.push({ path, rule: "stale", line: i + 1, message: `\`${path}\` is out of date: line ${i + 1} differs (${detail}).`, content });
		}
	}
	return out;
}

const HINT = "Regenerate it with `cf index` (or `cf check --layer index --fix`); never edit an index by hand.";

export const indexLayer: Layer = {
	name: LAYER,
	description: "index.md at the root and in each Campaign folder is present and matches what `cf index` generates.",
	run(ctx: CheckContext): Finding[] {
		return drift(ctx).map((d) => ({ layer: LAYER, severity: "error", rule: d.rule, path: ctx.display(d.path), line: d.line, message: d.message, hint: HINT }));
	},
	fix(ctx: CheckContext) {
		const fixes: Fix[] = drift(ctx).map((d) => ({
			layer: LAYER,
			rule: d.rule,
			path: ctx.display(d.path),
			description: d.rule === "missing" ? "generated index.md" : "regenerated index.md",
			edit: { type: "write", path: d.path, content: d.content },
		}));
		return { fixes };
	},
};
