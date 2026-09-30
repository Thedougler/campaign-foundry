---
type: Location
kind: Site
summary: "The Calveno survivors' last camp under the Quiet, a round fire hub where trails leave like spokes toward Hinewai's voice."
sources:
  - "archive/spoke-ring.md"
parent: "[[The Quiet]]"
---

## At a glance

- **Draws the Party because.** The abandoned camp shows who followed and who refused.
- **Entrance.** The inland strand from [[Print Braid]].
- **Occupants.** Empty by day. Hinewai speaks here after dark to fruit-eaters.
- **Danger.** A claim wakes a Vine-Lash. The voice tempts the unwary.
- **Prize.** Fallen Stonepear and the fruit-pile trail to [[The Pantry]].

> [!narration] Entering
> A round clearing of packed earth sits under the forest roof. Cold ash, four mats and a neat row of grey-green fruit mark the camp. Narrow trails leave between buttressed trunks.

## Play

### Areas

Fire ring, four mats, stonepear row, north-east fruit-pile trail and stream.

### Hazards

The Quiet hides beyond ten feet. Hinewai's voice comes after dark. Taking, cutting or killing wakes the nearest Vine-Lash.

### Occupants

No one now. [[Hinewai]] speaks from the dark.

### Likely actions

Count sleepers, follow fruit piles, drink from the stream, camp until dark, or take only fallen fruit.

## Depth

### History

Most Calveno survivors followed Carlo's response to the voice nineteen days ago. Four refused and later fell into the Lava Tubes.

### Hidden truths

Four mats and space for a dozen sleepers reveal the camp's size. The trail marks the survivors' path, not a road.

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
