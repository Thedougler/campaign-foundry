export const LIMITS = {
	inputChars: 1_048_576,
	pathChars: 4096,
	candidates: 64,
	pages: 8,
	findings: 20,
	findingsBytes: 12_000,
	outputBytes: 2_097_152,
	timeoutMs: 30_000,
	pending: 4,
} as const;

export interface Finding {
	path: string;
	line: number;
	layer: string;
	rule: string;
	severity: "error" | "warning";
	message: string;
	hint: string;
	[key: string]: unknown;
}

export type Execution =
	| { stdout: string; exitCode: number | null }
	| { failure: "timeout" | "output-capped" | "error" | "queue-full"; detail?: string };

export interface Paths {
	values: string[];
	omitted: number;
	inputCapped: boolean;
}

const mutations: Record<string, true | undefined> = { write: true, edit: true, apply_patch: true };

export function shouldCheck(toolName: string, isError: boolean, agent?: { kind: string; name?: string }): boolean {
	return !isError && mutations[toolName] === true &&
		!(agent?.kind === "sub" && ["test-subject", "prose-grader"].includes((agent.name ?? "").toLowerCase()));
}

function headerPath(body: string): string {
	const path = body.trim().replace(/#[\da-f]{4}$/iu, "");
	return /^(["']).*\1$/u.test(path) ? path.slice(1, -1) : path;
}

/** Only inspect target fields and patch headers, never prose or replacement body lines. */
export function inputPaths(toolName: string, input: Record<string, unknown>): Paths {
	const values: string[] = [];
	const seen = new Set<string>();
	let omitted = 0;
	let inputCapped = false;
	const add = (value: unknown) => {
		if (typeof value !== "string" || !value || seen.has(value)) return;
		if (value.length > LIMITS.pathChars) { inputCapped = true; return; }
		// Bound the deduplication set as well as the retained candidates.
		if (values.length >= LIMITS.candidates) { omitted++; return; }
		seen.add(value);
		values.push(value);
	};
	for (const key of ["path", "paths", "file_path", "filePath", "target", "destination"]) {
		const value = input[key];
		if (Array.isArray(value)) {
			for (const path of value.slice(0, LIMITS.candidates)) add(path);
			omitted += Math.max(0, value.length - LIMITS.candidates);
		} else add(value);
	}
	for (const key of toolName === "edit" ? ["input", "_input", "patch"] : ["patch", "input", "_input"]) {
		const patch = input[key];
		if (typeof patch !== "string") continue;
		if (patch.length > LIMITS.inputChars) { inputCapped = true; continue; }
		for (const line of patch.split(/\r?\n/u)) {
			if (toolName === "edit") {
				const header = /^\[([^\r\n]+)\]$/u.exec(line);
				if (header?.[1]) add(headerPath(header[1]));
				const move = /^MV (.+)$/u.exec(line);
				if (move?.[1]) add(headerPath(move[1]));
			} else if (toolName === "apply_patch") {
				const header = /^\*\*\* (?:Update|Add|Delete) File: (.+)$/u.exec(line);
				if (header?.[1]) add(header[1].trim());
				const move = /^\*\*\* Move to: (.+)$/u.exec(line);
				if (move?.[1]) add(move[1].trim());
			}
		}
	}
	return { values, omitted, inputCapped };
}

function isFinding(value: unknown): value is Finding {
	if (!value || typeof value !== "object" || Array.isArray(value)) return false;
	const f = value as Record<string, unknown>;
	return ["path", "layer", "rule", "message", "hint"].every((key) => typeof f[key] === "string") &&
		typeof f.line === "number" && Number.isInteger(f.line) && f.line >= 1 &&
		(f.severity === "error" || f.severity === "warning");
}

const repairGuidance = "wiki-check is read-only page-check feedback, not repair authority. Load skill://lint and repair the reported findings; clean means zero findings, including warnings, regardless of ok or exit code. The hook applies no fixes. The final combined slice gate still applies.";
const manualGuidance = "wiki-check did not provide a complete page check. Do not treat any unchecked page or capped list as clean. Run bun run cf -- check for all affected pages yourself, then use skill://lint as the repair authority. The hook applies no fixes; the final combined slice gate still applies.";

/** Raw findings stay in tool data. Only fixed, hook-authored guidance enters trusted context. */
export function feedback(execution: Execution, pages: string[], incomplete: { omitted: number; inputCapped: boolean } = { omitted: 0, inputCapped: false }): { text: string; additionalContext?: string } {
	const manualCheck = `bun run cf -- check ${pages.map((path) => `'${path.replaceAll("'", "'\\''")}'`).join(" ")}`;
	const base = { hook: "wiki-check", pages, readOnly: true, command: "cf check --json (all layers)", ...incomplete };
	const failed = (failure: string, detail?: string) => ({
		text: JSON.stringify({ ...base, status: "not-checked", failure, ...(detail ? { detail: detail.slice(0, 512) } : {}), manualCheck }),
		additionalContext: manualGuidance,
	});
	if ("failure" in execution) return failed(execution.failure, execution.detail);
	if (execution.exitCode !== 0 && execution.exitCode !== 1) return failed("error", `cf check exited ${execution.exitCode ?? "without a status"}`);
	let parsed: unknown;
	try { parsed = JSON.parse(execution.stdout); } catch { return failed("malformed-json"); }
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return failed("malformed-json");
	const findings = (parsed as Record<string, unknown>).findings;
	if (!Array.isArray(findings) || !findings.every(isFinding)) return failed("malformed-json");
	const shown: Finding[] = [];
	let bytes = 2;
	for (const finding of findings) {
		const size = new TextEncoder().encode(JSON.stringify(finding)).length + 1;
		if (shown.length >= LIMITS.findings || bytes + size > LIMITS.findingsBytes) break;
		shown.push(finding);
		bytes += size;
	}
	const omittedFindings = findings.length - shown.length;
	const capped = omittedFindings > 0 || incomplete.omitted > 0 || incomplete.inputCapped;
	return {
		text: JSON.stringify({ ...base, status: capped ? "capped" : findings.length === 0 ? "clean" : "findings", totalFindings: findings.length, findings: shown, omittedFindings, ...(capped ? { manualCheck, note: "Incomplete feedback: omitted findings or input targets must be checked manually; this is not a complete clean page check." } : {}) }),
		...(capped ? { additionalContext: manualGuidance } : findings.length > 0 ? { additionalContext: repairGuidance } : {}),
	};
}
