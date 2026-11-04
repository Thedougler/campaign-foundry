# Filing

## Creature page

The template is the page schema. Copy `wiki/templates/creature.md` and file a Campaign Creature at `<campaign-folder>/Creatures/<slug>.md` and a World-free one at `wiki/Creatures/<slug>.md` ([SKILL.md](../SKILL.md#world-free-creature)), the slug of its `title` (`docs/wiki-layout.md` **Page names**). A page already filed keeps its folder. On a Campaign Creature, keep every frontmatter key and delete each key's `# Campaign-bound.` comment. Add each optional section and the `[!narration]` callout when its guidance condition holds, which it does for a Creature the Party will see, fight or learn about (`docs/wiki-layout.md` **Templates define pages**), and leave out the parts it has nothing for. `## Statblock` comes from `statblock-design`, and a page has no second schema or separate statblock page.

Every signature has both an ecological sign before contact and a visible tell in First sight. Use concrete role language. An ordinary reused Creature stays concise, with no bespoke fiction beyond what the request needs, and still has each optional part whose guidance condition it meets.

A Creature is never a person the DM plays as a character, and a named person is an NPC, on an NPC page with its own optional `## Statblock` (`npc-design`).

## Links

Add an incoming wikilink from a real relevant page besides the generated index, such as a Location's inhabitants or a Scene's Encounter. Create or change an index only through the CLI. For a Wiki outside this repo, every command takes the flags of `skill://lint` § Commands **Another root**.

## Played records

Preserve appearance, ecology, origin, behaviour, named relationships and already-heard Narration unless the DM explicitly asks to change them. Add a new tell rather than rewriting a played record. Played Session Prep, Scenes, Recaps, Previously On pages, Transcript-derived records and `hot.md` stay as they are.
