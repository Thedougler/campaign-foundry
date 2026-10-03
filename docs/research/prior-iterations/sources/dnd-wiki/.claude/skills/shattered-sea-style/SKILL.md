---
name: shattered-sea-style
description: >
  Style enforcement layer for all Shattered Sea wiki content. Trigger automatically
  whenever writing or editing any wiki page in the Shattered Sea campaign — including
  NPC pages, location pages, bestiary entries, session prep, lore, items, and ships.
  Covers prose tone, read-aloud formatting, sandbox writing defaults, and image
  generation art direction. Must be applied any time wiki-dnd, wiki-ingest, wiki-update,
  or any other content-writing skill produces Shattered Sea output.
---

# Shattered Sea Style Guide

Apply this skill as a style layer on top of whatever content skill is running. It governs four things: prose tone, read-aloud blocks, sandbox defaults, and image prompts.

---

## 1. Prose Tone

Before **drafting** any written content (descriptions, NPC bios, lore, faction writeups, item flavor text), load the `creative-writing-craft` skill. Apply its craft principles — sensory grounding, strong verbs, subtext, scene structure — as the foundation for all prose.

Then read the campaign tone guide before finalizing:

> `content/shattered-sea/private/system/guides/Shattered-Sea-Tone-Guide.md`

After drafting, invoke the `humanize-writing` skill to strip AI register and match the campaign voice.

**Skill load order for any creative prose:** `creative-writing-craft` → draft → tone guide check → `humanize-writing` → finalize.

---

## 2. Read-Aloud Blocks

Whenever content includes player-facing read-aloud prose (boxed text, `> [!read-aloud]` callouts, or any text meant to be spoken aloud at the table), invoke the `mercer-voice` skill.

**Tense is context-dependent:**
- Present tense for active scenes (combat, exploration, immediate discovery)
- Past tense for retrospective narration (history, legend, recalled events)
- Match the tense to how the scene will actually be delivered at the table

---

## 3. Sandbox Writing Defaults

All new content is written for a sandbox-style campaign. This means:

- **NPCs have goals that exist independently of the players.** They pursue agendas whether or not the party is involved.
- **Locations have ongoing states.** Things are happening there; the party is not the center of the world.
- **Events are written as pressures and possibilities**, not scripted outcomes. Avoid "if the players do X, then Y happens" framing.
- **History explains how things got this way**, not where the story is going.
- Factions want things; they are in conflict; the party can interact with those tensions in any direction.

---

## 4. Image Generation

Whenever generating an image prompt for Shattered Sea content, read the art style guide first:

> `content/shattered-sea/private/system/guides/Image-Generation-Art-Style.md`

Apply the default style clause from that guide to every image prompt. Do not generate images without consulting it.
