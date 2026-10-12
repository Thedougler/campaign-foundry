/** Filesystem policy for repo copies without Git metadata: root and nested .gitignore files still apply. */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import ignore from "ignore";
import type { Ignore } from "ignore";

/** Git's directory precedence and parent exclusion, without requiring a .git directory. */
export function repoIgnore(root: string): (path: string) => boolean {
	const rules = new Map<string, Ignore>();
	const ruleFor = (dir: string): Ignore => {
		let rule = rules.get(dir);
		if (rule === undefined) {
			const file = join(root, dir, ".gitignore");
			rule = ignore().add(existsSync(file) ? readFileSync(file, "utf8") : "");
			rules.set(dir, rule);
		}
		return rule;
	};
	return (path) => {
		const parts = path.replace(/\/$/, "").split("/");
		const dirs = [""];
		for (let i = 0; i < parts.length; i++) {
			const candidate = parts.slice(0, i + 1).join("/") + (i < parts.length - 1 || path.endsWith("/") ? "/" : "");
			let ignored = false;
			for (const dir of dirs) {
				const result = ruleFor(dir).test(relative(dir || ".", candidate) + (candidate.endsWith("/") ? "/" : ""));
				if (result.ignored || result.unignored) ignored = result.ignored;
			}
			if (ignored) return true;
			dirs.push(parts.slice(0, i + 1).join("/"));
		}
		return false;
	};
}

/** Visible files in a Git-free copy; metadata and ignored directories are never traversed. */
export function visibleRepoFiles(root: string): string[] {
	const ignored = repoIgnore(root);
	const files: string[] = [];
	const visit = (dir: string): void => {
		for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
			const path = join(dir, entry.name);
			if (entry.name === ".git" || ignored(path + (entry.isDirectory() ? "/" : ""))) continue;
			if (entry.isDirectory()) visit(path);
			else files.push(path);
		}
	};
	visit("");
	return files.sort();
}
