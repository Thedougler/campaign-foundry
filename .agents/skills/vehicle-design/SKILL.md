---
name: vehicle-design
description: Makes or deepens a Vehicle page (a ship, boat, airship or wagon) with its 2024 statistics, crew and stations, decks, and how it handles in a chase or a boarding. Use when a Scene, Faction or Quest needs a craft, when the Party gets or meets one, or when the DM names a new one.
---

# Vehicle design

A Vehicle is a place and a moving thing at once. The Party boards it, stows away on it or fights over its decks. In motion it chases, flees and breaks. The page lets the DM run a chase, a boarding and a stowaway's sneak from it alone.

## Steps

1. **Read the Canon.** With qmd, find the Vehicle's page if it exists, every page that links to it, its owner, captain, crew, home berth, routes, cargo and rivals, and the Recaps that mention it. Change each page as its `revealed` property allows (`CONTEXT.md` **Revealed**).
2. **Source it** in the order root `AGENTS.md` § Sourcing sets. Start with the Wiki's own craft, in the Campaign folder and the vault-root Vehicles folder. Next take the 2024 rules' vehicle statistics for the closest class of craft, from official and homebrew sources on the web first and the `dnd5e-srd-api` skill as the fallback. The SRD stays the quick source of exact figures for a class already chosen. Last comes a new design built on that class.
3. **Its errand.** State its owner and its captain (an NPC page), what it is doing now (its route, cargo or orders), and what it does when it meets the Party.
4. **Make it this craft.** Find what sets it apart in its build and handling or its crew and past. Let the Party see it from a distance and feel it in play (a patched sail, a figurehead with one arm, a draught too shallow for her class). Where the craft should be its own, run the swap test with a sister craft's name. A filed Vehicle whose statistics and decks are sound but whose presence reads generic gets a `flesh-out` pass in place of a redesign.
5. **Numbers.** From its class: size, speed by mode, minimum crew, passengers, cargo, AC, HP and damage threshold per component (hull, control, movement, weapons), and each weapon's attack and damage. Check each canon comparison against these numbers ("faster than the Compact's cutters"). Crew who fight link the Creature or NPC page holding their statblock, sized to the craft's job and the Party's strength.
6. **Decks and play.** Lay out at body scale the areas a boarding or a stowaway moves through. For each station, give who mans it now against the minimum and what happens when it goes unmanned. Add the manoeuvres or conditions that change a choice (a shallow draught that crosses the flats, a mast that fouls when she turns hard). Then say how a chase and a boarding run with this craft.
7. **Narration.** When the Party will see the craft, hand `theatre-of-the-mind` the First sight slot.
8. **File** to `wiki/templates/vehicle.md` in `<campaign-folder>/Vehicles/` (a page already filed keeps its folder, and a World-free page and its Campaign versions file per `docs/wiki-layout.md` **One vault, many Campaigns**). A part the template marks `Optional.` goes on the page when its guidance condition holds. Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Hand the filed page to `visuals`, then close per `skill://lint` § Commands with the page path.

## Done

- The captain is an NPC page, and the errand says what the craft does on meeting the Party.
- What sets the craft apart shows at a distance and in play.
- Each statistic has a number, and each fighting crew member links a Creature.
- A DM could run a chase, a boarding and a stowaway's sneak from the page.
- The page gate over the Vehicle's page reports `ok: 0 findings`, and the reply lists every new fact decided as Canon.
