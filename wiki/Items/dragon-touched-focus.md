---
title: Dragon-Touched Focus
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Spellcasting Focus (Requires Attunement By a Spellcaster).*

This wondrous item can be a sceptre, an orb, an amulet, a crystal, or another finely crafted object. It typically incorporates imagery of dragons' wings, claws, teeth, or scales.

Multiple variations of this item exist, as listed below:

- *Slumbering Dragon-Touched Focus*
- *Stirring Dragon-Touched Focus*
- *Wakened Dragon-Touched Focus*
- *Ascendant Dragon-Touched Focus*

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
