---
name: push-session
description: Pushes a Session to the Campaign's Foundry world by building a Foundry Adventure module with `bun run cf -- push`, then uses the Foundry MCP bridge only for live touches like Player ownership and the active Foundry scene. Use at the end of Prep, or when the DM asks to push, send or load a Session into Foundry.
---

# Push a Session

Push is the only way material leaves the Wiki (ADR 0001). `bun run cf -- push` compiles everything the Session needs into a Foundry Adventure with stable document IDs, packing only what changed since the last Push (ADR 0008). The Wiki stays the source: anything wrong in Foundry is fixed in the Wiki and pushed again, because the next Push overwrites Foundry.

## Steps

1. **Preview.** `bun run cf -- push --campaign "<Campaign>" --session <N> --dry-run --json`. Read the counts and the warnings.
2. **Warnings first.** A Scene without walls lacks map data (`<Title> - Battle Map.uvtt` beside the image). Links left as text point at pages outside the Session's reach. Each Actor that didn't build has a stat block the parser couldn't read. Fix what the Wiki can fix, then preview again. Report the rest to the DM.
3. **Build.** Run the same command without `--dry-run`. Add `--install <Foundry Data/modules folder>` only when the DM has named that folder.
4. **Tell the DM** the report's next steps. On the first Push only, the DM enables the module in the Foundry world. Each Push, the DM opens its compendium and imports the Adventure with overwrite on. A re-imported document is replaced whole, so hand tweaks made in Foundry are lost.
5. **Live touches**, through the Foundry MCP bridge and only on the DM's word. A re-import resets Player ownership to what Push set, which is Handouts visible to Players and everything else DM-only, so reapply the ownership the DM wants. Then switch the active Foundry scene to the one the Session opens on. The bridge never creates or edits content.
6. **Report** in a few lines: each kind's document counts as the build report gives them, then the module path and anything the DM must do in Foundry.
