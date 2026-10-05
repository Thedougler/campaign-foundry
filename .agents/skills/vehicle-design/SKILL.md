---
name: vehicle-design
description: Makes or deepens a Vehicle page (a ship, boat, airship or wagon) with its 2024 statistics, crew and stations, decks, and how it handles in a chase or a boarding. Use when a Scene, Faction or Quest needs a craft, when the Party gets or meets one, or when the DM names a new one.
---

# Vehicle design

A Vehicle is a place and a moving thing at once. The Party boards it, stows away on it or fights over its decks. In motion it chases, flees and breaks. The page lets the DM run a chase, a boarding and a stowaway's sneak from it alone.

## Steps

1. **Read the Canon.** With qmd, find the Vehicle's page if it exists, every page that links to it, its owner, captain, crew, home berth, routes, cargo and rivals, and the Recaps that mention it.
2. **Source it** in the order `AGENTS.md` sets. Start with the Wiki's own craft. Next take the 2024 rules' vehicle statistics for the closest class of craft, from the `dnd5e-srd-api` skill first and then from official and homebrew sources on the web. Last comes a new design built on that class.
3. **Its errand.** State its owner and its captain (an NPC page), what it is doing now (its route, cargo or orders), and what it does when it meets the Party.
4. **Make it this craft and no other.** Write the stock version ("a fishing smack"). Give it a **signature** recognisable at a distance (a patched sail, a figurehead with one arm), a **quirk** in how it handles against its class (and why), and a **hold**: one thing aboard someone would pay, fight or lie for. Run the swap test with a sister craft's name.
5. **Numbers.** From its class: size, speed by mode, minimum crew, passengers, cargo, AC, HP and damage threshold per component (hull, control, movement, weapons), and each weapon's attack and damage. Check each canon comparison against these numbers ("faster than the Compact's cutters"). Crew who fight link their Creature, sized to the craft's job and the Party's strength.
6. **Decks and play.** Lay out three to five areas at body scale for boarding and stowaways. For each station, give who mans it now against the minimum and what happens when it goes unmanned. Add two to four manoeuvres or conditions that change a choice (a shallow draught that crosses the flats, a mast that fouls when she turns hard). Then say how a chase and a boarding run with this craft.
7. **Narration.** Hand `theatre-of-the-mind` the First sight slot with its size and silhouette, how it rides in the water or on the road, where a boat comes alongside or a climber gets up, a sense beyond sight, and the visible sign of its hold and quirk.
8. **File** to `wiki/templates/Vehicle.md` in `<World>/Vehicles/`:
   - **At a glance:** kind, size, speed, crew, captain and berth.
   - **Play:** the `Statistics`, `Crew and stations`, `Components and weapons` and `Underway` subsections, with manoeuvres, chase, boarding and decks under Underway.
   - **Depth:** history and hidden truths, each with how the Party can learn it.

   Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Run `bun run cf -- check --fix`, then `bun run cf -- check`, given the page path, until that page gate reports `ok: 0 findings`, and list it in the operation's `bun run cf -- log` entry (`--op create` when this skill runs on its own).

## Done

- The captain is an NPC page, and the errand says what the craft does on meeting the Party.
- The signature, quirk and hold pass the swap test.
- Each statistic has a number, and each fighting crew member links a Creature.
- A DM could run a chase, a boarding and a stowaway's sneak from the page.
- The page gate over the Vehicle's page reports `ok: 0 findings`, and the reply lists every new fact decided as Canon.
