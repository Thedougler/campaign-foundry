# Recipes by deliverable

Each recipe says what gpt-image-2 needs for that kind of image and where it goes in the `generate_image` fields. Combine them with the general steps in `SKILL.md`.

## Contents

- [Photographs](#photographs)
- [Character and scene illustrations](#character-and-scene-illustrations)
- [Products, items and props](#products-items-and-props)
- [Logos, icons and emblems](#logos-icons-and-emblems)
- [Infographics, diagrams and slides](#infographics-diagrams-and-slides)
- [UI mock-ups](#ui-mock-ups)
- [Posters, ads and covers](#posters-ads-and-covers)
- [Comics and storyboards](#comics-and-storyboards)
- [Maps and top-down views](#maps-and-top-down-views)
- [Textures and patterns](#textures-and-patterns)

## Photographs

Frame it as a real photograph caught in the moment. Say "photorealistic" or "a real candid photograph". Give the lens and film feel ("35mm film, 50mm lens, shallow depth of field, subtle grain") and ask for real texture (pores, wrinkles, fabric wear, scuffs). Avoid words that mean studio polish ("flawless", "glamour", "perfect skin") unless that is the brief, and add "no heavy retouching" for natural results.

- `style`: "Photorealistic candid photograph, 35mm film look, natural colour, real skin texture and worn materials. Honest and unposed. No glamorisation, no heavy retouching, no text or watermarks"

## Character and scene illustrations

Describe the person fully (age, build, face, hair, skin, clothing, signature props), then the pose, expression and gaze. For the style, list its traits: line (thick ink outline, no outline), shading (cel, soft painterly), palette, proportions and finish. For a scene, give each figure a place ("the captain at the wheel, the boy at the bow") and say what the moment is, so the staging reads.

- `composition`: "Full body visible, feet included, figure on the right third, the storm-lit sea filling the left"
- `style`: "Cel-shaded adult animation style with bold black outlines and hard-edged shadows, saturated teal and sunset palette, grounded proportions. No text or watermarks"

## Products, items and props

Show the object alone, close-framed, lit to show its material, wear and marks. Name the materials and their condition ("tarnished brass, verdigris in the engraving, a dented rim"). Give it a surface or a plain backdrop. For a cutout, ask for a plain flat white background with no shadow, and remove it afterwards.

- `composition`: "Three-quarter view, the object filling most of the frame, on a scarred oak tabletop"
- `lighting`: "Soft window light from the upper left, a crisp highlight along the metal edge"

## Logos, icons and emblems

Describe the brand's personality and use, then ask for a simple original mark: strong silhouette, balanced negative space, few shapes, flat colour, readable at small sizes. Put any brand name in `text`, quoted and spelt out. For an in-world emblem (a guild sigil, a holy symbol), show it as a made object (a wax seal, an enamel badge, a carved amulet), flat-on and centred.

- `style`: "Flat vector-style mark, two colours, clean geometric shapes, generous padding, centred on a plain white background. Original design, no trademarks, no watermark"

## Infographics, diagrams and slides

Write it like an artifact spec, not an illustration request. Name the exact deliverable and audience, the layout and hierarchy, and every label, number and heading the image must show. List the required parts and what must be left out. Use a landscape canvas for slides. Keep labels short, and expect to check every word.

- `subject`: "A one-slide infographic for secondary-school students titled \"How Tides Work\", showing the Moon, the Earth with two tidal bulges, and arrows labelled \"gravity\" and \"inertia\""
- `style`: "Clean flat educational style, white background, consistent simple icons, clear arrows, generous white space. No decorative clutter, no stock photos, no tiny text"

## UI mock-ups

Describe the product as if it already shipped. Name the platform and device frame, the screen and its real elements (header, list rows, buttons, tabs), the hierarchy and the visual language. Avoid concept-art words ("sketch", "wireframe", "concept") unless that is the deliverable.

- `subject`: "A realistic iPhone app screen for a ferry timetable: a header with today's date, a list of four departures with times and berths, one highlighted \"Next\" row and a bottom tab bar"

## Posters, ads and covers

Write a creative brief: the brand or title, audience, the feel, the concept and the exact copy. Let the model make taste decisions inside those bounds. Reserve space for the copy in `composition` and quote the copy in `text`.

- `composition`: "Hero figure in the lower two thirds, clean dark sky across the top third for the title"
- `text`: "\"THE DROWNED CROWN\" in tall weathered serif capitals across the top, exactly as written, once"

## Comics and storyboards

State the panel count and layout, then give one concrete visual beat per panel as labelled sentences in `subject` ("Panel 1: … Panel 2: …"). Keep each beat to action and staging. Keep the cast consistent by repeating each character's key look words, and pass an anchor image when there is one. Put any dialogue in `text` with its panel number, and keep it very short.

## Maps and top-down views

Say "top-down" or "orthographic overhead view", the map's purpose (a regional overview, a player handout, a battle map) and its scale or grid size if it matters. List the features and where they sit ("river enters from the north-east and meets the sea at the south-west harbour"). For a map with no labels, say "no text, labels or compass lettering". For a battle map, ask for even, shadow-light illumination and the whole playable area edge to edge.

## Textures and patterns

Name the material, scale and finish, and ask for an even, flat-lit, straight-on view with no perspective, objects or vignette. For a repeating tile, ask that it be seamless, and test the tiling afterwards, since the model does not guarantee it.
