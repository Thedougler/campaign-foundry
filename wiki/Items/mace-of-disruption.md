---
title: Mace of Disruption
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Weapon (*Mace*), Rare (Requires Attunement), Simple Weapon, Melee Weapon, 4 lb.*

1d6 Bludgeoning

Mastery:  Sap

When you hit a Fiend or an Undead with this magic weapon, that creature takes an extra 2d6 Radiant damage. If the target has 25 Hit Points or fewer after taking this damage, it must succeed on a DC 15 Wisdom saving throw or be destroyed. On a successful save, the creature has the Frightened condition until the end of your next turn.

***Light.*** While you hold this weapon, it sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet.

***Mastery: Sap.*** If you hit a creature with this weapon, that creature has Disadvantage on its next attack roll before the start of your next turn.

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
