---
name: location-design
description: Makes or deepens a Location page of any kind (Region, Settlement or Site) as a table-ready place with a live conflict, tells that carry its secrets, and choices about where to go. Use when a Scene, NPC or Quest needs a place, when the DM names a new place, or when a Location needs more depth before the Party arrives.
---

# Location design

A Location is a place the Party can act in: something is happening there now, someone wants something there, and every part of it gives the Players something to learn, use, change or choose. The DM runs it from the page alone, under table pressure.

Locations nest through `parent`: a Site sits in a Settlement or Region, a Settlement in a Region, a Region in a larger Region. A dungeon is a Site; stock its areas with the `dungeon-design` procedure.

## Steps

1. **Read the Canon.** With qmd, find the page if it exists, its `parent` and children, every page that links to it, its neighbours, and everything tied to it: people, Factions, Creatures, Items, hazards, Lore, Quests, Threads and Recaps. Keep an inventory, one line per page: the fact that could put it physically in this place. Done when every hit is in the inventory or set aside with a reason, and every inventory page is read in full.
2. **Source it** in the order `AGENTS.md` sets: reuse and extend what the Wiki has, then published or homebrew places worth co-opting from the web, then new invention inspired by the search.
3. **Kernel.** Five private sentences: its **function** (what it is for), its **fantastic element**, its **conflict** (someone named wants something here that someone else named will act to stop, take or expose), its **promise** to the Players (discovery, danger, intrigue, wonder, refuge, mastery), and its **trajectory** (what happens here, and when, if nobody intervenes, soon enough that the Party can change it). Take the element and the conflict from the inventory when it offers them. Done when the conflict names who presses on whom.
4. **Make it this place and no other.** Write the stock version ("a ruined watchtower"); everything it predicts is furniture. Push the fantastic element into the physical structure: the flood left the chapel bell in the treetops. Give it one **rule of the place** (something that works differently here, its price, and a way to test it) and three **signatures** the Players can act on: a shape to climb, cross or hide in, a sensory detail with its source, and a habit the people or Creatures keep. Then run the **swap test**: put a neighbour's name in place of this one and replace every sentence that stays true.
5. **Weave the Canon in** with [references/weave.md](references/weave.md): every inventory entry and invention gets a place, a tell, a truth, a use and a find. Done when every entry has a row or a reason it doesn't live here, every secret a choice depends on has three Clues in different spots, and every hazard has sign, trigger, effect, counterplay, bypass and leverage.
6. **Build it for its kind** with its reference: [Region](references/region.md), [Settlement](references/settlement.md) or [Site](references/site.md). Anyone the Party will talk to, bargain with or be stopped by is a named NPC with a page: reuse one from the Wiki, or make one with `npc-design`. Creatures come from `creature-design`, and each is linked from the page.
7. **Narration.** Hand `theatre-of-the-mind` the slot (Arrival for a Region or Settlement, Entering for a Site) with the frame, the one image to remember, the ways in and out, a sense beyond sight, and every tell from step 5 as plain appearance.
8. **File** to `wiki/templates/Location - <Kind>.md` in `<World>/Locations/`, with `parent` set. Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Run `pnpm check <page>` until it passes, and log the page in the operation's `log.md` entry.

## Done

- The inventory covers every hit, and every entry is placed or set aside with a reason.
- The conflict names both sides, and the trajectory says what happens and when.
- The twist, rule and signatures pass the swap test.
- Every secret a choice depends on has three Clues, and every hazard its six answers.
- The kind's own Done items hold.
- `pnpm check` passes, and the reply lists every new fact decided as Canon, with the pages it grew from.
