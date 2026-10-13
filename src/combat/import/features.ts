import type { Primitive } from "../model.ts";
import { DAMAGE_TYPES } from "../model.ts";
import { parseDice } from "../rng.ts";
import { damage, limits, save } from "./grammar.ts";

/** Only named mechanics with a defined engine representation count as recognised. */
export const FEATURE_REGISTRY: Record<string, (name: string, text: string) => Primitive[]> = {
	amphibious: () => [{ kind: "feature", flag: "amphibious" }],
	"water breathing": () => [{ kind: "feature", flag: "water-breathing" }],
	flyby: () => [{ kind: "feature", flag: "flyby" }],
	"spider climb": () => [{ kind: "feature", flag: "spider-climb" }],
	"turn resistance": () => [{ kind: "feature", flag: "turn-resistance" }],
	"pack tactics": () => [{ kind: "feature", flag: "pack-tactics" }],
	"magic resistance": () => [{ kind: "feature", flag: "magic-resistance" }],
	"uncanny dodge": () => [{ kind: "feature", flag: "uncanny-dodge" }],
	evasion: () => [{ kind: "feature", flag: "evasion" }],
	"nimble escape": () => [{ kind: "feature", flag: "nimble-escape" }],
	brute: () => [{ kind: "feature", flag: "brute" }],
	"sneak attack": (name, text) => {
		const dice = parseDice(/\d+d\d+/.exec(name + text)?.[0] ?? "");
		return dice ? [{ kind: "sneak-attack", dice }] : [];
	},
	"legendary resistance": (name) => {
		const uses = limits(name).uses;
		return uses ? [{ kind: "legendary-resistance", count: uses.count }] : [];
	},
	regeneration: (_name, text) => {
		const m = /regains?\s+(\d+)(?:\s*\(([^)]+)\))?\s+hit points/i.exec(text);
		const amount = parseDice(m?.[2] ?? m?.[1] ?? "");
		return amount
			? [
					{
						kind: "regeneration",
						amount,
						disabledBy: DAMAGE_TYPES.filter((t) => new RegExp(`\\b${t}\\b`, "i").test(text)),
						description: text,
					},
				]
			: [];
	},
	parry: (_name, text) => {
		const ac = /(?:adds?|gains?)\s*\+?(\d+)\s+to (?:its |his |her )?AC/i.exec(text);
		const reduction = parseDice(/reduces?[^.]*?by\s+(\d+d\d+(?:\s*\+\s*\d+)?|\d+)/i.exec(text)?.[1] ?? "");
		return ac || reduction
			? [{ kind: "parry", ...(ac ? { acBonus: Number(ac[1]) } : {}), ...(reduction ? { reduction } : {}) }]
			: [];
	},
	"cunning action": (_name, text) =>
		["dash", "disengage", "hide"]
			.filter((mode) => new RegExp(`\\b${mode}\\b`, "i").test(text))
			.map((mode) => ({ kind: "movement", mode: mode as "dash" | "disengage" | "hide" })),
};

export function feature(name: string, text: string, allowAura = false): Primitive[] {
	const base = name
		.replace(/\s*\([^)]*\)/g, "")
		.trim()
		.toLowerCase();
	const recognised = FEATURE_REGISTRY[base]?.(name, text);
	if (recognised?.length) return recognised;
	if (!allowAura) return [];
	const radius = /within (\d+) (?:feet|ft)/i.exec(text);
	const timing = /(?:starts? (?:its |their )?turn|start of[^.]*turn)/i.test(text)
		? "start"
		: /end of[^.]*turn/i.test(text)
			? "end"
			: /enters?[^.]*area/i.test(text)
				? "enter"
				: /touches|touching|hits[^.]*melee attack/i.test(text)
					? "touch"
					: undefined;
	const terms = damage(text);
	if (radius && timing && terms.length) {
		const savingThrow = save(text);
		return [
			{
				kind: "aura",
				radius: Number(radius[1]),
				timing,
				damage: savingThrow ? [] : terms,
				...(savingThrow ? { save: savingThrow } : {}),
			},
		];
	}
	return [];
}
