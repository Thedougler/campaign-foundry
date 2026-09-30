---
type: Location
kind: Region
summary: "Clear Lake's braided rivers are Aruhe's best road, but River Otter families own the fast clear water."
sources:
 - "archive/the-river.md"
parent: "[[Aruhe]]"
---

## At a glance

- **Character.** Clear green channels over limestone shelves, braiding across the island.
- **Held by.** River Otter families, with predators along both banks.
- **Changing.** Flood stage widens the Grasslands. Dry stage exposes shelves and concentrates the otters.
- **Crossing.** Follow water uphill to Clear Lake or laterally into Grasslands, Marshes and Quiet.
- **Danger.** Current, deep pools, razer-grass, grubnades and otters that treat taking as theft.

> [!narration] Arrival
> Clear water braids through channels wide enough to follow. Fish flash between submerged grass, roots hang like wet ropes and the sound of moving water stays close.

## Play

### Travel

[[Landing Bank]], [[Line Bank]], [[Slack Basin]], [[Cutoff Lip]], [[Print Braid]], [[Spoke Ring]] and [[Star Cut]] mark the principal route. Current runs from Clear Lake toward the Marshes.

### Places worth reaching

[[Landing Bank]], [[Torn Crossing]], [[Line Bank]], [[Slack Basin]], [[Cutoff Lip]], [[Print Braid]], [[Spoke Ring]], and [[Star Cut]].

### Encounters

River Otters play with rope, oars and ankles. Terror-Birds hunt the banks of the Grasslands. Bloodhawks take canoes in open channel. Unsaid Macaws repeat thoughts. Grubnades detonate by wet flowers.

### Rumors

Entering the water is participating. What comes from the river belongs to the otter family.

## Depth

### History

The otters tend the water by culling grazers, dropping shade trees and patrolling banks. Flood and dry stages redraw the usable route.

### Hidden truths

The gin-clear reaches are tended, not naturally empty. A fallen fruit is receiving. Living plants and carried flesh invoke Aruhe's response.

### Threads

[[Taking on Aruhe]] and [[Perrin and Nona]].

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
