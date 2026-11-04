# Units

You plan the Wiki side of one Transcript's ingest from its **Session Ledger**, the line-cited record of what happened in that Session. The page writers that follow work in parallel, one pages file each, so your plan decides who writes what. The top-level orchestrator dispatches you by [transcript.md](transcript.md) with:

```text
Read skill://ingest/references/units.md, then plan the units of the Session Ledger archive/<stem>.ledger.md for Session <N>. Work: <work>. Sources: <transcript>. The DM says: "<words>".
```

## Steps

1. **Orient.** Do SKILL.md step 2, then read the Ledger whole.
2. **Units.** Run SKILL.md step 4 on the Ledger in place of the file. Its units come from the names in PLAY, RULING, STATE and SAID events and in the `## Names` and `## New names` tables, each under its Canon. MOMENT events stay out of the units. The Ledger's **Page** column gives each name's owner, settled by the Names stage's search: take it as found, and search only for a name with no page and for the neighbours of each new page. A Guest character's owner is its NPC page. One name can need pages of more than one kind: a name whose lines also describe material of another kind (a Lore page's legend whose subject has met the Party, say) is a unit of that kind too, with a new page, per SKILL.md step 4's rule. A capitalised in-world name that a template fits (a person, place, group, creature, item, god) and no page owns is a unit with a new page, whether the Ledger says it or an owner page you read already writes it ("jobs around Yssenmoor" on a Faction page), however little is known of it. A capitalised in-world name outside every template (an item's command word, the name a PC gives a part of themselves) is a **coinage** (`skill://lint` § Names), with its owner page. It stays plain text on the page of the subject it belongs to, now and later. Once the gate flags its spelling, one line in `.cspell-words.txt` makes it known.
3. **New kinds.** Do [New template](../SKILL.md#new-template) step 1 for any unit whose kind has no template. Its step 2 is a dispatch request in your return.
4. **Stubs.** Create every new page now as a stub at its planned path. A stub has its template's frontmatter, less any `# Campaign-bound.` key on a page in a vault-root kind folder, and every required `##` heading, empty, with its `title` set and `sources` listing the `Sources:` path. Its writer adds optional parts later by SKILL.md [Fill](../SKILL.md#fill). Seed `Sessions/Session <N>/session-<N>-recap.md` and `Sessions/Session <N+1>/session-<N+1>-previously-on.md` the same way when either is missing, creating the folder. Then give the Recap's **Left open.** bullet the link `[[session-<N+1>-previously-on|Session <N+1> - Previously On]]` when it lacks one, so the Previously On has its inbound link before either writer starts. A stub makes every link to its page resolve from the start, so writers working in parallel never wait on each other's pages.
5. **Pages files.** Every owner page step 2 lists, existing, new or stub, and every neighbour that must link a new page, goes to exactly one **pages file**, `<work>/pages-<k>.md`, grouped by folder:

   - `Creatures`
   - `PCs` and `NPCs`
   - `Locations` and `Vehicles`
   - `Items` and `Spells`
   - `Factions`, `Deities`, `Lore`, `House Rules`, `Threads` and `Quests`

   Split a large group so its writers run in parallel, keeping pages that link one another together. For each page the file gives its path (with its template when new), whether it is existing, new or stub, its units with their Ledger lines, each coinage it holds as `Coinage: <name> (<what it is>, L<lines>)`, and the links that page must gain. Each page is written by one writer only, its file's: a link a neighbour must gain to a new page is listed under the neighbour in the neighbour's own file, and a file names other files' pages only as link targets. Both Session records stay out of every pages file.
6. **Return** each pages file's path with its pages, the titles of every new page (the Recap links them, and their pages files fill them), each coinage with its owner page, and each dispatch you request (a `skill-writer` for a new kind's design skill, briefed as New template step 2 sets out).
