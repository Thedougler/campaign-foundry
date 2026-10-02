import { closeEvalSession, createEvalSession } from "../../evals/workspaces.ts";
import { verifyEvalRunnerGrant } from "../../evals/runner-tools.ts";

interface AgentContext {
	agent: { kind: string; name: string; id: string };
	sessionManager: { getSessionId: () => string };
	getAsyncJobSnapshot?: () => unknown;
}

interface ExtensionAPI {
	zod: {
		object: (shape: unknown) => unknown;
		enum: (values: unknown) => unknown;
	};
	registerTool: (tool: {
		name: string;
		label: string;
		description: string;
		parameters: unknown;
		execute: (
			toolCallId: string,
			params: unknown,
			signal: unknown,
			onUpdate: unknown,
			ctx: AgentContext,
		) => unknown;
	}) => void;
	on: (event: string, handler: (event: Record<string, unknown>, ctx: AgentContext) => unknown) => void;
}
interface SessionRoot {
	root: string;
}

type BoundGrant = Awaited<ReturnType<typeof verifyEvalRunnerGrant>>;

const sessionRoots = new Map<string, SessionRoot>();
const runnerBindings = new Map<string, BoundGrant>();
const rejectedRunnerIds = new Set<string>();
let activeMainSessionId: string | undefined;

const openingRoots = new Map<string, Promise<SessionRoot>>();

async function openSessionRoot(sessionId: string): Promise<SessionRoot> {
	const current = sessionRoots.get(sessionId);
	if (current) return current;
	let opening = openingRoots.get(sessionId);
	if (!opening) {
		opening = createEvalSession({ sessionId, pid: process.pid }).then(({ root }) => ({ root }));
		openingRoots.set(sessionId, opening);
	}
	try {
		const opened = await opening;
		sessionRoots.set(sessionId, opened);
		return opened;
	} finally {
		if (openingRoots.get(sessionId) === opening) openingRoots.delete(sessionId);
	}
}

const settledBeforeSwitch = new Set<string>();

function isRunner(ctx: { agent: { kind: string; name: string } }): boolean {
	return ctx.agent.kind === "sub" && ctx.agent.name.toLowerCase() === "test-subject";
}

function removeGrantLines(text: string): string {
	return text.replace(/^Eval grant: \S+ \S+\r?\n?/gmu, "");
}

function removeEvaluatorContext(systemPrompt: string): string {
	const marked = removeGrantLines(systemPrompt)
		.replace(/<(approved[-_]plan|eval[-_]plan|evaluator[-_]only|evaluation[-_]only|answer[-_]key|grader[-_]context)\b[^>]*>[\s\S]*?<\/\1\s*>/giu, "")
		.replace(/<plan\b[^>]*(?:eval|approved)[^>]*>[\s\S]*?<\/plan\s*>/giu, "")
		.replace(/^<!--\s*(?:BEGIN|START)\s+(?:EVALUATOR|EVAL)[- _]ONLY\s*-->[\s\S]*?^<!--\s*(?:END|STOP)\s+(?:EVALUATOR|EVAL)[- _]ONLY\s*-->\s*$/gimu, "");
	const kept: string[] = [];
	let skippedHeadingLevel = 0;
	for (const line of marked.split(/\r?\n/u)) {
		const heading = /^(#{1,6})\s+(.+?)\s*#*\s*$/u.exec(line);
		if (skippedHeadingLevel > 0) {
			if (!heading || heading[1]!.length > skippedHeadingLevel) continue;
			skippedHeadingLevel = 0;
		}
		if (heading && /^(?:approved\s+(?:eval(?:uation)?\s+)?plan|(?:evaluator|evaluation|eval)[- ]only(?:\s+(?:context|instructions))?|answer key|grader(?: instructions| rubric)?)$/iu.test(heading[2]!)) {
			skippedHeadingLevel = heading[1]!.length;
			continue;
		}
		kept.push(line);
	}
	return kept.join("\n").trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stripMachineLineFromMessage<T>(message: T): T {
	if (!isRecord(message) || message.role !== "user") return message;
	const content = message.content;
	if (typeof content === "string") return { ...message, content: removeGrantLines(content) } as T;
	if (!Array.isArray(content)) return message;
	let changed = false;
	const filtered = content.map((part) => {
		if (!isRecord(part) || part.type !== "text" || typeof part.text !== "string") return part;
		const text = removeGrantLines(part.text);
		if (text === part.text) return part;
		changed = true;
		return { ...part, text };
	});
	return changed ? { ...message, content: filtered } as T : message;
}


function parseGrantLine(prompt: string): { path: string; token: string } | null {
	const lines = prompt.match(/^Eval grant: (\S+) ([A-Za-z0-9_-]{32,})$/gmu) ?? [];
	if (lines.length !== 1) return null;
	const match = lines[0]!.match(/^Eval grant: (\S+) ([A-Za-z0-9_-]{32,})$/u);
	return match ? { path: match[1]!, token: match[2]! } : null;
}

function toolResult(value: unknown): { content: Array<{ type: "text"; text: string }> } {
	return { content: [{ type: "text", text: JSON.stringify(value) }] };
}

function hasOutstandingJobs(snapshot: unknown): boolean {
	if (Array.isArray(snapshot)) return snapshot.some(hasOutstandingJobs);
	if (!isRecord(snapshot)) return false;
	for (const key of ["pending", "running", "queued", "active", "inFlight", "inProgress"]) {
		if (typeof snapshot[key] === "number" && snapshot[key] > 0) return true;
	}
	for (const key of ["jobs", "items", "workers", "children"]) {
		const jobs = snapshot[key];
		if (!Array.isArray(jobs)) continue;
		if (jobs.some((job) => {
			if (!isRecord(job)) return false;
			const rawStatus = job.status ?? job.state;
			const status = typeof rawStatus === "string" ? rawStatus.toLowerCase() : "";
			return status !== "" && !["done", "complete", "completed", "success", "succeeded", "failed", "error", "cancelled", "canceled", "parked", "shutdown"].includes(status);
		})) return true;
	}
	return false;
}

async function waitForJobs(ctx: { getAsyncJobSnapshot?: () => unknown }): Promise<void> {
	if (!ctx.getAsyncJobSnapshot) return;
	while (hasOutstandingJobs(ctx.getAsyncJobSnapshot())) await new Promise((resolve) => setTimeout(resolve, 50));
}

async function closeSessionRoot(sessionId: string, ctx: { getAsyncJobSnapshot?: () => unknown }, wait: boolean): Promise<void> {
	const owned = sessionRoots.get(sessionId);
	if (!owned) return;
	if (wait) await waitForJobs(ctx);
	await closeEvalSession(owned.root);
	sessionRoots.delete(sessionId);
}

export default function evalAccessControl(pi: ExtensionAPI): void {
	const z = pi.zod;
	pi.registerTool({
		name: "eval_session",
		label: "Eval Session",
		description: "Open, inspect, or close private temporary storage owned by this main Session.",
		parameters: z.object({ operation: z.enum(["open", "close", "status"]) }),
		async execute(_toolCallId, params, _signal, _onUpdate, ctx) {
			if (ctx.agent.kind !== "main") return toolResult({ error: "eval_session is available only to the owning main Session" });
			const sessionId = ctx.sessionManager.getSessionId();
			const operation = params && typeof params === "object" && "operation" in params ? params.operation : undefined;
			if (operation === "status") {
				const current = sessionRoots.get(sessionId);
				return toolResult({ open: Boolean(current), ...(current ? { root: current.root } : {}) });
			}
			if (operation === "open") {
				const current = await openSessionRoot(sessionId);
				return toolResult({ open: true, root: current.root });
			}
			if (operation === "close") {
				await closeSessionRoot(sessionId, ctx, true);
				return toolResult({ open: false });
			}
			return toolResult({ error: "operation must be open, close, or status" });
		},
	});

	pi.on("session_start", (_event, ctx) => {
		if (ctx.agent.kind === "main") activeMainSessionId = ctx.sessionManager.getSessionId();
	});

	pi.on("session_before_switch", async (_event, ctx) => {
		if (ctx.agent.kind !== "main") return;
		const previousSessionId = ctx.sessionManager.getSessionId();
		await waitForJobs(ctx);
		settledBeforeSwitch.add(previousSessionId);
	});

	pi.on("session_switch", async (_event, ctx) => {
		if (ctx.agent.kind !== "main") return;
		const nextSessionId = ctx.sessionManager.getSessionId();
		const previousSessionId = activeMainSessionId;
		activeMainSessionId = nextSessionId;
		if (previousSessionId && previousSessionId !== nextSessionId) {
			await closeSessionRoot(previousSessionId, ctx, !settledBeforeSwitch.delete(previousSessionId));
		}
	});

	pi.on("session_shutdown", async (_event, ctx) => {
		if (ctx.agent.kind === "main") {
			const sessionId = ctx.sessionManager.getSessionId();
			await closeSessionRoot(sessionId, ctx, true);
			if (activeMainSessionId === sessionId) activeMainSessionId = undefined;
			return;
		}
		if (isRunner(ctx)) {
			runnerBindings.delete(ctx.agent.id);
			rejectedRunnerIds.delete(ctx.agent.id);
		}
	});

	pi.on("before_agent_start", async (event, ctx) => {
		if (!isRunner(ctx)) return;
		const systemPromptText = typeof event.systemPrompt === "string" ? event.systemPrompt : "";
		const systemPrompt = removeEvaluatorContext(systemPromptText);
		if (runnerBindings.has(ctx.agent.id) || rejectedRunnerIds.has(ctx.agent.id)) return { systemPrompt };
		const line = typeof event.prompt === "string" ? parseGrantLine(event.prompt) : null;
		if (!line) {
			rejectedRunnerIds.add(ctx.agent.id);
			return { systemPrompt };
		}
		try {
			const grant = await verifyEvalRunnerGrant(line.path, line.token);
			runnerBindings.set(ctx.agent.id, grant);
		} catch {
			rejectedRunnerIds.add(ctx.agent.id);
		}
		return { systemPrompt };
	});

	pi.on("context", (event, ctx) => {
		if (!isRunner(ctx)) return;
		const messages = Array.isArray(event.messages) ? event.messages : [];
		return { messages: messages.map(stripMachineLineFromMessage) };
	});

	pi.on("tool_call", (event, ctx) => {
		if (!isRunner(ctx)) return;
		const grant = runnerBindings.get(ctx.agent.id);
		if (!grant || rejectedRunnerIds.has(ctx.agent.id)) {
			return { block: true, reason: "This Runner has no valid evaluation grant." };
		}
		if (event.toolName === "yield") return;
		if (typeof event.toolName !== "string" || !grant.capabilityNames.includes(event.toolName)) {
			return { block: true, reason: "This Runner tool is not part of the bound evaluation grant." };
		}
	});

	pi.on("session_before_compact", () => {
		// Compaction preserves the owning Session's temporary root.
	});
}
