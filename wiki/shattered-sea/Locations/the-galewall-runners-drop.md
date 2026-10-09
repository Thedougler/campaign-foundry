---
type: Location
kind: Site
summary: "A legendary colonial-era privateer cache on the Ashwall Islands, named
  the way crews name a thing they have not found."
sources:
  - "archive/ssw-galewall.md"
parent: "[[ashwall-islands|Ashwall Islands]]"
revealed: ""
title: "The Galewall Runner's Drop"
---

## At a glance

- **Draws the Party because.** A colonial-era privateer cache, held in crew legend as sitting on the Ashwall Islands.
- **Prize.** Whatever the colonial privateers left behind, if the legend is more than a legend.

> [!narration] Entering
> You come ashore beneath cold black spires, and spray whips off the rock. Ask two crews after the privateers' cache and they give you two different shores, but none agrees that anything of it survives. The repair hands who climb the stone by daylight have heard every tale of it.

## Play

### Areas

None established.

### Hazards

None established beyond the search itself.

### Occupants

None established.

### Likely actions

Ask crews after the cache, weigh one tale against another, or search the shore a tale names.

## Depth

### History

The legend dates to the colonial era, when privateers worked the western crossing. Where on the islands it sits, and whether anything is left, the crews do not agree on.

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
