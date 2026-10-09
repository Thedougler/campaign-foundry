---
type: Location
kind: Region
summary: "The eastern convergence of the island arcs, recorded as aarakocra
  ground and the water that crosses under the Maw's influence."
sources:
  - "archive/ssw-aarakocra.md"
  - "archive/ssw-verdant-scatter.md"
parent: "[[the-shattered-sea|The Shattered Sea]]"
revealed: "Backstory"
title: "The Tail"
---

## At a glance

- **Character.** A stretch of the Sea. Its extent, borders and marks are beyond the record.
- **Held by.** Unknown.
- **Danger.** Unknown.

> [!narration] Arrival
> Wings cross high overhead here, in numbers the harbours behind you never see.

## Play

### Travel

Both arcs of the [[verdant-scatter|Verdant Scatter]] narrow and converge here, and the water grows colder under the [[drowned-maw|Drowned Maw]]'s influence. The record here is presence. [[aarakocra|Aarakocra]] pass near the Tail, though they are rare in [[dravosi-crown|Crown]] waters.

## Depth

### History

Only the presence is recorded, and only in one place, the aarakocra account of their own range.

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
