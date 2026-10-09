---
type: Location
kind: Region
summary: "The remote island chain whose reefs, harbours and rival powers shape
  every crossing."
sources:
  - "archive/aruhe.md"
  - "archive/Sparhold.md"
  - "archive/ssw-grung.md"
  - "archive/ssw-minotaur.md"
  - "archive/ssw-verdant-scatter.md"
  - "archive/ssw-midchain.md"
  - "archive/session-10.md"
parent: "[[verdant-scatter|Verdant Scatter]]"
revealed: "Backstory"
title: "Midchain"
---

## At a glance

- **Character.** The southern arc of the [[verdant-scatter|Verdant Scatter]], with dozens of low limestone and coral islands, rainforest coasts and reef channels.
- **Held by.** Island councils, free ports, pilot families and market bosses, with the [[dravosi-crown|Dravosi Crown]], [[tessarine-concordat|Tessarine Concordat]] and [[grung-clans|Grung Clans]] contesting routes and trade.
- **Changing.** The Drowned Maw and the raiding-fleet trail are altering safe routes.
- **Crossing.** Most neighbouring islands lie half a day's sail apart. Reef gaps save time under a pilot's guidance, while open crossings expose the ship.
- **Danger.** Storms, shifting reefs, raiders, [[sawek|Sawek]] blue holes, giant crocodiles in mangrove water, constrictor snakes along root mats and grung trade boundaries.

> [!narration] Arrival
> You sail a bent chain of islands weeks beyond the last charted coast. Reef water, storm belts and mountain harbours divide the route, and every crossing leaves a record, a debt or a secret.

## Play

### Travel

Open water links the [[crown-islands|Crown Islands]], [[aruhe|Aruhe]], [[karath|Karath]], [[murrat|Murrat]], [[kalowe|Kalowe]] and [[sparhold|Sparhold]]. [[uncertainty|Uncertainty]]'s dawn run south raised [[sparhold|Sparhold]] to starboard first, its supplies and settled streets this close to the [[verdant-teeth|Verdant Teeth]]. Gizanmor and [[murrat|Murrat]] followed, with [[karath|Karath]] and Sorn beyond. [[aruhe|Aruhe]] lay half a mile off Karath across the channel to port, and Jean-Claude Tabarnack recognized Karath as lying close to his homeland. Dozens of smaller islands packed close together carry free ports, local councils and pilot families whose routes come down through generations rather than charts. The northern reef faces look across the [[central-strait|Central Strait]] toward the Crown Islands. A minotaur pilot is the most expensive crew hire in the Midchain, and the price buys passage through the hardest water. Minotaur communities sit where the water is hardest, in every major port.

The treeline often shows before land. Rainforest reaches the water on many coasts, while elsewhere pale limestone cliffs fall straight to reef. Turquoise shallows give way abruptly to blue-black water at the shelf edge.

- **Reef channels.** Sail between neighbouring islands, usually half a day apart, paying a pilot or buying local waypoints. Fresh water and shelter are rarely far away, but charts disagree and reefs shift. Avoid unnamed blue holes, even when they offer shelter. Pilots associate some with Sawek lairs. [[knifes-wake|Knife's Wake]] can escape through channels a frigate captain refuses to enter.
- **Open lanes.** Sail between the established harbours without threading the inner reefs. The ship avoids confined passages but loses shelter and remains visible to patrols and raiders. Crown cutters intercept the predictable lanes.
- **Westbound back channels.** Near [[the-doldrums|The Doldrums]], winds turn more westerly and help ships avoid Strait inspection. The [[passage|Passage]] knows which channels are clean. Buy current route knowledge before departure, because the Doldrums' seasonal drift changes the southern approach.

Replenish water and seek sheltered anchorages among the islands before an exposed crossing. [[kalowe|Kalowe]] provides repairs, pilots and supplies, with a shrine payment at its reef gap. Rest in a harbour is sheltered from weather, but arrival can expose the ship to local authorities.

### Places

- [[aruhe|Aruhe]]
- [[karath|Karath]]
- [[drowned-maw|Drowned Maw]]
- [[murrat|Murrat]]
- [[kalowe|Kalowe]]
- [[sparhold|Sparhold]]
- [[verdant-teeth|Verdant Teeth]]
- [[halythion|Halythion]], the sea elf settlement hidden underwater in Teikhinos Reef.
- [[huahei|Huahei]], a small marshy island with a fey presence.
- [[the-doldrums|The Doldrums]], the shifting windless band below the chain.

### Encounters

1. A harbour pilot's first question is the Party's intended route.
2. A Grung raiding scout watches a berth.
3. A storm belt closes a familiar lane.
4. A Waveservant collects a crossing price.
5. A Crown vessel checks papers.
6. A ship follows a wake that should have vanished.

### Rumors

- The raiders move people onward through relay harbours.
- The Maw's current changes the safest route.
- Rare blue-caste grung traders move farther into the chain than most of their kind.
- "The beach trade cannot keep going this way." Complaints reaching the [[chain-council|Chain Council]]. True: raids from the [[verdant-teeth|Verdant Teeth]] have worsened. Investigate: take testimony from affected crews to the Council at Kalowe.

## Depth

### History

The modern powers formed around the routes and the Maw. The raiding fleet has taken more than 314 people.

[[simone-tabarnack|Simone Tabarnack]], Jean-Claude's younger sister, served the Sorn garrison. [[pell|Pell]], a gnome enslaved there, spoke to Jean-Claude with familiarity before his death in the reprisal that drove Jean-Claude to flee.

### Hidden truths

The charts omit islands and borders. Passage demands time, tribute and trust, and the tribute system may help hold the Maw fissure.

### Threads

[[drowned-maw-awakening|Drowned Maw Awakening]], [[bring-the-pearl-of-souls-to-umberlee|Bring the Pearl of Souls to Umberlee]], [[the-crown-inspection|The Crown Inspection]], and [[simones-hunters|Simone's Hunters]].

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
