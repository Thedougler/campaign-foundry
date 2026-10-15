---
title: "Fathomrush"
type: Location
kind: Settlement
summary: "An eastern boom town near the Drowned Maw that stages Shelfworks dives and supplies the line crews."
sources:
  - "archive/Episode-09-Transcript.md"
  - "archive/drowned-maw.md"
  - "archive/agentic-co-dm-Midchain.md"
parent: "[[midchain|Midchain]]"
revealed: "Session 9"
---

![[fathomrush-banner.webp]]

> [!narration] Arrival
> Fathomrush lies ahead of you near the Drowned Maw. Dive crews prepare to leave the boom town for the Shelfworks. Their work there depends on the people tending the lines.

## Districts

The dive-staging waterfront holds winches, dive gear and supply stacks for expeditions to the [[shelfworks|Shelfworks]]. Crews bargain over hands and equipment while warnings about the drop pass between boats. Wet rope and salvage oil scent the waterfront. Winches rattle as loads move aboard.

Fathomrush lies far east of [[calven-and-calveno|Calveno]], near the [[drowned-maw|Drowned Maw]]. Its ruler, internal districts, crossing times and arrangements after dark remain unknown.

## Services

Salvage crews organise Shelfworks dives and supply the people who tend the lines. Visitors can seek supplies, hire hands or ask returning crews about the drop. Keepers, prices and access terms are not established. At the Shelfworks dive terrace, [[orvalle|Orvalle]] operates the air pumps and has stopped diving himself.

## History

### Session 9: an alternative heading

[[geoffrey-draves|Geoffrey Draves]] marked Fathomrush on his map as a boom town far to the east near the Maw. The Party chose the course to [[sparhold|Sparhold]] instead.

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
