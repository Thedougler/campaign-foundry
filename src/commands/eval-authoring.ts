import { Command } from "commander";
import { SkillReferenceError, validateSkill } from "../../evals/authoring.ts";
import { buildSkillGraph } from "../../evals/skill-graph.ts";
import { CF, resolveRoot, rootOption } from "./kit.ts";

/**
 * Print a SkillReferenceError's findings and fail with exit code 1, the gate convention of
 * `check`: broken references are findings, not usage errors.
 */
function reportBrokenReferences(error: unknown, rerun: string): void {
	if (!(error instanceof SkillReferenceError)) throw error;
	process.stdout.write(`${error.message}\n${rerun}\n`);
	process.exitCode = 1;
}

interface ValidateFlags {
	root?: string;
}

/** Headless native-frontmatter validation; unknown extension keys remain allowed. */
export function validateCommand(): Command {
	const command = new Command("validate")
		.exitOverride()
		.showHelpAfterError(
			`Example: ${CF} eval validate .omp/skills/skill-creator\nRun ${CF} eval validate --help for options.`,
		)
		.description(
			"Validate a skill's native omp frontmatter, directory name, eval cases and Markdown/skill:// references.",
		)
		.argument("<skill-dir>", "directory containing SKILL.md");
	rootOption(command);
	return command
		.addHelpText(
			"after",
			`
Checks name, description, declared native invocation fields, relative Markdown links and
skill:// references in SKILL.md and the skill-local Markdown files it links to (one level, no
further) plus every file under references/: each relative path must resolve and each Markdown
anchor must match a heading, and each skill://<name>[/<path>] must name a skill under the root's
.omp/skills or .agents/skills, with <path> a file there (an allowlisted external skill passes
without a path check).
If evals/cases.yaml exists, validates it with the eval runner's case schema: ids, prompts,
subject, source paths, fixtures, checks and rubrics. Invalid case metadata exits 2.
Does not apply Anthropic-specific key, name-length or description-character restrictions.
Success prints JSON; failures identify the offending file, line and how to fix it.

Exit codes:
  0  valid    1  broken references    2  invalid metadata or usage error

Examples:
  ${CF} eval validate .omp/skills/skill-creator
  ${CF} eval validate /tmp/my-skill
  ${CF} eval validate /tmp/my-skill --root .`,
		)
		.action(async (skillDir: string, flags: ValidateFlags) => {
			try {
				const skill = await validateSkill(skillDir, { root: resolveRoot(flags.root) });
				process.stdout.write(
					`${JSON.stringify({ valid: true, skillDir: skill.skillDir, skillFile: skill.skillFile, name: skill.name, description: skill.description }, null, 2)}\n`,
				);
			} catch (error) {
				reportBrokenReferences(
					error,
					`Repair each listed reference, then run ${CF} eval validate ${JSON.stringify(skillDir)}.`,
				);
			}
		});
}

interface GraphFlags {
	root?: string;
}

/** The repo skill graph as JSON: the typed edges behind validate and each skill's related files. */
export function graphCommand(): Command {
	const command = new Command("graph")
		.exitOverride()
		.showHelpAfterError(`Example: ${CF} eval graph\nRun ${CF} eval graph --help for options.`)
		.description(
			"Print the skill graph as JSON: every repo skill with its skill links and the page templates it names.",
		);
	rootOption(command);
	return command
		.addHelpText(
			"after",
			`
One entry per skill name, sorted by name; a name held by both .omp/skills and .agents/skills
is one entry reading both directories (.omp/skills is the source of truth). Each entry holds:
  skill      the skill's name
  links      skills it points at, from skill://<name> references and bare backticked skill
             names; repo skills and allowlisted external skills only, self-links dropped
  templates  the wiki/templates/<template>.md files it names, by path or as templates/<template>.md,
             normalised to wiki/templates/<template>.md
Scanned files: SKILL.md, every file under references/ and the skill-local Markdown files
SKILL.md links to (one level). Code fences are ignored. \`eval validate\` fails on the
skill:// references that resolve to nothing; this command reports the graph as it stands.

Exit codes:
  0  printed    2  usage error

Examples:
  ${CF} eval graph
  ${CF} eval graph --root /Users/nick/campaign-foundry
  ${CF} eval graph | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).filter(e=>e.links.includes("lint")).length))'`,
		)
		.action(async (flags: GraphFlags) => {
			const graph = await buildSkillGraph(resolveRoot(flags.root));
			process.stdout.write(`${JSON.stringify(graph, null, 2)}\n`);
		});
}
