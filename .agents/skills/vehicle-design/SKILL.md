---
name: vehicle-design
description: Makes or deepens a Vehicle page (a ship, boat, airship or wagon) with its 2024 statistics, crew and stations, decks, and how it handles in a chase or a boarding. Use when a Scene, Faction or Quest needs a craft, when the Party gets or meets one, or when the DM names a new one.
---

# Vehicle design

A Vehicle is a place and a moving thing at once: somewhere to board, sneak through and fight over, and something that chases, flees and breaks. The page lets the DM run a chase, a boarding and a stowaway's sneak from it alone.

## Steps

1. **Read the Canon.** With qmd, find the Vehicle's page if it exists, every page that links to it, its owner, captain, crew, home berth, routes, cargo and rivals, and every Recap that names it.
2. **Source it** in the order `AGENTS.md` sets: the Wiki's own craft, then the 2024 rules' vehicle statistics (the `dnd5e-srd-api` skill, then official and homebrew sources on the web) for the closest class of craft, then new design built on that class.
3. **Its errand.** Who owns it and who captains it (an NPC page), what it's doing now (its route, cargo or orders), and what it does when it meets the Party.
4. **Make it this craft and no other.** Write the stock version ("a fishing smack"). Give it a **signature** recognisable at a distance (a patched sail, a figurehead with one arm), a **quirk** in how it handles against its class (and why), and a **hold**: one thing aboard someone would pay, fight or lie for. Run the swap test with a sister craft's name.
5. **Numbers.** From its class: size, speed by mode, minimum crew, passengers, cargo, AC, HP and damage threshold per component (hull, control, movement, weapons), and each weapon's attack and damage. Every canon comparison holds ("faster than the Compact's cutters"). Crew who fight link their Creature, sized to the craft's job and the Party's strength.
6. **Decks and play.** Three to five areas at body scale for boarding and stowaways; each station, who mans it now against the minimum, and what happens when it goes unmanned; two to four manoeuvres or conditions that change a choice (a shallow draught that crosses the flats, a mast that fouls when she turns hard); and how a chase and a boarding run with this craft.
7. **Narration.** Hand `theatre-of-the-mind` the First sight slot with its size and silhouette, how it sits in the water or on the road, where a boat comes alongside or a climber gets up, a sense beyond sight, and the visible sign of its hold and quirk.
8. **File** to `wiki/templates/Vehicle.md` in `<World>/Vehicles/`:
   - **At a glance:** kind, size, speed, crew, captain and berth.
   - **Play:** Statistics, Crew and stations, Components and weapons, and Underway (manoeuvres, chase, boarding, decks).
   - **Depth:** history and hidden truths, each with how the Party can learn it.

   Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Run `pnpm check <page>` until it passes, and list it in the operation's `cf log` entry (`--op create` when this skill runs on its own).

## Done

- The captain is an NPC page, and the errand says what the craft does on meeting the Party.
- The signature, quirk and hold pass the swap test.
- Every statistic holds a number, and every fighting crew member links a Creature.
- A DM could run a chase, a boarding and a stowaway's sneak from the page.
- `pnpm check` passes, and the reply lists every new fact decided as Canon.
