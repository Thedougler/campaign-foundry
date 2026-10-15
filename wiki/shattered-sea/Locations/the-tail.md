---
title: "The Tail"
type: Location
kind: Region
summary: "The eastern convergence of the island arcs, where aarakocra range near cold water and the last staging island before the Maw."
sources:
  - "archive/ssw-aarakocra.md"
  - "archive/ssw-verdant-scatter.md"
  - "archive/agentic-co-dm-Midchain.md"
parent: "[[the-shattered-sea|The Shattered Sea]]"
revealed: "Backstory"
---

![[the-tail-banner.webp]]

> [!narration] Arrival
> Wings cross high overhead here, in numbers the harbours behind you never see.

## Travel

Both arcs of the [[verdant-scatter|Verdant Scatter]] narrow and converge here, and the water grows colder under the [[drowned-maw|Drowned Maw]]'s influence. [[aarakocra|Aarakocra]] pass near the Tail, though they are rare in [[dravosi-crown|Crown]] waters.

The Tail's extent, borders and navigation marks remain unknown. Its rulers and dangers are also unknown. No route times or crossing costs are known.

## Places

[[tail-staging-island|Tail Staging Island]] supplies the last provisions and hands before the trench. It has a local name that remains unknown. Its role resembles [[fathomrush|Fathomrush]], which stages [[shelfworks|Shelfworks]] dives, but the two places are distinct.

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
