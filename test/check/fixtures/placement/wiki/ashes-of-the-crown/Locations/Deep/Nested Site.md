---
type: Location
kind: Site
summary: "One line."
sources: []
parent: ""
revealed: ""
title: "Nested Site"
---

## At a glance

- **Draws the Party because.** Text.
- **Entrance.** Text.
- **Occupants.** Text.
- **Danger.** Text.
- **Prize.** Text.

> [!narration] Entering
> Spoken text for the table.

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
