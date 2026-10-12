---
title: Potion of Giant Strength
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Potion, ½ lb.*

Multiple variations of this item exist, as listed below:

- *Potion of Hill Giant Strength*
- *Potion of Frost Giant Strength*
- *Potion of Stone Giant Strength*
- *Potion of Fire Giant Strength*
- *Potion of Cloud Giant Strength*
- *Potion of Storm Giant Strength*

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
