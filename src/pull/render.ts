import { ABILITIES } from "./sheet.ts";
import type { Ability, Sheet } from "./sheet.ts";

/**
 * The three pulled sections of a PC page as markdown, each starting at its `##` heading and ending with a blank
 * line. The bullet labels and the ability table follow wiki/templates/PC.md. Output is a pure function of the
 * Sheet, so a second pull with the same payload writes the same bytes.
 */

const LABEL: Record<Ability, string> = { str: "Str", dex: "Dex", con: "Con", int: "Int", wis: "Wis", cha: "Cha" };
const ORDINAL = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];

const signed = (n: number): string => (n >= 0 ? `+${n}` : `${n}`);

export function classLine(sheet: Sheet): string {
	const parts = sheet.classes.map((k) => {
		const sub = k.subclass ? ` (${k.subclass})` : "";
		return sheet.classes.length === 1 ? `${k.name}${sub}` : `${k.name}${sub} ${k.level}`;
	});
	return `Level ${sheet.level} ${sheet.species} ${parts.join(" / ")}`.replace(/ {2,}/g, " ");
}

/** A one-line summary for a blank `summary` property. */
export function summaryLine(sheet: Sheet): string {
	const parts = sheet.classes.map((k) => `${k.name} ${k.level}`).join(" / ");
	return `${sheet.species} ${parts}.`.replace(/ {2,}/g, " ");
}

function speedText(speeds: Sheet["speeds"]): string {
	const names = ["walk", "fly", "swim", "climb", "burrow"] as const;
	return names
		.filter((k) => speeds[k])
		.map((k) => (k === "walk" ? `${speeds[k]} ft.` : `${k} ${speeds[k]} ft.`))
		.join(", ");
}

export function renderSheet(sheet: Sheet, player: string): string {
	const dc = sheet.spellcasting.length === 0
		? "No spell save DC."
		: `Spell save DC ${sheet.spellcasting.map((s) => `${s.saveDc} (${s.class}, ${s.ability})`).join(" and ")}.`;
	const saves = ABILITIES.map((a) => `${LABEL[a]} ${signed(sheet.saves[a].bonus)}${sheet.saves[a].proficient ? " (proficient)" : ""}`).join(", ");
	const table = ABILITIES.map((a) => `${sheet.abilities[a].score} (${signed(sheet.abilities[a].mod)})`);
	const lines = [
		"## Sheet",
		"",
		`- **Player.**${player ? ` ${player}` : ""}`,
		`- **Class, species and level.** ${classLine(sheet)}. Proficiency bonus ${signed(sheet.proficiencyBonus)}.`,
		`- **Armor Class, Hit Points and Speed.** AC ${sheet.armorClass.value} (${sheet.armorClass.source}). ${sheet.hitPoints} HP. Speed ${speedText(sheet.speeds)}`,
		`- **Passive Perception and save DC.** Passive Perception ${sheet.passivePerception}. ${dc}`,
		`- **Saving throws.** ${saves}.`,
		"",
		`| ${ABILITIES.map((a) => LABEL[a]).join(" | ")} |`,
		`| ${ABILITIES.map(() => "---").join(" | ")} |`,
		`| ${table.join(" | ")} |`,
		"",
		"### Features",
		"",
		...(sheet.features.length === 0 ? ["None recorded."] : sheet.features.map((f) => `- **${f.source}.** ${f.names.join(", ")}`)),
		"",
	];
	return lines.join("\n");
}

export function renderSpells(sheet: Sheet): string {
	const lines = ["## Spells", ""];
	if (sheet.spellcasting.length === 0 && sheet.spells.length === 0) {
		return [...lines, "No spells.", ""].join("\n");
	}
	for (const s of sheet.spellcasting) {
		lines.push(`- **${s.class}.** ${s.ability} spellcasting: save DC ${s.saveDc}, spell attack ${signed(s.attackBonus)}.`);
	}
	const slots = sheet.spellSlots.map((n, i) => `${ORDINAL[i]} ${n}`).filter((_, i) => (sheet.spellSlots[i] ?? 0) > 0);
	if (slots.length > 0) lines.push(`- **Spell slots.** ${slots.join(", ")}.`);
	if (sheet.pactSlots) lines.push(`- **Pact magic.** ${sheet.pactSlots.count} slot${sheet.pactSlots.count === 1 ? "" : "s"} of ${ORDINAL[sheet.pactSlots.level - 1]} level.`);
	const levels = [...new Set(sheet.spells.map((s) => s.level))].sort((a, b) => a - b);
	for (const level of levels) {
		lines.push("", `### ${level === 0 ? "Cantrips" : `${ORDINAL[level - 1]} level`}`, "");
		for (const spell of sheet.spells.filter((s) => s.level === level)) {
			lines.push(`- ${spell.name}${spell.tags.length > 0 ? ` (${spell.tags.join(", ")})` : ""}`);
		}
	}
	return [...lines, ""].join("\n");
}

export function renderInventory(sheet: Sheet): string {
	const item = (i: Sheet["inventory"][number]): string => {
		const notes = [i.rarity, i.attuned ? "attuned" : undefined].filter(Boolean);
		return `- ${i.name}${notes.length > 0 ? ` (${notes.join(", ")})` : ""}${i.quantity > 1 ? ` x${i.quantity}` : ""}`;
	};
	const equipped = sheet.inventory.filter((i) => i.equipped);
	const carried = sheet.inventory.filter((i) => !i.equipped);
	const lines = ["## Inventory", "", `- **Coin.** ${sheet.coin || "none"}.`];
	if (equipped.length > 0) lines.push("", "### Equipped", "", ...equipped.map(item));
	if (carried.length > 0) lines.push("", "### Carried", "", ...carried.map(item));
	return [...lines, ""].join("\n");
}
