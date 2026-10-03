import { Command, Option } from "commander";
import { UsageError } from "../check/run.ts";
import {
	COMBAT_LEVEL_OFFSET,
	DIFFICULTIES,
	budgetLevels,
	describeParty,
	difficultyFor,
	partyBudgets,
	type CreatureSpend,
	type Difficulty,
	type DifficultyLabel,
	type PartyBudgets,
} from "../encounter/xp-budget.ts";

interface EncounterBudgetFlags {
	levels?: string;
	partyLevel?: number;
	partySize?: number;
	levelOffset?: number;
	creature: string[];
	monsters?: string;
	target?: Difficulty;
	json?: boolean;
}

const collect = (value: string, previous: string[]): string[] => [...previous, value];
const EXAMPLE = "cf encounter-budget --levels 5,5,5,5 --target high --creature \"Orc,1/2,100,3\"";

async function readStdin(): Promise<string> {
	const chunks: Buffer[] = [];
	for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
	return Buffer.concat(chunks).toString("utf8");
}

function parseLevels(flags: EncounterBudgetFlags): number[] {
	if (flags.partyLevel !== undefined) {
		if (flags.levels !== undefined) {
			throw new UsageError("Use --levels or --party-level, not both.", EXAMPLE);
		}
		const size = flags.partySize;
		const level = flags.partyLevel;
		if (typeof size !== "number" || !Number.isInteger(size) || size < 1) {
			throw new UsageError("--party-level requires --party-size of at least 1.", EXAMPLE);
		}
		if (!Number.isInteger(level) || level < 1 || level > 20) {
			throw new UsageError("Character levels must be from 1 to 20.", EXAMPLE);
		}
		return Array.from({ length: size }, () => level);
	}
	if (flags.partySize !== undefined) {
		throw new UsageError("--party-size is only used with --party-level.", EXAMPLE);
	}
	if (flags.levels === undefined || flags.levels.trim() === "") {
		throw new UsageError("No party levels given.", `Give every participating PC's level. ${EXAMPLE}`);
	}
	const levels = flags.levels.split(",").map((part) => Number(part.trim()));
	if (levels.some((level) => !Number.isInteger(level))) {
		throw new UsageError("--levels must be comma-separated whole numbers.", `e.g. --levels 5,5,6,4. ${EXAMPLE}`);
	}
	if (levels.some((level) => level < 1 || level > 20)) {
		throw new UsageError("Character levels must be from 1 to 20.", EXAMPLE);
	}
	return levels;
}

function parseCreatureFlag(text: string): CreatureSpend {
	const parts = text.split(",").map((part) => part.trim());
	if (parts.length < 4) {
		throw new UsageError(
			`--creature \`${text}\` needs name, CR, XP and count.`,
			`--creature "Orc,1/2,100,3". ${EXAMPLE}`,
		);
	}
	const count = Number(parts[parts.length - 1]);
	const xp = Number(parts[parts.length - 2]);
	const cr = parts[parts.length - 3] ?? "";
	const name = parts.slice(0, -3).join(", ");
	if (!Number.isInteger(xp) || xp < 0 || !Number.isInteger(count) || count < 1) {
		throw new UsageError(
			`xp and count must be whole numbers, xp at least 0, count at least 1, in --creature \`${text}\`.`,
			`--creature "Orc,1/2,100,3". ${EXAMPLE}`,
		);
	}
	return { name, cr, xp, count };
}

function parseMonstersJson(text: string): CreatureSpend[] {
	let parsed: unknown;
	try {
		parsed = JSON.parse(text) as unknown;
	} catch {
		throw new UsageError("--monsters must be a JSON list of {name, cr, xp, count}.", EXAMPLE);
	}
	if (!Array.isArray(parsed) || parsed.length === 0) {
		throw new UsageError("--monsters must be a non-empty JSON list.", EXAMPLE);
	}
	const creatures: CreatureSpend[] = [];
	for (const monster of parsed) {
		if (monster === null || typeof monster !== "object") {
			throw new UsageError("Each --monsters entry needs name, cr, xp, and count.", EXAMPLE);
		}
		const row = monster as Record<string, unknown>;
		for (const key of ["name", "cr", "xp", "count"] as const) {
			if (!(key in row)) {
				throw new UsageError(`Each --monsters entry needs name, cr, xp, and count; missing '${key}'.`, EXAMPLE);
			}
		}
		if (typeof row.name !== "string" || typeof row.cr !== "string" && typeof row.cr !== "number") {
			throw new UsageError("Each --monsters name must be a string and cr a string or number.", EXAMPLE);
		}
		if (typeof row.xp !== "number" || !Number.isInteger(row.xp) || row.xp < 0 || typeof row.count !== "number" || !Number.isInteger(row.count) || row.count < 1) {
			throw new UsageError("xp and count must be whole numbers, xp at least 0, count at least 1.", EXAMPLE);
		}
		creatures.push({ name: row.name, cr: String(row.cr), xp: row.xp, count: row.count });
	}
	return creatures;
}

function difficultyTitle(label: DifficultyLabel): string {
	return label === "beyond high" ? "Beyond High" : `${label.charAt(0).toUpperCase()}${label.slice(1)}`;
}

function formatHuman(
	recorded: number[],
	effective: number[],
	offset: number,
	budgets: PartyBudgets,
	creatures: CreatureSpend[],
	target: Difficulty | undefined,
): string {
	const party = describeParty(effective);
	const offsetNote =
		offset === 0
			? party
			: `${party} (recorded ${recorded.join(", ")}; +${offset} combat offset)`;
	const lines = [
		`Party: ${offsetNote}`,
		"--- XP Budgets ---",
		`Low ${budgets.low}`,
		`Moderate ${budgets.moderate}`,
		`High ${budgets.high}`,
	];
	if (creatures.length === 0) return `${lines.join("\n")}\n`;

	const total = creatures.reduce((sum, c) => sum + c.xp * c.count, 0);
	const difficulty = difficultyFor(total, budgets);
	lines.push(`Total XP: ${total}`, `Difficulty: ${difficulty.toUpperCase()}`);
	if (target) {
		const delta = total - budgets[target];
		if (delta === 0) lines.push(`Vs ${target}: exact`);
		else if (delta > 0) lines.push(`Vs ${target}: ${delta} XP over`);
		else lines.push(`Vs ${target}: ${-delta} XP under`);
	}

	lines.push(
		"",
		"--- Encounter Balance (copy into ### Balance) ---",
		...creatures.map((c) => `- ${c.count} × ${c.name} (CR ${c.cr}, ${c.xp} XP each) = ${c.xp * c.count} XP`),
		`- Party budgets (${offsetNote}): Low ${budgets.low}, Moderate ${budgets.moderate}, High ${budgets.high}`,
		`- **Total: ${total} XP (${difficultyTitle(difficulty)} difficulty)**`,
	);
	return `${lines.join("\n")}\n`;
}

export function encounterBudgetCommand(): Command {
	return new Command("encounter-budget")
		.description("Print 2024 Encounter XP budgets and Creature spend. Diagnostic math only: it does not choose the opposition. Exits 0 printed, 2 usage error.")
		.option("--levels <levels>", 'comma-separated level of each participating PC, e.g. "5,5,6,4"')
		.option("--party-level <n>", "level of every PC (use with --party-size)", Number)
		.option("--party-size <n>", "number of PCs (use with --party-level)", Number)
		.option("--level-offset <n>", "add this to each recorded level before budget lookup, capped at 20 (default 1)", Number)
		.addOption(new Option("--creature <name,cr,xp,count>", 'one Creature type; repeat. XP comes from the Wiki or SRD statblock, e.g. "Orc,1/2,100,3"').argParser(collect).default([] as string[], "none"))
		.option("--monsters <json>", 'JSON list [{name, cr, xp, count}]; "-" reads stdin')
		.addOption(new Option("--target <difficulty>", "named Low/Moderate/High band to print XP over or under; does not pass or fail the Encounter").choices([...DIFFICULTIES]))
		.option("--json", "print machine-readable JSON instead of the copy block")
		.addHelpText(
			"after",
			`
XP math:
  Each PC contributes the 2024 SRD 5.2 Low / Moderate / High budget for their
  recorded character level plus --level-offset (default ${COMBAT_LEVEL_OFFSET}):
  this table's Party fights about a level above the calculator. Cap 20.
  Pass sheet levels; do not pre-add the offset. Party budget is the sum.
  Creature spend is count × XP from the retrieved statblock. No 2014
  monster-count multiplier. Equal to a band's ceiling is that band; one XP
  over High is Beyond High. This command classifies Creature XP. It does
  not choose Creatures, rewrite Canon, or measure terrain, hazards, surprise,
  depletion or objectives.

Exit codes:
  0  printed    2  usage error

Examples:
  cf encounter-budget --levels 5,5,5,5
  cf encounter-budget --party-level 5 --party-size 4
  cf encounter-budget --levels 5,5,6,4 --target high --creature "Orc,1/2,100,3"
  cf encounter-budget --levels 5,5,5,5 --monsters '[{"name":"Orc","cr":"1/2","xp":100,"count":3}]' --json
  printf '%s' '[{"name":"Orc","cr":"1/2","xp":100,"count":3}]' | cf encounter-budget --levels 5,5,5,5 --monsters -`,
		)
		.action(async (flags: EncounterBudgetFlags) => {
			const recorded = parseLevels(flags);
			const offset = flags.levelOffset ?? COMBAT_LEVEL_OFFSET;
			if (!Number.isInteger(offset) || offset < 0) {
				throw new UsageError("--level-offset must be a whole number at least 0.", EXAMPLE);
			}
			const effective = budgetLevels(recorded, offset);
			const budgets = partyBudgets(effective);
			const creatures = flags.creature.map(parseCreatureFlag);
			if (flags.monsters !== undefined) {
				const raw = flags.monsters === "-" ? await readStdin() : flags.monsters;
				creatures.push(...parseMonstersJson(raw));
			}
			if (flags.target && creatures.length === 0) {
				throw new UsageError("--target requires --creature or --monsters.", EXAMPLE);
			}

			if (flags.json) {
				const total = creatures.reduce((sum, c) => sum + c.xp * c.count, 0);
				const difficulty = creatures.length === 0 ? null : difficultyFor(total, budgets);
				const vsTarget =
					flags.target === undefined || creatures.length === 0
						? null
						: { band: flags.target, deltaXp: total - budgets[flags.target] };
				process.stdout.write(
					`${JSON.stringify({ party: { levels: recorded, effectiveLevels: effective, levelOffset: offset, description: describeParty(effective) }, budgets, creatures, totalXp: creatures.length === 0 ? null : total, difficulty, vsTarget }, null, 2)}\n`,
				);
				return;
			}

			process.stdout.write(formatHuman(recorded, effective, offset, budgets, creatures, flags.target));
		});
}
