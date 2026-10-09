---
type: Location
kind: Site
summary: "Sheltered repair water at the foot of the Ashwall spires, where
  damaged survivors gather and predators follow the wreckage."
sources:
  - "archive/ssw-ashwall-islands.md"
  - "archive/ssw-galewall.md"
parent: "[[Ashwall Islands]]"
revealed: ""
title: ""
---

## At a glance

- **Draws the Party because.** The only repair water on the western run. A hull can be made whole here. Pilot knowledge is for sale, and crews who made it back will tell what the crossing did to the ones before them.
- **Occupants.** Repair crews, pilot families, and whoever the storm left short-handed.
- **Danger.** Predators follow the wreckage in, and a helpful sail on this water can be a boarding action.

> [!narration] Entering
> The lee opens beneath the spires, a stretch of flatter water where the swell finally lets go of the hull. Masts stand against the black stone ahead, some under way and some not. Surf still bursts white along the outer rocks, one swell away, and the water here carries splinters and spars from somewhere out in the weather.

## Play

### Areas

The repair water, where the working crews take damaged hulls one at a time. The wreckage farther in, where the tide keeps what the crossing let go.

### Hazards

Wreckage feeds a food chain, and it ends in this water. A wake that will not leave a hurt hull is a verdict, not company ([[Giant Shark]]). The rescue that closes on a weather-beaten ship here can be the boarding ([[Velvet Noose]] is the nightmare version).

### Occupants

Repair crews work the stone and the hulls, two hands to a climb ([[Duvane]] among them). Pilot families keep the practical signs in their logbooks and sell passage judgement rather than charts.

### Likely actions

Buy repairs and water. Sell work if hands are short. Trade the crossing's news, and listen longer than you talk.

## Depth

### History

The colonial era left caches on these islands, and the lee is where a crew would start looking for one ([[The Galewall Runner's Drop]]).

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
