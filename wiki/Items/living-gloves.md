---
title: Living Gloves
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon (Requires Attunement).*

These symbiotic gloves—made of thin chitin and sinew—pulse with a life of their own. To attune to them, you must wear them for the entire attunement period, during which the gloves bond with your skin.

While attuned to these gloves, you gain one of the following proficiencies (your choice when you attune to the gloves):

- Sleight of Hand
- *Thieves' tools*
- One kind of *artisan's tools* of your choice
- One kind of *musical instrument* of your choice

When you make an ability check using the chosen proficiency, you add double your proficiency bonus to the check, instead of your normal proficiency bonus.

***Symbiotic Nature.*** The gloves can't be removed from you while you're attuned to them, and you can't voluntarily end your attunement to them. If you're targeted by a spell that ends a curse, your attunement to the gloves ends, and they can be removed.

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
