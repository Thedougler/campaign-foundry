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
  DM Settings.md               the DM's defaults (Session length: 4 hours)
  templates/                   one Obsidian template per page kind
  <Kind>/  attachments/        shared content, created only when a second Campaign reuses a page
  <campaign>/                  one folder per Campaign, a lowercase-hyphenated slug with no spaces (shattered-sea)
    <Campaign>.md              Campaign overview (type Campaign); may override DM Settings
    <World>.md                 World overview (type World): tone, Calendar
    campaign-config.md         tone, themes, Lines and Veils: instructions agents follow
    story-so-far.md            arc-level view, rewritten by story-arc after each Ingest
    hot.md                     current state of play
    index.md                   generated catalog of this Campaign folder's pages
    log.md                     append-only record of the Agent's work
    attachments/               images and map data
    Locations/  NPCs/  Creatures/  Factions/  Deities/  Items/  Spells/  Vehicles/  Lore/  House Rules/
    PCs/  Threads/  Quests/
    Sessions/Session <N>/      Prep, a page per Scene, Recap, Previously On (recounts Session N−1, read aloud at the start of N), Handouts
raw/                           Raw: waiting to be ingested; flat, no folders (outside the vault)
archive/                       Archive: already ingested; flat, no folders (outside the vault); also each Transcript's Session Ledger and recording
.cspell/dnd-terms.txt          D&D rules terms for spelling (outside the vault)
```

## Pages

- **One vault, many Campaigns.** A Campaign folder appears once that Campaign exists. A shared kind folder at the vault root appears once a second Campaign reuses a page.
- **Minimal properties.** Every page records `type`, `summary` (one line), `sources` and `revealed` (`CONTEXT.md` **Revealed**) in its frontmatter, plus `kind` where its page kind has kinds (Location, Scene). The `sources` values are repo-relative paths of the archived Raw the page was built from, such as `archive/session-11-transcript.md`, written as plain strings because `archive/` is outside the vault. Page-kind properties are added only where needed: `parent` on a Location, `creature` on an NPC, an in-world `date` on Prep, Recap, Previously On and `hot.md`, `status` on a Thread or Quest, `dndbeyond_url` on a PC, and `session_length_hours` on `DM Settings` and on a Campaign that overrides it. Links in properties are quoted wikilinks: `parent: "[[The Shattered Sea]]"`.
- **Nesting is a link.** A Location records its containing Location in `parent`. Each kind has one flat folder.
- **Page names.** A page's `title` property names it, and its filename is that title's slug: lowercase, hyphenated, no spaces (`title: Nona Black-Jaw` in `nona-black-jaw.md`, per [ADR 0028](../docs/adr/0028-page-names-are-slug-filenames.md)). Every template requires `title`; a blank value is fine on an un-migrated file, whose old in-world filename still names it until the title is set. Links resolve by title, then aliases, then the filename stem. On a real title collision anywhere in the vault, add a parenthetical to the title: `Otar the Foul (Creature)`. Fixed and generated files (`campaign-config`, `story-so-far`, `hot`, `index`, `log`) have no title. A Session's pages, Handouts aside, are titled `Session <N> - <kind or Scene title>`: `Session 3 - Prep`, `Session 3 - Recap`, `Session 3 - The Drowned Bell`.
- **Every page is reachable.** Each page has a link in from another page, other than the roots (`index.md`, `DM Settings`, World and Campaign overviews, `log.md`, `hot.md`). A link in a property counts both ways, since the target's Base lists the page.
- **Links are wikilinks.** Images are embedded as `![[file]]` from the Campaign folder's `attachments/` (or the shared `attachments/` once one exists), named `<Page> - <Kind>.webp` (`Portrait`, `Battle Map`, `Handout`). A battle map is 64 px per 5-foot square, so its size in pixels gives its Foundry grid. Its walls, doors and lights come from a Universal VTT file beside it (`<Page> - Battle Map.uvtt` or `.dd2vtt`). Push builds a Foundry scene for each Scene whose page, or a Site it links, embeds a battle map.
- **Anatomy, in table-pressure order.** The sections run in this order:
  1. At a glance: the summary plus the three to five facts needed in ten seconds.
  2. Narration in a `[!narration]` callout.
  3. Play: what it does at the table.
  4. Depth: history, hidden truths, Threads.
  5. Links: rendered from properties or an embedded Base.
- **Templates define pages.** A page kind's template in `templates/` states that kind's required properties and sections. The gate reads them from the template, so editing a template changes how every page of that kind is checked. There are no separate schema files. The reading rules:
  - A page's template is `templates/<type>.md`, or `templates/<type> - <kind>.md` for page kinds with kinds. `type` values are the glossary terms, plus `hot` and `DM Settings`.
  - Every frontmatter key in a template is required on the page. `type` and `kind` state their literal values. `summary` is never blank. Any other key may be blank where it doesn't apply (`parent` on a top-level Region).
  - Every `##` heading in a template is a required section, in template order, unless its guidance comment opens with `Optional.` (`%% Optional. Include it when … %%`). A page leaves an optional section out or keeps it in template order, and `cf check --fix` deletes an empty one. `###` headings are optional structure: a page keeps the ones it has content for. Every callout type in a template is required on the page, under the section the template puts it in.
  - Authoring guidance is written in `%% %%` comments, which a finished page removes. Each section's comment says when to include the section and what goes in it, and is written to pass `bun run cf -- check` as page prose.
- **New page kinds.** A page kind joins the Wiki in four places, each beside its nearest sibling kind's entry:
  - Its template, `templates/<type>.md`, copying the sibling's frontmatter keys and `## Links` Base and following the anatomy above.
  - Its glossary term in `CONTEXT.md` (`**<type>**:`, a one-line definition, then an `_Avoid_:` line), which Ingest's judge reads as the kind's rubric.
  - Its folder in the tree at the top.
  - Its entry in each `src/` list or table of page `type`s that references the sibling (the `grep` tool, pattern `\b<sibling type>\b`, path `src`, finds each).
- **PC sides.** `bun run cf -- pull` replaces the `Sheet`, `Spells` and `Inventory` sections whole from the PC's `dndbeyond_url`. It never touches `Story`, `Goals and bonds` or `Plans`. It fills `summary` only when blank, and logs a `pull` only when a page changed.
- **Played Sessions are records.** Once a Session is played and ingested, its Prep, Scenes, Recap and Previously On record what was planned and what happened, and their `revealed` line records when each came up at the table. Later work changes the pages they link to and that `revealed` line, never the rest of these. Narration the Players have heard at the table belongs to that record too. Later work adds to it (a new tell) and rewrites it only when the DM asks or to fix a `bun run cf -- check` finding. The rewrite keeps every fact.
- **Handouts.** Push shows Players only a Handout's `[!narration]` callout and the image embedded under it. The rest of the page stays with the DM.
- **Stat blocks.** A Creature's `## Statblock` contains one Fantasy Statblocks block (`layout: Basic 5e Layout`). Other pages link the Creature (an NPC through `creature`). Only an Encounter where it is fought embeds the block, as `![[Creature#Statblock]]`. No page retypes it.

## index, log and hot

Each Campaign folder has its own `index.md`, `log.md` and `hot.md`. The vault root has only the generated `index.md`.

- **`index.md`** is generated by `index` (`skill://lint` § Commands) from every page's `summary` and is never edited by hand. The root `index.md` lists each Campaign overview, then any shared pages by kind. Each Campaign folder's `index.md` lists every page in it, Sessions included, grouped by page kind, each entry a `[[Page]]` link, then an em dash, then the page's summary. The gate fails a missing or stale index, and `--fix` regenerates it.
- **`log.md`** is append-only, one entry per Agent operation, written by `log` (`skill://lint` § Commands) once the operation's edits pass the gate: `## [YYYY-MM-DD] <op> | Title` (`create` is worldbuilding outside Ingest and Prep), then one `- [[Page]]` bullet per page touched. It uses real-world dates and rotates to `log-YYYY.md` each year.
- **`hot.md`** is rewritten, never appended, after every Ingest and Prep. Only Ingest and Prep write it. It is for orientation, not evidence, and stays under about 500 words (the gate fails over 550). It records the Party's in-world date and Location, the active Threads, the last Session's changes and what comes next.
