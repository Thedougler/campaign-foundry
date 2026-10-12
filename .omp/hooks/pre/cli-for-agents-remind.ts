import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI, ExtensionContext, ToolCallEvent, ToolCallEventResult } from "@oh-my-pi/pi-coding-agent";
import { extractInputPaths, hasSkillRead, isCodeMutationTarget, reminderForMutation } from "../cli-for-agents-core.ts";

export interface RemindOptions {
	repoRoot: string;
	stateDir: string;
}

type RemindContext = Pick<ExtensionContext, "cwd" | "sessionManager">;

export function createRemindHandler(
	options: RemindOptions,
): (event: ToolCallEvent, ctx: RemindContext) => Promise<ToolCallEventResult | undefined> {
	const repoRoot = resolve(options.repoRoot);
	return async (event, ctx) => {
		if (event.toolName !== "write" && event.toolName !== "edit") return;
		const input = event.input as Record<string, unknown>;
		if (!input || typeof input !== "object") return;

		let sessionId: string;
		try {
			sessionId = ctx.sessionManager.getSessionId();
		} catch {
			return;
		}
		if (!sessionId || sessionId.length > 128) return;

		let skillRead = false;
		try {
			skillRead = hasSkillRead(options.stateDir, sessionId);
		} catch {
			return;
		}
		if (skillRead) return;

		const codeTarget = extractInputPaths(event.toolName, input).some((path) =>
			isCodeMutationTarget(path, ctx.cwd, repoRoot),
		);
		const additionalContext = reminderForMutation(skillRead, codeTarget);
		return additionalContext ? { additionalContext } : undefined;
	};
}

export default function cliForAgentsRemind(pi: ExtensionAPI): void {
	const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
	const stateDir = resolve(repoRoot, ".cache/skill-reads");
	pi.on("tool_call", createRemindHandler({ repoRoot, stateDir }));
}
