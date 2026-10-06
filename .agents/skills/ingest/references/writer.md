# Writer

You write one part of a Transcript's ingest from its **Session Ledger**, the line-cited record of what happened in that Session. Your brief sets your branch, either a pages file ([Pages](#pages)) or the Recap ([Recap](#recap)). Everything past your pages (the archive, the log, `index.md`, `hot.md` and the run's gate) stays with the coordinator that dispatched you. Other writers are editing the other pages in parallel, so you edit only the pages your branch gives you.

## The Ledger

Read the Ledger whole before you write. It stands for the Transcript:

- PLAY, RULING and STATE events are played. A RULING is Canon.
- SAID is the speaker's claim, filed as theirs.
- MOMENT events belong to the Previously On alone.
- An unresolved flag's claim stays out of the Wiki. Quote it in your return.
- `sources` lists the `Sources:` path from your brief, never the Ledger or the Summary.
- Read the Transcript only at the Ledger lines whose exact words you need.

## Pages

1. **Orient.** Do SKILL.md step 2, then read your pages file and `skill://lint/prose.md`. Done when step 2's criterion holds and you have read your pages file and the prose bar.
2. **Canon.** Do SKILL.md step 5 for every claim the Ledger makes about your pages' units. Done when every claim falls under exactly one case.
3. **Write.** Do SKILL.md step 6 on your pages, one page at a time: finish an existing page, check it and repair every finding before you open the next one. Create each new page your pages file lists and add each link it lists. Done when step 6's criterion holds for your pages and each existing page's last check came back clean.
4. **Fill.** Do SKILL.md step 7 on your new pages and stubs, checking each page as you finish its fill. Done when step 7's criterion holds and each filled page's last check came back clean.
5. **Return** the paths you touched, each page made and changed, each stub with its empty headings, each claim kept out (word for word) and what overrode it, each `agentic-co-dm/` page a Fill fact came from, and each finding you suspect a rule reported in error, with its rule and sentence. List any page you need outside your pages file: create it when its folder is in your group, else return it for the coordinator. Done when every item has its line.

## Recap

1. **Orient.** Do SKILL.md step 2, then read `wiki/templates/Recap.md`, `wiki/templates/Previously On.md` and `skill://lint/prose.md`. Done when step 2's criterion holds and you have read both templates and the prose bar.
2. **Read** every Thread page of the Campaign. Done when you can say for each Thread whether the Ledger's play moved, opened, resolved or left it still.
3. **Recap.** Write `Sessions/Session <N>/Session <N> - Recap.md` in the Recap template's shape, replacing any earlier Recap there, from the Ledger's events in order. Link each page a change touches, the new pages your brief lists included. Check the page and repair every finding. Done when its `## Threads` gives every Thread of the Campaign one line and the page's last check came back clean.
4. **Previously On page.** Session N's Transcript also feeds the Previously On read aloud at the start of Session N+1, kept in Session N+1's folder. Seed `Sessions/Session <N+1>/Session <N+1> - Previously On.md` from its template, creating the folder when it is missing and replacing any earlier page there. Fill its frontmatter and its `## At a glance` bullets. The **Covers** bullet cites `[[Session <N> - Recap]]`. The **Ends on** bullet gives the Ledger's `## Ends`. Under **Leads into** goes Session N+1's Prep when it exists, else the Recap's open questions. Leave the `Previously on` callout holding its template comment for the Previously On writer. Link the page from the Recap's `**Left open.**` bullet. Done when the page exists with its frontmatter and At a glance filled and the Recap links it.
5. **Return** both paths and each claim kept out (word for word) and what overrode it. Done when every item has its line.
