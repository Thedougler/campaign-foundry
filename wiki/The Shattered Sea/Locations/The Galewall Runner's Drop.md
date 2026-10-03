---
type: Location
kind: Site
summary: "A legendary colonial-era privateer cache on the Ashwall Islands, named the way crews name a thing they have not found."
sources:
 - "archive/ssw-galewall.md"
parent: "[[Ashwall Islands]]"
---

## At a glance

- **Draws the Party because.** A colonial-era privateer cache, held in crew legend as sitting on the Ashwall Islands.
- **Prize.** Whatever the colonial privateers left behind, if the legend is more than a legend.

## Play

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
