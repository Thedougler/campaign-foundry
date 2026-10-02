/**
 * Parent entry for committed skill evals. In the omp eval kernel:
 *
 *   const { runSkillEvals } = await import("./evals/run.ts");
 *   await runSkillEvals({ skill: "theatre-of-the-mind" });
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCases, runChecks, toRegExp, type Case, type Result } from "./check.ts";
import { bindRunnerTools, type RunnerPreparedWorkspace, type RunnerToolOptions, type RunnerToolRegistrar } from "./runner-tools.ts";
import { closeEvalSession } from "./workspaces.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export interface SkillEvalTarget {
	skill: string;
	skillRoot: string;
	casesFile: string;
	cases: Case[];
}

export interface SkillEvalRunOptions {
	skill: string;
	casesFile?: string;
	caseIds?: string[];
	skillRoot?: string;
	snapshotRoot?: string;
	closeSession?: boolean;
	network?: { https?: boolean; search?: boolean };
	register?: RunnerToolRegistrar;
	dispatch?: DispatchFn;
	waitAll?: (handles: DispatchHandle[]) => Promise<unknown[]>;
}

export interface SkillEvalCaseReport {
	id: string;
	worldRoot: string;
	checks: Result[];
	checkFailed: number;
	grades?: Array<{ rubric: string; pass: boolean; reason: string }>;
	gradeError?: string;
	executionError?: string;
}

export interface SkillEvalReport {
	skill: string;
	skillRoot: string;
	casesFile: string;
	sessionRoot: string;
	cases: SkillEvalCaseReport[];
}

export interface DispatchHandle {
	wait: (timeout?: number) => Promise<unknown>;
}

export type DispatchFn = (
	prompt: string,
	options: { agent: string; isolated: boolean; apply: boolean; tools?: string[]; schema?: Record<string, unknown> },
) => DispatchHandle | Promise<DispatchHandle>;

function failPrepare(message: string): never {
	throw new Error(message.startsWith("PREPARATION:") ? message : `PREPARATION: ${message}`);
}

function stdio(value: string | Buffer | null | undefined): string {
	if (value == null) return "";
	return typeof value === "string" ? value : value.toString("utf8");
}

function nodeScript(script: string, args: string[]): { status: number | null; stdout: string; stderr: string } {
	const run = spawnSync("node", [join(repoRoot, script), ...args], { cwd: repoRoot, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
	if (run.error) throw run.error;
	return { status: run.status, stdout: stdio(run.stdout), stderr: stdio(run.stderr) };
}

export function parseJsonObject(stdout: string, stderr: string, status: number | null, label: string): Record<string, unknown> {
	if (status !== 0) failPrepare(`${label} failed (${status ?? "null"}): ${(stderr || stdout).trim()}`);
	const start = stdout.indexOf("{");
	const end = stdout.lastIndexOf("}");
	if (start < 0 || end < start) failPrepare(`${label} returned no JSON`);
	let parsed: unknown;
	try {
		parsed = JSON.parse(stdout.slice(start, end + 1));
	} catch (error) {
		failPrepare(`${label} returned malformed JSON: ${(error as Error).message}`);
	}
	if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) failPrepare(`${label} JSON must be an object`);
	const record: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(parsed)) record[key] = value;
	return record;
}

export function resolveSkillEval(skill: string, options: { casesFile?: string; skillRoot?: string; repositoryRoot?: string } = {}): SkillEvalTarget {
	const root = resolve(options.repositoryRoot ?? repoRoot);
	if (options.casesFile !== undefined && !options.casesFile.startsWith("/")) failPrepare(`cases file must be absolute: ${options.casesFile}`);
	const casesCandidates = options.casesFile
		? [options.casesFile]
		: [
			join(root, ".omp/skills", skill, "evals/cases.yaml"),
			join(root, ".agents/skills", skill, "evals/cases.yaml"),
			join(root, "evals/cases", `${skill}.yaml`),
		];
	const casesFile = casesCandidates.find((path) => existsSync(path));
	if (!casesFile) failPrepare(`no cases.yaml for ${skill} (looked in ${casesCandidates.join(", ")})`);
	const skillCandidates = options.skillRoot
		? [options.skillRoot]
		: [join(root, ".omp/skills", skill), join(root, ".agents/skills", skill)];
	const skillRoot = skillCandidates.find((path) => existsSync(join(path, "SKILL.md")));
	if (!skillRoot) failPrepare(`no SKILL.md for ${skill}`);
	const cases = loadCases(casesFile);
	validateCaseRegexes(cases);
	return { skill, skillRoot, casesFile, cases };
}

export function validateCaseRegexes(cases: Case[]): void {
	for (const item of cases) {
		for (const kind of ["canon", "absent"] as const) {
			const map = item.checks?.[kind] ?? {};
			for (const patterns of Object.values(map)) {
				for (const pattern of patterns) toRegExp(pattern);
			}
		}
	}
}

export function operationalInstructions(worldRoot: string, skillRoot: string): string {
	return [
		"Preferences:",
		"- Active World: The Shattered Sea",
		"- Active Campaign: Shattered Sea",
		"Read the supplied preferences, then $W's Campaign hot.md, World index.md and last ten log.md entries, then the start-here sources and assigned skill/reference files.",
		"",
		`Write root $W: ${worldRoot}`,
		`Assigned skill: ${skillRoot} (${basename(skillRoot)}). Follow it for this task.`,
		"Use only the supplied capabilities. Additional read-only source lookups may use the granted live Wiki, Raw, Archive, templates and assigned skill/reference files.",
		"",
		'Complete File through the full check/fix capability against this World with --vault "$W/wiki" --root "$W" --templates "$W/wiki/templates" and all 13 layers. A page filter is not File completion. Then save the DM reply at $W/.eval/output.md.',
	].join("\n");
}

function evalGlobals(): { tool: RunnerToolRegistrar; agent: DispatchFn; waitAll?: SkillEvalRunOptions["waitAll"] } {
	const bag = globalThis as unknown as {
		tool?: RunnerToolRegistrar;
		agent?: DispatchFn;
		wait?: (handles: DispatchHandle[], options?: { timeout?: number }) => Promise<unknown>;
	};
	if (typeof bag.tool !== "function" || typeof bag.agent !== "function") {
		throw new Error("runSkillEvals needs the omp eval kernel (tool + agent). Import evals/run.ts then await runSkillEvals({ skill })");
	}
	const waitFn = bag.wait;
	return {
		tool: bag.tool,
		agent: bag.agent,
		waitAll: typeof waitFn === "function"
			? async (handles) => {
				const result = await waitFn(handles);
				return Array.isArray(result) ? result : [result];
			}
			: undefined,
	};
}

function asString(value: unknown, label: string): string {
	if (typeof value !== "string" || value === "") failPrepare(`${label} missing`);
	return value;
}

function liveQmd(value: unknown, label: string): RunnerPreparedWorkspace["qmd"] {
	if (typeof value !== "object" || value === null) failPrepare(`${label} is missing live-read-only QMD`);
	if (!("mode" in value) || !("index" in value)) failPrepare(`${label} is missing live-read-only QMD`);
	if (value.mode !== "live-read-only" || typeof value.index !== "string" || value.index === "") {
		failPrepare(`${label} is missing live-read-only QMD`);
	}
	return { mode: "live-read-only", index: value.index };
}

async function waitHandle(handle: DispatchHandle): Promise<unknown> {
	return await handle.wait();
}

function wave<T>(items: T[], size: number): T[][] {
	const groups: T[][] = [];
	for (let index = 0; index < items.length; index += size) groups.push(items.slice(index, index + size));
	return groups;
}

function writingPages(item: Case): string[] {
	const pages = new Set<string>(item.checks?.pages ?? []);
	for (const map of [item.checks?.canon, item.checks?.sections, item.checks?.absent]) {
		for (const page of Object.keys(map ?? {})) pages.add(page);
	}
	return [...pages];
}

async function collectWriting(worldRoot: string, item: Case): Promise<string> {
	const chunks: string[] = [];
	const output = join(worldRoot, ".eval", "output.md");
	if (existsSync(output)) chunks.push(`# output.md\n${await readFile(output, "utf8")}`);
	for (const page of writingPages(item)) {
		const file = join(worldRoot, "wiki", page.endsWith(".md") ? page : `${page}.md`);
		if (existsSync(file)) chunks.push(`# ${page}\n${await readFile(file, "utf8")}`);
	}
	return chunks.join("\n\n");
}

async function collectSources(baselineWiki: string, item: Case): Promise<string> {
	const chunks: string[] = [];
	for (const page of item.source_pages ?? []) {
		const file = join(baselineWiki, page.endsWith(".md") ? page : `${page}.md`);
		if (!existsSync(file)) continue;
		const text = await readFile(file, "utf8");
		chunks.push(`# ${page}\n${text}`);
	}
	return chunks.join("\n\n");
}

function parseGrades(value: unknown, rubrics: string[]): Array<{ rubric: string; pass: boolean; reason: string }> {
	let list: unknown;
	if (typeof value === "object" && value !== null && "grades" in value) list = value.grades;
	else list = value;
	if (!Array.isArray(list)) throw new Error("grader returned no grades");
	const grades = list.map((entry) => {
		if (typeof entry !== "object" || entry === null) throw new Error("grader grade is not an object");
		if (!("rubric" in entry) || !("pass" in entry) || !("reason" in entry)) throw new Error("grader grade missing rubric, pass, or reason");
		if (typeof entry.rubric !== "string" || typeof entry.pass !== "boolean" || typeof entry.reason !== "string") {
			throw new Error("grader grade missing rubric, pass, or reason");
		}
		return { rubric: entry.rubric, pass: entry.pass, reason: entry.reason };
	});
	if (grades.length !== rubrics.length) throw new Error(`grader returned ${grades.length} grades, expected ${rubrics.length}`);
	for (const [index, rubric] of rubrics.entries()) {
		if (grades[index]?.rubric !== rubric) throw new Error("grader rubric text does not match the case");
	}
	return grades;
}

export async function runSkillEvals(options: SkillEvalRunOptions): Promise<SkillEvalReport> {
	const target = resolveSkillEval(options.skill, { casesFile: options.casesFile, skillRoot: options.skillRoot });
	const selected = options.caseIds
		? options.caseIds.map((id) => {
			const found = target.cases.find((item) => item.id === id);
			if (!found) failPrepare(`no case "${id}" in ${target.casesFile}`);
			return found;
		})
		: target.cases;
	const register = options.register;
	const dispatch = options.dispatch;
	const kernel = register && dispatch ? { tool: register, agent: dispatch, waitAll: options.waitAll } : evalGlobals();
	const boundRegister = register ?? kernel.tool;
	const boundDispatch = dispatch ?? kernel.agent;
	const waitAll = options.waitAll ?? kernel.waitAll;

	const started = nodeScript("evals/prepare.ts", ["--session-start"]);
	const sessionPayload = parseJsonObject(started.stdout, started.stderr, started.status, "session-start");
	const sessionRoot = asString(sessionPayload.root, "sessionRoot");

	const reports: SkillEvalCaseReport[] = [];
	try {
		for (const group of wave(selected, 4)) {
			const preparedRuns = group.map((item) => {
				const preparedRun = nodeScript("evals/prepare.ts", [
					"--cases",
					target.casesFile,
					"--case",
					item.id,
					"--session-root",
					sessionRoot,
				]);
				const payload = parseJsonObject(preparedRun.stdout, preparedRun.stderr, preparedRun.status, `prepare ${item.id}`);
				const worldRoot = asString(payload.root, `${item.id} root`);
				const runnerInput = asString(payload.runnerInput, `${item.id} runnerInput`);
				const prepared: RunnerPreparedWorkspace = {
					root: worldRoot,
					runnerInput,
					caseId: item.id,
					case: { prompt: item.prompt },
					qmd: liveQmd(payload.qmd, item.id),
				};
				return { item, prepared, payload };
			});

			const dispatched = [];
			for (const run of preparedRuns) {
				const assignedSkill = options.snapshotRoot ?? target.skillRoot;
				const toolOptions: RunnerToolOptions = {
					targetSkillRoot: target.skillRoot,
					skillRoot: assignedSkill,
					...(options.network
						? { network: { https: options.network.https === true, search: options.network.search === true } }
						: {}),
				};
				const bound = await bindRunnerTools(run.prepared, toolOptions, boundRegister);
				const runnerBrief = `${bound.runnerBrief}\n\n${operationalInstructions(run.prepared.root, assignedSkill)}\n`;
				const controlRoot = join(sessionRoot, "control", basename(run.prepared.root));
				await mkdir(controlRoot, { recursive: true });
				await writeFile(join(controlRoot, "runner-brief.md"), runnerBrief);
				dispatched.push({
					...run,
					bound,
					handle: await boundDispatch(runnerBrief, {
						agent: "test-subject",
						isolated: true,
						apply: false,
						tools: bound.toolNames,
					}),
				});
			}

			const handles = dispatched.map((run) => run.handle);
			if (waitAll) await waitAll(handles);
			else {
				for (const batch of wave(handles, 4)) {
					await Promise.all(batch.map((handle) => waitHandle(handle)));
				}
			}

			for (const run of dispatched) {
				const worldRoot = run.prepared.root;
				const verify = nodeScript("evals/prepare.ts", ["--verify", worldRoot]);
				if (verify.status !== 0) {
					reports.push({
						id: run.item.id,
						worldRoot,
						checks: [],
						checkFailed: 0,
						executionError: `verify failed: ${(verify.stderr || verify.stdout).trim()}`,
					});
					continue;
				}
				const checkRun = nodeScript("evals/check.ts", [
					target.skill,
					run.item.id,
					join(worldRoot, "wiki"),
					"--cases",
					target.casesFile,
					"--root",
					worldRoot,
					"--templates",
					join(worldRoot, "wiki", "templates"),
				]);
				const checks = runChecks(run.item.checks ?? {}, join(worldRoot, "wiki"));
				if (checkRun.status !== 0) {
					checks.push({ ok: false, kind: "gate", detail: (checkRun.stdout || checkRun.stderr).trim().slice(0, 500) });
				}
				const report: SkillEvalCaseReport = {
					id: run.item.id,
					worldRoot,
					checks,
					checkFailed: checks.filter((result) => !result.ok).length,
				};
				const rubrics = run.item.rubrics ?? [];
				if (rubrics.length > 0) {
					try {
						const writing = await collectWriting(worldRoot, run.item);
						const sources = await collectSources(asString(run.payload.baseline, "baseline"), run.item);
						const gradeBrief = [
							"Skill-eval Grade — pass/fail per rubric. Read the writing and quote it.",
							"Return {grades:[{rubric,pass,reason}]} with exactly one entry per rubric, verbatim rubric text.",
							`Frozen starting-source root: ${dirname(asString(run.payload.baseline, "baseline"))}. Read needed Wiki/Archive passages there, including full assigned Transcripts. Use these frozen sources, not the live Wiki or your worktree.`,
							`Authored World root: ${worldRoot}. Read output and checked pages here. Keep both roots unchanged.`,
							`Original assignment: ${run.item.prompt}`,
							"",
							"## Rubrics",
							...rubrics.map((rubric, index) => `${index + 1}. ${rubric}`),
							"",
							"## Authored writing",
							writing || "(no output.md or checked pages)",
							"",
							"## Starting-source excerpts",
							sources || "(none)",
						].join("\n");
						const gradeHandle = await boundDispatch(gradeBrief, {
							agent: "prose-grader",
							isolated: true,
							apply: false,
							schema: {
								type: "object",
								required: ["grades"],
								properties: {
									grades: {
										type: "array",
										items: {
											type: "object",
											required: ["rubric", "pass", "reason"],
											properties: {
												rubric: { type: "string" },
												pass: { type: "boolean" },
												reason: { type: "string" },
											},
										},
									},
								},
							},
						});
						const graded = waitAll ? (await waitAll([gradeHandle]))[0] : await waitHandle(gradeHandle);
						report.grades = parseGrades(graded, rubrics);
						await writeFile(
							join(sessionRoot, "control", basename(worldRoot), "grades.json"),
							`${JSON.stringify({ grades: report.grades }, null, 2)}\n`,
						);
					} catch (error) {
						report.gradeError = (error as Error).message;
					}
				}
				const verifyAfter = nodeScript("evals/prepare.ts", ["--verify", worldRoot]);
				if (verifyAfter.status !== 0) {
					report.executionError = `post-grade verify failed: ${(verifyAfter.stderr || verifyAfter.stdout).trim()}`;
				}
				reports.push(report);
			}
		}
	} finally {
		if (options.closeSession !== false) await closeEvalSession(sessionRoot);
	}

	return {
		skill: target.skill,
		skillRoot: target.skillRoot,
		casesFile: target.casesFile,
		sessionRoot,
		cases: reports,
	};
}
