---
type: Location
kind: Region
summary: "Cold volcanic spires at the Galewall's edge: the last solid ground outbound, the first proof inbound, and a reckoning point rather than a destination."
sources:
 - "archive/ssw-ashwall-islands.md"
 - "archive/ssw-galewall.md"
parent: ""
---

## At a glance

- **Character.** Black volcanic spires at the storm edge: a threshold the crews measure themselves against, never a destination.
- **Held by.** The crews who can survive and work them. Pilot families, repair hands, storm readers, and the families whose logbooks keep the practical signs. No formal authority.
- **Changing.** Repair work now climbs with two hands after the scorpion took a carpenter's forearm, and the oldest families' logbooks keep marking the hatch sign without commentary.
- **Crossing.** Last solid ground outbound, first proof of survival inbound. Hard landings and a dangerous storm-edge approach.
- **Danger.** Occupied fissures, wreck-fed predators, voices in the storm gaps, and the hatch sign that promises worse weather west.

> [!narration] Arrival
> The water under the keel has gone dark, cold blue fading into black. Black spires rise ahead, cloud dragging across their heights and surf bursting white at their feet. Salt sits on the air with something mineral under it, a thin sulphur bite from the vents in the high stone.

## Play

### Travel

The spires are their own landmarks; navigation out here runs on stars and instruments, and on the kind of attention that keeps a crew alive past the last chart. Picking a landing window through the storm gaps is DC 15 Wisdom (Survival). A failure puts the hull against a spire foot or brings it onto the lee approach in surf, and the repairs eat the days the landing was meant to save.

The western run turns on two choices, and crews make both here:

- **Make the lee first.** Repair, water, and a count of the vultures before the last run west. It costs days and arrives whole ([[Ashwall Lee]]).
- **Run straight through.** Saves days and enters the worst water with the hull as it stands. This run is where the one-in-three happens.

The vulture count is the cheap intelligence: numbers above the baseline over the cliffs mean something came through the storm in pieces, and a day spent in the [[Ashwall Lee]] reading that is rarely wasted.

### Places

- [[Ashwall Lee]]. Repair water, salvage, and the survivors' accounts.
- [[Volcanic Vent Caves]]. The only warmth on the islands, and occupied.
- [[The Galewall Runner's Drop]], a legendary colonial-era privateer cache.
- [[Galewall]], the wall itself, west of the spires.

### Encounters

1. Guano and the beat of wings above a warm cave mouth at dusk. A roost overhead. Move the work or learn why crews do not ([[Giant Bat]]).
2. A handhold that goes back deeper than it should. The crack is occupied, and the watcher on the stone does its job ([[Giant Scorpion]]).
3. A vulture count above the baseline over the cliffs. Follow the birds and read what the storm delivered ([[Giant Vulture]]).
4. A voice in a storm gap that does not match the wind's direction. Stay off the inland path ([[Harpy]]).
5. A repair crew on a fouled spar, two hands and one watcher. Work for hire, and crossing news for listening.
6. Lateral fire branches through the ash column and holds for a breath. A hatch sign. The pilots mark it and count days ([[Arclight Phoenix]]).

### Rumors

- "Lateral vent-fire means the wall will worsen." The oldest logbooks say so without commentary. Investigate by reading a family's log in the [[Ashwall Lee]].
- "A warm fissure is safe because it is dry." Ask after the carpenter's boots. Investigate [[Duvane]] and the two-hands rule among the repair crews.
- "The islands are the first proof of survival." Eastbound crews steer for the spires before anything else. Investigate among any crew off the crossing, and the wrecks the birds are counting.

## Depth

### History

How long the hatching has gone on is not recorded. The oldest pilot families write it into their logbooks as a navigational note, and the note is the same in every book, lateral vent-fire and a westward departure and an expected rise in Galewall activity. The colonial era left caches on the islands ([[The Galewall Runner's Drop]]).

### Hidden truths

Pilot lore that the [[Galewall]] is sustained by [[Arclight Phoenix]] activity is substantially true. The vent discharge hatches them. The egg a phoenix leaves behind at its death needs lightning to open, and the vent systems provide it continuously and at close range. The evidence is physical: burns marked the lightning-burned survivor's hull along contact points rather than down from a strike, and iron fittings magnetized hard enough to pull nails from a workbench.

### Threads

The active Threads do not run this far west. The islands are past the Crown's ledgers and the Maw's pull, which is what makes them a reckoning point rather than a destination.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Contains
    filters:
      and:
        - parent == this
    groupBy:
      property: note.kind
      direction: ASC
    order:
      - file.name
      - note.summary
  - type: table
    name: Linked from
    filters:
      and:
        - parent != this
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
