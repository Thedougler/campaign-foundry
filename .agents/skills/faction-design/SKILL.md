---
name: faction-design
description: Makes or deepens a Faction page, an organised group with a want, a method, faces the Party can meet, and an agenda filed as a Thread that moves on its own. Use when a guild, cult, house, crew or army is needed, when the DM names a new group, or when a Faction needs a next move.
---

# Faction design

A Faction is a group with shared goals that changes the World whether or not the Party engages. The page gives the DM its faces, its offer, what it does when met or crossed, and the next thing it does if nobody stops it. Its agenda is a Thread in the active Campaign, since it moves on its own.

## Steps

1. **Read the Canon.** With qmd, find the Faction's page if it exists, every page that links to it, every member's page, its base and territory, its rivals and patrons, and every Recap where it appears. Done when every hit is used or set aside with a reason.
2. **Source it** in the order `AGENTS.md` sets. Start with the Wiki's own groups. Then search the web for published or homebrew factions to adapt, and invent only what the search leaves open, building on what it found.
3. **Engine.** Write one private sentence that gives its kind and the concrete change it wants, then the signature method it acts through and the choice or pressure it puts on the Party. Then its **want** (what changes, for whom), **method**, **pressure** (why now, such as a deadline, a rival, a shortage, exposure or a split), and **collision** (the Faction, person or place whose want crosses this one). Take each from the Canon when it offers one.
4. **Faces.** A leader who decides, and the two or three members the Party will deal with face to face in talk, trade or a fight. Each is an NPC page (reuse one from the Wiki, or make one with `npc-design`) with a want of their own the Faction doesn't share. One **fracture** the Party could widen or heal. One **custom** (a habit, oath, mark or practice) that makes a member recognisable and that a clever Party can use. Run the swap test on it with a rival's name.
5. **Agenda.** Three to five milestones, each a concrete event with a time (a date, a count of days or a trigger), a sign the Party could notice first, and the fact it changes when it happens. Schedule the first early enough for the next Session to see it. File them as a Thread in the active Campaign's `Threads/`, `status: active`, driven by this Faction, with the levers the Party can pull and what happens if the agenda completes. With no active Campaign, they go under an `### Agenda` heading in the Faction's Depth until a Campaign turns them into a Thread.
6. **Levers.** Write one **offer** the Faction would make this Party now. Give its offerer, its pay and its catch. Then write what the World does when the Party meets or opposes them, and what it does when the Party ignores them or breaks a deal. Add one **hidden truth** that changes the deal once learned, with three Clues of different kinds (a person who talks, a thing to see or take, a place to visit). Rank-and-file the Party could fight get a count and a linked Creature.
7. **Narration.** Hand `theatre-of-the-mind` the Public face slot with how members look and carry themselves in public, the custom, a sign a bystander could spot that they've been somewhere, and the name people use for them.
8. **File** to `wiki/templates/Faction.md` in `<World>/Factions/`:
   - **At a glance:** goal, next move, who leads, base, strength.
   - **Play** covers when met, when opposed, what they offer, what they cost, and how to notice or interfere.
   - **Depth:** history, the fracture, hidden truths with their Clues, and the Threads they drive.

   Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Run `bun run cf -- check --fix`, then `bun run cf -- check`, given the Faction and Thread paths, until that page gate reports `ok: 0 findings`, and list both in the operation's `bun run cf -- log` entry (`--op create` when this skill runs on its own).

## Done

- The want states what changes and for whom, and the collision links the other side's page.
- Every face is an NPC page, and the custom passes the swap test.
- The agenda Thread has milestones with times, signs and changed facts, the first near enough to matter next Session.
- The offer has an offerer, pay and a catch, and every Play case says what the World does.
- The page gate over both pages reports `ok: 0 findings`, and the reply lists every new fact decided as Canon.
