import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { formatHuman, formatJson, gateExitCode } from "../../src/check/output.ts";
import { runCheck } from "../../src/check/run.ts";
import type { Finding, Layer } from "../../src/check/types.ts";
import { fixtures, type JsonReport, realTemplates } from "./helpers.ts";

const root = join(fixtures, "clean");
const options = { vault: join(root, "wiki"), templates: realTemplates, root, cwd: root };

function fakeLayer(severity: Finding["severity"]): Layer {
	const name = `fake-${severity}`;
	return {
		name,
		description: `Emits one ${severity} for the severity contract test.`,
		run: (ctx) => [{
			layer: name,
			rule: "example",
			severity,
			path: ctx.display("index.md"),
			line: 1,
			message: `Example ${severity}.`,
			hint: "Address the example finding.",
		}],
	};
}

describe("check severity", () => {
	it.each([
		{ severity: "warning", exitCode: 0, ok: true },
		{ severity: "error", exitCode: 1, ok: false },
	] as const)("reports $severity findings with exit $exitCode", async ({ severity, exitCode, ok }) => {
		const result = await runCheck({ ...options, registry: [fakeLayer(severity)] });
		expect(result.findings).toHaveLength(1);
		expect(gateExitCode(result)).toBe(exitCode);

		const human = formatHuman(result, { fix: false, dryRun: false });
		expect(human).toContain(`wiki/index.md:1  fake-${severity}/example  ${severity}  Example ${severity}.`);
		expect(human).toContain("    fix: Address the example finding.");
		expect(human).toContain(severity === "warning" ? "0 errors, 1 warning" : "1 error, 0 warnings");

		const report = JSON.parse(formatJson(result)) as JsonReport;
		expect(report.ok).toBe(ok);
		expect(report.findings).toEqual(result.findings);
		expect(report.findings[0]?.severity).toBe(severity);
		expect(report.counts.findings).toBe(1);
	});

	it("fails mixed findings and distinguishes errors from warnings in the summary", async () => {
		const result = await runCheck({ ...options, registry: [fakeLayer("warning"), fakeLayer("error")] });
		expect(gateExitCode(result)).toBe(1);
		expect(formatHuman(result, { fix: false, dryRun: false })).toContain("2 findings (1 error, 1 warning) in 1 file");
		const report = JSON.parse(formatJson(result)) as JsonReport;
		expect(report.ok).toBe(false);
		expect(report.findings).toEqual(result.findings);
	});
});
