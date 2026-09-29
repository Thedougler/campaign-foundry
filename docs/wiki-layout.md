# Wiki layout

How pages are arranged in the `wiki/` Obsidian vault. Terms are defined in `CONTEXT.md`.

```
wiki/
  <World>/
    <World>.md                 World overview
    Locations/  NPCs/  Creatures/  Factions/  Deities/  Items/  Lore/
    Campaigns/<Campaign>/
      <Campaign>.md            Campaign overview
      PCs/  Threads/  Quests/
      Sessions/<Session N>/    Prep, a page per Scene, Recap, Previously On, Handouts
    attachments/               images and map data
raw/                           Raw: waiting to be ingested (outside the vault)
archive/                       Archive: already ingested (outside the vault)
```

- **One vault, many Worlds.** A Campaign folder appears only once that Campaign exists.
- **Page kind is a property.** Every page has a `type` frontmatter property (`location`, `npc`, `creature`, `faction`, `deity`, `item`, `lore`, `pc`, `thread`, `quest`, …), so Obsidian Bases can build index views.
- **Nesting is a link.** A Location names its containing Location in a `parent` link property. Folders stay flat by kind.
- **Page name = in-world name.** On a real collision anywhere in the vault, add a parenthetical: `Ravenhold (Keep)`.
- **Links are wikilinks.** Images are embedded as `![[file]]` from the World's `attachments/`.
