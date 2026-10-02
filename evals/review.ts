// Adapted from Anthropic's skill-creator eval-viewer/generate_review.py (Apache-2.0).
// Modified for native Campaign Foundry authoring, offline review and safe embedded data.
import { lstat, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { Ajv } from "ajv";

export interface ReviewOutput {
	name: string;
	type: "text" | "image" | "binary";
	mime: string;
	content?: string;
	data_uri: string;
}

export interface ReviewRun {
	id: string;
	prompt: string;
	eval_id: string | number | null;
	outputs: ReviewOutput[];
	grading: Record<string, unknown> | null;
}

export interface ReviewOptions {
	workspace: string;
	skillName: string;
	benchmark: string;
	static?: string;
	previousWorkspace?: string;
}

export interface DescriptionReviewOptions {
	queries: string;
	skillName: string;
	description: string;
	static: string;
}

const TEXT_EXTENSIONS: Record<string, true> = {
	".txt": true, ".md": true, ".json": true, ".jsonl": true, ".csv": true,
	".py": true, ".js": true, ".ts": true, ".tsx": true, ".jsx": true,
	".yaml": true, ".yml": true, ".xml": true, ".html": true, ".css": true,
	".sh": true, ".rb": true, ".go": true, ".rs": true, ".java": true,
	".c": true, ".cpp": true, ".h": true, ".hpp": true, ".sql": true,
	".r": true, ".toml": true, ".log": true,
};
const IMAGE_MIMES: Record<string, string> = {
	".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
	".gif": "image/gif", ".svg": "image/svg+xml", ".webp": "image/webp", ".avif": "image/avif",
};
const BINARY_MIMES: Record<string, string> = {
	".pdf": "application/pdf", ".zip": "application/zip",
	".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};
const METADATA_FILES: Record<string, true> = { "transcript.md": true, "user_notes.md": true, "metrics.json": true };
const SKIP_DIRECTORIES: Record<string, true> = {
	node_modules: true, ".git": true, __pycache__: true, skill: true, inputs: true,
};

interface QueryItem { query: string; should_trigger: boolean }
interface FeedbackDocument { reviews: { run_id: string; feedback: string }[] }
const ajv = new Ajv({ allErrors: true });
const validObject = ajv.compile<Record<string, unknown>>({ type: "object" });
const validQueries = ajv.compile<QueryItem[]>({
	type: "array",
	items: {
		type: "object", required: ["query", "should_trigger"],
		properties: { query: { type: "string" }, should_trigger: { type: "boolean" } },
	},
});
const validFeedback = ajv.compile<FeedbackDocument>({
	type: "object", required: ["reviews"],
	properties: {
		reviews: {
			type: "array",
			items: {
				type: "object", required: ["run_id", "feedback"],
				properties: { run_id: { type: "string" }, feedback: { type: "string" } },
			},
		},
	},
});

async function fileExists(path: string): Promise<boolean> {
	try {
		const info = await lstat(path);
		if (!info.isFile() || info.isSymbolicLink()) throw new Error(`Expected a regular file, not a symlink or directory: ${path}`);
		return true;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
		throw error;
	}
}

async function requireDirectory(path: string): Promise<void> {
	const info = await lstat(path).catch((error: NodeJS.ErrnoException) => {
		throw new Error(`Cannot read workspace ${path}: ${error.message}`);
	});
	if (!info.isDirectory() || info.isSymbolicLink()) throw new Error(`Workspace must be a real directory: ${path}`);
}

async function readJson(path: string): Promise<unknown> {
	try {
		return JSON.parse(await readFile(path, "utf8"));
	} catch (error) {
		throw new Error(`Cannot read JSON ${path}: ${(error as Error).message}`);
	}
}

async function readObject(path: string): Promise<Record<string, unknown>> {
	const value = await readJson(path);
	if (!validObject(value)) throw new Error(`Expected a JSON object in ${path}: ${ajv.errorsText(validObject.errors)}`);
	return value;
}

function ancestors(root: string, start: string): string[] {
	const result = [start];
	while (result.at(-1) !== root) result.push(dirname(result.at(-1)!));
	return result;
}

async function embedOutputs(outputsDirectory: string, directory = outputsDirectory): Promise<ReviewOutput[]> {
	const result: ReviewOutput[] = [];
	const entries = (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name));
	for (const entry of entries) {
		const path = join(directory, entry.name);
		if (entry.isSymbolicLink()) throw new Error(`Deliverables must be regular files, not symlinks: ${path}`);
		if (entry.isDirectory()) {
			result.push(...await embedOutputs(outputsDirectory, path));
		} else if (entry.isFile() && !(directory === outputsDirectory && Object.hasOwn(METADATA_FILES, entry.name))) {
			const raw = await readFile(path);
			const extension = extname(entry.name).toLowerCase();
			const imageMime = Object.hasOwn(IMAGE_MIMES, extension) ? IMAGE_MIMES[extension] : undefined;
			const type = Object.hasOwn(TEXT_EXTENSIONS, extension) ? "text" : imageMime ? "image" : "binary";
			const mime = type === "text" ? "text/plain" : imageMime ?? (Object.hasOwn(BINARY_MIMES, extension) ? BINARY_MIMES[extension]! : "application/octet-stream");
			result.push({
				name: relative(outputsDirectory, path).split(sep).join("/"),
				type,
				mime,
				...(type === "text" ? { content: raw.toString("utf8") } : {}),
				data_uri: `data:${mime};base64,${raw.toString("base64")}`,
			});
		} else if (!entry.isFile()) {
			throw new Error(`Deliverables must be regular files: ${path}`);
		}
	}
	return result;
}

async function buildRun(root: string, runDirectory: string, outputDirectory = join(runDirectory, "outputs"), controlDirectory = runDirectory): Promise<ReviewRun> {
	let prompt = "";
	let evalId: string | number | null = null;
	let grading: Record<string, unknown> | null = null;
	const parents = [controlDirectory, ...ancestors(root, runDirectory)];
	for (const parent of parents) {
		const metadataPath = join(parent, "eval_metadata.json");
		if (await fileExists(metadataPath)) {
			const metadata = await readObject(metadataPath);
			if (!prompt && typeof metadata.prompt === "string") prompt = metadata.prompt;
			if (evalId === null && (typeof metadata.eval_id === "number" || typeof metadata.eval_id === "string")) evalId = metadata.eval_id;
		}
	}
	if (!prompt) {
		for (const parent of parents) {
			const briefPath = join(parent, "brief.md");
			if (await fileExists(briefPath)) {
				prompt = await readFile(briefPath, "utf8");
				if (prompt) break;
			}
		}
	}
	if (!prompt) {
		for (const path of [join(runDirectory, "transcript.md"), join(runDirectory, "outputs", "transcript.md")]) {
			if (await fileExists(path)) {
				prompt = (await readFile(path, "utf8")).match(/## Eval Prompt\r?\n\r?\n([\s\S]*?)(?=\r?\n##|$)/)?.[1]?.trim() ?? "";
				if (prompt) break;
			}
		}
	}
	for (const parent of parents) {
		for (const name of ["grades.json", "grading.json"]) {
			const path = join(parent, name);
			if (await fileExists(path)) { grading = await readObject(path); break; }
		}
		if (grading) break;
	}
	const briefPath = join(controlDirectory, "runner-brief.md");
	if (await fileExists(briefPath)) prompt = (await readFile(briefPath, "utf8")).replace(/^Eval grant:.*(?:\r?\n|$)/gmu, "").trim();
	const outputs = await embedOutputs(outputDirectory);
	return {
		id: relative(root, runDirectory).split(sep).join("-") || "root",
		prompt: prompt || "(No prompt found)",
		eval_id: evalId,
		outputs,
		grading,
	};
}

/** Discover native authoring runs without following workspace or output symlinks. */
export async function findReviewRuns(workspace: string): Promise<ReviewRun[]> {
	const root = resolve(workspace);
	await requireDirectory(root);
	const runs: ReviewRun[] = [];
	async function visit(directory: string): Promise<void> {
		const entries = (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name));
		const outputs = entries.find((entry) => entry.name === "outputs");
		if (outputs) {
			if (!outputs.isDirectory() || outputs.isSymbolicLink()) throw new Error(`outputs must be a real directory: ${join(directory, "outputs")}`);
			runs.push(await buildRun(root, directory));
			return;
		}
		for (const entry of entries) {
			if (entry.isDirectory() && !entry.isSymbolicLink() && !Object.hasOwn(SKIP_DIRECTORIES, entry.name)) await visit(join(directory, entry.name));
		}
	}
	if (await fileExists(join(root, ".session.json"))) {
		const outputDirectory = join(root, "outputs");
		await requireDirectory(outputDirectory);
		for (const entry of (await readdir(outputDirectory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
			const path = join(outputDirectory, entry.name);
			if (!entry.isDirectory() || entry.isSymbolicLink()) throw new Error(`Run outputs must be a real directory: ${path}`);
			runs.push(await buildRun(root, path, path, join(root, "control", entry.name)));
		}
	} else await visit(root);
	const ids = new Set<string>();
	for (const run of runs) {
		if (ids.has(run.id)) throw new Error(`Run paths produce a duplicate feedback ID: ${run.id}. Rename the conflicting run directories.`);
		ids.add(run.id);
	}
	return runs.sort((a, b) => {
		if (a.eval_id === null && b.eval_id !== null) return 1;
		if (b.eval_id === null && a.eval_id !== null) return -1;
		return String(a.eval_id ?? "").localeCompare(String(b.eval_id ?? ""), undefined, { numeric: true }) || a.id.localeCompare(b.id);
	});
}

async function loadFeedback(workspace: string): Promise<Record<string, string>> {
	const path = join(workspace, "feedback.json");
	const result: Record<string, string> = Object.create(null);
	if (!await fileExists(path)) return result;
	const value = await readJson(path);
	if (!validFeedback(value)) throw new Error(`Expected reviews with string run_id and feedback in ${path}: ${ajv.errorsText(validFeedback.errors)}`);
	for (const review of value.reviews) result[review.run_id] = review.feedback;
	return result;
}

/** Escape HTML script raw-text delimiters, including malicious </script> in prose. */
export function safeInlineJson(value: unknown): string {
	return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`);
}

async function writePage(asset: string, data: unknown, output: string): Promise<string> {
	const path = resolve(output);
	const template = await readFile(new URL(`./assets/${asset}`, import.meta.url), "utf8");
	const marker = "/*__EMBEDDED_DATA__*/";
	if (template.split(marker).length !== 2) throw new Error(`Review template must have exactly one embedded-data marker: ${asset}`);
	const html = template.replace(marker, () => `const EMBEDDED_DATA = JSON.parse(${safeInlineJson(JSON.stringify(data))});`);
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, html, "utf8");
	return path;
}

/** Create one offline HTML review with current/previous deliverables and feedback. */
export async function generateReview(options: ReviewOptions): Promise<{ workspace: string; review: string; runs: number; outputs: number }> {
	const workspace = resolve(options.workspace);
	const runs = await findReviewRuns(workspace);
	if (runs.length === 0) throw new Error(`No authoring runs found in ${workspace}. Save deliverables and reply.md in each run's output directory.`);
	const benchmark = await readObject(resolve(options.benchmark));
	const previousFeedback = options.previousWorkspace ? await loadFeedback(resolve(options.previousWorkspace)) : {};
	const previousOutputs: Record<string, ReviewOutput[]> = Object.create(null);
	if (options.previousWorkspace) {
		for (const run of await findReviewRuns(options.previousWorkspace)) previousOutputs[run.id] = run.outputs;
	}
	const review = await writePage("viewer.html", {
		skill_name: options.skillName,
		runs,
		benchmark,
		feedback: await loadFeedback(workspace),
		previous_feedback: previousFeedback,
		previous_outputs: previousOutputs,
	}, options.static ?? join(workspace, "review.html"));
	return { workspace, review, runs: runs.length, outputs: runs.reduce((total, run) => total + run.outputs.length, 0) };
}

/** Edit query/boolean trigger cases offline and download the revised eval_set.json. */
export async function generateDescriptionReview(options: DescriptionReviewOptions): Promise<{ queries: string; review: string; count: number }> {
	const queries = resolve(options.queries);
	const data = await readJson(queries);
	if (!validQueries(data)) throw new Error(`Expected an array of {query: string, should_trigger: boolean} in ${queries}: ${ajv.errorsText(validQueries.errors)}`);
	const review = await writePage("eval_review.html", {
		skill_name: options.skillName,
		description: options.description,
		queries: data.map((item) => ({ query: item.query, should_trigger: item.should_trigger })),
	}, options.static);
	return { queries, review, count: data.length };
}
