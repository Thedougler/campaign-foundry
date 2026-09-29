import type { Layer } from "../types.ts";
import { grammarLayer } from "./grammar.ts";
import { linksLayer } from "./links.ts";
import { markdownlintLayer } from "./markdownlint.ts";
import { orphansLayer } from "./orphans.ts";
import { remarkLintLayer } from "./remark-lint.ts";
import { placementLayer } from "./placement.ts";
import { spellingLayer } from "./spelling.ts";
import { styleLayer } from "./style.ts";
import { templateLayer } from "./template.ts";

/**
 * Every layer of the gate, in run order. `--fix` applies fixes in this order too.
 * To add a layer: create `src/check/layers/<name>.ts` exporting a `Layer`, then add one import and one entry here.
 */
export const layers: Layer[] = [templateLayer, placementLayer, linksLayer, orphansLayer];
layers.push(markdownlintLayer);
layers.push(remarkLintLayer);
layers.push(spellingLayer);
layers.push(grammarLayer);
layers.push(styleLayer);
