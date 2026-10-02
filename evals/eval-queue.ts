import { resolveSkillEval, type SkillEvalReport } from "./run.ts";

/** Sane defaults for the orchestrator: four eval cases in flight. */
export const EVAL_QUEUE_DEFAULTS = {
	evalConcurrency: 4,
} as const;

export interface EvalJob {
	skill: string;
	caseIds?: string[];
}

export function reportPassed(report: SkillEvalReport): boolean {
	return report.cases.every(
		(item) =>
			!item.executionError &&
			!item.gradeError &&
			item.checkFailed === 0 &&
			(item.grades ?? []).every((grade) => grade.pass),
	);
}

export function jobsForSkill(skill: string, options: { caseIds?: string[]; repositoryRoot?: string } = {}): EvalJob[] {
	const target = resolveSkillEval(skill, options);
	const ids = options.caseIds ?? target.cases.map((item) => item.id);
	return ids.map((id) => ({ skill, caseIds: [id] }));
}
