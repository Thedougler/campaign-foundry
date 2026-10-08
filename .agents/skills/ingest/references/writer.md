# Writer

You write one part of a Transcript's ingest from its **Session Ledger**, the line-cited record of what happened in that Session. The top-level orchestrator dispatches you by [transcript.md](transcript.md), and your brief sets your branch, one of [Pages](#pages) for a pages file, [Recap](#recap), [Previously On](#previously-on) for the next Session's page and [Close](#close). Other writers edit the other pages in parallel, so you edit only the pages your branch gives you. The archive, the log, `index.md` and the run's gate stay with the orchestrator.

## The Ledger

The Recap and Previously On writers read the Ledger whole. A page writer reads the Ledger's header, `## Names` and `## Unresolved flags`, then the scene around each line its pages file cites. The Close reads only what its steps name. The Ledger stands for the Transcript:

- PLAY, RULING and STATE events are played. A RULING is Canon.
- SAID is the speaker's claim, filed as theirs.
- MOMENT events belong to the Previously On alone.
- An unresolved flag's claim stays out of the Wiki. Quote it in your return.
- The `## Names` **Page** column gives each name's owner page.
- A **Guest character** (`CONTEXT.md`) acts in the Ledger as a PC does. Its deeds go into its NPC page's History and into the Recap as a PC's do, and it has no PC page and no `pull-pcs`.
- `sources` lists the Transcript path your brief gives, never the Ledger or the Summary.
- Read the Transcript only at the Ledger lines whose exact words you need. A quote you take from it replaces each real name on `user-config.md`'s **Real names** list with the name that list gives.

## Drafting

The Ledger's event lines are notes, and their wording reads as notes. Write each fact fresh in the Wiki's voice, drafted from the first sentence to the passing forms in `skill://lint/prose.md` **Gate rules**. Check the page once its first section is written, before you draft the rest. Draft every later section to whatever that first check reported.

Every new page already exists as a stub, so a link to a page another writer is filling resolves from the start. Each page has one writer, the one whose brief gives it. When your work needs a change on another writer's page (your brief names it, a finding names it, it lacks a link to yours), leave that page as it is, and list the collision in your return with the page and what it needs. The orchestrator takes it up with that page's writer, so a question about a page goes up in your return, never across to a sibling. When a check finding is on a page outside your branch, or names one, leave it for the orchestrator's gate and list it in your return. After you return, the orchestrator may send you a finding on one of your pages: repair it, check the page and reply with the result.

A flagged in-world name that a template fits (a person, place, group, creature, item, god) and no page owns is a missing page, rung 3 of the Names ladder in `skill://lint`, even when the name was on the page before you came. Its page is outside your branch, so your return requests it with the page and line that name it, and the finding stands until the orchestrator's gate gives the name its stub. A name your pages file lists as a `Coinage:` is rung 4: it stays plain text on its page, and a spelling finding on it takes one line in `.cspell-words.txt`.

## Pages

1. **Orient.** Do SKILL.md step 2, then read your pages file and `skill://lint/prose.md`. Done when step 2's criterion holds and you have read your pages file and the prose bar.
2. **Canon.** Do SKILL.md step 5 for every claim the Ledger makes about your pages' units. Done when every claim falls under exactly one case.
3. **Write.** Do SKILL.md step 6 on your pages, one page at a time: finish a page, check it and repair every finding before you open the next one. Fill each stub your pages file lists and add each link it lists. Done when step 6's criterion holds for your pages and each page's last check came back clean, apart from findings on the names your return requests pages for.
4. **Fill.** Do SKILL.md step 7 on your new pages and stubs, checking each page as you finish its fill. Done when step 7's criterion holds and each filled page's last check came back clean.
5. **Return** the paths you touched, each page made and changed, each stub with its empty headings, each claim kept out (word for word) and what overrode it, each `agentic-co-dm/` page a Fill fact came from, each collision, each page request, each finding left for the gate, and each finding you suspect a rule reported in error, with its rule and sentence. Done when every item has its line.

## Recap

1. **Orient.** Do SKILL.md step 2, then read `wiki/templates/Recap.md` and `skill://lint/prose.md`. Done when step 2's criterion holds and you have read the template and the prose bar.
2. **Read** every Thread page of the Campaign. Done when you can say for each Thread whether the Ledger's play moved, opened, resolved or left it still.
3. **Recap.** Write `Sessions/Session <N>/Session <N> - Recap.md` in the Recap template's shape, replacing any earlier Recap there, from the Ledger's events in order. Each PC and Guest character takes the part in it that the Ledger gives them. Link each page a change touches, the pages your brief lists to link included (their own writers fill them), and keep `[[Session <N+1> - Previously On]]` in the **Left open.** bullet. Check the page and repair every finding. Done when its `## Threads` gives every Thread of the Campaign one line and the page's last check came back clean.
4. **Return** the Recap's path and each claim kept out (word for word) and what overrode it. Done when every item has its line.

## Previously On

Session N's Transcript feeds the Previously On read aloud at the start of Session N+1, kept in Session N+1's folder.

1. **Orient.** Do SKILL.md step 2, then read `wiki/templates/Previously On.md` and `skill://lint/prose.md`. Done when step 2's criterion holds and you have read the template and the prose bar.
2. **Page.** Rewrite `Sessions/Session <N+1>/Session <N+1> - Previously On.md` (a stub or an earlier page) in its template's shape. Fill its frontmatter, with the Transcript in `sources`, then its `## At a glance` bullets. The **Covers** bullet cites `[[Session <N> - Recap]]`. The **Ends on** bullet gives the Ledger's `## Ends`. **Leads into** gives Session N+1's Prep when it exists, else the action the Ledger's `## Ends` leaves open. Done when the frontmatter and every At a glance bullet are filled.
3. **Callout.** Write the `Previously on` callout by `skill://theatre-of-the-mind`, handing it the Ledger and the Transcript's path. Done when theatre-of-the-mind's File step has filed the callout and the page's last check came back clean.
4. **Return** the page's path and each Ledger moment you left out, with the reason. Done when every item has its line.

## Close

Your brief gives the touched list, the paths the other writers returned.

1. **Orient.** Do SKILL.md step 2. Done when step 2's criterion holds.
2. **Threads.** Do SKILL.md step 13's sentence on Threads for each active Thread of the Campaign outside the touched list, then check each Thread page you changed and repair every finding. Done when each due Thread has its Next development applied, or a later Session in the Wiki has already moved it, and each changed page's last check came back clean.
3. **hot.md.** Do SKILL.md step 13's sentences on `hot.md`, reading the Recap and the touched pages for what changed. Check `hot.md` and repair every finding. Done when step 13's `hot.md` criterion holds and the page's last check came back clean.
4. **Return** every path you changed. Done when the return lists each one.
