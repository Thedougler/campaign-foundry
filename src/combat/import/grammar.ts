import { ABILITIES, CONDITIONS, DAMAGE_TYPES } from "../model.ts";
import type {
	Ability,
	ActionReference,
	AttackPrimitive,
	ConditionPrimitive,
	DamageTerm,
	MultiattackPrimitive,
	Primitive,
	SavePrimitive,
	Target,
	UseLimit,
	Recharge,
} from "../model.ts";
import { parseDice } from "../rng.ts";

export function plain(text: string): string {
	return text
		.replace(/[*_]/g, "")
		.replace(/−/g, "-")
		.replace(/\bparalysed\b/gi, "paralyzed");
}
export function ability(text: string): Ability | undefined {
	return ABILITIES.find((a) => a === text.toLowerCase() || a.slice(0, 3) === text.toLowerCase());
}

export function limits(name: string): { uses?: UseLimit; recharge?: Recharge } {
	const uses = /(\d+)\s*\/\s*(Day|Long Rest|Short Rest)/i.exec(name);
	const recharge = /Recharge\s+(\d)(?:\s*[-–—]\s*(\d))?/i.exec(name);
	return {
		...(uses
			? {
					uses: {
						count: Number(uses[1]),
						reset:
							uses[2]?.toLowerCase() === "day"
								? ("day" as const)
								: uses[2]?.toLowerCase() === "long rest"
									? ("long-rest" as const)
									: ("short-rest" as const),
					},
				}
			: {}),
		...(recharge ? { recharge: { min: Number(recharge[1]), max: Number(recharge[2] ?? recharge[1]) } } : {}),
	};
}

export function damage(text: string): DamageTerm[] {
	const out: DamageTerm[] = [];
	const pattern = new RegExp(
		`\\b(\\d+d\\d+(?:\\s*[+-]\\s*\\d+)?|\\d+)(?:\\s*\\(([^)]+)\\))?\\s+(${DAMAGE_TYPES.join("|")})\\s+damage`,
		"gi",
	);
	for (const m of text.matchAll(pattern)) {
		const dice = parseDice(m[2] ?? m[1] ?? "");
		if (dice) out.push({ dice, type: m[3]?.toLowerCase() as DamageTerm["type"] });
	}
	return out;
}

function conditions(text: string, save?: { ability: Ability; dc: number }): ConditionPrimitive[] {
	const result: ConditionPrimitive[] = [];
	for (const condition of CONDITIONS) {
		// Only effects applied to the target, not conditions in prerequisites.
		const pattern = new RegExp(
			`(?:^\\s*(?:the )?|has (?:the )?|be(?:comes)? |is (?:also )?|and (?:the )?|knocked |falls |falling )${condition}\\b`,
			"i",
		);
		const applied = pattern.exec(text);
		if (!applied || /(?:not |isn't |is not |already |while |if )$/i.test(text.slice(0, applied.index))) continue;
		const escapeDC = /escape DC\s*(\d+)/i.exec(text);
		const duration = /until (?:the )?(?:start|end) of [^.]+|for (?:\d+|one) (?:minute|round|hour)s?/i.exec(
			text.slice(applied.index),
		)?.[0];
		const timing =
			/(?:repeats?|repeat|saving throw)[^.]*?at the (start|end) of (?:each of )?(?:its|their|the target's) (?:next )?turn/i.exec(
				text,
			)?.[1];
		result.push({
			kind: "condition",
			condition,
			...(escapeDC ? { escapeDC: Number(escapeDC[1]) } : {}),
			...(duration ? { duration } : {}),
			...(save && timing ? { saveEnds: { ...save, timing: timing.toLowerCase() as "start" | "end" } } : {}),
		});
	}
	return result;
}

function target(text: string): Target {
	const area = /(\d+)[ -](?:foot|feet|ft\.?)(?:[ -]radius)?[ -]*(cone|line|sphere|cube|radius)/i.exec(text);
	const range = /within (\d+) (?:feet|ft)/i.exec(text);
	const count = /\b(one|two|three|\d+) (?:creatures?|targets?)\b/i.exec(text)?.[1]?.toLowerCase();
	return {
		description: text,
		...(area
			? { area: { shape: area[2]?.toLowerCase() as NonNullable<Target["area"]>["shape"], feet: Number(area[1]) } }
			: {}),
		...(range ? { range: Number(range[1]) } : {}),
		...(count ? { count: ({ one: 1, two: 2, three: 3 } as Record<string, number>)[count] ?? Number(count) } : {}),
	};
}

export function save(text: string): SavePrimitive | undefined {
	const modern = /(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw:\s*DC\s*(\d+)/i.exec(
		text,
	);
	const legacy = /DC\s*(\d+)\s+(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw/i.exec(text);
	const a = ability(modern?.[1] ?? legacy?.[2] ?? "");
	const dc = Number(modern?.[2] ?? legacy?.[1]);
	if (!a || !dc) return undefined;
	const failure = modern
		? (text.split(/Failure:/i)[1]?.split(/Success:/i)[0] ?? text)
		: (text.split(/(?:On a success|on a successful save)[,:]/i)[0] ?? text);
	return {
		kind: "save",
		ability: a,
		dc,
		target: target(text),
		damage: damage(failure),
		success: /(?:Success:[^.]*half|half (?:as much )?damage|half as much on a success|half on a success)/i.test(text)
			? "half"
			: "none",
		conditions: conditions(failure + (text.match(/(?:It|The target|The creature) repeats[^.]+/i)?.[0] ?? ""), {
			ability: a,
			dc,
		}),
	};
}

export function attack(text: string): AttackPrimitive | undefined {
	const m = /(Melee(?: or Ranged)?|Ranged)(?: Weapon| Spell)? Attack(?: Roll)?:\s*([+-]?\d+)/i.exec(text);
	if (!m) return undefined;
	const reach = /reach\s*(\d+)\s*(?:ft|feet)/i.exec(text);
	const range = /range\s*(\d+)(?:\s*\/\s*(\d+))?\s*(?:ft|feet)/i.exec(text);
	const hit = text.split(/Hit:/i)[1] ?? "";
	const saveOffset = hit.search(
		/(?:DC\s*\d+|(?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw:)/i,
	);
	const followup = saveOffset >= 0 ? save(hit.slice(saveOffset)) : undefined;
	// Save damage belongs to the save, not the automatic attack damage.
	const automatic = followup ? hit.slice(0, saveOffset) : hit;
	return {
		kind: "attack",
		mode: /or/i.test(m[1] ?? "") ? "melee-or-ranged" : (m[1]?.toLowerCase() as "melee" | "ranged"),
		toHit: Number(m[2]),
		...(reach ? { reach: Number(reach[1]) } : {}),
		...(range ? { range: { normal: Number(range[1]), ...(range[2] ? { long: Number(range[2]) } : {}) } } : {}),
		damage: damage(
			automatic.split(/\bThat extra attack\b|\bor \d+\s*\([^)]+\)\s+\w+ damage when made as the extra attack/i)[0] ??
				automatic,
		),
		riders: [...conditions(automatic), ...(followup ? [followup] : [])],
	};
}

const COUNTS: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
function references(text: string, names: string[]): ActionReference[] {
	const refs: ActionReference[] = [];
	for (const action of names) {
		const escaped = action.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const m = new RegExp(
			`(?:\\b(one|two|three|four|five|six|\\d+)\\s+(?:with (?:its |his |her )?)?(?:its |his |her )?)?(?<!\\w)${escaped}s?(?!\\w)`,
			"i",
		).exec(text);
		if (m) refs.push({ action, count: m[1] ? (COUNTS[m[1].toLowerCase()] ?? Number(m[1])) : 1 });
	}
	return refs;
}
export function multiattack(text: string, names: string[]): MultiattackPrimitive | undefined {
	const first = text.split(/\.\s/)[0] ?? text;
	const choices = first
		.split(/\s+or\s+/i)
		.map((part) => references(part, names))
		.filter((part) => part.length);
	if (!choices.length) return undefined;
	const count = /makes?\s+(one|two|three|four|five|six|\d+)\s+attacks/i.exec(first)?.[1]?.toLowerCase();
	if (count && /any combination|each is either/i.test(first)) {
		const n = COUNTS[count] ?? Number(count);
		const refs = references(first, names);
		// All count allocations, rather than pretending an 'or' means both attacks.
		const alternatives: ActionReference[][] = [];
		const allocate = (index: number, remaining: number, picked: ActionReference[]): void => {
			if (index === refs.length - 1) {
				alternatives.push([...picked, { action: refs[index]!.action, count: remaining }].filter((r) => r.count > 0));
				return;
			}
			for (let used = 0; used <= remaining; used++)
				allocate(index + 1, remaining - used, [...picked, { action: refs[index]!.action, count: used }]);
		};
		allocate(0, n, []);
		return { kind: "multiattack", alternatives };
	}
	return { kind: "multiattack", alternatives: choices };
}

export function effects(text: string): Primitive[] {
	const a = attack(text);
	if (a) return [a];
	const s = save(text);
	if (s && (s.damage.length || s.conditions.length)) return [s];
	const heal =
		/(?:regains?|gains?)\s+(\d+d\d+(?:\s*[+-]\s*\d+)?|\d+)(?:\s*\(([^)]+)\))?\s+(temporary )?(?:hit points|HP)/i.exec(
			text,
		);
	if (heal) {
		const amount = parseDice(heal[2] ?? heal[1] ?? "");
		if (amount) return [{ kind: heal[3] ? "temporary-hp" : "heal", amount }];
	}
	const teleport = /teleports?[^.]*?up to (\d+) (?:feet|ft)/i.exec(text);
	if (teleport) return [{ kind: "movement", mode: "teleport", feet: Number(teleport[1]) }];
	return /(?:the target|the creature) (?:has|is|becomes)/i.test(text) ? conditions(text) : [];
}
