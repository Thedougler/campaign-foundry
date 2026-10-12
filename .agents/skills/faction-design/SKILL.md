---
name: faction-design
description: Makes or deepens a Faction page, an organised group with a want, a method, faces the Party can meet, and an agenda filed as a Thread that moves on its own. Use when a guild, cult, house, crew or army is needed, when the DM names a new group, or when a Faction needs a next move.
---

# Faction design

A Faction is a group with shared goals that changes the World whether or not the Party engages. The page gives the DM its faces, its offer, what it does when met or crossed, and the next thing it does if nobody stops it. Its agenda is a Thread in the active Campaign, since it moves on its own.

## Steps

1. **Read the Canon.** With qmd, find the Faction's page if it exists, every page that links to it, every member's page, its base and territory, its rivals and patrons, and every Recap where it appears. Change each page as its `revealed` property allows (`CONTEXT.md` **Revealed**). Done when every hit is used or set aside with a reason.
2. **Source it** in the order `AGENTS.md` sets. Start with the Wiki's own groups. Then search the web for published or homebrew factions to adapt, and invent only what the search leaves open, building on what it found.
3. **Engine.** Its **want** (what changes, for whom), its **method**, the **pressure** that makes it act now (a deadline, a rival, a shortage, exposure or a split), and its **collision**: the Faction, person or place whose want crosses this one. Take each from the Canon when it offers one.
4. **Faces.** The leader who decides and the members the Party will deal with face to face in talk, trade or a fight. Each is an NPC page (reuse one from the Wiki, or make one with `npc-design`) with a want of their own the Faction doesn't share. Then find what sets the Faction apart where the Party meets it, such as a custom, oath or mark a clever Party can use, or a rift it could widen or heal, and give it its motif per `docs/agents/narrative-devices.md` § Motifs. Run the swap test with a rival's name. A filed Faction whose engine and agenda are sound but whose presence reads generic gets a `flesh-out` pass in place of a redesign.
5. **Agenda.** The milestones it reaches if nobody stops it, each a concrete event with a time (a date, a count of days or a trigger), a sign the Party could notice first, and the fact it changes when it happens. Schedule the first early enough for the next Session to see it. File them as a Thread in the active Campaign's `Threads/`, `status: active`, driven by this Faction, with the Angles the Party can work and what happens if the agenda completes. With no active Campaign, they go under the Faction's `## Agenda` until a Campaign turns them into a Thread.
6. **Angles.** Write the **offer** the Faction would make this Party now: its offerer and pay, and the catch. Then write what the World does when the Party meets or opposes them, and what it does when the Party ignores them or breaks a deal. Give each **hidden truth** that changes the deal once learned three Clues of different kinds (a person who talks, a thing to see or take, a place to visit). Rank-and-file the Party could fight get a count and a linked Creature.
7. **Narration.** When the Party will meet them, hand `theatre-of-the-mind` the Public face slot.
8. **File** to `wiki/templates/faction.md` in `<campaign-folder>/Factions/` (a page already filed keeps its folder, and a World-free page and its Campaign versions file per `docs/wiki-layout.md` **One vault, many Campaigns**). A part the template marks `Optional.` goes on the page when its guidance condition holds. Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Hand the filed Faction page to `visuals`, then close per `skill://lint` § Commands with the Faction and Thread paths.

## Done

- The want states what changes and for whom, and the collision links the other side's page.
- Every face is an NPC page, and what sets the Faction apart passes the swap test.
- The agenda Thread has milestones with times, signs and changed facts, the first near enough to matter next Session.
- The offer has an offerer, pay and a catch, and every Dealings case says what the World does.
- The page gate over both pages reports `ok: 0 findings`, and the reply lists every new fact decided as Canon.
