---
type: Location
kind: Region
summary: "The eastern convergence of the island arcs, recorded as aarakocra ground and the water that crosses under the Maw's influence."
sources:
 - "archive/ssw-aarakocra.md"
 - "archive/ssw-verdant-scatter.md"
parent: "[[The Shattered Sea]]"
---

## At a glance

- **Character.** A stretch of the Sea. Its extent, borders and marks are beyond the record.
- **Held by.** Unknown.
- **Danger.** Unknown.

> [!narration] Arrival
> Wings cross high overhead here, in numbers the harbours behind you never see.

## Play

### Travel

Both arcs of the [[Verdant Scatter]] narrow and converge here, and the water grows colder under the [[Drowned Maw]]'s influence. The record here is presence. [[Aarakocra|Aarakocra]] pass near the Tail, though they are rare in [[Dravosi Crown|Crown]] waters.

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
