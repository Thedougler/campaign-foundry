---
name: npc-design
description: Makes or deepens an NPC page, a named person with a want, a face, a voice and a secret, linked to a Creature for their statistics. Use when a Scene, Location, Faction or Quest needs a person, when the DM names someone new, or when an NPC needs more depth before they recur.
---

# NPC design

An NPC is a person the DM plays: someone the Players can remember after one meeting, who wants something now, and who keeps moving when the Party looks away. Their game statistics live on a Creature (`creature` property); the person lives here.

## Scale

Pick the scale from how much table time the NPC will get. It sets how far the steps go.

| Scale | The page carries |
| --- | --- |
| Incidental | a face, a want, one line and a Creature |
| Scene | everything in steps 1–6 |
| Recurring | Scene, plus a thread to every PC it can touch and a next move |
| Villain | Recurring, plus their plan as a Thread ([references/villain.md](references/villain.md)) |

## Steps

1. **Read the Canon.** With qmd, find the NPC's page if it exists, every page that links to it, their home Location, their Faction, the people they are tied to and the Recaps that mention them. Read each PC's Goals and bonds and Plans for debts, rivals and goals this person could touch. Done when every hit is used or set aside with a reason, and every PC has a line: the thread this NPC could pull, or none.
2. **Source it** in the order `AGENTS.md` sets: an existing NPC in the Wiki who can fill the role comes first. Then published or homebrew characters on the web worth co-opting, and new invention inspired by what the search found.
3. **Drive.** Write each as something concrete enough to change a Scene:
   - **Want:** present tense, reachable this Session.
   - **Leverage:** what they can grant, deny, expose or call on, and what using it costs them.
   - **Fear:** what they dread losing.
   - **Limit:** the oath, lack or line that blocks the easy win.
   - **Contradiction:** two true pressures that can collide in play.
   - **Secret:** what they hide, from whom and why, what happens if it comes out, and about three ways the Party can learn it (a statement, a trace, a witness, a document, a consequence).
   - **What they know:** what they share freely, what they sell and what they lie about. For every question their page raises, the true answer, and separately how much of it they know.
   - **If ignored:** what they do next without the Party.
4. **Make them this person and no other.** Write the stock version in one line ("a gruff dwarf smith") and break it with Canon: a smith who forges only from wreck iron because the Crown taxes ore. Give them a **face**, **voice** and **tells** with [references/craft.md](references/craft.md). Then run the **swap test**: put another NPC from the same place or Faction in their place and rewrite every line that stays true. Done when the twist, face and voice are theirs alone and every hidden truth has a tell.
5. **Plan the meeting.** Where they are and what they are doing when the Party arrives, their opening move, their starting Attitude (Friendly, Indifferent, Hostile), what opens them up, what shuts them down, and the Party's likely asks, each with the NPC's answer, its price and, where the outcome is uncertain, the Influence check ([references/influence.md](references/influence.md)). Done when the DM could run the first five minutes and every likely ask from the page alone.
6. **Statistics.** Set `creature` to the Creature that holds their statistics, reusing one that fits (a sailor can stand on the SRD's Bandit, an old clerk on the Commoner). A unique fighter gets a Creature of their own from `creature-design`, given this person's concept and tells. Anyone the NPC would call on in a fight (guards, hounds, a crew) is named in Play with a link to their Creature.
7. **Narration.** Hand `theatre-of-the-mind` the First look slot with the face, the voice and what they are usually doing.
8. **File** to `wiki/templates/NPC.md` in `<World>/NPCs/`:
   - **At a glance:** role at the table, want, voice in a line, and where they are found.
   - **Play:** what opens them up and what shuts them down, what they will and won't share, what they do if pressed, and the likely asks from step 5.
   - **Depth:** History that still shapes them, Hidden truths (each with its tell and ways to learn it), and the Threads they drive or sit in.

   Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Run `pnpm check <page>` until it passes, and log the page in the operation's `log.md` entry.

## Done

- The Canon read covers every hit and every PC.
- Every drive field in step 3 is concrete; the secret has its truth, stakes and ways to learn it.
- The twist, face and voice pass the swap test, and every hidden truth has a tell.
- The DM can run the first meeting and every likely ask from the page.
- `creature` points at a Creature, and everyone they would call on in a fight has one.
- `pnpm check` passes, and the reply lists every new fact decided as Canon, with the pages it grew from.
