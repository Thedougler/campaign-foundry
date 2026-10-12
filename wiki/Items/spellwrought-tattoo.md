---
title: Spellwrought Tattoo
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item (Tattoo).*

Multiple variations of this item exist, as listed below:

- *Spellwrought Tattoo (Cantrip)*
- *Spellwrought Tattoo (1st Level)*
- *Spellwrought Tattoo (2nd Level)*
- *Spellwrought Tattoo (3rd Level)*
- *Spellwrought Tattoo (4th Level)*
- *Spellwrought Tattoo (5th Level)*

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
