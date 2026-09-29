import type { Layer } from "../types.ts";
import { linksLayer } from "./links.ts";
import { orphansLayer } from "./orphans.ts";
import { placementLayer } from "./placement.ts";
import { statblockLayer } from "./statblock.ts";
import { templateLayer } from "./template.ts";

/**
 * Every layer of the gate, in run order. `--fix` applies fixes in this order too.
 * To add a layer: create `src/check/layers/<name>.ts` exporting a `Layer`, then add one import and one entry here.
 */
export const layers: Layer[] = [templateLayer, placementLayer, linksLayer, orphansLayer];

/** The rules-figure layer: added on its own line so it merges cleanly beside the prose layers. */
layers.push(statblockLayer);
