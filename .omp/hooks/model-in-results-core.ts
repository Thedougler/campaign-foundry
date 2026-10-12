export interface ModelResult {
	id?: string;
	resolvedModel?: string;
	resolvedModelIsFallback?: boolean;
	isFallback?: boolean;
}

interface ModelDetails extends ModelResult {
	results?: ModelResult[];
	progress?: ModelResult[];
	jobs?: ModelResult[];
	job?: ModelResult;
	proc?: ModelDetails;
}

/** Inspect only harness metadata, never the child's output or structured payload. */
export function modelResultLines(details: unknown, known?: ReadonlyMap<string, ModelResult>): string {
	const source = details as ModelDetails | undefined;
	if (!source) return "";
	const data = source.proc ?? source;
	const lines: string[] = [];
	const seen = new Set<string>();
	const add = (row: ModelResult) => {
		const saved = row.id ? known?.get(row.id) : undefined;
		const model = row.resolvedModel ?? saved?.resolvedModel;
		if (!model || seen.has(row.id ?? model)) return;
		seen.add(row.id ?? model);
		if (row.id) lines.push(`Agent: ${row.id}`);
		const fallback =
			row.resolvedModelIsFallback ??
			row.isFallback ??
			(saved?.resolvedModel === model ? saved.resolvedModelIsFallback : false);
		lines.push(`Model: ${model}${fallback ? ", fallback" : ""}`);
	};
	add(data);
	if (data.job) add(data.job);
	for (const rows of [data.results, data.progress, data.jobs]) {
		for (const row of rows ?? []) add(row);
	}
	return lines.join("\n");
}
