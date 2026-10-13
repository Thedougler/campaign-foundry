import { readFile, readdir } from "node:fs/promises";
import { runCli } from "../../src/cli.ts";
import type { Combatant } from "../../src/combat/model.ts";

// Acceptance survey: exercise the command and keep the coverage list reproducible.
for (const [label, directory, limit, statblockOnly] of [
	["Shattered Sea Creatures", "wiki/shattered-sea/Creatures", Infinity, false],
	["Shattered Sea NPCs with ## Statblock", "wiki/shattered-sea/NPCs", Infinity, true],
	["World-free bestiary", "wiki/Creatures", 200, false],
] as const) {
	const paths: string[] = [];
	for (const file of (await readdir(directory)).filter((f) => f.endsWith(".md")).sort()) {
		const path = `${directory}/${file}`;
		if (statblockOnly && !/^## Statblock\s*$/m.test(await readFile(path, "utf8"))) continue;
		paths.push(path);
		if (paths.length === limit) break;
	}
	const result = await runCli([
		"combat",
		"compile",
		...(limit === Infinity && !statblockOnly ? [directory] : paths),
		"--json",
	]);
	const combatants = JSON.parse(result.stdout) as Combatant[];
	const skipped = result.stderr.split("\n").filter((line) => line.endsWith("no Statblock, skipped")).length;
	console.log(
		`${label}: ${paths.length} pages, ${combatants.length} compiled, ${skipped} skipped, ${paths.length - combatants.length - skipped} failed; exit ${result.code}`,
	);
	if (result.stderr) console.log(result.stderr.trim());
	const counts = new Map<string, number>();
	for (const c of combatants) for (const f of c.unmodelled) counts.set(f.name, (counts.get(f.name) ?? 0) + 1);
	console.log("15 most frequent Unmodelled names:");
	for (const [name, count] of [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 15))
		console.log(`${count}\t${name}`);
}
