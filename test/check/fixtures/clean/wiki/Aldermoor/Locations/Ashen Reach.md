---
type: Location
kind: Region
summary: "Burnt hills north of the river."
sources: []
parent: ""
---

## At a glance

- **Character.** Text.
- **Held by.** Text.
- **Changing.** Text.
- **Crossing.** Text.
- **Danger.** Text.

> [!narration] Arrival
> Cinder dunes shift under a grey wind.

## Play

Text.

### Travel

Text.

### Places worth reaching

[[Ravenhold]] holds the only bridge.

### Encounters

Text.

### Rumors

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
