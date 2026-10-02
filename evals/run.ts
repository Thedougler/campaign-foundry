/**
 * Parent entry for committed skill evals. In the omp eval kernel:
 *
 *   const { runSkillEvals } = await import("./evals/run.ts");
 *   await runSkillEvals({ skill: "theatre-of-the-mind" });
 */
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCases, createOutcome, runChecks, toRegExp, type Case, type Result } from "./check.ts";
import { bindRunnerTools, type RunnerToolRegistrar } from "./runner-tools.ts";
import { allocateEvalRun, closeEvalSession, createEvalSession } from "./workspaces.ts";
import { assertSourcesUnchanged, caseSourcePaths, recordSourceHashes, type SourceHashes } from "./sources.ts";

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
 baseline?: boolean;
 repositoryRoot?: string;
 closeSession?: boolean;
 network?: { https?: boolean; search?: boolean };
 register?: RunnerToolRegistrar;
 dispatch?: DispatchFn;
 waitAll?: (handles: DispatchHandle[]) => Promise<unknown[]>;
}

export interface SkillEvalCaseReport {
 id: string;
 controlRoot: string;
 outputRoot: string;
 completionEvidence?: { isolated: true; apply: false; hasRootChanges: false };
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


export function resolveSkillEval(skill: string, options: { casesFile?: string; skillRoot?: string; repositoryRoot?: string } = {}): SkillEvalTarget {
 const root = resolve(options.repositoryRoot ?? repoRoot);
 if (options.casesFile !== undefined && !options.casesFile.startsWith("/")) failPrepare(`cases file must be absolute: ${options.casesFile}`);
 const casesCandidates = options.casesFile
  ? [options.casesFile]
  : [
   join(root, ".omp/skills", skill, "evals/cases.yaml"),
   join(root, ".agents/skills", skill, "evals/cases.yaml"),
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

export function operationalInstructions(repositoryRoot: string, outputRoot: string, skillRoot?: string): string {
 return [
  "Preferences:",
  "- Active World: The Shattered Sea",
  "- Active Campaign: Shattered Sea",
  `Live repository: ${repositoryRoot}`,
  `Read the live repository with the supplied capabilities. Deliver files in your output directory: ${outputRoot}`,
  "Start as a production Wiki session: read wiki/The Shattered Sea/Shattered Sea/campaign-config.md and hot.md in that same Campaign folder, wiki/The Shattered Sea/index.md and the last ten entries in wiki/The Shattered Sea/log.md, then the start-here sources and the assigned skill with the references it selects.",
  "Search the Wiki proactively with qmd_query and qmd_get for people, places, Threads and Sessions the request touches. Read further pages as they bear on the deliverables.",
  ...(skillRoot ? [`Assigned skill: ${skillRoot} (${basename(skillRoot)}). Follow it for this task.`] : []),
  "Start every new page from its template in wiki/templates; updated pages conform to their template.",
  "Use write to save every new or changed page as complete text at its Wiki-relative .md path in the output directory; an optional leading wiki/ is accepted.",
  "Use write with path reply.md for your DM reply, and delete_page with a Wiki-relative .md path for each page removal.",
  "Read your output drafts using their absolute output paths. Finish with a short yield summary once all deliverables are saved.",
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

const ISOLATION_LINE = "\n\nIsolation: no changes captured.";


export async function runSkillEvals(options: SkillEvalRunOptions): Promise<SkillEvalReport> {
 const repositoryRoot = resolve(options.repositoryRoot ?? repoRoot);
 if (options.baseline && options.snapshotRoot) failPrepare("baseline and snapshotRoot cannot be combined");
 const target = resolveSkillEval(options.skill, { casesFile: options.casesFile, skillRoot: options.skillRoot, repositoryRoot });
 const selected = options.caseIds ? options.caseIds.map((id) => {
  const item = target.cases.find((candidate) => candidate.id === id);
  if (!item) failPrepare(`no case "${id}" in ${target.casesFile}`);
  return item;
 }) : target.cases;
 const kernel = options.register && options.dispatch ? { tool: options.register, agent: options.dispatch, waitAll: options.waitAll } : evalGlobals();
 const register = options.register ?? kernel.tool;
 const dispatch = options.dispatch ?? kernel.agent;
 const waitAll = options.waitAll ?? kernel.waitAll;
 const { root: sessionRoot } = await createEvalSession({ sessionId: `skill-eval-${target.skill}-${Date.now()}`, pid: process.pid });
 const reports: SkillEvalCaseReport[] = [];
 const running: Array<{ item: Case; controlRoot: string; outputRoot: string; hashes: SourceHashes; handle: DispatchHandle; report: SkillEvalCaseReport }> = [];
 try {
  // Native provider configuration owns concurrency limits, independently per provider.
  for (const item of selected) {
   const run = await allocateEvalRun(sessionRoot);
   const report: SkillEvalCaseReport = { id: item.id, controlRoot: run.controlRoot, outputRoot: run.outputRoot, checks: [], checkFailed: 0 };
   reports.push(report);
   try {
    const hashes = await recordSourceHashes(repositoryRoot, item, run.controlRoot);
    const skillRoot = options.baseline ? undefined : options.snapshotRoot ?? target.skillRoot;
    const bound = await bindRunnerTools({
     repositoryRoot, sessionRoot, runId: run.runId, caseId: item.id, case: item,
     qmd: { mode: "live-read-only", index: join(repositoryRoot, ".qmd/index.sqlite") },
    }, {
     targetSkillRoot: target.skillRoot, ...(skillRoot ? { skillRoot } : {}),
     ...(options.network ? { network: { https: options.network.https === true, search: options.network.search === true } } : {}),
    }, register);
    const brief = `${operationalInstructions(repositoryRoot, run.outputRoot, skillRoot)}\n\n${bound.runnerBrief}`;
    await writeFile(join(run.controlRoot, "runner-brief.md"), brief, { mode: 0o600 });
    const handle = await dispatch(brief, { agent: "test-subject", isolated: true, apply: false, tools: bound.toolNames });
    running.push({ item, controlRoot: run.controlRoot, outputRoot: run.outputRoot, hashes, handle, report });
   } catch (error) { report.executionError = (error as Error).message; }
  }
  const handles = running.map((run) => run.handle);
  let settled: unknown[];
  try {
   settled = waitAll ? await waitAll(handles) : await Promise.all(handles.map((handle) => handle.wait().catch((error: unknown) => error)));
  } catch {
   // A failed group wait still leaves each native handle available for settlement.
   settled = await Promise.all(handles.map((handle) => handle.wait().catch((error: unknown) => error)));
  }
  for (const [index, run] of running.entries()) {
   try {
    await assertSourcesUnchanged(repositoryRoot, run.hashes);
    if (typeof settled[index] !== "string" || !(settled[index] as string).endsWith(ISOLATION_LINE)) {
     throw new Error("INVALIDATED: isolated dispatch did not report no changes captured");
    }
    run.report.completionEvidence = { isolated: true, apply: false, hasRootChanges: false };
    run.report.checks = runChecks(run.item.checks ?? {}, createOutcome(join(repositoryRoot, "wiki"), run.outputRoot));
    run.report.checkFailed = run.report.checks.filter((result) => !result.ok).length;
    const rubrics = run.item.rubrics ?? [];
    if (!rubrics.length) continue;
    try {
     await assertSourcesUnchanged(repositoryRoot, run.hashes);
     const gradeBrief = [
      "Skill-eval Grade — pass/fail per rubric. Read the writing holistically and quote it.",
      "Return JSON {grades:[{rubric,pass,reason}]} with exactly one entry per rubric, verbatim rubric text.",
      `Read all delivered pages and reply.md in ${run.outputRoot}. The .deleted.json file, when present, lists page removals.`,
      `Read the live sources in ${repositoryRoot}: ${caseSourcePaths(run.item).join("; ") || "(none)"}, and any further live pages a rubric needs.`,
      `Original assignment: ${run.item.prompt}`,
      "## Rubrics", ...rubrics.map((rubric, i) => `${i + 1}. ${rubric}`),
     ].join("\n\n");
     const gradeHandle = await dispatch(gradeBrief, {
      agent: "prose-grader", isolated: true, apply: false,
      schema: {
       type: "object", required: ["grades"], properties: {
        grades: {
         type: "array", items: {
          type: "object", required: ["rubric", "pass", "reason"],
          properties: { rubric: { type: "string" }, pass: { type: "boolean" }, reason: { type: "string" } },
         }
        }
       }
      },
     });
     const graded = waitAll ? (await waitAll([gradeHandle]))[0] : await gradeHandle.wait();
     await assertSourcesUnchanged(repositoryRoot, run.hashes);
     run.report.grades = parseGrades(typeof graded === "string" ? JSON.parse(graded) : graded, rubrics);
     await writeFile(join(run.controlRoot, "grades.json"), `${JSON.stringify({ grades: run.report.grades }, null, 2)}\n`, { mode: 0o600 });
    } catch (error) {
     const message = (error as Error).message;
     if (message.startsWith("INVALIDATED:")) run.report.executionError = message;
     else run.report.gradeError = message;
    }
   } catch (error) { run.report.executionError = (error as Error).message; }
  }
 } finally {
  // A bind/dispatch failure must not remove grants while earlier children still run.
  await Promise.all(running.map((run) => run.handle.wait().catch(() => undefined)));
  if (options.closeSession !== false) await closeEvalSession(sessionRoot);
 }
 return { skill: target.skill, skillRoot: target.skillRoot, casesFile: target.casesFile, sessionRoot, cases: reports };
}
