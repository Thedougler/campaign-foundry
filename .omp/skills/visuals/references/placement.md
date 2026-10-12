# Placement

Which Visuals each page kind gets, where each one goes and what its file is called. Step 1 of `SKILL.md` lists the open slots from this page, and step 7 embeds into them.

## Slots

The **lede** is the space between a page's frontmatter and its first `##` heading, where the page's template shows the default embed under an `Optional.` comment. Files go flat into the `attachments/` folder beside the embedding page's home (`docs/wiki-layout.md`): the vault root's for a World-free page, the Campaign folder's for a Campaign page. Name each `<slug>-<kind>.<ext>` in lowercase kebab-case: the slug of the page that embeds the Visual, then the kind suffix from `prompts.md` § Kinds (`nona-black-jaw-portrait.webp`, `session-13-the-hearing-battle-map.png`).

| Page kind | Visual it gets | Slot | File |
| --- | --- | --- | --- |
| NPC, PC, Creature | portrait | lede | `<slug>-portrait.webp` |
| Region, Settlement, Site | establishing banner | lede | `<slug>-banner.webp` |
| Site where a fight can happen | battle map | first line under `## Areas` | `<slug>-battle-map.png` |
| Item | photoreal render | lede | `<slug>-render.webp` |
| Vehicle | establishing banner of the craft | lede | `<slug>-banner.webp` |
| Faction | sigil | lede | `<slug>-sigil.webp` |
| Faction with a structure | mermaid hierarchy or relationship web | `## Structure` | none |
| Deity | holy symbol | lede | `<slug>-symbol.webp` |
| Scene, any kind | scene-setter | lede | `<slug>-scene.webp` |
| Cliffhanger with an `## Encounter` | battle map | first line under `### Battlefield` | `<slug>-battle-map.png` |
| Hook or Climax the Party may fight | battle map | first line under `## Encounter` | `<slug>-battle-map.png` |
| Recap | recap illustration | lede | `<slug>-scene.webp` |
| Handout with an image | reveal art | directly under its `[!narration]` callout | `<slug>-handout-art.webp` |
| story-so-far | mermaid `timeline` | `## Timeline`, after `## Arc position` | none |
| Lore, Spell, House Rule | only when the test below passes | lede | `<slug>-scene.webp` or a diagram |

A PC page may also embed a `<slug>-reference-sheet.png` in its lede. Tokens (`<slug>-token.webp`) and reference sheets are the DM's own uploads. Reuse them as continuity input, and make one only when the DM asks.

## Visuals by page kind

- **Entity depictions.** Every revealed NPC, PC, Creature, Location, Item, Vehicle, Faction and Deity page gets its depiction. A page with `revealed: ""` gets one only when the Prep being built links it, or once it is revealed.
- **Scene-setters.** A Scene gets one when the moment looks different from its Location's banner: another hour or weather, a crowd, damage, or a place the table has not seen.
- **Battle maps.** Every Scene the Party may fight gets one, and so does a Site whose `## Areas` hosts the fight. A Scene that links a Site with a battle map uses that map, so its own slot is left empty. Push turns each map into a Foundry scene and warns about a Cliffhanger or Climax without one.
- **Recap illustrations.** Each Recap gets one, of the moment the table will remember the Session by. Further illustrations go into `## What happened` only when the DM asks, each after the paragraph it shows, one per paragraph.
- **Structure diagrams.** A Faction gets `## Structure` when its pages describe its chain of command or members whose loyalties cross. The story-so-far gets its `## Timeline` once two or more arcs have played. `diagrams.md` sets the test and the forms.
- **Lore, Spell and House Rule pages.** A Lore page that records one event the table will picture, such as a battle or a founding, gets a scene. So does a Spell whose effect has a look the DM describes at the cast. A House Rule gets a mermaid flowchart only when its procedure branches beyond what a reader follows in its prose at a glance. Other pages of these kinds go without.

## Embed rules

- Each embed is bare, `![[<file>]]`, without alt text or a size, on its own line with a blank line above and below.
- A slot takes one Visual. Embeds stay out of callouts, except the image under a Handout's callout, which follows the callout as its own block.
- A page's existing extra embeds (several portraits, a token beside a portrait) are the DM's. Leave them where they are.

## Session and Prep

- **Prep.** Prep hands this skill the Session's pages. Fill each Scene's scene-setter and battle map, and the depictions of the draft pages the Prep links. Plan **reveal art** for each moment the Players first see a key person, place or object. It is a Handout page whose `[!narration]` callout is the caption, with the image directly under the callout. Reveal art shows only what the Players see at that moment, leaving out every hidden truth and every detail from a page they have not met. When a depiction already shows exactly that, embed the existing file under the callout.
- **Ingest.** After the Recap is filed, Ingest hands over the Recap and every page it changed. Fill the recap illustration. Pages the Session revealed now get their depictions. A look the Session changed (a scar, a new coat, a transformation) is an open slot, filled by editing the portrait as `prompts.md` § Continuity sets out.
- **story-arc** keeps the story-so-far's `## Timeline` current when it rewrites the page.
- **Push** ships each Handout's callout with the image under it. It builds a Foundry scene from each embedded file whose name contains `battle-map`, on the Scene or on a Site it links, and uses `<slug>-portrait.webp` as the Actor image and token of an NPC or Creature. Push is the only route a Visual takes to the Players.
