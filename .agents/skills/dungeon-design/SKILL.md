---
name: dungeon-design
description: The procedure for stocking a Site the Party explores area by area (a dungeon, ruin, cave, wreck or keep): its truth, history layers, zones, route graph, stocked areas, pressure and rest. Use when a Site will be explored room by room, or when `location-design` builds a dungeon-like Site.
---

# Dungeon design

A dungeon is a Site the Party explores by choosing routes under pressure: something is happening inside, someone wants something there, the ways through branch and rejoin, and every area gives the Players something to learn, use, change or decide. This procedure fills a Site page from `location-design`; the page kind stays Site.

## Steps

1. **Read the Canon** as `location-design` step 1 does. Each history layer, power and prize below comes from the inventory before anything is invented.
2. **Truth.** Five private sentences: its original purpose, the rupture that changed it, the current conflict, the immediate promise to the Players, and the deep truth underneath. From one premise, the architecture, history, powers and reward should all follow.
3. **History layers.** Two or three: who built or held it, for what, the trace each left, and the conflict it left behind. Cut any lore that changes no choice, Clue, route or prize.
4. **Zones.** Group areas into zones, each with a job, a sensory signature, its main obstacle, its occupants, its ways in and out, how it escalates, and its likely prize.
5. **Route graph** before any detail: areas as nodes, routes as edges with their cost, danger and what they reveal. At least two ways in, a loop, a bypass, a way out, one vertical or hidden route, and routes that rejoin after branching.
6. **Stock** each area with one strong job and a mix across the Site: occupants, a social problem, hazards, Clues, discoveries, resources, quiet landmarks, treasure and some empty space. Every entry gets one thing to do with it and one consequence; an entry with neither merges or goes. Anything the Party must learn has at least three Clues in different areas. A quiet area still gives something: a safe place to read the map, a landmark that proves a loop.
7. **Encounters.** For each fight or confrontation, write its purpose first: what each side wants now, what changes on success, failure or retreat, the terrain (cover, hazards, height, useful objects), what can be learned, how it escalates, and at least one way out that isn't killing (bargain, surrender, stealth, completing the objective). Then pick Creatures with `creature-design`, balanced as a Low, Moderate or High 2024 encounter against the Party.
8. **Pressure.** Name the clock (a patrol, a ritual, rising water, the Faction's search) and its alert state (quiet, wary, alerted). Advance one site turn per ten minutes of searching or moving, and roll a d6 every two turns: on a 1 (1–2 once alerted, 1–3 when hunted) the named consequence happens, shown by a sign first when possible. List what the Party can do to change the state: silence, a decoy, a bargain, a shortcut.
9. **Rest.** Where a Short Rest (1 hour) or Long Rest (8 hours) is plausible, who could find the Party there, what it costs, and what advances meanwhile. Defeated occupants return only for a reason in the fiction.
10. **File** into the Site page: areas as `####` entries under `### Areas` in route order (`location-design`'s Site reference has the entry shape), the pressure and rest procedures as `### Pressure` and `### Rest` under Play, and the truth and history layers under Depth. A dungeon too big for one page (a megadungeon) becomes a parent Site with a child Site per zone, each run through these steps. Run `pnpm check <page>` until it passes.

## Done

- The truth, layers and zones each change a choice, Clue, route or prize.
- The route graph has two ways in, a loop, a bypass and a way out.
- Every area has a job, and every entry a use and a consequence.
- Everything the Party must learn has three Clues.
- Every encounter has a purpose, terrain and a way out besides killing.
- The pressure has a clock, a roll and signs, and the Party can change it.
