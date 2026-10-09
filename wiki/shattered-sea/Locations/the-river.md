---
type: Location
kind: Region
summary: "Clear Lake's braided rivers are Aruhe's best road, but River Otter
  families own the fast clear water."
sources:
  - "archive/the-river.md"
parent: "[[aruhe|Aruhe]]"
revealed: "Session 11"
title: "The River"
---

![[The River - Portrait.jpg]]

![[The River - Handout Art.jpg]]

## At a glance

- **Character.** Clear green channels over limestone shelves, braiding across the island.
- **Held by.** River Otter families, with predators along both banks.
- **Changing.** Flood stage widens the Grasslands. Dry stage exposes shelves and concentrates the otters.
- **Crossing.** Follow water uphill to Clear Lake or laterally into Grasslands, Marshes and Quiet.
- **Danger.** Current, deep pools, razer-grass, [[grubnade|Grubnade]] detonations and otters that treat taking as theft.

> [!narration] Arrival
> Clear water splits and rejoins beside you in channels broad enough for travel. Fish flash among submerged grass. Roots hang like wet ropes above them, and the sound of moving water stays close.

## Play

### Travel

[[landing-bank|Landing Bank]], [[line-bank|Line Bank]], [[slack-basin|Slack Basin]], [[cutoff-lip|Cutoff Lip]], [[print-braid|Print Braid]], [[spoke-ring|Spoke Ring]] and [[star-cut|Star Cut]] mark the principal route. Current runs from Clear Lake toward the Marshes.

### Places

From this water, channels run to [[landing-bank|Landing Bank]], [[torn-crossing|Torn Crossing]], [[line-bank|Line Bank]], [[slack-basin|Slack Basin]], [[cutoff-lip|Cutoff Lip]], [[print-braid|Print Braid]], [[spoke-ring|Spoke Ring]] and [[star-cut|Star Cut]].

### Encounters

River Otters play with rope, oars and ankles. Terror-Birds hunt the banks of the Grasslands. Bloodhawks take canoes in open channel. Unsaid Macaws repeat thoughts. A [[grubnade|Grubnade]] detonates by wet flowers.

### Rumors

Entering the water is participating. What comes from the river belongs to the otter family.

## Depth

### History

The otters tend the water by culling grazers, dropping shade trees and patrolling banks. Flood and dry stages redraw the usable route.

### Hidden truths

The gin-clear reaches are tended, not naturally empty. A fallen fruit is receiving. Living plants and carried flesh invoke Aruhe's response.

### Threads

This water joins [[taking-on-aruhe|Taking on Aruhe]] and [[perrin-and-nona|Perrin and Nona]] through the otters' law that taking is theft and the flood-redrawn route.

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
