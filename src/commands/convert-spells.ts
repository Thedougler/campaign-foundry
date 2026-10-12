import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join, relative, resolve } from "node:path";
import { Command } from "commander";
import { glob } from "tinyglobby";
import { UsageError } from "../check/errors.ts";
import { type ExportedSpell, parseSpells } from "../spells/convert.ts";
import { spellPage } from "../spells/page.ts";
import { slugify } from "../vault/dialect.ts";
import { CF, envOptions, readInput, realPath, requireTemplates, resolveEnv, type EnvFlags } from "./kit.ts";

interface ConvertSpellsFlags extends EnvFlags {
	out?: string;
	dryRun?: boolean;
	paths?: boolean;
}

export function convertSpellsCommand(): Command {
	const command = new Command("convert-spells")
		.description(
			"Convert a 5e tool Markdown export to minimal World-free Spell pages, keeping rules verbatim. No summaries or LLM calls. Slug collisions skip; existing pages are never overwritten. Exits 0 done, 2 usage error.",
		)
		.argument("<raw-file>", "spell export in raw/ or archive/; sources name its archive twin")
		.option("--out <dir>", "destination for Spell pages (default: <vault>/Spells)")
		.option("--dry-run", "list would-be pages and skips without writing anything")
		.option("--paths", "print only created repo-relative page paths, one per line (no output with --dry-run)");
	envOptions(command, { templates: true });
	return command
		.addHelpText(
			"after",
			`
Archive the input before writing pages. Missing archive twins are refused; dry-run needs no twin.
British spelling changes only where the spelling gate requires it; official D&D spellings stay.
Only spelling, spacing, table layout, scaling labels and punctuation are normalised: digit ranges use en dashes,
prose triple hyphens use em dashes, and source clause em dashes or double hyphens use commas. Code stays untouched.
Output: created/would-create/skip rows, then created/skipped counts. A collision anywhere in the
vault or destination is skipped, as is a duplicate slug in the same input. No file is overwritten.
With --paths, stdout holds only created repo-relative paths (wiki/Spells/…), suitable for log --page -.
Style and grammar findings are left for agents to repair through the normal page gate afterwards.
The first malformed block reports its title and source line, exits 2 and writes no pages. Fix that block and rerun.

Examples:
  ${CF} convert-spells raw/all-spells.md --dry-run
  mv raw/all-spells.md archive/all-spells.md
  ${CF} convert-spells archive/all-spells.md
  ${CF} convert-spells archive/spells.md --vault /tmp/test/wiki --root /tmp/test --out /tmp/test/wiki/Spells
  ${CF} convert-spells archive/spells.md --paths | ${CF} log --op ingest --title "Spells" --page -
`,
		)
		.action(async (file: string, flags: ConvertSpellsFlags) => {
			const env = resolveEnv(flags, "convert-spells");
			requireTemplates(env, "convert-spells");
			const hint = `${CF} convert-spells archive/<file>.md`;
			const text = await readInput(file, hint);
			let spells: ExportedSpell[];
			try {
				spells = parseSpells(text);
			} catch (error) {
				throw new UsageError(error instanceof Error ? error.message : String(error), hint);
			}
			if (spells.length === 0)
				throw new UsageError("No #### Spell Name headings or standalone # Spell Name found.", hint);
			const source = `archive/${basename(file)}`;
			if (!flags.dryRun && !existsSync(join(env.root, source))) {
				throw new UsageError(
					`Archive twin ${source} does not exist. Archive the input before converting.`,
					`mv ${relative(env.cwd, resolve(env.root, "raw", basename(file)))} ${relative(env.cwd, join(env.root, source))}\n  ${CF} convert-spells ${relative(env.cwd, join(env.root, source))}`,
				);
			}
			const out = flags.out ? resolve(env.cwd, flags.out) : join(env.vault, "Spells");
			const folders = new Set([env.vault, ...(existsSync(out) ? [out] : [])]);
			const occupied = new Map<string, string>();
			for (const folder of folders) {
				const paths = (
					await glob("**/*.md", {
						cwd: folder,
						onlyFiles: true,
						ignore: ["templates/**", ".obsidian/**", "node_modules/**"],
					})
				).sort();
				for (const path of paths) occupied.set(slugify(basename(path, ".md")), join(folder, path));
			}
			const template = await readFile(join(env.templates, "spell.md"), "utf8");
			let created = 0;
			let skipped = 0;
			let planned = 0;
			for (const spell of spells) {
				const slug = slugify(spell.title);
				if (!slug) throw new UsageError(`Spell title ${JSON.stringify(spell.title)} has no filename slug.`, hint);
				const target = join(out, `${slug}.md`);
				const display = relative(env.cwd, target);
				const collision = occupied.get(slug);
				if (collision) {
					skipped++;
					if (!flags.paths)
						process.stdout.write(`skip\t${display}\t${spell.title}\tslug held by ${relative(env.cwd, collision)}\n`);
					continue;
				}
				occupied.set(slug, target);
				if (flags.dryRun) {
					planned++;
					if (!flags.paths) process.stdout.write(`would-create\t${display}\t${spell.title}\tsource: ${source}\n`);
					continue;
				}
				const page = await spellPage(spell, source, template);
				if (created === 0) await mkdir(out, { recursive: true });
				try {
					await writeFile(target, page, { flag: "wx" });
				} catch (error) {
					if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
					skipped++;
					if (!flags.paths) process.stdout.write(`skip\t${display}\t${spell.title}\tfile already exists\n`);
					continue;
				}
				created++;
				process.stdout.write(
					flags.paths ? `${relative(env.root, realPath(target))}\n` : `created\t${display}\t${spell.title}\n`,
				);
			}
			if (!flags.paths)
				process.stdout.write(
					`created: ${created}, skipped: ${skipped}${flags.dryRun ? `, would-create: ${planned}` : ""}\n`,
				);
		});
}
