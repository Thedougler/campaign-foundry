import type { Layer } from "../types.ts";
import { boilerplateLayer } from "./boilerplate.ts";
import { grammarLayer } from "./grammar.ts";
import { hotLayer } from "./hot.ts";
import { indexLayer } from "./index-files.ts";
import { linksLayer } from "./links.ts";
import { logLayer } from "./log.ts";
import { markdownlintLayer } from "./markdownlint.ts";
import { narrationLayer } from "./narration.ts";
import { orphansLayer } from "./orphans.ts";
import { placementLayer } from "./placement.ts";
import { remarkLintLayer } from "./remark-lint.ts";
import { spellingLayer } from "./spelling.ts";
import { statblockLayer } from "./statblock.ts";
import { styleLayer } from "./style.ts";
import { templateLayer } from "./template.ts";

/**
 * Every layer of the gate, in run order. `--fix` applies fixes in this order too.
 * To add a layer: create `src/check/layers/<name>.ts` exporting a `Layer`, then add one import and one entry here.
 */
export const layers: Layer[] = [
	templateLayer,
	placementLayer,
	linksLayer,
	orphansLayer,
	statblockLayer,
	indexLayer,
	hotLayer,
	logLayer,
	markdownlintLayer,
	remarkLintLayer,
	spellingLayer,
	grammarLayer,
	narrationLayer,
	styleLayer,
	boilerplateLayer,
];
