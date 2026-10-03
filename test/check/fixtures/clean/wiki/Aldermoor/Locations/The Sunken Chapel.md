---
type: Location
kind: Site
summary: "A flooded chapel under the river wall."
sources: []
parent: "[[Ravenhold]]"
---

## At a glance

- **Draws the Party because.** Text.
- **Entrance.** Text.
- **Occupants.** Text.
- **Danger.** Text.
- **Prize.** The [[Ashen Lantern]].

> [!narration] Entering
> Cold water licks the drowned altar stones.

## Play

Text.

### Areas

Text.

### Hazards

Text.

### Occupants

Text.

### Likely actions

Text.

## Depth

Text.

### History

Text.

### Hidden truths

Text.

### Threads

Text.

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
