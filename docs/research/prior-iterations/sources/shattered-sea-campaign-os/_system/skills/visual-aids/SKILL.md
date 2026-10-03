---
name: visual-aids
description: >-
  Visual aids — attach a reference image, generate a missing identity
  picture, generate a named illustration, promote or kill a look, or
  put player-safe pictures on a running guide. Use when a look-bearing
  page needs an identity Asset, a session-plan names a moment to
  picture, look_canon must change, or assemble must embed tonight's
  player_images. Not leaflet maps, not spoken [!narration] craft.
---

# Visual Aids

**Look** is appearance prose on the owner. Source of truth.

A **reference image** is an identity Asset of that look. Frontmatter
list plus body embed. DM image and generation ground.

An **illustration** is a picture of a moment. Runtime. It does not
become a reference image and does not ground later generations.

`look_canon` (`provisional` · `established` · `locked`) is independent
of page `canon`. Omitted means provisional. A generated reference
image stays provisional until the DM promotes or kills it.

`player_images` is the subset of `reference_images` that may cross the
table. Opt-in per file. The page does not become `audience: [player]`
to show a picture.

Spoken `[!narration]` remains the table score. A shown image
accompanies it and obeys the same information boundary.

There is no `kind: image`. A leaflet source image is an Asset outside
`reference_images`. `reference image` is not `canon: reference` and
not a `source`.

## Path

| Job | Run |
|---|---|
| Attach an existing identity file | 1 → 2 attach → 4 → 5 |
| Mint a missing reference image | 1 → 2 mint-identity → 3 → 4 → 5 |
| Mint a named illustration | 1 → 2 mint-illustration → 3 → 4 → 5 |
| Promote or kill a look | 1 → 2 promote → 5 |
| Put player-safe pictures on a running guide | 1 → 2 assemble → 3 (named moment only) → 5 |

## Workflow

### 1. Ground

Read `_system/config/art-style.md`. Read the look prose on every named
thing this picture will depict. Read that thing's `reference_images`
and `look_canon`. Read the output audience.

Look-bearing kinds: `npc`, `pc`, `creature`, `item`, `vehicle`,
`location`, `settlement`, `region`, `dungeon`, `route`, `faction`
(banner or device), `deity` (named depicted form; prefer the idol
`item` when the god has no single body). Culture: none. Work pages
receive illustrations, not reference images.

**Complete when:** the look exists or the stop is known, the audience
is known, and every depicted named thing is identified.

### 2. Branch

**Stop if there is no look.** Ask. Do not invent a face. `art-style.md`
is campaign style, not a look.

#### Attach

List the file in `reference_images:` as a wikilink path. Embed it with
`![[assets/…]]` next to the look (First Impression / Overview /
Appearance / Atmosphere — whichever section that kind already uses).
Leave `player_images` empty unless the DM marks the file player-safe.
Omitted `look_canon` stays provisional.

A shared identity file is listed on every owner that truly shares that
look.

**Complete when:** frontmatter lists the file and the body embeds it.

#### Mint-identity

Mint a provisional reference image only when a look exists, none is listed, and the current requested work requires the image or an authorized workflow explicitly requests it. No vault-wide backfill.

PC reference images are player-supplied or player-approved. Draft a PC
face only on request.

Faction identity is a banner or device, not a group photo.

Write the Asset with whatever image tool this harness provides. The
vault contract is look, audience, and grounding — not a vendor API.

**Complete when:** the new file is on disk, listed, embedded, and
`look_canon` is provisional.

#### Mint-illustration

Fire only when the session-plan Illustrations section names the moment or an authorized workflow explicitly requests it. Store the file with that session's renderer output, never in subject `assets/` folders. Mark it generated. Do not add it to `reference_images`. Last session's illustration may be reused as a recap picture of the past; it still does not become a reference image.

**Complete when:** the named moment or authorized request has a session-scoped file, or the request was resolved without generation.

#### Promote

Keep the accepted files and set `look_canon`. Delete or archive
rejected candidates. Do not leave competing faces listed.

**Complete when:** listed files are the kept look and `look_canon`
matches the DM's call.

#### Assemble

Embed tonight's `player_images` for entities in play. Generate a new illustration for a named moment or an authorized request. Do not invent a gallery from every depiction.

**Complete when:** every in-play `player_images` entry is on the running guide, and each requested illustration was generated or explicitly resolved without generation.

### 3. Ground the pixels

Inputs, and only these:

1. `_system/config/art-style.md`
2. Look prose of every depicted named thing
3. That thing's own reference images

Never illustrations. Never `[!secret]`. Never pending events. Never
pages the output audience cannot see. Never another entity's image to
invent a face.

A player-shown picture matches what the character can perceive.

**Complete when:** every grounding input is from that list and every
excluded class is absent.

### 4. Paths

Identity files: `assets/{npcs,pcs,creatures,places,items,factions}/<slug>[-n].<ext>`.
Extra identity views are `-2`, `-3`, or `-turnaround`. Maps stay in
`assets/maps/` and stay out of `reference_images`. Illustrations live
with that session's renderer output.

**Complete when:** the file sits in the folder its role requires.

### 5. Persist

Patch the owner. Do not mint a page for the image.

Run doctor from `_system/scripts/` after the write. Repair look
diagnostics this run introduced.

**Complete when:** doctor is clean for the new lists, embeds, and
paths.

## Who may invoke

Fire when attaching, generating, grounding, promoting, or showing pictures. Expected callers: `writing-places`, `writing-dungeons`, `writing-items`, `writing-vehicles`, and assemble / session-guide work.

`writing-player-prose` writes the spoken sentences. This skill does
not replace depiction.

`obsidian-leaflet` owns map fences.

## Delegation

- `writing-player-prose` — spoken `[!narration]`
- `obsidian-leaflet` — leaflet source images and map fences
- `obsidian-markdown` — embed syntax only
