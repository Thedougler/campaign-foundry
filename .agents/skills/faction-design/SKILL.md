---
name: faction-design
description: Makes or deepens a Faction page, an organised group with a want, a method, faces the Party can meet, and an agenda filed as a Thread that moves on its own. Use when a guild, cult, house, crew or army is needed, when the DM names a new group, or when a Faction needs a next move.
---

# Faction design

A Faction is a group with shared goals that changes the World whether or not the Party engages. The page gives the DM its faces, its offer, what it does when met or crossed, and the next thing it does if nobody stops it. Its agenda is a Thread in the active Campaign, since it moves on its own.

## Steps

1. **Read the Canon.** With qmd, find the Faction's page if it exists, every page that links to it, every member's page, its base and territory, its rivals and patrons, and every Recap that names it. Done when every hit is used or set aside with a reason.
2. **Source it** in the order `AGENTS.md` sets: the Wiki's own groups first, then published or homebrew factions worth co-opting from the web, then new invention inspired by the search.
3. **Engine.** One private sentence: this is a [kind] that [wants a concrete change], acts through [a signature method], and gives the Party [a choice or pressure]. Then its **want** (what changes, for whom), **method**, **pressure** (why now: a deadline, a rival, a shortage, exposure, a split), and **collision** (the named Faction, person or place whose want crosses this one). Take each from the Canon when it offers one.
4. **Faces.** A leader who decides, and the two or three members the Party will actually talk to, trade with or fight, each an NPC page (reuse one from the Wiki, or make one with `npc-design`) with a want of their own the Faction doesn't share. One **fracture** the Party could widen or heal. One **custom** (a habit, oath, mark or practice) that makes a member recognisable and that a clever Party can use; run the swap test on it with a rival's name.
5. **Agenda.** Three to five milestones, each a concrete event with a time (a date, a count of days or a trigger), a sign the Party could notice first, and the fact it changes when it lands. The first lands soon enough for the next Session to see. File them as a Thread in the active Campaign's `Threads/`, `status: active`, driven by this Faction, with the levers the Party can pull and what happens if the agenda completes. With no active Campaign, they sit under an `### Agenda` in the Faction's Depth until a Campaign turns them into a Thread.
6. **Levers.** One **offer** the Faction would put to this Party now (who offers it, the pay, the catch); what happens when the Party meets them, opposes them, ignores them, or breaks a deal; and one **hidden truth** that changes the deal once learned, with three Clues of different kinds (a person who talks, a thing to see or take, a place to visit). Rank-and-file the Party could fight get a count and a linked Creature.
7. **Narration.** Hand `theatre-of-the-mind` the Public face slot with how members look and carry themselves in public, the custom, a sign a bystander could spot that they've been somewhere, and the name people use for them.
8. **File** to `wiki/templates/Faction.md` in `<World>/Factions/`:
   - **At a glance:** goal, next move, who leads, base, strength.
   - **Play:** when met, when opposed, what they offer, what they cost, and how to notice or interfere.
   - **Depth:** history, the fracture, hidden truths with their Clues, and the Threads they drive.

   Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Run `bun run cf check --fix`, then `bun run cf check`, until the full gate passes with no findings on the Faction or its Thread, and list both in the operation's `cf log` entry (`--op create` when this skill runs on its own).

## Done

- The want names what changes and for whom, and the collision names the other side's page.
- Every face is an NPC page, and the custom passes the swap test.
- The agenda Thread has milestones with times, signs and changed facts, the first near enough to matter next Session.
- The offer has an offerer, pay and a catch, and every Play case says what the World does.
- The full `bun run cf check` passes with both pages clear, and the reply lists every new fact decided as Canon.
