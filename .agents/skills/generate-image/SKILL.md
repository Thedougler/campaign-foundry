---
name: generate-image
description: Generates an image the Wiki lacks (an NPC, PC or Creature portrait, a battle map, Handout art) by dispatching Codex through the `codex` CLI, then saves it to the Campaign folder's attachments and embeds it. Use when a page needs a portrait, a battle map or Handout art, or when Prep finds an image missing.
---

# Generate an image

Codex (the model set in `AGENTS.md`) draws; you write the spec, check the result and file it (ADR 0006). One image per run of these steps.

## Steps

1. **Reuse first.** Look for the image in the Campaign folder's `attachments/` and embedded on the page. An existing image of the same subject ends the run.
2. **Pick the kind** from the table below and read its source on the page: everything the image shows comes from the page's Canon.
3. **Write the spec** in the format under **Spec shape** below, filling every line from the page. The World overview's tone sets the palette and mood.
4. **Dispatch Codex** from the repo root:

   ```bash
   codex exec -s workspace-write -C "$PWD" "Use your built-in image_gen tool to generate one image, copy it to <target path> and print its pixel dimensions. <spec>"
   ```

   Give the full target path, `wiki/<campaign-folder>/attachments/<Name> - <Kind>.png`. Codex takes a minute or two.
5. **Check it.** View the file. It is done when its dimensions equal the kind's canvas and it shows the kind's view, free of text and grid lines. A miss gets one retry with one targeted change to the spec. Report a second miss to the DM with the file path.
6. **Convert** the PNG to WebP at the same size, then delete the PNG:

   ```bash
   node -e "require('sharp')(process.argv[1]).webp({quality:85}).toFile(process.argv[2])" "<file>.png" "<file>.webp"
   ```

7. **Embed** `![[<Name> - <Kind>.webp]]` where the kind's table row says, then run `bun run cf -- check --fix` and `bun run cf -- check` given the page until that page gate reports `ok: 0 findings`. List the page in the log entry of the operation this image is part of.

## Kinds

| Kind | Source on the page | Canvas | View | Embed |
| --- | --- | --- | --- | --- |
| Portrait | the `[!narration]` first look (NPC, Creature) or Portrait (PC) | 1024×1536 | head and shoulders to waist, three-quarter view, plain dark backdrop | first line under `## At a glance`, as `![[… - Portrait.webp\|240]]` |
| Battle Map | a Scene's `### Battlefield`, or a Site's `### Areas` | 1536×1024 (24×16 squares) or 1024×1536 (16×24) | orthographic top-down, even light, playable area edge to edge | first line under that `###` heading |
| Handout | the Handout's `[!narration]` text | 1024×1536 or 1536×1024, matching the object | the object itself, flat on, as the Players would hold it | directly under the Handout's callout |

**Battle Map scale.** Every battle map is 64 px per 5-foot square, so Push reads the Foundry grid from the image size alone. State the square count in the spec and size the features to it. A door or a person takes one square, and a cart two by three.

**Handout text.** Put every word of a Handout in its callout, which keeps the wording exact, and draw the image without lettering. A letter or poster is drawn as its paper, seal and wear, with illegible marks where words would be.

## Spec shape

```text
Use case: stylized-concept
Asset type: <Portrait | top-down Battle Map for a virtual tabletop | prop Handout>
Subject: <who or what, from the page>
Key details: <the 3-5 details the page names: features, gear, terrain, damage>
Style/medium: painted fantasy illustration, muted natural palette, <mood from the World's tone>
Composition/framing: <the kind's view>; <for a Battle Map: covers N by M squares of 5 feet>
Constraints: no text, no labels, no grid lines, no border, no watermark
Avoid: <anything the page rules out>
```
