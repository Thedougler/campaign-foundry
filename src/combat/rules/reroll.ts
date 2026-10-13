import type { Mechanic } from "../engine/state.ts";
import type { Primitive } from "../model.ts";
/** A passive roll modifier, consumed by the attack/save Mechanics before advantage selection. */
export const reroll: Mechanic<Extract<Primitive, { kind: "reroll" }>> = {
	resolve() {
		return 0;
	},
	expected() {
		return 0;
	},
};
