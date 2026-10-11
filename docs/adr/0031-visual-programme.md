# The visuals programme: one skill, one file convention

Grilling session 2026-10-10 (this repo, visual programme). No earlier ADR covered images or diagrams. The terms live in `CONTEXT.md` (**Visual**). The art canon is `docs/art-style.md`, behind the pointer in `user-config.md` § Art style. The procedure is `.omp/skills/visuals/`.

The Wiki had 104 attachments under ad-hoc names and formats, two legacy image pools in prior repos, a per-request `generate-image` skill, and no doctrine for where art sits on a page or how it is named. Meanwhile the product is meant to read as a book, and this book shows portraits, sigils, scene-setters and battle maps. Scattered rules would have produced a second convention per skill and orphan files no page embeds.

Decision:

- **One owner.** The `visuals` skill decides, places, generates, views and files every image and mermaid diagram on Wiki pages. The `generate-image` skill is absorbed and deleted.
- **Slots, not judgement calls.** Each page kind's template reserves its Visual slots with concrete defaults (`![[<slug>-portrait.webp]]` and kin). Every page of a kind then offers its art in the same place. Each slot takes one Visual. Missing art leaves a `[!visual-aid]` callout that a later run fills.
- **One file convention.** Visuals file at `wiki/<campaign>/attachments/<slug>-<kind>.<ext>`, kebab-case, webp for raster kinds. A shared `wiki/attachments/` serves subjects a second Campaign reuses. The same name is overwritten on regeneration. Every page embedding it then shows the new image. `cf convert` migrates old files and their embeds to this convention (battle maps keep their source format for Foundry, renamed to match).
- **Art canon behind a pointer.** The full art guide is `docs/art-style.md`. The always-loaded chain gets only the DM's one-line style and the pointer. ADR 0030's budget is unchanged.
- **Viewing is the check.** No Visual gets alt text. The run views the image against its prompt and against the pages it depicts. The reader is the DM at the table, not a screen reader. Two failed regenerations fall back to the callout rather than shipping a miss.
- **Backfill is bounded.** Revealed pages fill first, ordered by table prominence, five per run. The programme compounds instead of stalling.

## Considered Options

- **Distributing visual rules across the existing skills**, with each design skill told its own slots and prompts: rejected. It would have made N copies of one doctrine with nowhere to change them once, and Ingest and Prep still needed a hand-off point.
- **Keeping `generate-image` as a sibling skill** the others call: rejected. Placement and naming stayed ungoverned, verification had no home, and two skills owned one subject.
- **Alt text on embeds**: rejected by the DM. The image is checked by being viewed, and alt text goes stale as the pages it describes change.
- **Inline art style in the always-loaded chain**: rejected. The chain's ceiling (ADR 0030) is the harder constraint. `docs/art-style.md` is read exactly when a Visual is made.

## Consequences

- Old embeds and filenames go stale at cutover. `cf convert --dry-run` previews and the full run migrates them. No page loses its image to the rename.
- `.uvtt`/`dd2vtt` battle-map files travel with companions under the same slug, and binaries ride LFS (`.gitattributes`). Git clones without the media.
- A template change can add or move a slot without code. The template is the source of truth, and the gate's checks read it from there.
