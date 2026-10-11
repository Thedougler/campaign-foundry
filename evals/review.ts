// Adapted from Anthropic's skill-creator eval-viewer/generate_review.py (Apache-2.0).
// Modified for native Campaign Foundry description trigger reviews, offline and with safe embedded data.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { Ajv } from "ajv";

export interface DescriptionReviewOptions {
	queries: string;
	skillName: string;
	description: string;
	static: string;
}

interface QueryItem {
	query: string;
	should_trigger: boolean;
}

const ajv = new Ajv({ allErrors: true });
const validQueries = ajv.compile<QueryItem[]>({
	type: "array",
	items: {
		type: "object",
		properties: { query: { type: "string" }, should_trigger: { type: "boolean" } },
		required: ["query", "should_trigger"],
		additionalProperties: false,
	},
});

async function readJson(path: string): Promise<unknown> {
	try {
		return JSON.parse(await readFile(path, "utf8"));
	} catch (error) {
		throw new Error(`Cannot read JSON ${path}: ${(error as Error).message}`);
	}
}

/** Escape HTML script raw-text delimiters, including malicious </script> in prose. */
function safeInlineJson(value: unknown): string {
	return JSON.stringify(value).replace(
		/[<>&\u2028\u2029]/g,
		(character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`,
	);
}

async function writePage(asset: string, data: unknown, output: string): Promise<string> {
	const path = resolve(output);
	const template = await readFile(new URL(`./assets/${asset}`, import.meta.url), "utf8");
	const marker = "/*__EMBEDDED_DATA__*/";
	if (template.split(marker).length !== 2)
		throw new Error(`Review template must have exactly one embedded-data marker: ${asset}`);
	const html = template.replace(
		marker,
		() => `const EMBEDDED_DATA = JSON.parse(${safeInlineJson(JSON.stringify(data))});`,
	);
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, html, "utf8");
	return path;
}

/** Edit query/boolean trigger cases offline and download the revised eval_set.json. */
export async function generateDescriptionReview(
	options: DescriptionReviewOptions,
): Promise<{ queries: string; review: string; count: number }> {
	const queries = resolve(options.queries);
	const data = await readJson(queries);
	if (!validQueries(data))
		throw new Error(
			`Expected an array of {query: string, should_trigger: boolean} in ${queries}: ${ajv.errorsText(validQueries.errors)}`,
		);
	const review = await writePage(
		"eval_review.html",
		{
			skill_name: options.skillName,
			description: options.description,
			queries: data.map((item) => ({ query: item.query, should_trigger: item.should_trigger })),
		},
		options.static,
	);
	return { queries, review, count: data.length };
}
