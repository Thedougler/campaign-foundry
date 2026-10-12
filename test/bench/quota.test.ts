import { describe, expect, it } from "vitest";
import { UsageError } from "../../src/check/errors.ts";
import { parseOmpUsage, quotaOf, type OmpUsage } from "../../src/bench/quota.ts";
import { cf, cfWithEnv } from "../check/helpers.ts";

const GROK_BUILD_RESET = 1792133022073;
const OPENCODE_MONTHLY_RESET = 1792217873000;

/** The live `omp usage` shape, with the meters the mapping must tell apart. */
function usage(overrides: Partial<OmpUsage> = {}): OmpUsage {
	return {
		reports: [
			{
				provider: "xai-oauth",
				limits: [
					{ id: "xai-oauth:credits:1w", status: "ok", resetsAt: GROK_BUILD_RESET, remainingFraction: 0 },
					{ id: "xai-oauth:product:grokbuild:1w", status: "ok", resetsAt: GROK_BUILD_RESET, remainingFraction: 0.16 },
					{ id: "xai-oauth:product:grokchat:1w", status: "ok", resetsAt: GROK_BUILD_RESET, remainingFraction: 0.99 },
				],
			},
			{
				provider: "opencode-go",
				limits: [
					{ id: "monthly", status: "exhausted", resetsAt: OPENCODE_MONTHLY_RESET, remainingFraction: undefined },
				],
			},
		],
		capacity: {
			// Pooled xai capacity is dry while the Grok Build meter is not: only the meter counts.
			"xai-oauth": [{ remainingAccounts: 0 }],
			"opencode-go": [{ remainingAccounts: 1 }, { remainingAccounts: 0 }],
			zai: [{ remainingAccounts: 0.28 }],
		},
		...overrides,
	};
}

describe("quota mapping", () => {
	it("reads xai-oauth from the Grok Build meter, not credits, GrokChat or pooled capacity", () => {
		expect(quotaOf("xai-oauth/grok-4.7", usage())).toEqual({
			provider: "xai-oauth",
			status: "available",
			remaining: 0.16,
			// The reset time is known while the meter is still available, not only once it runs dry.
			resetsAt: new Date(GROK_BUILD_RESET).toISOString(),
			meter: "xai-oauth:product:grokbuild:1w",
		});
	});

	it("marks xai-oauth exhausted when the Grok Build meter runs dry, with its reset", () => {
		const report = usage();
		report.reports[0]!.limits[1] = {
			id: "xai-oauth:product:grokbuild:1w",
			status: "ok",
			resetsAt: GROK_BUILD_RESET,
			remainingFraction: 0,
		};
		expect(quotaOf("xai-oauth/grok-4.7", report)).toEqual({
			provider: "xai-oauth",
			status: "exhausted",
			remaining: 0,
			resetsAt: new Date(GROK_BUILD_RESET).toISOString(),
			meter: "xai-oauth:product:grokbuild:1w",
		});
	});

	it("takes the Grok Build limit's own exhausted status even without a remaining fraction", () => {
		const report = usage();
		report.reports[0]!.limits[1] = {
			id: "xai-oauth:product:grokbuild:1w",
			status: "exhausted",
			resetsAt: GROK_BUILD_RESET,
			remainingFraction: undefined,
		};
		const quota = quotaOf("xai-oauth/grok-4.5", report);
		expect(quota.status).toBe("exhausted");
		expect(quota.remaining).toBeNull();
		expect(quota.resetsAt).toBe(new Date(GROK_BUILD_RESET).toISOString());
	});

	it("calls xai-oauth unknown when the Grok Build limit is not reported", () => {
		const report = usage({ reports: [] });
		expect(quotaOf("xai-oauth/grok-4.7", report)).toEqual({
			provider: "xai-oauth",
			status: "unknown",
			remaining: null,
			resetsAt: null,
			meter: "xai-oauth:product:grokbuild:1w",
		});
	});

	it("takes the smallest remaining fraction among a provider's report limits, with that limit's reset", () => {
		const report = usage({
			reports: [
				{
					provider: "zai",
					limits: [
						{ id: "5h", status: "ok", resetsAt: GROK_BUILD_RESET, remainingFraction: 0.42 },
						{ id: "1w", status: "ok", resetsAt: OPENCODE_MONTHLY_RESET, remainingFraction: 0.1 },
					],
				},
			],
			capacity: { zai: [{ remainingAccounts: 2 }] },
		});
		expect(quotaOf("zai/glm-5.3", report)).toEqual({
			provider: "zai",
			status: "available",
			remaining: 0.1,
			resetsAt: new Date(OPENCODE_MONTHLY_RESET).toISOString(),
			meter: "capacity",
		});
	});

	it("falls back to the earliest reset any limit names when the tightest limit reports none", () => {
		const report = usage({
			reports: [
				{
					provider: "zai",
					limits: [
						{ id: "5h", status: "ok", resetsAt: GROK_BUILD_RESET, remainingFraction: 0.2 },
						{ id: "1w", status: "ok", resetsAt: OPENCODE_MONTHLY_RESET, remainingFraction: 0.5 },
					],
				},
			],
			capacity: { zai: [{ remainingAccounts: 2 }] },
		});
		expect(quotaOf("zai/glm-5.3", report).resetsAt).toBe(new Date(GROK_BUILD_RESET).toISOString());
	});

	it("treats a capacity window at 0 as exhausted, with the provider's reported reset", () => {
		expect(quotaOf("opencode-go/glm-5.3", usage())).toEqual({
			provider: "opencode-go",
			status: "exhausted",
			remaining: null,
			resetsAt: new Date(OPENCODE_MONTHLY_RESET).toISOString(),
			meter: "capacity",
		});
	});

	it("calls a provider available while every capacity window is above 0", () => {
		expect(quotaOf("zai/glm-5.3", usage())).toEqual({
			provider: "zai",
			status: "available",
			remaining: null,
			resetsAt: null,
			meter: "capacity",
		});
	});

	it("calls a provider without capacity data unknown", () => {
		expect(quotaOf("deepseek/deepseek-chat", usage())).toEqual({
			provider: "deepseek",
			status: "unknown",
			remaining: null,
			resetsAt: null,
			meter: "capacity",
		});
	});

	it("leaves resetsAt null for an exhausted provider whose limits are not reported", () => {
		const report = usage();
		report.capacity["github-copilot"] = [{ remainingAccounts: 0 }];
		expect(quotaOf("github-copilot/gpt-6.1-sol", report)).toEqual({
			provider: "github-copilot",
			status: "exhausted",
			remaining: null,
			resetsAt: null,
			meter: "capacity",
		});
	});

	it("reports every provider unknown when omp usage failed", () => {
		expect(quotaOf("xai-oauth/grok-4.7", null).status).toBe("unknown");
		expect(quotaOf("zai/glm-5.3", null).status).toBe("unknown");
	});
});

describe("parseOmpUsage", () => {
	it("narrows reports and capacity windows from the omp usage shape", () => {
		const parsed = parseOmpUsage(
			JSON.stringify({
				reports: [
					{
						provider: "xai-oauth",
						limits: [
							{
								id: "xai-oauth:product:grokbuild:1w",
								status: "ok",
								window: { resetsAt: GROK_BUILD_RESET },
								amount: { remainingFraction: 0.16 },
							},
						],
					},
				],
				capacity: { zai: [{ window: "5h", remainingAccounts: 0.99 }] },
			}),
			"omp usage --json",
		);
		expect(parsed.reports[0]!.limits[0]).toEqual({
			id: "xai-oauth:product:grokbuild:1w",
			status: "ok",
			resetsAt: GROK_BUILD_RESET,
			remainingFraction: 0.16,
		});
		expect(parsed.capacity.zai).toEqual([{ remainingAccounts: 0.99 }]);
	});

	it("rejects output that is not the omp usage shape", () => {
		expect(() => parseOmpUsage("not json", "omp usage --json")).toThrow(UsageError);
		expect(() => parseOmpUsage('{"reports": {}}', "omp usage --json")).toThrow(UsageError);
		expect(() => parseOmpUsage('{"reports": [], "capacity": []}', "omp usage --json")).toThrow(UsageError);
	});
});

describe("cfcli bench status quota", () => {
	it("reads each seat's quota from the agent pairs and lists the prompt versions", async () => {
		const run = await cf(["bench", "status", "--json"]);
		expect(run.code).toBe(0);
		const status = JSON.parse(run.stdout) as {
			families: {
				family: string;
				model?: string;
				quota?: { status: string; meter: string; remaining: number | null; resetsAt: string | null };
			}[];
			prompts: { prompt: string }[];
		};
		expect(status.families.map((family) => family.family)).toEqual(["anthropic", "openai", "zai", "xai"]);
		for (const family of status.families) {
			expect(family.model).toMatch(/\//);
			expect(["available", "exhausted", "unknown"]).toContain(family.quota!.status);
			expect(family.quota!.meter).toBe(family.family === "xai" ? "xai-oauth:product:grokbuild:1w" : "capacity");
			expect(family.quota!.remaining === null || (family.quota!.remaining >= 0 && family.quota!.remaining <= 1)).toBe(
				true,
			);
			expect(family.quota!.resetsAt === null || !Number.isNaN(Date.parse(family.quota!.resetsAt))).toBe(true);
		}
		expect(status.prompts.map((prompt) => prompt.prompt)).toContain("playful-cloud/v1");
	});

	it("degrades every seat to unknown with the error when omp usage fails, without failing the command", async () => {
		const run = await cfWithEnv(["bench", "status", "--json"], { PATH: "" });
		expect(run.code).toBe(0);
		const status = JSON.parse(run.stdout) as {
			quota_error?: string;
			families: { quota?: { status: string; remaining: number | null; resetsAt: string | null } }[];
		};
		expect(status.quota_error).toBeTruthy();
		for (const family of status.families) {
			expect(family.quota!.status).toBe("unknown");
			expect(family.quota!.remaining).toBeNull();
			expect(family.quota!.resetsAt).toBeNull();
		}
	});
});
