import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ExtensionContext, ToolCallEvent, ToolResultEvent } from "@oh-my-pi/pi-coding-agent";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	CODE_EXTENSIONS,
	REMINDER,
	REMINDER_MARKER,
	SKILL_URI,
	extractInputPaths,
	hasSkillRead,
	isCodeMutationTarget,
	isTrackedSkillPath,
	markSkillRead,
	reminderForMutation,
	skillReadMarkerPath,
} from "../.omp/hooks/cli-for-agents-core.ts";
import { createRemindHandler } from "../.omp/hooks/pre/cli-for-agents-remind.ts";
import { createTrackHandler } from "../.omp/hooks/post/cli-for-agents-track.ts";

function sessionCtx(
	root: string,
	sessionId = "sess-test-1",
): Pick<ExtensionContext, "cwd" | "sessionManager" | "agent"> {
	return {
		cwd: root,
		agent: { kind: "main", id: "Main", name: "main", depth: 0 },
		sessionManager: {
			getSessionId: () => sessionId,
		} as Pick<ExtensionContext, "sessionManager">["sessionManager"],
	};
}

describe("Tracked skill path recognition", () => {
	it("accepts skill://cli-for-agents and filesystem skill paths", () => {
		expect(isTrackedSkillPath(SKILL_URI)).toBe(true);
		expect(isTrackedSkillPath("skill://cli-for-agents/SKILL.md")).toBe(true);
		expect(isTrackedSkillPath("/Users/x/.agents/skills/cli-for-agents/SKILL.md")).toBe(true);
		expect(isTrackedSkillPath("/Users/x/.agents/skills/cli-for-agents")).toBe(true);
	});

	it("rejects other skills and unrelated paths", () => {
		expect(isTrackedSkillPath("skill://extending-omp")).toBe(false);
		expect(isTrackedSkillPath("skill://cli-for-agents-extra")).toBe(false);
		expect(isTrackedSkillPath("src/cli.ts")).toBe(false);
		expect(isTrackedSkillPath("")).toBe(false);
	});
});

describe("Code mutation target policy", () => {
	let root: string;
	beforeEach(() => {
		root = mkdtempSync(join(tmpdir(), "cli-agents-code-"));
		for (const dir of ["src", "scripts", "test", "python", "docs", "wiki"]) {
			mkdirSync(join(root, dir), { recursive: true });
		}
	});
	afterEach(() => rmSync(root, { recursive: true, force: true }));

	it("accepts code extensions under src, scripts, test and python", () => {
		for (const dir of ["src", "scripts", "test", "python"]) {
			for (const ext of Object.keys(CODE_EXTENSIONS)) {
				const rel = `${dir}/probe${ext}`;
				expect(isCodeMutationTarget(rel, root, root), rel).toBe(true);
				expect(isCodeMutationTarget(join(root, rel), root, root), rel).toBe(true);
			}
		}
	});

	it("rejects non-code extensions and out-of-scope directories", () => {
		expect(isCodeMutationTarget("src/readme.md", root, root)).toBe(false);
		expect(isCodeMutationTarget("docs/cli.ts", root, root)).toBe(false);
		expect(isCodeMutationTarget("wiki/page.md", root, root)).toBe(false);
		expect(isCodeMutationTarget("../outside/src/x.ts", root, root)).toBe(false);
	});

	it("resolves relative to cwd when under the repo", () => {
		expect(isCodeMutationTarget("cli.ts", join(root, "src"), root)).toBe(true);
		expect(isCodeMutationTarget("cli.ts", join(root, "docs"), root)).toBe(false);
	});
});

describe("Reminder decision", () => {
	it("reminds only when the skill is unread and the target is in-scope code", () => {
		expect(reminderForMutation(false, true)).toBe(REMINDER);
		expect(reminderForMutation(true, true)).toBeUndefined();
		expect(reminderForMutation(false, false)).toBeUndefined();
		expect(REMINDER.startsWith(REMINDER_MARKER)).toBe(true);
	});
});

describe("Session-scoped skill-read markers", () => {
	let dir: string;
	beforeEach(() => {
		dir = mkdtempSync(join(tmpdir(), "cli-agents-store-"));
	});
	afterEach(() => rmSync(dir, { recursive: true, force: true }));

	it("starts unread, marks read per session, and does not leak across sessions", () => {
		expect(hasSkillRead(dir, "a")).toBe(false);
		markSkillRead(dir, "a");
		expect(hasSkillRead(dir, "a")).toBe(true);
		expect(hasSkillRead(dir, "b")).toBe(false);
		markSkillRead(dir, "b");
		expect(hasSkillRead(dir, "b")).toBe(true);
		expect(readFileSync(skillReadMarkerPath(dir, "a"), "utf8")).toBe("");
	});

	it("rejects unsafe session ids", () => {
		expect(() => markSkillRead(dir, "../escape")).toThrow(/session id/i);
		expect(() => hasSkillRead(dir, "a/b")).toThrow(/session id/i);
		expect(() => markSkillRead(dir, "")).toThrow(/session id/i);
	});
});

describe("Input path extraction", () => {
	it("reads write path and edit path/paths plus hashline headers", () => {
		expect(extractInputPaths("write", { path: "src/a.ts" })).toEqual(["src/a.ts"]);
		expect(extractInputPaths("edit", { path: "src/a.ts" })).toEqual(["src/a.ts"]);
		expect(extractInputPaths("edit", { paths: ["src/a.ts", "scripts/b.sh"] })).toEqual(["src/a.ts", "scripts/b.sh"]);
		expect(
			extractInputPaths("edit", {
				input: "[src/core.ts#AB12]\nPUT 1.=1:\n+x\n[scripts/run.sh]\nPUT 1.=1:\n+y\n",
			}),
		).toEqual(["src/core.ts", "scripts/run.sh"]);
	});
});

describe("Thin omp adapters", () => {
	let root: string;
	let stateDir: string;

	beforeEach(() => {
		root = mkdtempSync(join(tmpdir(), "cli-agents-adapter-"));
		stateDir = join(root, ".cache", "skill-reads");
		mkdirSync(join(root, "src"), { recursive: true });
		mkdirSync(join(root, "wiki"), { recursive: true });
		writeFileSync(join(root, "src/probe.ts"), "export {};\n");
	});
	afterEach(() => rmSync(root, { recursive: true, force: true }));

	it("tracks a successful skill read against the session id", async () => {
		const track = createTrackHandler({ stateDir });
		await track(
			{
				type: "tool_result",
				toolName: "read",
				toolCallId: "r1",
				input: { path: SKILL_URI },
				isError: false,
				content: [{ type: "text", text: "# CLI for agents" }],
				details: undefined,
			} as ToolResultEvent,
			sessionCtx(root, "s1"),
		);
		expect(hasSkillRead(stateDir, "s1")).toBe(true);
	});

	it("ignores failed reads and unrelated paths", async () => {
		const track = createTrackHandler({ stateDir });
		const ctx = sessionCtx(root, "s2");
		await track(
			{
				type: "tool_result",
				toolName: "read",
				toolCallId: "r2",
				input: { path: SKILL_URI },
				isError: true,
				content: [{ type: "text", text: "missing" }],
				details: undefined,
			} as ToolResultEvent,
			ctx,
		);
		await track(
			{
				type: "tool_result",
				toolName: "read",
				toolCallId: "r3",
				input: { path: "src/probe.ts" },
				isError: false,
				content: [{ type: "text", text: "export {}" }],
				details: undefined,
			} as ToolResultEvent,
			ctx,
		);
		expect(hasSkillRead(stateDir, "s2")).toBe(false);
	});

	it("reminds on code write when the skill is unread, and stays quiet after a read", async () => {
		const remind = createRemindHandler({ stateDir, repoRoot: root });
		const ctx = sessionCtx(root, "s3");
		const writeEvent = {
			type: "tool_call",
			toolName: "write",
			toolCallId: "w1",
			input: { path: "src/probe.ts", content: "export {};\n" },
		} as ToolCallEvent;
		expect((await remind(writeEvent, ctx))?.additionalContext).toBe(REMINDER);

		await createTrackHandler({ stateDir })(
			{
				type: "tool_result",
				toolName: "read",
				toolCallId: "r4",
				input: { path: "/Users/x/.agents/skills/cli-for-agents/SKILL.md" },
				isError: false,
				content: [{ type: "text", text: "ok" }],
				details: undefined,
			} as ToolResultEvent,
			ctx,
		);
		expect(await remind(writeEvent, ctx)).toBeUndefined();
	});

	it("does not remind for wiki markdown writes", async () => {
		const result = await createRemindHandler({ stateDir, repoRoot: root })(
			{
				type: "tool_call",
				toolName: "write",
				toolCallId: "w2",
				input: { path: "wiki/Note.md", content: "# Note\n" },
			} as ToolCallEvent,
			sessionCtx(root, "s4"),
		);
		expect(result).toBeUndefined();
	});
});
