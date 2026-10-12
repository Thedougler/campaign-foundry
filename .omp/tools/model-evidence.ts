import type { CustomToolFactory } from "@oh-my-pi/pi-coding-agent";

// The compiled omp binary resolves no npm packages from on-disk tool code, so this tool
// imports none and runs scripts/benchmarks.ts under the real Bun runtime instead.
const cli = `${import.meta.dir}/../../scripts/benchmarks.ts`;

const factory: CustomToolFactory = (pi) => ({
	name: "model_evidence",
	label: "Model Evidence",
	description:
		"Read-only published EQ-Bench creative (Elo) and longform (/100) writing scores, reasoning labels, every numeric metric and sample links. Sort: creative, longform, model, creative.<metric>/longform.<metric>. details adds Sophon model scores and EQ-Bench rubric/style/repetition data. excludeModels drops names containing a substring. limit=0 returns all. Quota, pricing and thinking levels come from `omp usage --json` and `omp models --json`.",
	parameters: pi.zod.object({
		models: pi.zod.array(pi.zod.string()).optional(),
		benchmark: pi.zod.enum(["creative", "longform", "all"]).optional(),
		variants: pi.zod.boolean().optional(),
		details: pi.zod.boolean().optional(),
		sort: pi.zod.string().optional(),
		order: pi.zod.enum(["asc", "desc"]).optional(),
		limit: pi.zod.number().int().min(0).optional(),
		offset: pi.zod.number().int().min(0).optional(),
		excludeModels: pi.zod.array(pi.zod.string()).optional(),
	}),
	async execute(_id, params, _onUpdate, _ctx, signal) {
		const args = [
			...(params.models?.length ? ["--model", ...params.models] : []),
			...(params.benchmark ? ["--benchmark", params.benchmark] : []),
			...(params.variants ? ["--variants"] : []),
			...(params.details ? ["--details"] : []),
			...(params.sort ? ["--sort", params.sort] : []),
			...(params.order ? ["--order", params.order] : []),
			...(params.limit !== undefined ? ["--limit", String(params.limit)] : []),
			...(params.offset !== undefined ? ["--offset", String(params.offset)] : []),
			...(params.excludeModels?.length ? ["--exclude-model", ...params.excludeModels] : []),
		];
		const child = Bun.spawn(["bun", cli, ...args], { stdout: "pipe", stderr: "pipe", signal });
		const [stdout, stderr] = await Promise.all([
			new Response(child.stdout).text(),
			new Response(child.stderr).text(),
			child.exited,
		]);
		// Exit 1 with JSON on stdout means some queries are listed in `missing`; that is a result, not a failure.
		if (!stdout.trim()) throw new Error(stderr.trim() || "benchmarks CLI returned no output");
		return { content: [{ type: "text", text: stdout }], details: JSON.parse(stdout) };
	},
});
export default factory;
