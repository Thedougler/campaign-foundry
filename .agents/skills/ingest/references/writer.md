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

The Ledger's event lines are notes, and their wording reads as notes. Write each fact fresh in the Wiki's voice. Once a page is written, check it and repair its findings until it reports `ok: 0 findings`.

Every new page already exists as a stub, so a link to a page another writer is filling resolves from the start. Each page has one writer, the one whose brief gives it, and sibling writers work in parallel. Change every page, your own included, with `edit` on a fresh read, so a sibling's change to it survives. When your work needs a change on another writer's page (your brief names it, a finding names it, it lacks a link to yours), make that change yourself: re-read the page just before the edit, change only the lines your work needs and keep every other line. Repair a check finding on a page outside your branch, or one naming such a page, the same way.

A flagged in-world name that a template fits (a person, place, group, creature, item, god) and no page owns is a missing page (`skill://lint` § Names), even when the name was on the page before you came. Make its stub yourself as `skill://lint` makes a stub, re-reading its path just before you write, since a sibling may have made it already, and fill a stub a sibling made rather than replacing it. A name your pages file lists as a `Coinage:` stays plain text on its page, and you settle a spelling finding on it with one line in `.cspell-words.txt`.

## Pages

1. **Orient.** Do SKILL.md step 2, then read your pages file.
2. **Canon.** Do SKILL.md step 5 for every claim the Ledger makes about your pages' units.
3. **Write.** Do SKILL.md step 6 on your pages, one page at a time: finish a page, check it and repair its findings before you open the next one. Fill each stub your pages file lists and add each link it lists.
4. **Fill.** Do SKILL.md step 7 on your new pages and stubs, checking each page as you finish its fill.
5. **Return** the paths you touched, each page made and changed, each stub with its empty headings, each claim kept out (word for word) and what overrode it, and each `agentic-co-dm/` page a Fill fact came from. List each change made on another writer's page and each cause fixed at its source beyond a page. Quote each rule change awaiting the DM with its rule, sentence and literal meaning.

## Recap

1. **Orient.** Do SKILL.md step 2, then read `wiki/templates/recap.md`.
2. **Read** every Thread page of the Campaign, enough to say for each whether the Ledger's play moved, opened, resolved or left it still.
3. **Recap.** Write `Sessions/Session <N>/session-<N>-recap.md` in the Recap template's shape, replacing any earlier Recap there, from the Ledger's events in order. Each PC and Guest character takes the part in it that the Ledger gives them. Where the Ledger records why someone made a turning choice, write that cause beside the choice in `## What happened`. For a Campaign with Threads, `## Threads` gives every Thread of the Campaign one line. Write each `Optional.` section whose condition the Session meets. Link each page a change touches, the pages your brief lists to link included (their own writers fill them), and keep `[[session-<N+1>-previously-on|Session <N+1> - Previously On]]` in the **Left open.** bullet. Check the page and repair its findings.
4. **Return** the Recap's path and each claim kept out (word for word) and what overrode it.

## Previously On

Session N's Transcript feeds the Previously On read aloud at the start of Session N+1, kept in Session N+1's folder.

1. **Orient.** Do SKILL.md step 2, then read `wiki/templates/previously-on.md`.
2. **Page.** Rewrite `Sessions/Session <N+1>/session-<N+1>-previously-on.md` (a stub or an earlier page) in its template's shape. Fill every frontmatter key, with the Transcript in `sources` and `date` copied from Session N's Recap.
3. **Callout.** Write the `Previously on` callout by `skill://theatre-of-the-mind`, handing it the Ledger and the Transcript's path, through its File step.
4. **Return** the page's path and each Ledger moment you left out, with the reason.

## Close

Your brief gives the touched list, the paths the other writers returned.

1. **Orient.** Do SKILL.md step 2.
2. **Threads.** Do SKILL.md step 13's sentence on Threads for each active Thread of the Campaign outside the touched list, then check each Thread page you changed and repair its findings.
3. **hot.md.** Do SKILL.md step 13's sentences on `hot.md`, reading the Recap and the touched pages for what changed. Check `hot.md` and repair its findings.
4. **Story so far.** Do SKILL.md step 13's sentence on `story-so-far.md`, so its **Through.** line names the latest Recap, and check the page.
5. **Revealed.** Run `skill://revealed-in-play` with the Ledger as its record.
6. **Return** every path you changed, with `revealed-in-play`'s return.
