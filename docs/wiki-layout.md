# Wiki layout

How pages are arranged and shaped in the `wiki/` Obsidian vault. Terms are defined in `CONTEXT.md`.

```
wiki/
  index.md                     lists the Worlds
  DM Settings.md               the DM's defaults (Session length: 4 hours)
  templates/                   one Obsidian template per page kind
  <World>/
    <World>.md                 World overview: tone, Calendar
    index.md                   generated catalog of this World's pages
    log.md                     append-only record of the Agent's work
    Locations/  NPCs/  Creatures/  Factions/  Deities/  Items/  Spells/  Vehicles/  Lore/  House Rules/
    attachments/               images and map data
    <Campaign>/                campaign-specific types only
      <Campaign>.md            Campaign overview; may override DM Settings
      campaign-config.md       tone and themes for this Campaign
      hot.md                   current state of play
      PCs/  Threads/  Quests/  House Rules/
      Sessions/Session <N>/     Prep, a page per Scene, Recap, Previously On (recounts Session N, read aloud at N+1), Handouts
raw/                           Raw: waiting to be ingested; flat, no folders (outside the vault)
archive/                       Archive: already ingested; flat, no folders (outside the vault)
```

## Pages

- **One vault, many Worlds.** A Campaign folder appears only once that Campaign exists.
- **Minimal properties.** Every page carries `type`, `summary` (one line) and `sources` (repo-relative paths of the archived Raw it was built from, such as `archive/session-11-transcript.md`, as plain strings because `archive/` is outside the vault), plus `kind` where its page kind has kinds (Location, Scene). Page-kind properties are added only where needed: `parent` on a Location, `creature` on an NPC, an in-world `date` on Prep, Recap, Previously On and `hot.md`, `status` on a Thread or Quest, `dndbeyond_url` on a PC, and `session_length_hours` on `DM Settings` and on a Campaign that overrides it. Links in properties are quoted wikilinks: `parent: "[[The Shattered Sea]]"`.
- **Nesting is a link.** A Location names its containing Location in `parent`. Folders stay flat by kind.
- **Page names.** Files are kebab-case: `ravenhold`, `captain-morrow`, `campaign-config`. Underscores are not. A Session's pages, Handouts aside, are named `Session <N> - <kind or Scene title>`: `Session 3 - Prep`, `Session 3 - Recap`, `Session 3 - The Drowned Bell`. On a real collision anywhere in the vault, add a parenthetical: `ravenhold-(keep)`.
- **Every page is reachable.** Each page has a link in from another page, other than the roots (`index.md`, `DM Settings`, World and Campaign overviews, `log.md`, `hot.md`). A link held in a property counts both ways, since the target's Base lists the page.
- **Links are wikilinks.** Images are embedded as `![[file]]` from the World's `attachments/`, named `<Page> - <Kind>.webp` (`Portrait`, `Battle Map`, `Handout`). A battle map is 64 px per 5-foot square, so its size in pixels gives its Foundry grid; its walls, doors and lights come from a Universal VTT file beside it (`<Page> - Battle Map.uvtt` or `.dd2vtt`). Push builds a Foundry scene for each Scene whose page, or a Site it links, embeds a battle map.
- **Anatomy, in table-pressure order:** at a glance (the summary plus the 3–5 facts needed in ten seconds), then Narration in a `[!narration]` callout, then Play (what it does at the table), then Depth (history, hidden truths, Threads), then Links (rendered from properties or an embedded Base).
- **Templates define pages.** A page kind's template in `templates/` is the single source of its shape. The gate reads each page's required properties and sections from its template, so editing a template changes how every page of that kind is checked. There are no separate schema files. The reading rules:
  - A page's template is `templates/<type>.md`, or `templates/<type> - <kind>.md` for page kinds with kinds. `type` values are the glossary terms, plus `hot` and `DM Settings`.
  - Every frontmatter key in a template is required on the page. `type` and `kind` carry their literal values; `summary` is never blank; any other key may be blank where it doesn't apply (`parent` on a top-level Region).
  - Every `##` heading in a template is a required section, in template order. `###` headings are optional structure: a page keeps the ones it has content for. Every callout type in a template is required on the page.
  - Authoring guidance lives in `%% %%` comments, which a finished page removes.
- **Words.** Spelling is British. An in-world name passes by having a page, which also hides it from Vale's wording rules (so the Countless faction is not filler); an in-world word with no page of its own (a month, a minor name) goes in the vault's `.cspell-words.txt`, and a rules term in `.cspell/dnd-terms.txt`.
- **PC sides.** `bun run cf -- pull` replaces the `Sheet`, `Spells` and `Inventory` sections whole from the PC's `dndbeyond_url` and never touches `Story`, `Goals and bonds` or `Plans`. It fills `summary` only when blank, and logs a `pull` only when a page changed.
- **Played Sessions are records.** Once a Session is played and ingested, its Prep, Scenes, Recap and Previously On record what was planned and what happened. Later work changes the pages they link to, never these. Narration the Players have heard at the table belongs to that record too: later work adds to it (a new tell) and rewrites it only when the DM asks or to fix a `bun run cf -- check` finding, keeping every fact.
- **Handouts.** Push shows Players only a Handout's `[!narration]` callout and the image embedded under it; the rest of the page stays with the DM.
- **Stat blocks.** A Creature's `## Statblock` holds one Fantasy Statblocks block (`layout: Basic 5e Layout`). Other pages link the Creature (an NPC through `creature`). Only an Encounter where it is fought embeds the block, as `![[Creature#Statblock]]`; no page retypes it.

## index, log and hot

- **`index.md`** is generated by `bun run cf -- index` from every page's `summary` and never edited by hand. The root `index.md` lists the Worlds; each World's `index.md` lists every page in it, Campaigns and Sessions included, grouped by page kind as `[[Page]] — summary`. The gate fails a missing or stale index, and `bun run cf -- check --fix` regenerates it.
- **`log.md`** is append-only, one entry per Agent operation, written by `bun run cf -- log` once the operation's edits pass the gate: `## [YYYY-MM-DD] create|ingest|prep|push|audit|pull|query|lint | Title` (`create` is worldbuilding outside Ingest and Prep), then one `- [[Page]]` bullet per page touched. It uses real-world dates and rotates to `log-YYYY.md` each year.
- **`hot.md`** is rewritten, never appended, after every Ingest and Prep, and nothing else writes it. It holds about 500 words (the gate fails over 550): the Party's in-world date and Location, the active Threads, what changed last Session and what's next. It is for orientation, not evidence.
