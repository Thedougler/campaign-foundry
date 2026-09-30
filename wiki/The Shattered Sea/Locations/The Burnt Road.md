---
type: Location
kind: Site
summary: "A two-mile Quiet scar burned by a Gold-caste expedition, where eleven compelled Grung lie sunk in black flowers."
sources:
 - "archive/the-burnt-road.md"
parent: "[[The Quiet]]"
---

## At a glance

- **Draws the Party because.** Gold-caste seals expose the order chain and the Pantry trail turns east.
- **Entrance.** Fruit-pile trail from [[The Long Meadow]].
- **Occupants.** Eleven dead Grung. Hinewai speaks to any Grung on the road.
- **Danger.** Fire or disturbing bodies is a claim that wakes Vine-Lash.
- **Prize.** Spent authority seals and evidence of the attack on the Grove.

> [!narration] Entering
> A straight cut as wide as a village street runs through charcoal-rooted trees. Black flowers give underfoot. Bodies lie sunk to the shoulders with roots through their ribs, and no fruit or bird breaks the scar.

## Play

### Areas

The twenty-foot road, bodies and seals, cracked fire pots, black flowers and east side trail.

### Hazards

The regrown forest hides beyond ten feet. Pulling a body free or burning anything invokes Aruhe's response.

### Occupants

Eleven dead Gold-caste Grung. [[Hinewai]]'s voice comes from the treeline.

### Likely actions

Lift a spent seal, read the order chain, follow fruit piles to [[The Pantry]], or walk on toward [[Memorial Grove]].

## Depth

### History

Karath's Gold caste compelled the expedition to burn a way to the two graves. The island took all eleven and refuses to fruit on the scar.

### Hidden truths

The seals instruct their bearers to report inland and replace silent parties. They also order the destruction of two graves and the burning of any forest in the way. The seals are spent metal.

### Threads

[[Taking on Aruhe]], [[The Crown Inspection]].

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
