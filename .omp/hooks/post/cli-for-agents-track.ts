import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI, ExtensionContext, ToolResultEvent } from "@oh-my-pi/pi-coding-agent";
import { isTrackedSkillPath, markSkillRead } from "../cli-for-agents-core.ts";

export interface TrackOptions {
	stateDir: string;
}

type TrackContext = Pick<ExtensionContext, "sessionManager">;

export function createTrackHandler(
	options: TrackOptions,
): (event: ToolResultEvent, ctx: TrackContext) => Promise<void> {
	return async (event, ctx) => {
		if (event.isError || event.toolName !== "read") return;
		const path = event.input?.path;
		if (typeof path !== "string" || path.length > 4096 || !isTrackedSkillPath(path)) return;

		let sessionId: string;
		try {
			sessionId = ctx.sessionManager.getSessionId();
		} catch {
			return;
		}
		if (!sessionId || sessionId.length > 128) return;
		try {
			markSkillRead(options.stateDir, sessionId);
		} catch {
			// Bad session id or unwritable state must not break the tool path.
		}
	};
}

export default function cliForAgentsTrack(pi: ExtensionAPI): void {
	const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
	const stateDir = resolve(repoRoot, ".cache/skill-reads");
	pi.on("tool_result", createTrackHandler({ stateDir }));
}
