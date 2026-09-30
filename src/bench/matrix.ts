import { readFileSync } from "node:fs";
import YAML from "yaml";
import { UsageError } from "../check/errors.ts";

export interface Pin {
	model: string;
	fallback: string;
}

export interface Family {
	name: string;
	top: Pin;
}

export interface Matrix {
	families: Family[];
	judgeFallbackPool: string[];
}

export function loadMatrix(path: string): Matrix {
	let parsed: Record<string, unknown>;
	try {
		parsed = YAML.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
	} catch {
		throw new UsageError(`Cannot read the Matrix at \`${path}\`.`, "The Matrix lives in `evals/models.yaml`; run from the repository root.");
	}
	const rawFamilies = parsed.families;
	if (rawFamilies === null || typeof rawFamilies !== "object") {
		throw new UsageError(`\`${path}\` has no families.`, "Each family needs `top: { model, fallback }` pins from `omp models`.");
	}
	const families: Family[] = Object.entries(rawFamilies as Record<string, Record<string, Pin>>).map(([name, pins]) => {
		const top = pins?.top;
		if (!top || typeof top.model !== "string" || typeof top.fallback !== "string") {
			throw new UsageError(`Family \`${name}\` has no valid top pin.`, "Give it `top: { model, fallback }` as exact `provider/model-id` pins from `omp models`.");
		}
		return { name, top };
	});
	if (families.length === 0) throw new UsageError(`\`${path}\` lists no families.`, "Add at least one family with a `top` pin before benchmarking.");
	const pool = parsed.judge_fallback_pool;
	return { families, judgeFallbackPool: Array.isArray(pool) ? (pool as unknown[]).filter((m): m is string => typeof m === "string") : [] };
}

export function findFamily(matrix: Matrix, name: string): Family {
	const family = matrix.families.find((f) => f.name === name);
	if (!family) throw new UsageError(`No family \`${name}\` in the Matrix.`, `Known families: ${matrix.families.map((f) => f.name).join(", ")}.`);
	return family;
}

/** The file-safe tag for a pin (`zai/glm-5.3` → `glm-5.3`): it names `<id>.<tag>.events.jsonl` and `<tag>.md` files. */
export function modelTag(pin: string): string {
	return pin.split("/").at(-1) ?? pin;
}
