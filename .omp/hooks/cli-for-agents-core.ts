import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { isAbsolute, join, normalize, relative, resolve, sep } from "node:path";

export const TRACKED_SKILL = "cli-for-agents";
export const SKILL_URI = "skill://cli-for-agents";
export const REMINDER_MARKER = "[cli-for-agents-hook]";
export const REMINDER =
	`${REMINDER_MARKER} Read skill://cli-for-agents before editing script or program files ` +
	`(at ~/.agents/skills/cli-for-agents/SKILL.md when skill:// does not resolve), then align the edit with it.`;

export const CODE_EXTENSIONS: Record<string, true> = {
	".ts": true,
	".mts": true,
	".js": true,
	".mjs": true,
	".py": true,
	".sh": true,
};

const CODE_ROOTS: Record<string, true> = { src: true, scripts: true, test: true, python: true };
const SESSION_ID = /^[\w.-]{1,128}$/u;

export function isTrackedSkillPath(path: string): boolean {
	if (!path || path.length > 4096) return false;
	const value = path.trim().replaceAll("\\", "/");
	if (/^skill:\/\/cli-for-agents(?:\/|$)/iu.test(value)) return true;
	return /(?:^|\/)cli-for-agents(?:\/SKILL\.md)?\/?$/iu.test(value);
}

export function isCodeMutationTarget(path: string, cwd: string, repoRoot: string): boolean {
	if (!path || path.length > 4096 || path.includes("\0")) return false;
	if (/^[a-z][a-z\d+.-]*:\/\//iu.test(path) && !path.startsWith("file:")) return false;
	const root = resolve(repoRoot);
	let candidate: string;
	try {
		candidate = normalize(resolve(isAbsolute(path) ? path : join(cwd, path)));
	} catch {
		return false;
	}
	const rel = relative(root, candidate);
	if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) return false;
	const slash = rel.replaceAll("\\", "/");
	const base = slash.split("/").pop() ?? "";
	const dot = base.lastIndexOf(".");
	const ext = dot > 0 ? base.slice(dot).toLowerCase() : "";
	if (!CODE_EXTENSIONS[ext]) return false;
	const top = slash.split("/")[0] ?? "";
	return CODE_ROOTS[top] === true;
}

/** Paths from write/edit input: top-level path fields and edit hashline headers. */
export function extractInputPaths(toolName: string, input: Record<string, unknown>): string[] {
	const out: string[] = [];
	const seen: Record<string, true> = {};
	const add = (value: unknown) => {
		if (typeof value !== "string" || !value || value.length > 4096 || seen[value]) return;
		seen[value] = true;
		out.push(value);
	};
	for (const key of ["path", "paths", "file_path", "filePath"]) {
		const value = input[key];
		if (Array.isArray(value)) for (const p of value.slice(0, 32)) add(p);
		else add(value);
	}
	if (toolName === "edit") {
		const patch = input.input ?? input._input ?? input.patch;
		if (typeof patch === "string" && patch.length <= 1_048_576) {
			for (const line of patch.split(/\r?\n/u)) {
				const header = /^\[([^\r\n]+)\]$/u.exec(line);
				if (header?.[1]) {
					const raw = header[1].trim().replace(/#[\da-f]{4}$/iu, "");
					add(/^(["']).*\1$/u.test(raw) ? raw.slice(1, -1) : raw);
				}
			}
		}
	}
	return out;
}

export function reminderForMutation(skillRead: boolean, codeTarget: boolean): string | undefined {
	return !skillRead && codeTarget ? REMINDER : undefined;
}

/** Marker path: `<stateDir>/<sessionId>/cli-for-agents`. */
export function skillReadMarkerPath(stateDir: string, sessionId: string): string {
	if (!SESSION_ID.test(sessionId)) throw new Error("invalid session id for skill-read store");
	return join(stateDir, sessionId, TRACKED_SKILL);
}

export function hasSkillRead(stateDir: string, sessionId: string): boolean {
	try {
		readFileSync(skillReadMarkerPath(stateDir, sessionId));
		return true;
	} catch (error) {
		if (error instanceof Error && /invalid session id/i.test(error.message)) throw error;
		return false;
	}
}

export function markSkillRead(stateDir: string, sessionId: string): void {
	const marker = skillReadMarkerPath(stateDir, sessionId);
	mkdirSync(join(stateDir, sessionId), { recursive: true });
	writeFileSync(marker, "");
}
