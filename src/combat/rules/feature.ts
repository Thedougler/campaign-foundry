import type { Mechanic } from "../engine/state.ts";
import type { Primitive } from "../model.ts";
/** Feature flags are passive predicates used by the attack, save and movement Mechanics. */
export const feature: Mechanic<Extract<Primitive, { kind: "feature" }>> = {
	resolve() {
		return 0;
	},
	expected() {
		return 0;
	},
};
