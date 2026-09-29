---
name: new-world
description: Starts a new World with the DM through a friendly conversation that gathers their vision first, then builds a minimal skeleton (overview with tone and Calendar, a few Factions, Locations, NPCs, Deities and Lore) and nothing more. Use when the DM wants to create, start or found a new World or setting.
---

# New World

A World starts small and grows when play needs it. The conversation is about the DM's vision (ADR 0003); the skeleton is just enough to run a first Campaign from, and everything else is built lazily when Prep reaches for it.

## Steps

1. **Talk.** Gather the DM's details before building anything, in a warm, collaborative conversation of a few turns. Cover:
   - the premise and feel in their words, and the stories, games or places it draws on;
   - its tone, and anything the table keeps out of play;
   - how magic, gods and the dead work, and how common each is;
   - the first stretch of land the Party will know, and its biggest trouble;
   - how the World counts time (months, weekdays, year numbering), or whether you should propose a Calendar;
   - anything they already know they want: a villain, a city, a war, a mystery.

   Offer ideas as you go, yes-and style, drawn from what they've said. Each turn ends with at most two questions, each with options. Done when every point above has an answer or the DM has left it to you.
2. **Source it** in the order `AGENTS.md` sets: existing published or homebrew settings and pieces worth co-opting, found on the web, before new invention.
3. **Build the skeleton**, each page with its skill and all in `<World>/`:
   - the World overview `<World>/<World>.md` from `wiki/templates/World.md`: tone, the Calendar and the pitch;
   - 3–5 Factions whose wants collide (`faction-design`; with no Campaign yet, their agendas stay on the Faction pages);
   - a handful of Locations: the Region the first Campaign starts in, two or three Settlements or Sites in it (`location-design`);
   - the NPCs those pages need: each Faction's leader and a face or two (`npc-design`);
   - a few Deities, from `wiki/templates/Deity.md`, and two or three Lore pages for the history the pitch rests on (`lore-design`).

   Link the pages to each other as they're made, so none is an orphan.
4. **Close.** Run `pnpm cf index` and `pnpm check` over the World until it passes, then `pnpm cf log --world <World> --op create --title "New World: <World>"` with a `--page` per page.
5. **Report** to the DM: the pitch in two lines, the pages made, and what's left for play to fill.

## Done

- Every point of the conversation has the DM's answer or their leave to decide.
- The skeleton exists (overview, Factions, Locations, NPCs, Deities, Lore) and nothing past it.
- `pnpm check` passes over the World, the index lists it, and the log records its creation.
