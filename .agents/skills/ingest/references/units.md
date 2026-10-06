# Units

You plan the Wiki side of one Transcript's ingest from its **Session Ledger**, the line-cited record of what happened in that Session. The page writers that follow work in parallel, one pages file each, so your plan decides who writes what. The top-level orchestrator dispatches you by [transcript.md](transcript.md) with:

```
Read skill://ingest/references/units.md, then plan the units of the Session Ledger archive/<stem>.ledger.md for Session <N>. Work: <work>. Sources: <transcript>. The DM says: "<words>".
```

## Steps

1. **Orient.** Do SKILL.md step 2, then read the Ledger whole. Done when step 2's criterion holds and you have read every section of the Ledger.
2. **Units.** Run SKILL.md step 4 on the Ledger in place of the file. Its units come from the names in PLAY, RULING, STATE and SAID events and in the `## Names` and `## New names` tables, each under its Canon. MOMENT events stay out of the units. The Ledger's **Page** column gives each name's owner, settled by the Names stage's search: take it as found, and search only for a name with no page and for the neighbours of each new page. A Guest character's owner is its NPC page. A capitalised in-world name that a template fits (a person, place, group, creature, item, god) and no page owns is a unit with a new page, whether the Ledger says it or an owner page you read already writes it ("jobs around Yssenmoor" on a Faction page), however little is known of it. Done when step 4's criterion holds for the Ledger and every such name is a unit.
3. **New kinds.** Do [New template](../SKILL.md#new-template) step 1 for any unit whose kind has no template. Its step 2 is a dispatch request in your return. Done when each new kind's template, term and folder exist.
4. **Stubs.** Create every new page now as a stub at its planned path. A stub has its template's frontmatter and every `##` heading, empty, with `sources` listing the `Sources:` path. Seed `Sessions/Session <N>/Session <N> - Recap.md` and `Sessions/Session <N+1>/Session <N+1> - Previously On.md` the same way when either is missing, creating the folder. Then give the Recap's **Left open.** bullet the link `[[Session <N+1> - Previously On]]` when it lacks one, so the Previously On has its inbound link before either writer starts. A stub makes every link to its page resolve from the start, so writers working in parallel never wait on each other's pages. Done when a glob finds every planned new page and both Session records on disk, and the Recap links the Previously On.
5. **Pages files.** Every owner page step 2 lists, existing, new or stub, and every neighbour that must link a new page, goes to exactly one **pages file**, `<work>/pages-<k>.md`, grouped by folder:

   - `Creatures`
   - `PCs` and `NPCs`
   - `Locations` and `Vehicles`
   - `Items` and `Spells`
   - `Factions`, `Deities`, `Lore`, `House Rules`, `Threads` and `Quests`

   A pages file lists at most six pages. Split a larger group, keeping pages that link one another together. For each page the file gives its path (with its template when new), whether it is existing, new or stub, its units with their Ledger lines, and the links that page must gain. Each page is written by one writer only, its file's: a link a neighbour must gain to a new page is listed under the neighbour in the neighbour's own file, and a file names other files' pages only as link targets. Both Session records stay out of every pages file. Done when every owner page and every linking neighbour sits in exactly one pages file, and every edit a file lists is on a page listed in that file.
6. **Return** each pages file's path with its pages, the titles of every new page (the Recap links them, and their pages files fill them), and each dispatch you request (a `skill-writer` for a new kind's design skill, briefed as New template step 2 sets out). Done when the return gives each of these.
