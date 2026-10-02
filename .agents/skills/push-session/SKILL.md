---
name: push-session
description: Pushes a Session to the Campaign's Foundry world by building a Foundry Adventure module with `cf push`, then uses the Foundry MCP bridge only for live touches like Player ownership and the active Foundry scene. Use at the end of Prep, or when the DM asks to push, send or load a Session into Foundry.
---

# Push a Session

Push is the only way material leaves the Wiki (ADR 0001). `cf push` compiles everything the Session needs into a Foundry Adventure with stable document IDs, packing only what changed since the last Push (ADR 0008). The Wiki stays the source: anything wrong in Foundry is fixed in the Wiki and pushed again, because the next Push overwrites Foundry.

## Steps

1. **Preview.** `bun run cf push --campaign "<Campaign>" --session <N> --dry-run --json`. Read the counts and the warnings.
2. **Warnings first.** A Scene without walls lacks map data (`<Page> - Battle Map.uvtt` beside the image); a link left as text points at a page outside the Session's reach; an Actor that didn't build has a stat block the parser couldn't read. Fix what the Wiki can fix, then preview again. Report the rest to the DM.
3. **Build.** Run the same command without `--dry-run`. Add `--install <Foundry Data/modules folder>` only when the DM has named that folder.
4. **Tell the DM** the report's next steps: enable the module in the Foundry world (first Push only), open its compendium, and import the Adventure with overwrite on. A re-imported document is replaced whole, so hand tweaks made in Foundry are lost.
5. **Live touches**, through the Foundry MCP bridge and only on the DM's word: reapply Player ownership the DM wants (a re-import resets it to what Push set: Handouts visible to Players, everything else DM-only), and switch the active Foundry scene to the one the Session opens on. The bridge never creates or edits content.
6. **Report** in a few lines: documents added, updated and unchanged by kind, the module path, and anything the DM must do in Foundry.
