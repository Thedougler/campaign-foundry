import type { RuleContext } from "../engine/state.ts";
import type { Primitive } from "../model.ts";
import { attack } from "./attack.ts";
import { aura } from "./aura.ts";
import { condition } from "./condition.ts";
import { damage } from "./damage.ts";
import { feature } from "./feature.ts";
import { heal } from "./heal.ts";
import { legendaryResistance } from "./legendary-resistance.ts";
import { movement } from "./movement.ts";
import { multiattack } from "./multiattack.ts";
import { parry } from "./parry.ts";
import { regeneration } from "./regeneration.ts";
import { reroll } from "./reroll.ts";
import { resourceSpend } from "./resource-spend.ts";
import { save } from "./save.ts";
import { sneakAttack } from "./sneak-attack.ts";
import { temporaryHP } from "./temporary-hp.ts";

function mechanic(mode: "resolve" | "expected", p: Primitive, c: RuleContext): number {
	switch (p.kind) {
		case "attack":
			return attack[mode](p, c);
		case "save":
			return save[mode](p, c);
		case "condition":
			return condition[mode](p, c);
		case "damage":
			return damage[mode](p, c);
		case "heal":
			return heal[mode](p, c);
		case "temporary-hp":
			return temporaryHP[mode](p, c);
		case "multiattack":
			return multiattack[mode](p, c);
		case "movement":
			return movement[mode](p, c);
		case "resource-spend":
			return resourceSpend[mode](p, c);
		case "feature":
			return feature[mode](p, c);
		case "sneak-attack":
			return sneakAttack[mode](p, c);
		case "parry":
			return parry[mode](p, c);
		case "legendary-resistance":
			return legendaryResistance[mode](p, c);
		case "regeneration":
			return regeneration[mode](p, c);
		case "aura":
			return aura[mode](p, c);
		case "reroll":
			return reroll[mode](p, c);
	}
}
export function resolve(p: Primitive, c: RuleContext): number {
	return mechanic("resolve", p, c);
}
export function expected(p: Primitive, c: RuleContext): number {
	return mechanic("expected", p, c);
}
