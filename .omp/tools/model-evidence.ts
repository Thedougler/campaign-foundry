import type { CustomToolFactory } from "@oh-my-pi/pi-coding-agent";
import { getModelPricingStatus } from "@oh-my-pi/pi-catalog/models";
import { getSupportedEfforts } from "@oh-my-pi/pi-catalog/model-thinking";
import { classifyModel } from "@oh-my-pi/pi-catalog/compat/taxonomy";
import { evidence, matches, quotaEvidence } from "../../scripts/model-evidence.ts";
import type { Runtime } from "../../scripts/model-evidence.ts";

const factory: CustomToolFactory = (pi) => ({
	name: "model_evidence",
	label: "Model Evidence",
	description:
		"Read-only published writing benchmark runs and reasoning labels with the calling omp session's configured model selectors, thinking settings, scoped usage and catalogue rate cards. Runtime rows require positive reported usage and deduplicate provider aliases. Sort: creative, longform, model, remainingPercent, cost.input/output/cacheRead/cacheWrite, creative.<metric>/longform.<metric>. details includes all Sophon model scores and EQ-Bench rubric/style/repetition data. differentFrom excludes a supplied model's vendor lineage; excludeModels applies supplied name substrings. No role presets, recommendations, dispatch or combined suitability score. Speed is unknown. limit=0 returns all.",
	parameters: pi.zod.object({
		models: pi.zod.array(pi.zod.string()).optional(),
		mode: pi.zod.enum(["all", "usage"]).optional(),
		benchmark: pi.zod.enum(["creative", "longform", "all"]).optional(),
		variants: pi.zod.boolean().optional(),
		details: pi.zod.boolean().optional(),
		sort: pi.zod.string().optional(),
		order: pi.zod.enum(["asc", "desc"]).optional(),
		limit: pi.zod.number().int().min(0).optional(),
		offset: pi.zod.number().int().min(0).optional(),
		excludeModels: pi.zod.array(pi.zod.string()).optional(),
		differentFrom: pi.zod.string().optional(),
	}),
	async execute(_id, params, _onUpdate, ctx, signal) {
		const mode = params.mode ?? "all";
		const registry = ctx.modelRegistry;
		const models = matches(
			registry.getAvailable(),
			params.models,
			(model) => [model.id, model.name, `${model.provider}/${model.id}`],
			params.variants,
		).map((model) => ({
			selector: `${model.provider}/${model.id}`,
			provider: model.provider,
			id: model.id,
			name: model.name,
			family: classifyModel(model.provider, model.id, { lenient: true }).class,
			thinking: model.thinking ? getSupportedEfforts(model) : null,
			cost: model.cost,
			pricingStatus: getModelPricingStatus(model),
		}));
		const reports =
			(await registry.authStorage.usage.reports({
				baseUrlResolver: (provider) => registry.getProviderBaseUrl(provider),
				signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(30_000)]) : AbortSignal.timeout(30_000),
			})) ?? [];
		const quotas = quotaEvidence(reports);
		const modelQuotas: Record<string, string[]> = {};
		for (const [reportIndex, report] of reports.entries()) {
			const candidates = models.filter((model) => model.provider === report.provider);
			for (const [limitIndex, limit] of report.limits.entries()) {
				for (const id of registry.authStorage.usage.reportingModelIds(
					report.provider,
					candidates.map((model) => model.id),
					[{ ...report, limits: [limit] }],
				)) {
					const selector = `${report.provider}/${id}`;
					const refs = modelQuotas[selector] ?? [];
					refs.push(`${reportIndex}:${limitIndex}`);
					modelQuotas[selector] = refs;
				}
			}
		}
		const runtime: Runtime = { models, quotas, modelQuotas };
		const subject = params.differentFrom
			? ctx.modelRegistry
					.getAvailable()
					.find(
						(model) => `${model.provider}/${model.id}` === params.differentFrom || model.id === params.differentFrom,
					)
			: undefined;
		if (params.differentFrom && !subject)
			throw new Error(`Subject is not in this session's configured registry: ${params.differentFrom}`);
		const differentFromFamily = subject
			? classifyModel(subject.provider, subject.id, { lenient: true }).class
			: undefined;
		if (differentFromFamily === "unknown")
			throw new Error("Subject's vendor lineage is unknown; cannot establish an independent family");
		const result = await evidence({ ...params, differentFromFamily, signal }, runtime, mode === "usage");
		return { content: [{ type: "text", text: JSON.stringify(result) }], details: result };
	},
});
export default factory;
