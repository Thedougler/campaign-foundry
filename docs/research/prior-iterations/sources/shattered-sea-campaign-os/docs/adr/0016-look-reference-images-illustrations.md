# ADR-0016: Look, Reference Images, and Illustrations

**Status:** Accepted
**Date:** 2026-08-17
**Amends:** [ADR-0003](0003-skills-and-agents.md) §3 (visual aids were left out of the skill batch), [ADR-0013](0013-content-classification.md) (Asset vs renderer; no `kind: image`), [ADR-0002](0002-canon-audience-retrieval.md) §3 (player-shown images use audience and the information boundary), [ADR-0005](0005-session-lifecycle.md) (assemble may embed `player_images:` and named illustrations)

How a thing looks is Knowledge. Pictures are Assets or renderer output. Generated pixels do not silently become established appearance.

The vault already had informal embeds, `_system/config/art-style.md`, and “stop if the page has no description.” Visual-aid skills were deferred. Collapsing every picture into one “reference” would make a soaked-dock shot rewrite a face, and `kind: image` would punch the same hole `player-handout` did.

## Decision

1. **Look** is appearance prose on the owning page. It is the source of truth. `art-style.md` is campaign style, not a look. Image-first authoring is rejected.
2. A **reference image** is an Asset: an identity view of that look (turnaround, not a costume or moment). Cited in `reference_images:` as a wikilink path. Embedded in the body where the look is established. Used as the DM image and as generation grounding.
3. `look_canon` (`provisional` · `established` · `locked`) is independent of page `canon`. Default `provisional`. A generated reference image stays provisional until the DM promotes or kills it. Missing image is not missing look: no look means stop.
4. `player_images:` is the subset of `reference_images:` whose pixels may cross the table. Opt-in per image. The page does not become `audience: [player]` to show a picture. Player-shown images accompany `[!narration]` and obey the same information boundary. No third secrecy model.
5. An **illustration** is a generated picture of a moment. Runtime. Session-scoped renderer output, marked generated, excluded from canonical retrieval. It may use reference images. It must not enter `reference_images:`, must not live in subject `assets/` folders, and must not ground later generations.
6. There is no `kind: image`. Leaflet map images, audio, and other media stay Assets outside `reference_images:`.
7. Grounding inputs: `art-style.md`, look prose of every depicted named thing, and that thing’s own reference images. Never illustrations, `[!secret]`, pending events, pages the output audience cannot see, or another entity’s image to invent a face. No look → do not generate.
8. Generation is agent Work, not a compiler ([ADR-0015](0015-deterministic-compilation-boundary.md)). No vault-wide backfill. Mint a provisional reference image only when a look exists, none is listed, and the current requested work requires the image or an authorized workflow explicitly requests it. Illustrations fire when the session-plan names the moment or an authorized workflow explicitly requests it. Assemble embeds tonight’s `player_images:` when that thing is in play.
9. Fields exist only on kinds that may have a look: `npc`, `pc`, `creature`, `item`, `vehicle`, spatial kinds, `faction` (banner or device), `deity` (named depicted form; prefer the idol `item` when the god has no single body). Culture: none. Work pages may receive illustrations, not reference images. PC reference images are player-supplied or player-approved.
10. Files: `assets/{npcs,pcs,creatures,places,items,factions}/<slug>[-n].<ext>`. Maps stay `assets/maps/`. Extra identity views are `-2`, `-3`, or `-turnaround`.

## Considered options

Mint `kind: image` (rejected: not a citable narrative node; Asset already exists). Embeds-only attachment (rejected: not queryable). Call the identity file a plate (rejected: opaque). Treat every attached picture as a reference image (rejected: occasion shots pollute identity). Image-first authoring (rejected: inverts look-as-truth). Let illustrations ground later generations (rejected: a wet Veyra becomes her face). Vault-wide generate-if-missing (rejected: spray; invents faces). Show the raw plate as the only player channel with no opt-in field (rejected: page audience is the wrong gate).

## Consequences

- Schema packages for the listed kinds grow `reference_images`, `player_images`, and `look_canon`. Doctor does not invent those fields on beats or clocks.
- Existing embeds (`![[assets/…]]` with no frontmatter list) are incomplete until backfilled.
- A visual-aids skill may now be written onto this contract. ADR-0003’s deferral ends for this scope only; draft-story stays out.
- Generation tools are harness-specific. The vault contract is agent-agnostic: any harness that can write an Asset must obey look, audience, and grounding.
