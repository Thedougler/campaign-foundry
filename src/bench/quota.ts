import { spawnSync } from "node:child_process";
import { UsageError } from "../check/errors.ts";

/** One seat's provider quota, as `bench status` reports it. */
export interface PinQuota {
	provider: string;
	status: "available" | "exhausted" | "unknown";
	/** The smallest remaining fraction among the provider's report limits — the Grok Build meter for xAI; null when no limit reports one. */
	remaining: number | null;
	/** The tightest report limit's reset time, known even while the meter is available; null when no limit reports one. */
	resetsAt: string | null;
	/** The meter the status was read from: the Grok Build limit id for `xai-oauth`, `capacity` for every other provider. */
	meter: string;
}

/** The one meter that counts for Grok availability (DM decision): the Grok Build weekly limit — never pooled capacity, SuperGrok credits or GrokChat. */
const GROK_BUILD_METER = "xai-oauth:product:grokbuild:1w";

/** One `reports[]` limit, narrowed to the fields the quota mapping reads. */
export interface UsageLimit {
	id: string | undefined;
	status: string | undefined;
	/** Epoch ms, from `window.resetsAt`. */
	resetsAt: number | undefined;
	remainingFraction: number | undefined;
}

export interface UsageReport {
	provider: string;
	limits: UsageLimit[];
}

export interface CapacityWindow {
	/** Accounts left in the window; undefined when omp reports no figure. */
	remainingAccounts: number | undefined;
}

/** The validated shape of `omp usage --json`: per-account reports plus the pooled capacity windows. */
export interface OmpUsage {
	reports: UsageReport[];
	capacity: Record<string, CapacityWindow[]>;
}

/** What one `bench status` run reads: the usage report, or the error that left every pin unknown. */
export interface QuotaSource {
	usage: OmpUsage | null;
	error: string | null;
}

function asRecord(value: unknown): Record<string, unknown> {
	return value !== null && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

/** Parses `omp usage --json` output, validating its shape where it enters. */
export function parseOmpUsage(text: string, source: string): OmpUsage {
	let parsed: unknown;
	try {
		parsed = JSON.parse(text);
	} catch (error) {
		throw new UsageError(
			`\`${source}\` is not valid JSON: ${(error as Error).message}.`,
			"Run `omp usage` by hand and re-run the status.",
		);
	}
	const root = asRecord(parsed);
	const rawReports = root.reports;
	if (!Array.isArray(rawReports))
		throw new UsageError(
			`\`${source}\` has no reports array.`,
			"Update omp, or read the meters by hand with `omp usage`.",
		);
	const reports = rawReports.map((rawReport: unknown) => {
		const report = asRecord(rawReport);
		if (typeof report.provider !== "string" || !Array.isArray(report.limits))
			throw new UsageError(
				`\`${source}\` holds a report without a provider or limits.`,
				"Update omp, or read the meters by hand with `omp usage`.",
			);
		return {
			provider: report.provider,
			limits: report.limits.map((rawLimit: unknown) => {
				const limit = asRecord(rawLimit);
				const window = asRecord(limit.window);
				const amount = asRecord(limit.amount);
				return {
					id: typeof limit.id === "string" ? limit.id : undefined,
					status: typeof limit.status === "string" ? limit.status : undefined,
					resetsAt:
						typeof window.resetsAt === "number" && Number.isFinite(window.resetsAt) ? window.resetsAt : undefined,
					remainingFraction:
						typeof amount.remainingFraction === "number" && Number.isFinite(amount.remainingFraction)
							? amount.remainingFraction
							: undefined,
				};
			}),
		};
	});
	const rawCapacity = root.capacity;
	if (rawCapacity === null || typeof rawCapacity !== "object" || Array.isArray(rawCapacity))
		throw new UsageError(
			`\`${source}\` has no capacity map.`,
			"Update omp, or read the meters by hand with `omp usage`.",
		);
	const capacity: Record<string, CapacityWindow[]> = {};
	for (const [provider, windows] of Object.entries(rawCapacity as Record<string, unknown>)) {
		if (!Array.isArray(windows))
			throw new UsageError(
				`\`${source}\` lists no capacity windows for \`${provider}\`.`,
				"Update omp, or read the meters by hand with `omp usage`.",
			);
		capacity[provider] = windows.map((rawWindow: unknown) => {
			const remaining = asRecord(rawWindow).remainingAccounts;
			return { remainingAccounts: typeof remaining === "number" && Number.isFinite(remaining) ? remaining : undefined };
		});
	}
	return { reports, capacity };
}

/**
 * Runs `omp usage --json` once: the single quota source for a `bench status` run. A failed or malformed
 * report degrades every pin to `unknown` with the error instead of failing the command.
 */
export function readOmpUsage(): QuotaSource {
	// Bun's spawnSync ignores a mutated process.env.PATH unless env is passed explicitly
	// (Node inherits process.env either way). Tests clear PATH to force the unknown path.
	const run = spawnSync("omp", ["usage", "--json"], { encoding: "utf8", env: process.env });
	if (run.error) return { usage: null, error: `omp usage could not run (${run.error.message})` };
	if (run.status !== 0) {
		const first = run.stderr.trim().split(/\r?\n/)[0] ?? "";
		return { usage: null, error: `omp usage exited ${run.status}${first === "" ? "" : `: ${first}`}` };
	}
	try {
		return { usage: parseOmpUsage(run.stdout, "omp usage --json"), error: null };
	} catch (error) {
		return { usage: null, error: error instanceof Error ? error.message : String(error) };
	}
}

/**
 * Maps one `provider/model-id` seat to its provider's quota. `xai-oauth` reads the Grok Build meter;
 * every other provider reads pooled capacity, where any window at 0 is exhausted until the provider's
 * own report says it resets. `remaining` and `resetsAt` come from the provider's report limits — the
 * tightest one — so a seat still usable now can already name when its window refills. A provider with
 * no quota data — or a failed usage report — is unknown.
 */
export function quotaOf(pin: string, usage: OmpUsage | null): PinQuota {
	const provider = pin.slice(0, pin.indexOf("/")) || pin;
	if (provider === "xai-oauth") {
		const meter = usage?.reports.flatMap((report) => report.limits).find((limit) => limit.id === GROK_BUILD_METER);
		if (meter === undefined)
			return { provider, status: "unknown", remaining: null, resetsAt: null, meter: GROK_BUILD_METER };
		const status = meter.status === "exhausted" || (meter.remainingFraction ?? 1) <= 0 ? "exhausted" : "available";
		return {
			provider,
			status,
			remaining: round4(meter.remainingFraction),
			resetsAt: meter.resetsAt !== undefined ? new Date(meter.resetsAt).toISOString() : null,
			meter: GROK_BUILD_METER,
		};
	}
	const windows = usage?.capacity[provider] ?? [];
	const meters = windows
		.map((window) => window.remainingAccounts)
		.filter((value): value is number => value !== undefined);
	if (meters.length === 0) return { provider, status: "unknown", remaining: null, resetsAt: null, meter: "capacity" };
	const limits = (usage?.reports.filter((report) => report.provider === provider) ?? []).flatMap(
		(report) => report.limits,
	);
	const { remaining, resetsAt } = tightestLimit(limits);
	const status = meters.some((value) => value <= 0) ? "exhausted" : "available";
	return { provider, status, remaining, resetsAt, meter: "capacity" };
}

/** The smallest remaining fraction among `limits`, and that tightest limit's reset time — or the earliest reset any limit names. */
function tightestLimit(limits: UsageLimit[]): { remaining: number | null; resetsAt: string | null } {
	const resets = limits
		.map((limit) => limit.resetsAt)
		.filter((value): value is number => value !== undefined)
		.sort((a, b) => a - b);
	const earliest = resets.length === 0 ? null : new Date(resets[0]!).toISOString();
	const withFractions = limits.filter((limit) => limit.remainingFraction !== undefined);
	if (withFractions.length === 0) return { remaining: null, resetsAt: earliest };
	let tightest = withFractions[0]!;
	for (const limit of withFractions) {
		if (
			limit.remainingFraction! < tightest.remainingFraction! ||
			(limit.remainingFraction! === tightest.remainingFraction! &&
				(limit.resetsAt ?? Number.POSITIVE_INFINITY) < (tightest.resetsAt ?? Number.POSITIVE_INFINITY))
		)
			tightest = limit;
	}
	return {
		remaining: round4(tightest.remainingFraction),
		resetsAt: tightest.resetsAt !== undefined ? new Date(tightest.resetsAt).toISOString() : earliest,
	};
}

/** omp's fractions carry float noise (0.089999…); four decimals keep every meaningful figure. */
function round4(value: number | undefined): number | null {
	return value === undefined ? null : Math.round(value * 10000) / 10000;
}
