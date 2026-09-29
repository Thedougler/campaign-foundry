import { averageOf, parseDice } from "./dice.ts";
import type { Feature, Issue, Statblock } from "./parse.ts";
import { ABILITIES, ABILITY_NAMES, type Ability, abilityModifier, HIT_DIE_BY_SIZE, proficiencyBonus, signed, SKILL_ABILITY } from "./tables.ts";

const ABILITY_WORD = Object.values(ABILITY_NAMES).join("|");
const ATTACK_ROLL = /(?:Melee|Ranged)(?: or (?:Melee|Ranged))?(?: Weapon| Spell)? Attack Roll:\s*([+\-−]\d+)/gi;
const SPELL_TO_HIT = /([+\-−]\d+) to hit with spell attacks/gi;
const SPELL_SAVE_DC = /spell save DC\s*(\d+)/gi;
const ESCAPE_DC = /escape DC\s*(\d+)/gi;
const ANY_DC = /\bDC\s*(\d+)(?!\d)/g;
const ABILITY_CHECK = new RegExp(`^\\s+(?:${ABILITY_WORD})(?:\\s*\\([^)]*\\))?\\s+check`, "i");
const DAMAGE = /(\d+)\s*\(([^()]*\d+d\d+[^()]*)\)/gi;

const unsign = (text: string): number => Number(text.replace("−", "-"));

/** Everything the rules read from one stat block, resolved once. */
interface Sheet {
	sb: Statblock;
	stats: number[];
	pb: number;
	mods: Record<Ability, number>;
	cr: string;
}

function abilityFromKey(key: string): Ability | undefined {
	const k = key.toLowerCase();
	return ABILITIES.find((a) => a === k || ABILITY_NAMES[a].toLowerCase() === k);
}

const modOf = (sheet: Sheet, a: Ability): string => `${ABILITY_NAMES[a]} ${signed(sheet.mods[a])} (score ${sheet.stats[ABILITIES.indexOf(a)]})`;
const pbText = (sheet: Sheet): string => `proficiency bonus ${signed(sheet.pb)} (CR ${sheet.cr})`;

/** The ability named as the spellcasting ability anywhere in the block. */
function spellcastingAbility(features: Feature[]): { casts: boolean; ability?: Ability } {
	const casts = features.some((f) => /spellcasting/i.test(f.name));
	for (const f of features) {
		const named = new RegExp(`using (${ABILITY_WORD}) as (?:its|his|her|their|the) spellcasting ability|spellcasting ability is (${ABILITY_WORD})`, "i").exec(f.desc);
		const word = named?.[1] ?? named?.[2];
		if (word) return { casts: true, ability: abilityFromKey(word) };
	}
	return { casts };
}

/** All the rules-figure problems in one parsed stat block. Checks whose inputs are missing are skipped; the parser already reported those. */
export function checkStatblock(sb: Statblock): Issue[] {
	const issues: Issue[] = [];
	if (!sb.stats || sb.cr === undefined) return issues;
	const stats = sb.stats;
	const pb = proficiencyBonus(sb.cr);
	const mods = Object.fromEntries(ABILITIES.map((a, i) => [a, abilityModifier(stats[i] ?? 10)])) as Record<Ability, number>;
	const sheet: Sheet = { sb, stats, pb, mods, cr: sb.crText };

	if (sb.proficiencyBonus !== undefined && sb.proficiencyBonus !== pb) {
		issues.push({ rule: "proficiency-bonus", key: "proficiency_bonus", message: `\`proficiency_bonus\` is ${signed(sb.proficiencyBonus)}, but CR ${sb.crText} has ${signed(pb)}.`, hint: `Write \`proficiency_bonus: ${pb}\`, or delete the key. Proficiency bonus by CR: 0-4 is +2, 5-8 +3, 9-12 +4, 13-16 +5, 17-20 +6, 21-24 +7, 25-28 +8, 29-30 +9.` });
	}
	checkSaves(sheet, issues);
	checkSkills(sheet, issues);
	checkPassivePerception(sheet, issues);
	checkHitPoints(sheet, issues);
	const spell = spellcastingAbility(sb.features);
	for (const feature of sb.features) {
		checkAttacks(sheet, feature, spell, issues);
		checkDamage(feature, issues);
		checkDcs(sheet, feature, spell, issues);
		checkEscapeDcs(sheet, feature, issues);
	}
	return issues;
}

function checkSaves(sheet: Sheet, issues: Issue[]): void {
	for (const { key, value } of sheet.sb.saves) {
		const ability = abilityFromKey(key);
		if (!ability) {
			issues.push({ rule: "unknown-ability", key: "saves", message: `\`saves\` has \`${key}\`, which is not an ability.`, hint: `Key saves by ${ABILITIES.map((a) => `\`${a}\``).join(", ")}, e.g. \`- dex: 4\`.` });
			continue;
		}
		const expected = sheet.mods[ability] + sheet.pb;
		if (value !== expected) {
			issues.push({ rule: "save-bonus", key: "saves", message: `${ABILITY_NAMES[ability]} save is ${signed(value)}, expected ${signed(expected)}.`, hint: `A saving throw is the ability modifier plus the proficiency bonus: ${modOf(sheet, ability)} + ${pbText(sheet)} = ${signed(expected)}. Write \`- ${ability}: ${expected}\`, or delete the entry if the Creature is not proficient.` });
		}
	}
}

function checkSkills(sheet: Sheet, issues: Issue[]): void {
	for (const { key, value } of sheet.sb.skills) {
		const ability = SKILL_ABILITY[key];
		if (!ability) {
			issues.push({ rule: "unknown-skill", key: "skillsaves", message: `\`skillsaves\` has \`${key}\`, which is not a skill.`, hint: `Use one of ${Object.keys(SKILL_ABILITY).map((s) => `\`${s}\``).join(", ")}, e.g. \`- perception: 4\`.` });
			continue;
		}
		const proficient = sheet.mods[ability] + sheet.pb;
		const expertise = sheet.mods[ability] + 2 * sheet.pb;
		if (value !== proficient && value !== expertise) {
			issues.push({ rule: "skill-bonus", key: "skillsaves", message: `${key} is ${signed(value)}, expected ${signed(proficient)} or ${signed(expertise)}.`, hint: `A skill is the ${ABILITY_NAMES[ability]} modifier plus the proficiency bonus, or twice that bonus with expertise: ${modOf(sheet, ability)} + ${pbText(sheet)} = ${signed(proficient)}, or ${signed(expertise)} with expertise. Write \`- ${key}: ${proficient}\`.` });
		}
	}
}

function checkPassivePerception(sheet: Sheet, issues: Issue[]): void {
	const listed = sheet.sb.skills.find((s) => s.key === "perception");
	const expected = 10 + (listed ? listed.value : sheet.mods.wis);
	const basis = listed ? `10 + the listed Perception bonus ${signed(listed.value)}` : `10 + ${modOf(sheet, "wis")}`;
	const match = /passive Perception\s*(\d+)/i.exec(sheet.sb.senses);
	if (!match) {
		issues.push({ rule: "passive-perception", key: "senses", message: "`senses` does not list passive Perception.", hint: `End \`senses\` with \`passive Perception ${expected}\` (${basis}).` });
	} else if (Number(match[1]) !== expected) {
		issues.push({ rule: "passive-perception", key: "senses", message: `Passive Perception is ${match[1]}, expected ${expected}.`, hint: `Passive Perception is ${basis} = ${expected}. Write \`passive Perception ${expected}\`.` });
	}
}

function checkHitPoints(sheet: Sheet, issues: Issue[]): void {
	const { sb } = sheet;
	const match = /^\s*(\d+)d(\d+)\s*(?:([+\-−])\s*(\d+))?\s*$/i.exec(sb.hitDice);
	if (!match) {
		issues.push({ rule: "hit-dice-format", key: "hit_dice", message: `\`hit_dice\` is \`${sb.hitDice}\`, not dice with an optional flat modifier.`, hint: `Write the Hit Dice with the Constitution term included, e.g. \`hit_dice: "8d8 + 16"\`.` });
		return;
	}
	const count = Number(match[1]);
	const sides = Number(match[2]);
	const flat = match[3] ? (match[3] === "+" ? 1 : -1) * Number(match[4]) : 0;

	const sizes = sb.size.toLowerCase().match(/tiny|small|medium|large|huge|gargantuan/g) ?? [];
	const dice = sizes.map((s) => HIT_DIE_BY_SIZE[s] as number);
	if (dice.length === 0) {
		issues.push({ rule: "hit-die-size", key: "size", message: `\`size\` is ${sb.size === "" ? "blank" : `\`${sb.size}\``}, so the Hit Die cannot be checked.`, hint: `Set \`size:\` to Tiny, Small, Medium, Large, Huge or Gargantuan; the Hit Die is d4, d6, d8, d10, d12 or d20 respectively.` });
	} else if (!dice.includes(sides)) {
		const uses = sizes.map((s, i) => `d${dice[i]} (${s[0]?.toUpperCase()}${s.slice(1)})`).join(" or ");
		issues.push({ rule: "hit-die-size", key: "hit_dice", message: `Hit Die is d${sides}, but a ${sb.size} Creature uses ${uses}.`, hint: `Hit Die by size: Tiny d4, Small d6, Medium d8, Large d10, Huge d12, Gargantuan d20. Write e.g. \`hit_dice: "${count}d${dice[0]}"\` (keep the Constitution term) and recompute \`hp\`.` });
	}

	const con = sheet.mods.con;
	if (flat !== count * con) {
		issues.push({ rule: "hp-constitution", key: "hit_dice", message: `Hit Dice flat modifier is ${signed(flat)}, expected ${signed(count * con)}.`, hint: `The flat modifier is the number of Hit Dice times the Constitution modifier: ${count} x ${modOf(sheet, "con")} = ${signed(count * con)}. Write \`hit_dice: "${count}d${sides} ${con * count < 0 ? "-" : "+"} ${Math.abs(count * con)}"\`.` });
	}
	if (sb.hp === undefined) {
		issues.push({ rule: "hp-average", key: "hp", message: "`hp` is missing or not a number.", hint: `Write the average of the Hit Dice: \`hp: ${Math.floor((count * (sides + 1)) / 2) + flat}\`.` });
		return;
	}
	const average = Math.floor((count * (sides + 1)) / 2) + flat;
	if (sb.hp !== average) {
		issues.push({ rule: "hp-average", key: "hp", message: `\`hp\` is ${sb.hp}, expected ${average}.`, hint: `Hit Points are the average of the Hit Dice, rounded down, plus the flat modifier: ${count}d${sides} averages ${Math.floor((count * (sides + 1)) / 2)}, ${signed(flat)} gives ${average}. Write \`hp: ${average}\`.` });
	}
}

/** The candidates an attack bonus may come from, and why. */
function attackCandidates(sheet: Sheet, spell: { casts: boolean; ability?: Ability }, spellAttack: boolean): { abilities: Ability[]; basis: string } {
	if (spellAttack) {
		if (spell.ability) return { abilities: [spell.ability], basis: `the spellcasting ability, ${ABILITY_NAMES[spell.ability]}` };
		return { abilities: [...ABILITIES], basis: "any ability (no spellcasting ability is named; add e.g. `using Intelligence as the spellcasting ability`)" };
	}
	const abilities: Ability[] = ["str", "dex"];
	if (spell.ability) abilities.push(spell.ability);
	else if (spell.casts) abilities.push(...ABILITIES.filter((a) => !abilities.includes(a)));
	return { abilities, basis: spell.ability ? `Strength, Dexterity or the spellcasting ability (${ABILITY_NAMES[spell.ability]})` : spell.casts ? "any ability (no spellcasting ability is named)" : "Strength or Dexterity" };
}

function checkAttacks(sheet: Sheet, feature: Feature, spell: { casts: boolean; ability?: Ability }, issues: Issue[]): void {
	const desc = feature.desc.replace(/\*/g, "");
	const report = (found: number, spellAttack: boolean): void => {
		const { abilities, basis } = attackCandidates(sheet, spell, spellAttack);
		const options = abilities.map((a) => sheet.mods[a] + sheet.pb);
		if (options.includes(found)) return;
		const shown = abilities.map((a) => `${modOf(sheet, a)} gives ${signed(sheet.mods[a] + sheet.pb)}`).join("; ");
		issues.push({
			rule: "attack-bonus",
			feature: { section: feature.section, name: feature.name },
			message: `${feature.name}: ${spellAttack ? "spell attack" : "attack roll"} is ${signed(found)}, expected ${[...new Set(options)].map(signed).join(" or ")}.`,
			hint: `An attack bonus is the proficiency bonus plus the attack's ability modifier (${basis}): ${pbText(sheet)} plus ${shown}. Write the bonus that matches the ability the attack uses.`,
		});
	};
	for (const m of desc.matchAll(ATTACK_ROLL)) report(unsign(m[1] as string), false);
	for (const m of desc.matchAll(SPELL_TO_HIT)) report(unsign(m[1] as string), true);
}

function checkDamage(feature: Feature, issues: Issue[]): void {
	for (const m of feature.desc.replace(/\*/g, "").matchAll(DAMAGE)) {
		const dice = parseDice(m[2] as string);
		if (!dice) continue;
		const average = averageOf(dice);
		if (Number(m[1]) !== average) {
			issues.push({
				rule: "damage-average",
				feature: { section: feature.section, name: feature.name },
				message: `${feature.name}: \`${m[0]}\` prints an average of ${m[1]}, but ${m[2]} averages ${average}.`,
				hint: `Write the average rounded down: \`${average} (${m[2]})\`.`,
			});
		}
	}
}

function checkDcs(sheet: Sheet, feature: Feature, spell: { casts: boolean; ability?: Ability }, issues: Issue[]): void {
	const desc = feature.desc.replace(/\*/g, "");
	const at = { section: feature.section, name: feature.name };
	for (const m of desc.matchAll(SPELL_SAVE_DC)) {
		const dc = Number(m[1]);
		const abilities: Ability[] = spell.ability ? [spell.ability] : [...ABILITIES];
		if (abilities.some((a) => 8 + sheet.pb + sheet.mods[a] === dc)) continue;
		issues.push({ rule: "save-dc", feature: at, message: `${feature.name}: spell save DC ${dc} does not match the spellcasting ability.`, hint: `A spell save DC is 8 + proficiency bonus + the spellcasting ability modifier: 8 + ${pbText(sheet)} + ${spell.ability ? modOf(sheet, spell.ability) : "the spellcasting ability modifier"} = ${spell.ability ? 8 + sheet.pb + sheet.mods[spell.ability] : abilities.map((a) => 8 + sheet.pb + sheet.mods[a]).join(", ")}. Write \`spell save DC ${spell.ability ? 8 + sheet.pb + sheet.mods[spell.ability] : "<that number>"}\`.` });
	}
	for (const m of desc.matchAll(ANY_DC)) {
		const index = m.index ?? 0;
		if (/(?:spell save|escape) $/i.test(desc.slice(0, index))) continue;
		if (ABILITY_CHECK.test(desc.slice(index + m[0].length))) continue;
		const dc = Number(m[1]);
		const options = ABILITIES.map((a) => ({ a, dc: 8 + sheet.pb + sheet.mods[a] }));
		if (options.some((o) => o.dc === dc)) continue;
		issues.push({ rule: "save-dc", feature: at, message: `${feature.name}: DC ${dc} is not 8 + proficiency bonus + any ability modifier.`, hint: `A save DC is 8 + ${pbText(sheet)} + an ability modifier: ${options.map((o) => `${ABILITY_NAMES[o.a]} ${o.dc}`).join(", ")}. Pick the ability the effect uses and write its number.` });
	}
}

/** Escape DCs: the SRD prints 10 + Str modifier (Tarrasque 20, Tyrannosaurus Rex 17, Vampire Spawn 13), or the general 8 + proficiency bonus + an ability modifier (Aboleth 14 = 8 + 4 + Con +2). */
function checkEscapeDcs(sheet: Sheet, feature: Feature, issues: Issue[]): void {
	for (const m of feature.desc.replace(/\*/g, "").matchAll(ESCAPE_DC)) {
		const dc = Number(m[1]);
		const options = [...ABILITIES.map((a) => 8 + sheet.pb + sheet.mods[a]), 10 + sheet.mods.str, 10 + sheet.mods.dex];
		if (options.includes(dc)) continue;
		issues.push({
			rule: "escape-dc",
			feature: { section: feature.section, name: feature.name },
			message: `${feature.name}: escape DC ${dc} does not follow from an ability modifier.`,
			hint: `An escape DC is 10 + the Strength or Dexterity modifier (${10 + sheet.mods.str} or ${10 + sheet.mods.dex}), or 8 + ${pbText(sheet)} + an ability modifier (${ABILITIES.map((a) => `${ABILITY_NAMES[a]} ${8 + sheet.pb + sheet.mods[a]}`).join(", ")}). Write \`escape DC ${10 + sheet.mods.str}\`.`,
		});
	}
}
