import { parse } from "csv-parse/sync";
import { JSDOM } from "jsdom";

export type Benchmark = "creative" | "longform" | "all";
export type Options = {
	models?: string[];
	benchmark?: Benchmark;
	details?: boolean;
	variants?: boolean;
	sort?: string;
	order?: "asc" | "desc";
	limit?: number;
	offset?: number;
	excludeModels?: string[];
	differentFromFamily?: string;
	signal?: AbortSignal;
};
export type Metrics = Record<string, number | null>;
export type PublishedModel = {
	model: string;
	publishedNames: Partial<Record<"creative" | "longform", string>>;
	publishedReasoning: string | null;
	creative: number | null;
	longform: number | null;
	metrics: Partial<Record<"creative" | "longform", Metrics>>;
	samples: Partial<Record<"creative" | "longform", string>>;
};
export type Cost = { input: number; output: number; cacheRead: number; cacheWrite: number };
export type AvailableModel = {
	selector: string;
	provider: string;
	id: string;
	name: string;
	thinking: readonly string[] | null;
	cost: Cost;
	pricingStatus: string;
	family?: string;
};
export type QuotaLimit = {
	id: string;
	label?: string;
	scope: { provider: string; accountId?: string; model?: string; tier?: string; shared?: boolean; windowId?: string };
	window?: { resetsAt?: number };
	amount: { remaining?: number; remainingFraction?: number; unit: string };
	status?: string;
};
export type Report = { provider: string; fetchedAt: number; limits: QuotaLimit[] };
export type Quota = QuotaLimit & { ref: string; account: string; fetchedAt: number; resetPassed: boolean };
export type Runtime = { models: AvailableModel[]; quotas: Quota[]; modelQuotas: Record<string, string[]> };
export type EvidenceRow = PublishedModel & {
	selector: string | null;
	provider: string | null;
	supportedThinking: readonly string[] | null;
	cost: Cost | null;
	pricingStatus: string | null;
	quotaRefs: string[];
	remainingPercent: number | null;
	family: string | null;
	speed: null;
};

export function normalise(value: string): string {
	return value
		.slice(value.lastIndexOf("/") + 1)
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "");
}

export function matches<T>(
	rows: T[],
	queries: string[] | undefined,
	names: (row: T) => string[],
	variants = false,
): T[] {
	if (!queries?.length) return rows;
	const selected = new Set<T>();
	for (const query of queries) {
		const key = normalise(query);
		const exact = rows.filter((row) => names(row).some((name) => normalise(name) === key));
		const found =
			!variants && exact.length
				? exact
				: rows.filter((row) => names(row).some((name) => normalise(name).includes(key)));
		for (const row of found) selected.add(row);
	}
	return [...selected];
}

async function get(url: string, signal?: AbortSignal): Promise<Response> {
	const response = await fetch(url, {
		signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(15_000)]) : AbortSignal.timeout(15_000),
	});
	if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
	return response;
}

function template(text: string, name: string): string {
	const match = text.match(new RegExp(`\\b${name}\\s*=\\s*\x60([\\s\\S]*?)\x60`));
	if (!match) throw new Error(`Missing published ${name} data`);
	return match[1]!;
}

function slop(text: string, model: string) {
	const section = template(text, "slopData")
		.split(/^##### /m)
		.find((entry) => normalise(entry.split("\n", 1)[0]!.trim()) === normalise(model));
	if (!section) return null;
	const fragment = JSDOM.fragment(section.slice(section.indexOf("\n") + 1));
	return {
		sections: [...fragment.querySelectorAll("h4")].map((heading) => ({
			heading: heading.textContent?.trim(),
			items: [...(heading.nextElementSibling?.children ?? [])].map((item) => item.textContent?.trim()),
		})),
		charts: [...fragment.querySelectorAll("a[href]")].map(
			(link) => new URL(link.getAttribute("href")!, "https://eqbench.com/").href,
		),
	};
}

export async function published(options: Options) {
	const selected =
		options.benchmark === "creative"
			? (["creative"] as const)
			: options.benchmark === "longform"
				? (["longform"] as const)
				: (["creative", "longform"] as const);
	const models = new Map<string, PublishedModel>();
	const sources: { benchmark: string; url: string; lastModified: string | null }[] = [];
	const texts: Partial<Record<"creative" | "longform", string>> = {};
	await Promise.all(
		selected.map(async (benchmark) => {
			const url = `https://eqbench.com/${benchmark === "creative" ? "creative_writing.js" : "creative_writing_longform.js"}`;
			const response = await get(url, options.signal);
			const text = await response.text();
			texts[benchmark] = text;
			sources.push({ benchmark, url, lastModified: response.headers.get("last-modified") });
			const records = parse(
				template(text, benchmark === "creative" ? "leaderboardDataCreativeWritingV3" : "leaderboardDataLongformV3"),
				{ columns: true, skip_empty_lines: true, trim: true },
			) as Record<string, string>[];
			for (const record of records) {
				if (!record.model_name) throw new Error(`Missing model_name in ${url}`);
				const name = record.model_name.replace(/^[!*]+/, "");
				const key = normalise(name);
				const model = models.get(key) ?? {
					model: name,
					publishedNames: {},
					publishedReasoning: name.match(/(?:minimal|low|medium|high|xhigh)[-_ ]reasoning/i)?.[0] ?? null,
					creative: null,
					longform: null,
					metrics: {},
					samples: {},
				};
				const metrics: Metrics = {};
				for (const [field, value] of Object.entries(record)) {
					if (field === "model_name") continue;
					const number = value.trim() ? Number(value) : null;
					if (number !== null && !Number.isFinite(number)) throw new Error(`Invalid ${field} for ${name}: ${value}`);
					metrics[field] = number;
				}
				model.publishedNames[benchmark] = record.model_name;
				model.metrics[benchmark] = metrics;
				model[benchmark] = metrics[benchmark === "creative" ? "elo_score" : "overall_score_100"] ?? null;
				model.samples[benchmark] =
					benchmark === "creative"
						? `https://eqbench.com/results/creative-writing-v3/${name.replaceAll("/", "__").replace(/[^a-zA-Z0-9_.-]/g, "_")}.html`
						: `https://eqbench.com/results/creative-writing-longform/${name.replaceAll("/", "__")}_longform_report.html`;
				models.set(key, model);
			}
		}),
	);
	return {
		models: matches([...models.values()], options.models, (row) => [row.model], options.variants),
		sources: sources.sort((a, b) => a.benchmark.localeCompare(b.benchmark)),
		texts,
	};
}

export function quotaEvidence(reports: Report[]): Quota[] {
	const accounts = new Map<string, string>();
	return reports.flatMap((report, index) =>
		report.limits.map((limit, limitIndex) => {
			const identity = limit.scope.accountId
				? `${report.provider}:${limit.scope.accountId}`
				: `${report.provider}:report-${index}`;
			const account = accounts.get(identity) ?? `account-${accounts.size + 1}`;
			accounts.set(identity, account);
			return {
				...limit,
				scope: { ...limit.scope, ...(limit.scope.accountId ? { accountId: account } : {}) },
				ref: `${index}:${limitIndex}`,
				account,
				fetchedAt: report.fetchedAt,
				resetPassed: limit.window?.resetsAt !== undefined && limit.window.resetsAt <= Date.now(),
			};
		}),
	);
}

function remainingPercent(quotas: Quota[]): number | null {
	const accounts = Map.groupBy(quotas, (quota) => quota.account);
	const remaining: number[] = [];
	for (const windows of accounts.values()) {
		if (
			windows.some(
				(quota) => quota.resetPassed || quota.status === "unknown" || quota.amount.remainingFraction === undefined,
			)
		)
			continue;
		remaining.push(
			Math.min(...windows.map((quota) => (quota.status === "exhausted" ? 0 : quota.amount.remainingFraction! * 100))),
		);
	}
	return remaining.length ? Math.max(...remaining) : null;
}

export function join(models: PublishedModel[], runtime?: Runtime): EvidenceRow[] {
	const rows: EvidenceRow[] = [];
	for (const model of models) {
		const base = model.model.replace(/(?:-(?:minimal|low|medium|high|xhigh)-reasoning)+$/i, "");
		const available =
			runtime?.models.filter(
				(candidate) => normalise(candidate.id) === normalise(base) || normalise(candidate.name) === normalise(base),
			) ?? [];
		for (const candidate of available.length ? available : [null]) {
			const refs = candidate ? (runtime?.modelQuotas[candidate.selector] ?? []) : [];
			const quotas = runtime?.quotas.filter((quota) => refs.includes(quota.ref)) ?? [];
			rows.push({
				...model,
				selector: candidate?.selector ?? null,
				provider: candidate?.provider ?? null,
				family: candidate?.family ?? null,
				speed: null,
				supportedThinking: candidate?.thinking ?? null,
				cost: candidate?.cost ?? null,
				pricingStatus: candidate?.pricingStatus ?? null,
				quotaRefs: refs,
				remainingPercent: remainingPercent(quotas),
			});
		}
	}
	if (runtime) {
		for (const model of runtime.models) {
			if (rows.some((row) => row.selector === model.selector)) continue;
			const refs = runtime.modelQuotas[model.selector] ?? [];
			const quotas = runtime.quotas.filter((quota) => refs.includes(quota.ref));
			rows.push({
				model: model.id,
				publishedNames: {},
				publishedReasoning: null,
				creative: null,
				longform: null,
				metrics: {},
				samples: {},
				selector: model.selector,
				provider: model.provider,
				family: model.family ?? null,
				speed: null,
				supportedThinking: model.thinking,
				cost: model.cost,
				pricingStatus: model.pricingStatus,
				quotaRefs: refs,
				remainingPercent: remainingPercent(quotas),
			});
		}
	}
	return rows;
}

export function sortRows(rows: EvidenceRow[], sort = "creative", order?: "asc" | "desc") {
	if (
		!/^(creative|longform|model|remainingPercent|speed|cost\.(input|output|cacheRead|cacheWrite)|(creative|longform)\.[a-z0-9_]+)$/.test(
			sort,
		)
	)
		throw new Error(`Unknown sort field: ${sort}`);
	const value = (row: EvidenceRow): number | string | null => {
		if (sort === "model") return row.selector ?? row.model;
		if (sort === "speed") return row.speed;
		if (sort === "creative" || sort === "longform" || sort === "remainingPercent") return row[sort];
		if (sort.startsWith("cost."))
			return row.pricingStatus === "unknown" || row.pricingStatus === "variable"
				? null
				: (row.cost?.[sort.slice(5) as keyof Cost] ?? null);
		const [benchmark, field] = sort.split(".");
		if (benchmark === "creative" || benchmark === "longform") return row.metrics[benchmark]?.[field!] ?? null;
		throw new Error(`Unknown sort field: ${sort}`);
	};
	const direction = (order ?? (sort.startsWith("cost.") || sort === "model" ? "asc" : "desc")) === "asc" ? 1 : -1;
	return rows.sort((a, b) => {
		const left = value(a),
			right = value(b);
		if (left === null || right === null)
			return left === right ? a.model.localeCompare(b.model) : left === null ? 1 : -1;
		return (
			(typeof left === "number" && typeof right === "number"
				? left - right
				: String(left).localeCompare(String(right))) * direction ||
			(a.selector ?? a.model).localeCompare(b.selector ?? b.model)
		);
	});
}

export async function evidence(options: Options, runtime?: Runtime, usageOnly = false) {
	if (options.models?.some((query) => !normalise(query)))
		throw new Error("Model queries must contain letters or numbers");
	const data = usageOnly ? { models: [] as PublishedModel[], sources: [], texts: {} } : await published(options);
	const filteredRuntime = runtime
		? {
				...runtime,
				models: matches(runtime.models, options.models, (row) => [row.selector, row.name], options.variants),
			}
		: undefined;
	const sort = options.sort ?? (usageOnly ? "model" : options.benchmark === "longform" ? "longform" : "creative");
	const candidates = join(data.models, filteredRuntime);
	const withUsage = runtime
		? candidates.filter((row) => row.selector !== null && row.remainingPercent !== null && row.remainingPercent > 0)
		: candidates;
	const deduplicated = new Map<string, EvidenceRow>();
	for (const row of withUsage) {
		const key = normalise(row.model);
		const prior = deduplicated.get(key);
		if (
			!prior ||
			(row.remainingPercent ?? -1) > (prior.remainingPercent ?? -1) ||
			(row.remainingPercent === prior.remainingPercent &&
				(row.selector ?? row.model).localeCompare(prior.selector ?? prior.model) < 0)
		)
			deduplicated.set(key, row);
	}
	const eligible = [...deduplicated.values()].filter(
		(row) =>
			(!options.differentFromFamily ||
				(row.family !== null && row.family !== "unknown" && row.family !== options.differentFromFamily)) &&
			!(options.excludeModels ?? []).some((name) => normalise(row.model).includes(normalise(name))),
	);
	const sorted = sortRows(eligible, sort, options.order);
	const offset = options.offset ?? 0,
		limit = options.limit ?? 20;
	const rows = limit === 0 ? sorted.slice(offset) : sorted.slice(offset, offset + limit);
	const profileSources: string[] = [];
	let details: Record<string, unknown> | undefined;
	if (options.details && !usageOnly) {
		const chartFiles =
			options.benchmark === "longform" ? [] : ["creative_writing_chartdata.js", "creative_writing_chartdata_style.js"];
		const charts = await Promise.all(
			chartFiles.map(async (file) => {
				const url = `https://eqbench.com/${file}`;
				profileSources.push(url);
				const text = await (await get(url, options.signal)).text();
				return JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)) as Record<string, unknown>;
			}),
		);
		details = Object.fromEntries(
			await Promise.all(
				[...new Set(rows.map((row) => row.model))].map(async (model) => {
					const url = `https://sophon.at/api/v1/models/${encodeURIComponent(
						model
							.slice(model.lastIndexOf("/") + 1)
							.toLowerCase()
							.replaceAll(".", "-"),
					)}`;
					profileSources.push(url);
					const response = await fetch(url, {
						signal: options.signal
							? AbortSignal.any([options.signal, AbortSignal.timeout(15_000)])
							: AbortSignal.timeout(15_000),
					});
					if (!response.ok && response.status !== 404) throw new Error(`HTTP ${response.status}: ${url}`);
					return [
						model,
						{
							sophon: response.status === 404 ? null : await response.json(),
							rubric:
								Object.entries(charts[0] ?? {}).find(([name]) => normalise(name) === normalise(model))?.[1] ?? null,
							style:
								Object.entries(charts[1] ?? {}).find(([name]) => normalise(name) === normalise(model))?.[1] ?? null,
							repetition: Object.fromEntries(
								Object.entries(data.texts).map(([benchmark, text]) => [benchmark, slop(text, model)]),
							),
						},
					];
				}),
			),
		);
	}
	const refs = new Set(rows.flatMap((row) => row.quotaRefs));
	const providers = new Set(rows.map((row) => row.provider));
	return {
		sources: {
			benchmarks: data.sources,
			...(profileSources.length ? { profiles: profileSources.sort() } : {}),
			...(runtime
				? {
						runtime: "omp model registry and provider usage reports",
						costs: "omp configured catalogue; USD per million tokens",
					}
				: {}),
		},
		sort,
		order: options.order ?? (sort.startsWith("cost.") || sort === "model" ? "asc" : "desc"),
		total: sorted.length,
		offset,
		nextOffset: offset + rows.length < sorted.length ? offset + rows.length : null,
		rows,
		excludedForQuota: runtime ? candidates.length - withUsage.length : 0,
		...(details ? { details } : {}),
		...(runtime
			? { quotas: runtime.quotas.filter((quota) => refs.has(quota.ref) || providers.has(quota.scope.provider)) }
			: {}),
		missing: (options.models ?? []).filter(
			(query) => !matches(sorted, [query], (row) => [row.model, row.selector ?? ""], options.variants).length,
		),
		notes: [
			"Creative Elo and longform /100 are separate scales. Source ranks and diagnostics are evidence, not task suitability.",
			"Published run names retain reasoning labels; supported thinking settings have no implied benchmark score.",
			"Speed is unknown: omp's catalogue/quota reports do not supply a comparable generation-speed measurement. No external routing service is used.",
			...(runtime
				? [
						"Runtime rows exclude unknown/exhausted quota and deduplicate provider aliases, keeping the largest confirmed remaining fraction (selector breaks ties). Percentages from different plans are not absolute token capacity.",
						"remainingPercent is the best reported account's tightest window; expired or unknown windows are not assumed refilled. Catalogue costs are reference rates, not subscription charges.",
					]
				: []),
		],
	};
}
