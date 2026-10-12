import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join, relative, resolve } from "node:path";
import { Command } from "commander";
import { glob } from "tinyglobby";
import { UsageError } from "../check/errors.ts";
import { type ExportedItem, parseItems } from "../items/convert.ts";
import { itemPage } from "../items/page.ts";
import { slugify } from "../vault/dialect.ts";
import { CF, envOptions, readInput, realPath, requireTemplates, resolveEnv, type EnvFlags } from "./kit.ts";

interface ConvertItemsFlags extends EnvFlags {
	out?: string;
	dryRun?: boolean;
	paths?: boolean;
}

export function convertItemsCommand(): Command {
	const command = new Command("convert-items")
		.description(
			"Convert a 5e tool Markdown export to minimal World-free Item pages, keeping rules verbatim. No summaries or LLM calls. Slug collisions skip; existing pages are never overwritten. Exits 0 done, 2 usage error.",
		)
		.argument("<raw-file>", "item export in raw/ or archive/; sources name its archive twin")
		.option("--out <dir>", "destination for Item pages (default: <vault>/Items)")
		.option("--dry-run", "list would-be pages and skips without writing anything")
		.option("--paths", "print only created repo-relative page paths, one per line (no output with --dry-run)");
	envOptions(command, { templates: true });
	return command
		.addHelpText(
			"after",
			`
Archive the input before writing pages. Missing archive twins are refused; dry-run needs no twin.
British spelling changes only where the spelling gate requires it; official D&D spellings stay.
Output: created/would-create/skip rows, then created/skipped counts. A collision anywhere in the
vault or destination is skipped, as is a duplicate slug in the same input. No file is overwritten.
With --paths, stdout holds only created repo-relative paths (wiki/Items/…), suitable for log --page -.

Examples:
  ${CF} convert-items raw/all-magic-items.md --dry-run
  mv raw/all-magic-items.md archive/all-magic-items.md
  ${CF} convert-items archive/all-magic-items.md
  ${CF} convert-items archive/items.md --vault /tmp/test/wiki --root /tmp/test --out /tmp/test/wiki/Items
  ${CF} convert-items archive/items.md --paths | ${CF} log --op ingest --title "Items" --page -
`,
		)
		.action(async (file: string, flags: ConvertItemsFlags) => {
			const env = resolveEnv(flags, "convert-items");
			requireTemplates(env, "convert-items");
			const hint = `${CF} convert-items archive/<file>.md`;
			const text = await readInput(file, hint);
			let items: ExportedItem[];
			try {
				items = parseItems(text);
			} catch (error) {
				throw new UsageError(error instanceof Error ? error.message : String(error), hint);
			}
			if (items.length === 0) throw new UsageError("No #### Item Name headings found.", hint);
			const source = `archive/${basename(file)}`;
			if (!flags.dryRun && !existsSync(join(env.root, source))) {
				throw new UsageError(
					`Archive twin ${source} does not exist. Archive the input before converting.`,
					`mv ${relative(env.cwd, resolve(env.root, "raw", basename(file)))} ${relative(env.cwd, join(env.root, source))}\n  ${CF} convert-items ${relative(env.cwd, join(env.root, source))}`,
				);
			}
			const out = flags.out ? resolve(env.cwd, flags.out) : join(env.vault, "Items");
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
			const template = await readFile(join(env.templates, "item.md"), "utf8");
			let created = 0;
			let skipped = 0;
			let planned = 0;
			for (const item of items) {
				const slug = slugify(item.title);
				if (!slug) throw new UsageError(`Item title ${JSON.stringify(item.title)} has no filename slug.`, hint);
				const target = join(out, `${slug}.md`);
				const display = relative(env.cwd, target);
				const collision = occupied.get(slug);
				if (collision) {
					skipped++;
					if (!flags.paths)
						process.stdout.write(`skip\t${display}\t${item.title}\tslug held by ${relative(env.cwd, collision)}\n`);
					continue;
				}
				occupied.set(slug, target);
				if (flags.dryRun) {
					planned++;
					if (!flags.paths) process.stdout.write(`would-create\t${display}\t${item.title}\tsource: ${source}\n`);
					continue;
				}
				const page = await itemPage(item, source, template);
				if (created === 0) await mkdir(out, { recursive: true });
				try {
					await writeFile(target, page, { flag: "wx" });
				} catch (error) {
					if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
					skipped++;
					if (!flags.paths) process.stdout.write(`skip\t${display}\t${item.title}\tfile already exists\n`);
					continue;
				}
				created++;
				process.stdout.write(
					flags.paths ? `${relative(env.root, realPath(target))}\n` : `created\t${display}\t${item.title}\n`,
				);
			}
			if (!flags.paths)
				process.stdout.write(
					`created: ${created}, skipped: ${skipped}${flags.dryRun ? `, would-create: ${planned}` : ""}\n`,
				);
		});
}
