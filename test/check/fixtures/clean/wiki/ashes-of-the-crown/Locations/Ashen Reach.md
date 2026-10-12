---
type: Location
kind: Region
summary: "Burnt hills north of the river."
sources: []
parent: ""
revealed: ""
title: "Ashen Reach"
---

- **Character.** Text.
- **Held by.** Text.
- **Changing.** Text.
- **Crossing.** Text.
- **Danger.** Text.

> [!narration] Arrival
> Cinder dunes shift under a grey wind.

Text.

## Travel

Text.

## Places

[[Ravenhold]] holds the only bridge.

## Travel events

Text.

## Rumors

Text.

Text.

## History

Text.

## Hidden truths

Text.

## Threads

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
