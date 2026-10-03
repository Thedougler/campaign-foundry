import type { CheckResult } from "./run.ts";
import type { Finding } from "./types.ts";

const indent = (text: string, prefix: string): string =>
	text
		.split("\n")
		.map((line, i) => (i === 0 ? line : `${prefix}${line}`))
		.join("\n");

export function formatFinding(f: Finding): string {
	return `${f.path}:${f.line}  ${f.layer}/${f.rule}  ${f.severity}  ${f.message}\n    fix: ${indent(f.hint, "         ")}`;
}

export function gateExitCode(result: CheckResult): 0 | 1 {
	return result.findings.some((finding) => finding.severity === "error") ? 1 : 0;
}

export function formatHuman(result: CheckResult, opts: { fix: boolean; dryRun: boolean }): string {
	const out: string[] = [];
	for (const fix of result.fixes) {
		out.push(`${opts.dryRun ? "would fix" : "fixed"}  ${fix.path}  ${fix.layer}/${fix.rule}  ${fix.description}`);
	}
	if (result.fixes.length > 0) out.push("");
	for (const finding of result.findings) out.push(formatFinding(finding));
	if (result.findings.length > 0) out.push("");
	const files = new Set(result.findings.map((f) => f.path)).size;
	const n = result.findings.length;
	const errors = result.findings.filter((finding) => finding.severity === "error").length;
	const warnings = n - errors;
	const parts = [
		n === 0
			? "ok: 0 findings"
			: `${n} finding${n === 1 ? "" : "s"} (${errors} error${errors === 1 ? "" : "s"}, ${warnings} warning${warnings === 1 ? "" : "s"}) in ${files} file${files === 1 ? "" : "s"}`,
		`${result.pages} pages`,
		`${result.layers.length} layer${result.layers.length === 1 ? "" : "s"} (${result.layers.join(", ")})`,
	];
	if (opts.fix) parts.push(`${result.fixes.length} ${opts.dryRun ? "fixable" : "fixed"}`);
	parts.push(`${result.durationMs}ms`);
	out.push(parts.join(", "));
	return out.join("\n");
}

export function formatJson(result: CheckResult): string {
	return JSON.stringify(
		{
			ok: gateExitCode(result) === 0,
			findings: result.findings,
			fixes: result.fixes.map(({ layer, rule, path, description }) => ({ layer, rule, path, description })),
			counts: { findings: result.findings.length, fixes: result.fixes.length, pages: result.pages },
			layers: result.layers,
			durationMs: result.durationMs,
		},
		null,
		2,
	);
}
