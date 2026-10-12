---
title: Ammunition of Slaying
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Ammunition, Generic Variant, Very Rare.*

This magic ammunition is meant to slay creatures of a particular type, which the DM chooses or determines randomly by rolling on the table below. If a creature of that type takes damage from the ammunition, the creature makes a DC 17 Constitution saving throw, taking an extra 6d10 Force damage on a failed save or half as much extra damage on a successful one.

After dealing its extra damage to a creature, the ammunition becomes nonmagical.

| | 1d100 | | Creature Type | |
| :-----: | ----------------- |
| | 01-10 | | Aberrations   | |
| | 11-15 | | Beasts        | |
| | 16-20 | | Celestials    | |
| | 21-25 | | Constructs    | |
| | 26-35 | | Dragons       | |
| | 36-45 | | Elementals    | |
| | 46-50 | | Humanoids     | |
| | 51-60 | | Fey           | |
| | 61-70 | | Fiends        | |
| | 71-75 | | Giants        | |
| | 76-80 | | Monstrosities | |
| | 81-85 | | Oozes         | |
| | 86-90 | | Plants        | |
| | 91-00 | | Undead        | |

***Base items.*** This item variant can be applied to the following base items:

- *Arrow* (*Arrow of Slaying*)
- *Bolt* (*Bolt of Slaying*)
- *Energy Cell* (*Energy Cell of Slaying*)
- *Firearm Bullet* (*Firearm Bullet of Slaying*)
- *Needle* (*Needle of Slaying*)
- *Sling Bullet* (*Sling Bullet of Slaying*)

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
