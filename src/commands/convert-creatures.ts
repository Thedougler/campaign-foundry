import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, join, relative, resolve } from "node:path";
import { Command } from "commander";
import { glob } from "tinyglobby";
import { UsageError } from "../check/errors.ts";
import {
	type FivetoolsMonster,
	creatureTitle,
	duplicateNames,
	parseBestiary,
	sortKeys,
	toStatblock,
} from "../creatures/convert.ts";
import { FIVETOOLS_COMMIT, ensureFivetoolsData, loadBookNames, renderStatblocks } from "../creatures/fivetools.ts";
import { creaturePage } from "../creatures/page.ts";
import { slugify } from "../vault/dialect.ts";
import { CF, envOptions, readInput, realPath, resolveEnv, type EnvFlags } from "./kit.ts";

interface ConvertCreaturesFlags extends EnvFlags {
	out?: string;
	dryRun?: boolean;
	paths?: boolean;
}

export function convertCreaturesCommand(): Command {
	const command = new Command("convert-creatures")
		.description(
			"Convert a 5etools bestiary JSON export to minimal World-free Creature pages. No summaries or LLM calls. Slug collisions skip; existing pages are never overwritten. Exits 0 done, 2 usage error.",
		)
		.argument("<raw-file>", "bestiary JSON in raw/ or archive/; sources name its archive twin")
		.option("--out <dir>", "destination for Creature pages (default: <vault>/Creatures)")
		.option("--dry-run", "list would-be pages and skips without writing anything")
		.option("--paths", "print only created repo-relative page paths, one per line (no output with --dry-run)");
	envOptions(command);
	return command
		.addHelpText(
			"after",
			`
Archive the input before writing pages. Missing archive twins are refused; dry-run needs no twin.
A 5etools markdown export is not accepted: re-export it as JSON.
Output: created/would-create/skip rows, then created/skipped counts. A collision anywhere in the
vault or destination is skipped, as is a monster missing from the pinned 5etools data. No file is overwritten.
With --paths, stdout holds only created repo-relative paths (wiki/Creatures/…), suitable for log --page -.
Style and grammar findings are left for agents to repair through the normal page gate afterwards.

Examples:
  ${CF} convert-creatures raw/bestiary-sublist-data.json --dry-run
  mv raw/bestiary-sublist-data.json archive/bestiary-sublist-data.json
  ${CF} convert-creatures archive/bestiary-sublist-data.json
  ${CF} convert-creatures archive/bestiary.json --vault /tmp/test/wiki --root /tmp/test --out /tmp/test/wiki/Creatures
  ${CF} convert-creatures archive/bestiary.json --paths | ${CF} log --op ingest --title "Creatures" --page -
`,
		)
		.action(async (file: string, flags: ConvertCreaturesFlags) => {
			const env = resolveEnv(flags, "convert-creatures");
			const hint = `${CF} convert-creatures archive/<file>.json`;
			const text = await readInput(file, hint);
			let monsters: FivetoolsMonster[];
			try {
				monsters = parseBestiary(text);
			} catch (error) {
				throw new UsageError(error instanceof Error ? error.message : String(error), hint);
			}
			const source = `archive/${basename(file)}`;
			if (!flags.dryRun && !existsSync(join(env.root, source))) {
				throw new UsageError(
					`Archive twin ${source} does not exist. Archive the input before converting.`,
					`mv ${relative(env.cwd, resolve(env.root, "raw", basename(file)))} ${relative(env.cwd, join(env.root, source))}\n  ${CF} convert-creatures ${relative(env.cwd, join(env.root, source))}`,
				);
			}
			const out = flags.out ? resolve(env.cwd, flags.out) : join(env.vault, "Creatures");
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
			const duplicates = duplicateNames(monsters);
			const pending = monsters.filter((monster) => !occupied.has(slugify(creatureTitle(monster, duplicates))));
			let rendered = new Map<string, Record<string, unknown>>();
			let books = new Map<string, string>();
			if (pending.length) {
				const dataDir = await ensureFivetoolsData(env.root);
				rendered = await renderStatblocks(pending, dataDir);
				if (!flags.dryRun) books = await loadBookNames(dataDir);
			}
			const missing = `not in 5etools data ${FIVETOOLS_COMMIT.slice(0, 7)}`;
			let created = 0;
			let skipped = 0;
			let planned = 0;
			for (const monster of monsters) {
				const title = creatureTitle(monster, duplicates);
				const slug = slugify(title);
				if (!slug) throw new UsageError(`Creature title ${JSON.stringify(title)} has no filename slug.`, hint);
				const target = join(out, `${slug}.md`);
				const display = relative(env.cwd, target);
				const collision = occupied.get(slug);
				if (collision) {
					skipped++;
					if (!flags.paths)
						process.stdout.write(`skip\t${display}\t${title}\tslug held by ${relative(env.cwd, collision)}\n`);
					continue;
				}
				const block = rendered.get(`${monster.name}|${monster.source}`.toLowerCase());
				if (!block) {
					skipped++;
					if (!flags.paths) process.stdout.write(`skip\t${display}\t${title}\t${missing}\n`);
					continue;
				}
				occupied.set(slug, target);
				if (flags.dryRun) {
					planned++;
					if (!flags.paths) process.stdout.write(`would-create\t${display}\t${title}\tsource: ${source}\n`);
					continue;
				}
				const page = await creaturePage({
					title,
					sortKeys: sortKeys(monster, books),
					statblock: await toStatblock(block),
					sources: [source],
				});
				if (created === 0) await mkdir(out, { recursive: true });
				try {
					await writeFile(target, page, { flag: "wx" });
				} catch (error) {
					if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
					skipped++;
					if (!flags.paths) process.stdout.write(`skip\t${display}\t${title}\tfile already exists\n`);
					continue;
				}
				created++;
				process.stdout.write(
					flags.paths ? `${relative(env.root, realPath(target))}\n` : `created\t${display}\t${title}\n`,
				);
			}
			if (!flags.paths)
				process.stdout.write(
					`created: ${created}, skipped: ${skipped}${flags.dryRun ? `, would-create: ${planned}` : ""}\n`,
				);
		});
}
