---
title: Manual of Iron Golems
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Very Rare, 5 lb.*

This tome contains information and incantations necessary to make a **iron golem**. To decipher and use the manual, you must be a spellcaster with at least two 5th-level spell slots. A creature that can't use a *manual of golems* and attempts to read it takes 6d6 psychic damage.

To create an iron golem, you must spend 120 days, working without interruption with the manual at hand and resting no more than 8 hours per day. You must also pay 100,000 gp to purchase supplies.

Once you finish creating the golem, the book is consumed in eldritch flames. The golem becomes animate when the ashes of the manual are sprinkled on it. It is under your control, and it understands and obeys your spoken commands.

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
