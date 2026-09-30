---
type: Location
kind: Site
summary: "Broad basalt tubes beneath Aruhe, linking marsh, Grove and Clear Lake. Four Calveno survivors are trapped below the Long Meadow skylight."
sources:
 - "archive/lava-tubes.md"
parent: "[[Aruhe]]"
---

## At a glance

- **Draws the Party because.** Four Calveno survivors need rescue from a ledge.
- **Entrance.** A smoking skylight in [[The Long Meadow]], marsh breach or root descent.
- **Occupants.** Luca and Ettore Ferrante, Piero Sorrentino and Gianni Moro. Snakewood is deeper in.
- **Danger.** Loose rock, vertical breaks and living roof roots.
- **Prize.** Survivors and underground routes to the island's interior.

> [!narration] Entering
> Black basalt tunnels run as wide as a street beneath old lava. Pale roots hang through the roof, daylight falls in columns and every drip echoes over dark pools.

## Play

### Areas

The 15-foot smoking skylight, 40-foot ledge, east and west tubes, daylight wells, seep and vents.

### Hazards

Acrobatics DC 10 keeps footing. Athletics DC 15 climbs breaks. Snakewood and Stillbloom answer living movement near roof roots and skylights.

### Occupants

[[Luca Ferrante]], [[Ettore Ferrante]], [[Piero Sorrentino]] and [[Gianni Moro]].

### Likely actions

Lower a rope, haul all four out in ten minutes, follow seepage toward Clear Lake, read vents, or search deeper routes.

## Depth

### History

The four fell nineteen days ago fleeing a Terror-Bird. Ettore broke his shin and Luca scratched the tally into the wall.

### Hidden truths

The tubes join the wider Aruhe Caves system. The island's taking law reaches underground.

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
