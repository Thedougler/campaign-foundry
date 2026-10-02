import { lstat, mkdtemp, readFile, readdir, realpath, rm, symlink, unlink, utimes, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { describe, expect, it } from "vitest";
import {
	allocateEvalRun,
	closeEvalSession,
	createEvalSession,
	evalRunPaths,
	evalSessionLayout,
	reapEvalSessions,
} from "../../evals/workspaces.ts";

const SESSION_PREFIX = "campaign-foundry-eval-";

async function withPrivateTempRoot(run: () => Promise<void>): Promise<void> {
	const originalTmpdir = process.env.TMPDIR;
	const parent = await mkdtemp(join(tmpdir(), "eval-session-tests-"));
	process.env.TMPDIR = parent;
	try {
		await run();
	} finally {
		if (originalTmpdir === undefined) delete process.env.TMPDIR;
		else process.env.TMPDIR = originalTmpdir;
		await rm(parent, { recursive: true, force: true });
	}
}

async function setOwnerAge(root: string, pid: number, ageMs: number): Promise<void> {
	const markerPath = join(root, ".session.json");
	const marker = JSON.parse(await readFile(markerPath, "utf8")) as Record<string, unknown>;
	marker.pid = pid;
	marker.createdAt = new Date(Date.now() - ageMs).toISOString();
	await writeFile(markerPath, `${JSON.stringify(marker, null, 2)}\n`);
}

describe("eval Session workspaces", () => {
	it("opens a canonical session, allocates controls and outputs, and closes idempotently", async () => {
		await withPrivateTempRoot(async () => {
			const session = await createEvalSession({ sessionId: "session-open", pid: process.pid });
			const marker = JSON.parse(await readFile(join(session.root, ".session.json"), "utf8")) as Record<string, unknown>;
			const layout = evalSessionLayout(session.root);
			expect(await readdir(session.root)).toEqual(expect.arrayContaining([".session.json", "control", "audit", "outputs"]));
			expect(await readdir(session.root)).not.toContain("worlds");
			const run = await allocateEvalRun(session.root);

			expect(marker).toMatchObject({ schemaVersion: 1, root: session.root, sessionId: "session-open", pid: process.pid });
			expect(typeof marker.createdAt).toBe("string");
			expect(evalRunPaths(session.root, run.runId)).toEqual({ controlRoot: run.controlRoot, outputRoot: run.outputRoot });
			expect(run.controlRoot).toBe(join(layout.control, run.runId));
			expect(run.outputRoot).toBe(join(layout.outputs, run.runId));
			await writeFile(join(run.outputRoot, "reply.md"), "A saved DM reply.");
			expect(() => evalSessionLayout(`${session.root}/../${basename(session.root)}`)).toThrow(/traversal/);

			await closeEvalSession(session.root);
			await closeEvalSession(session.root);
			await expect(lstat(session.root)).rejects.toMatchObject({ code: "ENOENT" });
			await expect(lstat(run.outputRoot)).rejects.toMatchObject({ code: "ENOENT" });
		});
	});

	it("rejects non-temp roots, traversal, symlink roots, symlink markers, and malformed owners", async () => {
		await withPrivateTempRoot(async () => {
			const target = await createEvalSession({ sessionId: "symlink-target", pid: process.pid });
			const linkedRoot = join(tmpdir(), `${SESSION_PREFIX}root-link`);
			await symlink(target.root, linkedRoot);
			await expect(closeEvalSession(linkedRoot)).rejects.toThrow(/symlink/);
			await unlink(linkedRoot);

			const marker = join(target.root, ".session.json");
			const markerCopy = join(tmpdir(), "marker-copy.json");
			await writeFile(markerCopy, await readFile(marker));
			await unlink(marker);
			await symlink(markerCopy, marker);
			await expect(closeEvalSession(target.root)).rejects.toThrow(/independent regular file/);
			await unlink(marker);
			const validMarker = JSON.parse(await readFile(markerCopy, "utf8")) as Record<string, unknown>;
			const malformedMarkers: Array<Record<string, unknown>> = [
				{ schemaVersion: 2 },
				{ root: `${target.root}/different` },
				{ sessionId: "" },
				{ pid: 0 },
				{ createdAt: "invalid" },
			];
			for (const invalid of malformedMarkers) {
				await writeFile(marker, JSON.stringify({ ...validMarker, ...invalid }));
				await expect(closeEvalSession(target.root)).rejects.toThrow(/ownership record/);
			}
			await rm(target.root, { recursive: true, force: true });
			await rm(markerCopy, { force: true });

			await expect(closeEvalSession(`${tmpdir()}/missing/../${SESSION_PREFIX}traversal`)).rejects.toThrow(/traversal/);
			await expect(closeEvalSession(join(tmpdir(), `${SESSION_PREFIX}unsafe`, "..", "outside"))).rejects.toThrow(/immediate/);
			await expect(closeEvalSession(join(process.cwd(), `${SESSION_PREFIX}outside`))).rejects.toThrow(/immediate/);
		});
	});

	it("previews and removes only old dead-owner roots while retaining live owners", async () => {
		await withPrivateTempRoot(async () => {
			const live = await createEvalSession({ sessionId: "still-live", pid: process.pid });
			const stale = await createEvalSession({ sessionId: "finished", pid: 2_147_483_647 });
			await setOwnerAge(stale.root, 2_147_483_647, 60_000);

			const preview = await reapEvalSessions({ olderThanMs: 1_000, dryRun: true, includeLegacy: false });
			expect(preview.selected).toContain(stale.root);
			expect(preview.selected).not.toContain(live.root);
			expect(preview.removed).toEqual([]);
			expect(await lstat(stale.root)).toBeDefined();

			const removed = await reapEvalSessions({ olderThanMs: 1_000, dryRun: false, includeLegacy: false });
			expect(removed.selected).toContain(stale.root);
			expect(removed.removed).toContain(stale.root);
			expect(removed.selected).not.toContain(live.root);
			expect(await lstat(live.root)).toBeDefined();
			await closeEvalSession(live.root);
		});
	});

	it("requires explicit legacy inclusion and a 24-hour age floor", async () => {
		await withPrivateTempRoot(async () => {
			const legacy = await realpath(await mkdtemp(join(tmpdir(), SESSION_PREFIX)));
			const old = new Date(Date.now() - 25 * 60 * 60 * 1000);
			await utimes(legacy, old, old);
			const young = await realpath(await mkdtemp(join(tmpdir(), SESSION_PREFIX)));
			const withoutLegacy = await reapEvalSessions({ olderThanMs: 0, dryRun: true, includeLegacy: false });
			expect(withoutLegacy.selected).not.toContain(legacy);
			expect(withoutLegacy.selected).not.toContain(young);
			const preview = await reapEvalSessions({ olderThanMs: 0, dryRun: true, includeLegacy: true });
			expect(preview.selected).toContain(legacy);
			expect(preview.selected).not.toContain(young);
			expect(preview.removed).toEqual([]);
			const removed = await reapEvalSessions({ olderThanMs: 0, dryRun: false, includeLegacy: true });
			expect(removed.removed).toContain(legacy);
			expect(removed.removed).not.toContain(young);
			await expect(lstat(legacy)).rejects.toMatchObject({ code: "ENOENT" });
			await expect(lstat(young)).resolves.toBeDefined();
			await rm(young, { recursive: true, force: true });
		});
	});

	it("ignores unrelated temporary directories", async () => {
		await withPrivateTempRoot(async () => {
			const unrelated = await mkdtemp(join(tmpdir(), "not-an-eval-workspace-"));
			const external = await mkdtemp(join(tmpdir(), "external-eval-target-"));
			const old = new Date(Date.now() - 25 * 60 * 60 * 1000);
			await utimes(external, old, old);
			const linkedRoot = join(tmpdir(), `${SESSION_PREFIX}linked-${process.pid}`);
			await symlink(external, linkedRoot);
			const result = await reapEvalSessions({ olderThanMs: 0, dryRun: false, includeLegacy: true });
			expect(result.selected).not.toContain(unrelated);
			expect(result.removed).not.toContain(unrelated);
			expect(result.selected).not.toContain(linkedRoot);
			expect(result.removed).not.toContain(linkedRoot);
			await expect(lstat(unrelated)).resolves.toBeDefined();
			await expect(lstat(external)).resolves.toBeDefined();
			expect((await lstat(linkedRoot)).isSymbolicLink()).toBe(true);
			await unlink(linkedRoot);
			await rm(unrelated, { recursive: true, force: true });
			await rm(external, { recursive: true, force: true });
		});
	});
});
