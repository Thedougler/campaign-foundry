import { basename } from "node:path";
import { UsageError } from "../check/errors.ts";

export interface RunResult {
	/** The final assistant text, fence-stripped, one trailing newline. */
	sample: string;
	/** From the last turn_end's usage, else the last non-null usage in the stream, else 0. */
	totalTokens: number;
	/** From the last turn_end's message duration, else 0. */
	durationMs: number;
	model: string;
	/** The model wrapped its reply in a code fence that was stripped. */
	fenced: boolean;
	/** The sample is a bare `> [!narration]` block, as every brief demands. */
	narrated: boolean;
}

function asRecord(value: unknown): Record<string, unknown> {
	return value !== null && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function usageOf(value: unknown): number {
	const total = asRecord(asRecord(value).usage).totalTokens;
	return typeof total === "number" && total > 0 ? total : 0;
}

/** Some providers leave turn_end usage null and carry the total on the stream's last `messages[].usage.totalTokens`. */
function totalTokensIn(event: Record<string, unknown>): number {
	const direct = usageOf(event);
	if (direct > 0) return direct;
	const messages = Array.isArray(event.messages) ? event.messages : [];
	for (let i = messages.length - 1; i >= 0; i--) {
		const total = usageOf(messages[i]);
		if (total > 0) return total;
	}
	return 0;
}

/** Parses one omp `--mode json` events stream into the sample and its timing. */
export function parseEvents(text: string, source: string): RunResult {
	const events: Record<string, unknown>[] = [];
	const lines = text.split("\n");
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]!.trim();
		if (line === "") continue;
		try {
			events.push(JSON.parse(line) as Record<string, unknown>);
		} catch {
			throw new UsageError(`${source}:${i + 1} is not JSON — the events stream is broken.`, "The run died mid-stream; check the `.error.log` beside it and re-run the pin (or its fallback).");
		}
	}
	let last: Record<string, unknown> | undefined;
	for (const event of events) {
		if (event.type === "turn_end") last = event;
	}
	if (!last) {
		throw new UsageError(`No turn_end event in ${source}.`, "The model never answered; check the `.error.log` beside it, then re-run the pin or its fallback.");
	}
	const message = asRecord(last.message);
	const content = Array.isArray(message.content) ? message.content : [];
	const raw = content
		.map((part) => asRecord(part))
		.filter((part) => part.type === "text")
		.map((part) => (typeof part.text === "string" ? part.text : ""))
		.join("");
	let sample = raw.trim();
	const fenced = sample.startsWith("```") && sample.endsWith("```");
	if (fenced) sample = sample.replace(/^```[a-zA-Z]*\n?/, "").replace(/\n?```$/, "").trim();
	if (sample !== "") sample = `${sample}\n`;
	let totalTokens = usageOf(message);
	if (totalTokens === 0) {
		for (let i = events.length - 1; i >= 0 && totalTokens === 0; i--) totalTokens = totalTokensIn(events[i]!);
	}
	const duration = message.duration;
	return {
		sample,
		totalTokens,
		durationMs: typeof duration === "number" && duration > 0 ? duration : 0,
		model: typeof message.model === "string" ? message.model : "",
		fenced,
		narrated: sample.startsWith("> [!narration]"),
	};
}

/** The `<model-tag>` of an events file named `<id>.<tag>[.rerun].events.jsonl`. */
export function modelTagOf(eventsPath: string): string {
	let name = basename(eventsPath).replace(/\.events\.jsonl$/, "").replace(/\.rerun$/, "");
	const firstDot = name.indexOf(".");
	return firstDot === -1 ? name : name.slice(firstDot + 1);
}
