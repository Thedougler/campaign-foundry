import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import type { SubagentProgressPayload } from "@oh-my-pi/pi-coding-agent/task/types";
import { modelResultLines } from "../model-in-results-core.ts";
import type { ModelResult } from "../model-in-results-core.ts";

/** Project hook: expose task metadata without changing the child's fixed-format reply. */
export default function modelInResults(pi: ExtensionAPI): void {
	const known = new Map<string, ModelResult>();
	// wait/proc snapshots omit the fallback flag; retain it from the parent event bus.
	const unsubscribe = pi.events.on("task:subagent:progress", (data) => {
		const { progress } = data as SubagentProgressPayload;
		if (progress.resolvedModel) {
			known.set(progress.id, {
				id: progress.id,
				resolvedModel: progress.resolvedModel,
				resolvedModelIsFallback: progress.resolvedModelIsFallback,
			});
		}
	});
	pi.on("session_switch", () => known.clear());
	pi.on("session_shutdown", () => {
		unsubscribe();
		known.clear();
	});
	pi.on("tool_result", (event) => {
		const proc =
			(event.toolName === "read" || event.toolName === "write") &&
			typeof event.input.path === "string" &&
			event.input.path.startsWith("proc://");
		if (event.toolName !== "task" && event.toolName !== "wait" && !proc) return;
		const lines = modelResultLines(event.details, known);
		if (!lines) return;
		return { content: [...event.content, { type: "text", text: `\n${lines}` }] };
	});
}
