import { Command } from "commander";
import { packageSkill, validateSkill } from "../../evals/authoring.ts";

/** Headless native-frontmatter validation; unknown extension keys remain allowed. */
export function validateCommand(): Command {
	return new Command("validate")
		.exitOverride()
		.showHelpAfterError("Example: cf eval validate .omp/skills/skill-creator\nRun cf eval validate --help for options.")
		.description("Validate a skill's native omp frontmatter and directory name.")
		.argument("<skill-dir>", "directory containing SKILL.md")
		.addHelpText(
			"after",
			`
Checks name, description and declared native invocation fields. Does not apply
Anthropic-specific key, name-length or description-character restrictions.
Success prints JSON; failures identify the offending path and how to fix it.

Exit codes:
  0  valid    2  invalid metadata or usage error

Examples:
  cf eval validate .omp/skills/skill-creator
  cf eval validate /tmp/my-skill`,
		)
		.action(async (skillDir: string) => {
			const skill = await validateSkill(skillDir);
			process.stdout.write(`${JSON.stringify({ valid: true, skillDir: skill.skillDir, skillFile: skill.skillFile, name: skill.name, description: skill.description }, null, 2)}\n`);
		});
}

interface PackageFlags {
	output: string;
}

/** Optional user-requested distribution, without a runner or viewer process. */
export function packageCommand(): Command {
	return new Command("package")
		.exitOverride()
		.showHelpAfterError("Example: cf eval package .omp/skills/skill-creator --output /tmp/skill-creator.skill\nRun cf eval package --help for options.")
		.description("Validate and package a skill as a real ZIP-format .skill bundle.")
		.argument("<skill-dir>", "directory containing SKILL.md")
		.requiredOption("--output <bundle.skill>", "explicit output file ending in .skill (replaced only after successful packaging)")
		.addHelpText(
			"after",
			`
Includes one top-level skill folder, excluding root evals/, dependency/cache/VCS
directories, OS junk, bytecode and existing .skill bundles. Symbolic links and
special files are rejected rather than following paths outside the skill.
Creates the output parent directory if needed. Success prints JSON with the
output path, archive files and exclusions. No interactive prompts.

Exit codes:
  0  packaged    2  invalid metadata, unsafe files or usage error

Examples:
  cf eval package .omp/skills/skill-creator --output dist/skill-creator.skill
  cf eval package /tmp/my-skill --output /tmp/my-skill.skill`,
		)
		.action(async (skillDir: string, flags: PackageFlags) => {
			const result = await packageSkill(skillDir, flags.output);
			process.stdout.write(`${JSON.stringify({ packaged: true, ...result }, null, 2)}\n`);
		});
}
