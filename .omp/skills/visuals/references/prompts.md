# Prompts and generation

How `SKILL.md` steps 3 to 8 build, generate, finish and fall back for an image. Style, era and exclusions always come from the art guide (`SKILL.md` step 3): `user-config.md` § Art style and `docs/art-style.md`, or the Campaign's own `campaign-config.md` § Art style. This page supplies the framing and canvas for each kind, then the layer order and the commands.

## Kinds

The **Category** column gives the row of the art guide's § Categories whose rendering, Frame and negatives apply. The **Kind framing** column adds only what this kind needs beyond that row's Frame. The image model returns three sizes, so finishing crops each kind to its final canvas.

| Kind | Shows | Category | Device size | Final canvas | Kind framing |
| --- | --- | --- | --- | --- | --- |
| `portrait` | NPC, PC, Creature | Characters | `3:4`, `1024x1536` | 1024×1365 webp | Three-quarter view. A Creature shows whole, or head and forequarters, in its habitat. Leave headroom, since finishing trims a strip from the top and bottom. |
| `banner` | Region, Settlement, Site, Vehicle | Locations | `16:9`, `1536x1024` | 1536×512 webp | Compose for a wide centre band. The subject and the horizon stay inside the middle third of the height, with open sky, water or ground in the top and bottom thirds for the crop to remove. A Vehicle shows in profile or three-quarter, on its water or road. |
| `render` | Item | Items | `1:1`, `1024x1024` | 1024×1024 webp | Three-quarter view on a plain or period surface, lit to show its material, wear and marks. |
| `sigil` | Faction | Items | `1:1`, `1024x1024` | 1024×1024 webp | The emblem as a painted flag, wax seal or brass badge, flat on and centred. |
| `symbol` | Deity | Items | `1:1`, `1024x1024` | 1024×1024 webp | The holy symbol as a made object, flat on and centred. |
| `scene` | Scene, Recap, Lore, Spell | Scenes | `16:9`, `1536x1024` | 1536×864 webp | Keep heads clear of the top and bottom twelfth. |
| `battle-map` | Scene the Party may fight, Site | Maps | `3:2`, `1536x1024` or `1024x1536` | the same, png | Orthographic top-down, even light, the playable area edge to edge, at 64 px per 5-foot square: 24 by 16 squares landscape, 16 by 24 portrait. A door or a person takes one square, and a cart two by three. State the square count and size the features to it. |
| `handout-art` | Handout | follows its subject, per the line under § Categories | the object's proportions, from the three sizes | the same, webp | The thing as the Players see or hold it, flat on. A letter or poster is drawn as its paper, seal and wear, with illegible marks where words would be, since the callout states every word. |
| `map` | Region overview, player map | Maps | `3:2`, `1536x1024` | the same, webp | Top-down. |

## Prompt layers

Build every prompt in this order, filling the device's fields as shown. Each layer comes from its source and nowhere else.

1. **Style.** From the art guide, word for word: the section for the category's Rendering (§ Archer or § Photorealistic; a Maps image takes the Maps row's Frame instead), then § Era and costume. Field: `style`.
2. **Framing.** The category's Frame cell, then the kind's framing above. Field: `composition`, plus `aspect_ratio` and `image_size` from Device size.
3. **Content.** The subject of a depiction itself. For a scene, its place, hour, weather and light and the action of its moment, from the Scene's Play or the Recap's paragraph. Fields: `subject` opens with the main noun, and `scene`, `action` and `lighting` take the rest.
4. **Looks.** Each character shown, by name, with their look copied from their page per [Looks](#looks). Appended to `subject`.
5. **Exclusions.** From the art guide's § Negatives, the **Every Visual** and **Every era** lines, then the line for the category's Rendering or for Maps. Add anything the pages rule out, then the Campaign's Lines and Veils. Close `subject` with one sentence: `Exclude: …`.

```json
{
  "subject": "Nona Black-Jaw, <her look from her page>. Image 1 is her portrait: keep her face, build and clothing exactly. Exclude: <layer 5>",
  "scene": "<place, from the page>",
  "action": "<the moment, from the page>",
  "lighting": "<hour and weather, from the page>",
  "composition": "<Framing cell>",
  "style": "<the art guide's Rendering section and § Era and costume>",
  "aspect_ratio": "16:9",
  "image_size": "1536x1024",
  "input": [{ "path": "wiki/shattered-sea/attachments/nona-black-jaw-portrait.webp" }]
}
```

## Looks

A character's look is the page's own words, copied whole:

- **NPC** and **Item**: the `[!narration] First look` callout, plus any physical detail in `## At a glance`.
- **PC**: the `[!narration] Portrait` callout. The party table in the art guide's § Looks fills gaps, and where the two differ, the PC page is right.
- **Creature**: the physical lines of `## At a glance` and `### Ecology`, with size and type from `## Statblock`.
- **Location**: its `[!narration]` callout and the features its sections name.

A person's look is too thin to draw when the page lacks their build, face, colouring or clothing. Ask the DM for exactly the parts it lacks.

## Continuity

Continuity input keeps a subject looking like itself across every image of it.

- **Inputs.** Each existing portrait, reference sheet or token of a character the Visual shows goes into `input` as `{ "path": "wiki/<campaign>/attachments/<file>" }`. `subject` names the role of each, in order: `Image 1 is Nona Black-Jaw's portrait: keep her face, build and clothing.`
- **Changed looks.** When play changes a subject's look and its page records the change, edit the portrait: its current file as the one input, `changes` listing each change in the page's words, and the same target filename so every embed shows the new look.
- **Codex CLI.** On the route without the device, pass each input as `-i "<path>"`.

## Codex worker brief

On the several-Visuals route, each `task` item's `task` is this brief, filled in for its Visual. The `context` of the call is `Generate, view and file one Wiki Visual per item. Edit no Wiki page.`

```text
1. Write this JSON to xd://generate_image: <prompt JSON>
2. Read the saved image with `read`. It passes when <each detail taken from a page, listed>, it is drawn in this rendering: <the category's Rendering>, the framing is <Frame cell and kind framing>, and it carries no letters, watermark or logo. On a miss, regenerate with one targeted change that names the miss, at most twice.
3. Finish it: <finishing command filled with the image path, target path and canvas>. Then print its size: <dimensions command filled with the target path>.
Return the target path, its dimensions and your verdict, or every miss when it never passed.
```

## Finishing

Run from the repo root. Each command centre-crops and scales the image to the kind's final canvas (`<W>` by `<H>` from § Kinds) and writes the target. A webp kind:

```bash
node -e "const [src,dst,w,h]=process.argv.slice(1); require('sharp')(src).resize(+w,+h,{fit:'cover'}).webp({quality:85}).toFile(dst)" "<image>" "<target>.webp" <W> <H>
```

A battle map, kept lossless:

```bash
node -e "const [src,dst,w,h]=process.argv.slice(1); require('sharp')(src).resize(+w,+h,{fit:'cover'}).png().toFile(dst)" "<image>" "<target>.png" <W> <H>
```

Then print the size and confirm it equals the canvas:

```bash
node -e "require('sharp')(process.argv[1]).metadata().then(m=>console.log(m.width+'x'+m.height))" "<target>"
```

Delete the temporary image once the target exists.

## Fallback callout

The callout holds everything a later run needs to make the image. Write it in the slot where the embed would go, with the prompt in a `text` block so the prose gates skip it:

````markdown
> [!visual-aid] <Kind>: <subject>
> <Why it waits: generation failed (the error), viewing missed twice (each miss), the DM's description of <subject>'s <missing parts> is needed, or the DM deferred it.> Target `<slug>-<kind>.<ext>`.
>
> ```text
> <the prompt JSON, continuity inputs included>
> ```
````
