# Wiki layout

How pages are arranged and structured in the Wiki, an Obsidian vault. Terms are defined in `CONTEXT.md`.

Every path starts at one of two roots:

- **Vault root**: `wiki/`, the folder containing `.obsidian/`. Every `cf` command reads it as `--vault` (default `<repo root>/wiki`), and `src/` calls it `vault.dir`. "The vault root" in `cf` output means this folder. Wikilinks, `--page` values and vault-relative paths start here.
- **Repo root**: the git checkout, `--root`. `raw/`, `archive/`, `.cspell/` and every `sources` path start here.

```
wiki/                          vault root
  .obsidian/                   Obsidian settings and plugins
  .cspell-words.txt            in-world words with no page, one list for the vault
  index.md                     generated: each Campaign overview, then any shared pages by kind
  dm-settings.md               the DM's defaults (Session length: 4 hours)
  templates/                   one Obsidian template per page kind
  <Kind>/  attachments/        shared content, created only when a second Campaign reuses a page
  <campaign>/                  one folder per Campaign, a lowercase-hyphenated slug with no spaces (shattered-sea)
    <campaign>.md              Campaign overview (type Campaign); may override DM Settings
    <world>.md                 World overview (type World): tone, Calendar
    campaign-config.md         tone, themes, Lines and Veils: instructions agents follow
    story-so-far.md            arc-level view, rewritten by story-arc after each Ingest
    hot.md                     current state of play
    index.md                   generated catalog of this Campaign folder's pages
    log.md                     append-only record of the Agent's work
    attachments/               Visuals, Handout images and map data, flat
    Locations/  NPCs/  Creatures/  Factions/  Deities/  Items/  Spells/  Vehicles/  Lore/  House Rules/
    PCs/  Threads/  Quests/
    Sessions/Session <N>/      Prep, a page per Scene, Recap, Previously On (recounts Session N−1, read aloud at the start of N), Handouts
raw/                           Raw: waiting to be ingested; flat, no folders (outside the vault)
archive/                       Archive: already ingested; flat, no folders (outside the vault); also each Transcript's Session Ledger and recording
.cspell/dnd-terms.txt          D&D rules terms for spelling (outside the vault)
```

## Pages

- **One vault, many Campaigns.** A Campaign folder appears once that Campaign exists. A shared kind folder at the vault root appears once a second Campaign reuses a page.
- **Minimal properties.** Every page records `title`, `type`, `summary` (one line), `sources` and `revealed` (`CONTEXT.md` **Revealed**) in its frontmatter, plus `kind` where its page kind has kinds (Location, Scene). The `sources` values are repo-relative paths of the archived Raw the page was built from, such as `archive/session-11-transcript.md`, written as plain strings because `archive/` is outside the vault. Page-kind properties are added only where needed: `parent` on a Location, `creature` on an NPC, an in-world `date` on Prep, Recap, Previously On and `hot.md`, `status` on a Thread or Quest, `dndbeyond_url` on a PC, and `session_length_hours` on `DM Settings` and on a Campaign that overrides it. Links in properties are quoted wikilinks: `parent: "[[the-shattered-sea|The Shattered Sea]]"`.
- **Nesting is a link.** A Location records its containing Location in `parent`. Each kind has one flat folder.
- **Page names.** A page's `title` property names it, and its filename is that title's slug: lowercase, hyphenated, no spaces (`title: Nona Black-Jaw` in `nona-black-jaw.md`, per [ADR 0028](adr/0028-page-names-are-slug-filenames.md)). `title` is never blank. On a real title collision anywhere in the vault, add a parenthetical to the title: `title: Otar the Foul (Creature)` in `otar-the-foul-creature.md`. Fixed files keep their established filenames under fixed titles: `campaign-config.md` (`Campaign config`), `story-so-far.md` (`Story so far`) and `hot.md` (`Hot`). The generated `index.md` and `log.md` have no title. A Session's pages, Handouts aside, are titled `Session <N> - <kind or Scene title>`: `Session 3 - Prep` in `session-3-prep.md`, `Session 3 - Recap`, `Session 3 - The Drowned Bell`. Move or retitle a page with `bun run cf -- rename` (its `--help` gives the forms), which rewrites every link to it.
- **Every page is reachable.** Each page has a link in from another page, other than the roots (`index.md`, `DM Settings`, World and Campaign overviews, `log.md`, `hot.md`). A link in a property counts both ways, since the target's Base lists the page.
- **Links are wikilinks.** Each link targets the page's slug and shows its title: `[[nona-black-jaw|Nona Black-Jaw]]`, `[[nona-black-jaw#Play|Nona Black-Jaw]]`, `![[otar-the-foul-creature#Statblock|Otar the Foul (Creature)]]`. Other shown text stays on the slug: `[[nona-black-jaw|the Black-Jaw]]`.
- **Visuals.** `skill://visuals` decides, makes, places and checks each Visual (`CONTEXT.md` **Visual**), in the style of `user-config.md` § Art style.
  - **Files.** Every image sits flat in the Campaign folder's `attachments/` (or the shared `attachments/` once one exists), named `<subject-slug>-<kind>.<ext>` in the page-name slug style: `nona-black-jaw-portrait.webp`. The subject slug is its page's slug. A second file of one kind adds a variant after the kind, `wolfrabbit-portrait-2.webp` or `session-11-angry-birds-battle-map-descent.png`. Art is `.webp`. A battle map or reference sheet keeps the format it was made in, and a new one is lossless `.png`. `bun run cf -- convert` brings older files to this form.
  - **Kinds.** `portrait`, `token` and `reference-sheet` show a character. `scene` is a scene-setter or recap illustration, `render` an Item, `banner` a Location or Vehicle establishing strip, `sigil` a Faction's mark, `symbol` a Deity's, `map` a Region or Settlement map, `battle-map` a fight's tactical map, and `handout-art` a Handout's image.
  - **Embeds.** Each embed is bare, `![[nona-black-jaw-portrait.webp]]`, alone on its line. A depiction goes in the page's lede above `## At a glance`, where its template's optional slot puts it. A battle map opens its Scene's `### Battlefield` or `### Encounter`, or its Site's `### Areas`. A Handout's image goes under its callout.
  - **Diagrams.** Structure on a page is a mermaid block, a Markdown table or a callout, in the section whose structure it shows: a Faction's `### Structure`, the `## Timeline` of `story-so-far.md`.
  - **Battle maps.** A battle map is 64 px per 5-foot square, so its size in pixels gives its Foundry grid. Its walls, doors and lights come from a Universal VTT file beside it with the same name (`<subject-slug>-battle-map.uvtt` or `.dd2vtt`). Push builds a Foundry scene for each Scene whose page, or a Site it links, embeds a battle map.
- **Anatomy, in table-pressure order.** The sections run in this order:
  1. At a glance: the summary plus the three to five facts needed in ten seconds, under the lede's Visuals.
  2. Narration in a `[!narration]` callout.
  3. Play: what it does at the table.
  4. Depth: history, hidden truths, Threads.
  5. Links: rendered from properties or an embedded Base.
- **Templates define pages.** A page kind's template in `templates/` states that kind's required properties and sections. The gate reads them from the template, so editing a template changes how every page of that kind is checked. There are no separate schema files. The reading rules:
  - A page's template is the file in `templates/` whose frontmatter `type` and `kind` match the page's. Each file is named for them in the page-name slug style: `templates/npc.md`, or `templates/location-site.md` for a page kind with kinds. `type` values are the glossary terms, plus `hot` and `DM Settings`.
  - Every frontmatter key in a template is required on the page. `type` and `kind` state their literal values. `title` and `summary` are never blank. Any other key may be blank where it doesn't apply (`parent` on a top-level Region).
  - Every `##` heading in a template is a required section, in template order, unless its guidance comment opens with `Optional.` (`%% Optional. Include it when … %%`). A page leaves an optional section out or keeps it in template order, and `cf check --fix` deletes an empty one. `###` headings are optional structure: a page keeps the ones it has content for. Every callout type in a template is required on the page, under the section the template puts it in.
  - The lede, between the frontmatter and the first `##` heading, holds the page's Visuals. Each one appears in a template as a default embed under an `%% Optional. … %%` comment, such as `![[<slug>-portrait.webp]]`. Every embed a page fills takes the page's own slug, and an unused one is deleted. The gate reports an embed left at `<slug>` as a missing attachment. A battle-map embed inside a template section works the same way. A template's mermaid diagram is the default layout, which a page redraws with its own members and Sessions.
  - Authoring guidance is written in `%% %%` comments, which a finished page removes. Each section's comment says when to include the section and what goes in it, and is written to pass `bun run cf -- check` as page prose.
- **New page kinds.** A page kind joins the Wiki in four places, each beside its nearest sibling kind's entry:
  - Its template, `templates/<type-slug>.md`, copying the sibling's frontmatter keys and `## Links` Base and following the anatomy above.
  - Its glossary term in `CONTEXT.md` (`**<type>**:`, a one-line definition, then an `_Avoid_:` line), which Ingest's judge reads as the kind's rubric.
  - Its folder in the tree at the top.
  - Its entry in each `src/` list or table of page `type`s that references the sibling (the `grep` tool, pattern `\b<sibling type>\b`, path `src`, finds each).
- **PC sides.** `bun run cf -- pull` replaces the `Sheet`, `Spells` and `Inventory` sections whole from the PC's `dndbeyond_url`. It never touches `Story`, `Goals and bonds` or `Plans`. It fills `summary` only when blank, and logs a `pull` only when a page changed.
- **Played Sessions are records.** Once a Session is played and ingested, its Prep, Scenes, Recap and Previously On record what was planned and what happened, and their `revealed` line records when each came up at the table. Later work changes the pages they link to and that `revealed` line, never the rest of these. Narration the Players have heard at the table belongs to that record too. Later work adds to it (a new tell) and rewrites it only when the DM asks or to fix a `bun run cf -- check` finding. The rewrite keeps every fact.
- **Handouts.** Push shows Players only a Handout's `[!narration]` callout and the image embedded under it. The rest of the page stays with the DM.
- **Stat blocks.** A Creature's `## Statblock` contains one Fantasy Statblocks block (`layout: Basic 5e Layout`). Other pages link the Creature (an NPC through `creature`). Only an Encounter where it is fought embeds the block, as `![[<creature-slug>#Statblock|<Creature title>]]`. No page retypes it.

## index, log and hot

Each Campaign folder has its own `index.md`, `log.md` and `hot.md`. The vault root has only the generated `index.md`.

- **`index.md`** is generated by `index` (`skill://lint` § Commands) from every page's `summary` and is never edited by hand. The root `index.md` lists each Campaign overview, then any shared pages by kind. Each Campaign folder's `index.md` lists every page in it, Sessions included, grouped by page kind, each entry a `[[slug|Title]]` link, then an em dash, then the page's summary. The gate fails a missing or stale index, and `--fix` regenerates it.
- **`log.md`** is append-only, one entry per Agent operation, written by `log` (`skill://lint` § Commands) once the operation's edits pass the gate: `## [YYYY-MM-DD] <op> | Title` (`create` is worldbuilding outside Ingest and Prep), then one `- [[slug|Title]]` bullet per page touched. It uses real-world dates and rotates to `log-YYYY.md` each year.
- **`hot.md`** is rewritten, never appended, after every Ingest and Prep. Only Ingest and Prep rewrite it, and an audit restates each of its lines a fix overturns. It is for orientation, not evidence, and stays under about 500 words (the gate fails over 550). It records the Party's in-world date and Location, the active Threads, the last Session's changes and what comes next.
