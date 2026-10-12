---
title: Orb of Divination Detection
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Uncommon (Requires Attunement).*

This glass orb is a useful defense against meddlesome mages and magic-wielding spies.

***Detect Divination.*** When you are targeted by a spell from the Divination school, the orb glows bright green for the spell's duration.

***Spellcasting Focus.*** This orb can be used as an Arcane Focus.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
