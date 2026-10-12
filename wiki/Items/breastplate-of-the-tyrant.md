---
title: Breastplate of the Tyrant
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Medium Armour (*Breastplate*) (Requires Attunement), 20 lb.*

AC 14 + Dex (max 2)

Evolving Item

In this example, a Fighter finds an *Breastplate of Psychic Resistance* while raiding an old dungeon. The armour, a Rare magic item, grants Resistance to Psychic damage and bears the emblem of a barbed crown. Each time the armour evolves, the pattern of spikes around the crown grows more complex.

***Evolving Item.*** *This item is an Evolving Item, see *Evolving Magic Items* for more information.*

Multiple variations of this item exist, as listed below:

- *Regal Breastplate of the Tyrant*
- *Subjugating Breastplate of the Tyrant*

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
