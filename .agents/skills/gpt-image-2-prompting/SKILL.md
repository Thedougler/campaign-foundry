---
name: gpt-image-2-prompting
description: How to write prompts that get the best first-pass images from OpenAI's gpt-image-2 (GPT Image 2, ChatGPT Images 2.0), mainly through oh-my-pi's `generate_image` tool and its subject/action/scene/composition/lighting/style/text/changes/input fields. Use this skill whenever you are about to call `generate_image`, write to `xd://generate_image`, or otherwise generate or edit an image with gpt-image-2 or a GPT Image model, whether the request is for a portrait, illustration, photo, product shot, logo, icon, poster, ad, infographic, diagram, slide, UI mock-up, comic, map, texture or a change to an existing image. Also use it when an image came back wrong and you need to rework the prompt, or when you are writing a prompt template or brief that another agent will send to an image model.
---

# Prompting gpt-image-2

gpt-image-2 reads a prompt the way an art director reads a brief. It rewards plain, concrete sentences in a sensible order, the intended use stated up front, and constraints spelled out. It knows a great deal about the world, renders text well and keeps faces and layouts stable across edits. Keyword lists ("8k, masterpiece, ultra-detailed, trending") add nothing and crowd out the details that matter. Spend every word on something you want to see.

## How `generate_image` builds the prompt

omp's `generate_image` takes structured fields and joins them into one text prompt. Knowing the join lets you write fields that read as clean prose once assembled:

```text
<subject>, <action>, <scene>. <composition>. <lighting>. <style>.

Text: <text>

Changes:
- <changes[0]>
- <changes[1]>

Output format: <portrait|landscape|square> image, <W>x<H> pixels.
```

- **`subject`, `action` and `scene` are joined with commas**, so write them as one running sentence: `subject` opens with the main noun ("An elderly fisherman with…"), `action` is a participle clause ("hauling a dripping net over the gunwale"), and `scene` is a place phrase ("on a small wooden boat in a grey North Sea swell"). Keep `subject` one long noun phrase when you use `action` or `scene`. For an image that needs several sentences (a multi-figure scene, comic panels, a diagram spec), leave `action` and `scene` out and write the whole description as sentences in `subject`. Each field's trailing punctuation is stripped and replaced by the join.
- **`composition`, `lighting` and `style` each become their own sentence**, in that order, so they read last before any text and edits.
- **Constraints have no field of their own.** End `style` with them: the exclusions ("No text, lettering, watermarks or logos.") and the invariants ("Keep the character's face and outfit exactly as in Image 1."). That puts them at the end of the description, where the model treats them as rules.
- **`text`** becomes a `Text:` block. Use it only for words that must appear in the image (see [Text in images](#text-in-images)).
- **`changes`** becomes a bulleted `Changes:` block. Use it for edits to an `input` image, one change per item.
- **`input`** takes image paths (`[{ "path": "…" }]`). Any input switches the request to an edit or reference job. Name each image's role in `subject` by index: "Image 1 is the character sheet; Image 2 is the colour reference."
- **`aspect_ratio` / `image_size`** offer three canvases only: `1024x1024`, `1536x1024` (landscape) and `1024x1536` (portrait). Every ratio maps to the nearest of the three. On the OpenAI subscription route the backend ignores the size parameter, so omp appends the `Output format:` line and the model follows it from the prompt. Always set one, and compose for that shape in `composition`.
- **`model`**: leave it out unless a specific catalog model is required.
- **No quality, count, seed or background controls.** One image per call, at whatever quality the backend picks. Spend your effort on the prompt and on checking the result.
- **A chat model sits in between.** On the subscription route a GPT chat model receives your assembled prompt and calls the image tool with its own rewrite of it. Rewrites keep what is stated plainly and lose what is implied, so state every must-have literally, once, in its natural field. A refusal or a question from that model comes back as text in the tool result, so read the result as well as the image.
- The tool returns a temporary file path (a `.webp`). Copy or convert it to where it belongs.

## Writing the prompt

1. **Name the deliverable and its use.** "A chest-up character portrait for a fantasy campaign wiki", "a one-slide market overview for an investor deck", "a product cutout for a shop listing". The use sets the mode, the polish and the layout conventions the model reaches for. Put it at the start of `subject` or `style`.
2. **Fill the fields in their natural order.** The subject and its key details, then what it is doing and where, then framing, light and medium, then constraints. Each detail goes in the field where it belongs once, without repeats. For a complex image, short labelled sentences inside a field ("Foreground: … Background: …") read better than one long run-on.
3. **Be concrete.** Name materials, textures, colours, shapes, ages, clothing, era and the visual medium (oil painting, cel-shaded animation, 35mm film photograph, flat vector). Concrete nouns beat adjectives: "a cracked leather satchel stuffed with rolled sea charts" over "an adventurous bag".
4. **Direct the shot.** In `composition`: framing (close-up, chest-up, full body with feet visible, wide establishing shot), viewpoint (eye level, low angle, top-down), subject placement and negative space ("subject on the left third, open sky on the right for a title"). For people add gaze, pose and hands ("looking down at the map, not at the camera", "both hands gripping the rail"), plus relative scale where it matters.
5. **Light it.** In `lighting`: the source, direction, hour and mood ("low amber sunset from the left, long shadows, warm haze"). Dark, wide, rainy, neon or night scenes need extra words on atmosphere, scale and colour, or the model trades the mood for a flat, safe exposure.
6. **Set the style by its traits.** "Photorealistic" (that word itself) switches on the photographic mode, and "candid", "35mm film", "real skin texture, worn materials" push it further. Camera specs set the look and are followed loosely. For an illustrated look, describe the traits (line weight, shading, palette, texture) rather than leaning on a name alone, and add quality cues only where they help this image ("visible brush texture", "subtle film grain").
7. **Use world knowledge.** A precise place, period or event ("a dockside tavern in 1720s Port Royal") brings era-correct dress, architecture and props. Spend your words on what is specific to this image.
8. **State the constraints.** End `style` with what must not appear (text, watermarks, logos, extra people, modern objects, anything the brief rules out) and what must stay fixed. Phrase each exclusion as a short "No …" sentence, which the model follows more reliably than a long "avoid" list.

## Text in images

gpt-image-2 renders short text reliably when told exactly what to write.

- Put the exact words in `text`, inside quotes, with "exactly as written, once" ("\"FRESH CATCH\", exactly as written, appearing once"). Add the typography (weight, style, colour, size) and the placement ("in bold condensed serif capitals across the top banner").
- Spell unusual names letter by letter as well ("Gwynfor: G-W-Y-N-F-O-R").
- Keep in-image copy short. A headline and a few labels render well; paragraphs garble. Long or exact copy belongs in the page or document around the image.
- For diagrams, charts and slides, give every label and number in the prompt. The model invents nothing reliable on its own.
- When the image must carry no text, say so ("No text, letters, signatures or watermarks"). Without that sentence, signs, books and banners grow fake lettering.

## Edits and reference images

With `input` images the job is an edit or a reference composite.

- **Say what changes and what stays.** Each `changes` item names one change. The last item lists what must stay: "Keep everything else exactly the same: face, hair, pose, clothing, background, framing, colours and lighting." For a surgical edit, also name what must not drift (saturation, contrast, camera angle, nearby objects, labels).
- **Repeat the preserve list on every round.** Each edit can drift a little, and restating the invariants each time stops the drift adding up.
- **Reference by index and role.** In `subject`: "Image 1: the hero's portrait, keep her face, build and outfit. Image 2: the harbour scene to place her in." Then say how they combine ("put the woman from Image 1 at the rail of the ship in Image 2, matching its light and perspective").
- **Lock identity explicitly.** When a person must stay recognisable: "Do not change her face, facial features, skin tone, body shape or hairstyle." gpt-image-2 already preserves inputs closely, and this sentence settles any doubt.
- **Style transfer.** `Use the style of Image 1 (its palette, line and texture) to show <new subject>`, plus the framing and background constraints, so only the subject changes.

## Keeping a set consistent

For a recurring character, product or style across many images:

1. Make an **anchor** image first: the subject alone, plain background, neutral pose, the full look visible.
2. For every later image, pass the anchor as `input` and say `Image 1 is <name>'s reference: keep the face, build, outfit and colours exactly.`
3. Reuse the same description words verbatim each time. Rewording a look invites the model to redesign it.
4. Keep one style sentence and paste it unchanged into every prompt of the set.

## Check and iterate

Open every image you generate (read the file) before you use it. Check it against each must-have: subject details, count of people or objects, text spelling, framing, style, era, and each exclusion.

- **Fix one thing per round.** Regenerate with the same prompt plus one targeted change that names the miss ("The sword is in her left hand; put it in her right hand."). Changing many things at once makes it hard to tell which change worked.
- **Edit instead of regenerating** when the image is mostly right: pass it as `input` with one `changes` item and the preserve list.
- **After two misses on the same point, change approach.** Simplify the prompt, move the detail earlier or into its own sentence, split the image into a generate step and an edit step, or drop a conflicting detail.

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Generic, stock-looking result | Vague nouns, no stated use | Name the deliverable; replace adjectives with concrete materials and details |
| Wrong canvas shape | Shape set by prompt only on the subscription route | Set `aspect_ratio`, and describe the shape in `composition` ("wide landscape frame") |
| Gibberish lettering on signs or books | No text rule | Add "No text, letters or signatures" to `style` |
| Misspelt words | Long copy, unusual words | Shorten the copy, quote it, spell it letter by letter |
| Detail ignored | Buried mid-list, or contradicts another detail | Give it its own sentence in its natural field; remove the conflict |
| Face or outfit drifts between images | No anchor, reworded look | Pass the anchor as `input`; reuse the exact look words |
| Edit changed too much | No preserve list | Add the "keep everything else exactly the same: …" item; name the specific things that drifted |
| Mood lost in a night or storm scene | Too few atmosphere words | Add light sources, colour and weather detail in `lighting` |
| Modern objects in a period scene | Era left implicit | Name the period in `scene` and exclude the specific anachronisms in `style` |
| Refused or blocked | Content policy, or a named real person or trademark | Read the tool text; describe traits instead of names; keep within policy |

## Canvas and cropping

The three canvases are fixed. For any other final shape (a 3:1 banner, a 16:9 hero, a small token), generate on the nearest canvas and crop afterwards. Compose for the crop: in `composition`, keep the subject inside the band that survives ("subject and horizon within the middle third of the height, open sky above and water below"). Leave headroom on portraits that will be trimmed.

A transparent background has no control on this tool. Ask for "the subject alone on a plain flat white background, no shadow, no scenery" and remove the background afterwards, unless the result already has a transparent background.

## Worked example

A portrait for a character page:

```json
{
  "subject": "A chest-up character portrait for a fantasy campaign wiki of Mara Vey, a woman in her late forties, a weathered harbour pilot with a sun-creased face, short iron-grey hair, a thin white scar through her left eyebrow and steady pale-green eyes, wearing a salt-stained navy wool coat with brass buttons over a cream linen shirt",
  "action": "looking slightly past the viewer with a wry, guarded half-smile",
  "scene": "on a fog-damp harbour quay, ship masts soft and out of focus behind her",
  "composition": "Three-quarter view, chest up, eye level, subject centred with headroom above",
  "lighting": "Cool overcast morning light from the left with a faint warm glow from a lantern behind her",
  "style": "Painterly digital illustration with visible brush texture, muted sea-blue and brass palette, grounded adult proportions, early-18th-century maritime dress. No text, lettering, signatures or watermarks. No modern clothing or objects",
  "aspect_ratio": "3:4"
}
```

An edit of that portrait after play changes her look:

```json
{
  "subject": "Image 1 is Mara Vey's portrait",
  "changes": [
    "Add a fresh bandage wrapped around her right forearm, visible at the coat cuff",
    "Keep everything else exactly the same: her face, hair, scar, expression, coat, framing, background, palette and lighting"
  ],
  "input": [{ "path": "attachments/mara-vey-portrait.webp" }],
  "aspect_ratio": "3:4"
}
```

For patterns by deliverable (photographs, illustrations, products and items, logos and icons, infographics and slides, UI mock-ups, posters and ads, comics and storyboards, maps), read [`references/recipes.md`](references/recipes.md) when the job is one of those.
