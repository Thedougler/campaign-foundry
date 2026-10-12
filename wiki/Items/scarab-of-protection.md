---
title: Scarab of Protection
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Legendary (Requires Attunement), 1 lb.*

This beetle-shaped medallion provides three benefits while it is on your person.

***Defense.*** You gain a +1 bonus to Armour Class.

***Preservation.*** The scarab has 12 charges. If you fail a saving throw against a Necromancy spell or a harmful effect originating from an Undead, you can take a Reaction to expend 1 charge and turn the failed save into a successful one. The scarab crumbles into powder and is destroyed when its last charge is expended.

***Spell Resistance.*** You have Advantage on saving throws against spells.

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
