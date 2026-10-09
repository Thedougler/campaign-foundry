---
type: Location
kind: Settlement
summary: "An eastern boom town near the Drowned Maw that stages Shelfworks dives
  and supplies the line crews."
sources:
  - "archive/Episode-09-Transcript.md"
  - "archive/drowned-maw.md"
parent: "[[Midchain]]"
revealed: "Session 9"
title: ""
---

## At a glance

- **Size.** A boom town far east of [[Calven and Calveno|Calveno]], near the [[Drowned Maw]].
- **Ruled by.**
- **Mood.**
- **Unsettled by.**
- **Known for.** Staging dives at the [[Shelfworks]] and providing crews for the dive lines.

> [!narration] Arrival
> Fathomrush lies ahead of you near the Drowned Maw. Dive crews prepare to leave the boom town for the Shelfworks. Their work there depends on the people tending the lines.

## Play

### Services

Fathomrush organises Shelfworks diving expeditions and supplies the people who tend their lines. At the dive terrace, [[Orvalle]] operates the air pumps and has stopped diving himself.

## Depth

### History

#### Session 9: an alternative heading

[[Geoffrey Draves]] marked Fathomrush on his map as a boom town far to the east near the Maw. The Party chose the course to [[Sparhold]] instead.

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
