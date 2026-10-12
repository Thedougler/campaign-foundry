---
title: Pariah's Shield
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Armour (*Shield*), Rare (Requires Attunement), 6 lb.*

AC +2

Soldiers of the Boros Legion consider it an honour to bear this shield, even knowing that it might be the last honour they receive. The front of the shield is sculpted to depict a grieving human face.

You gain a +1 bonus to AC for every two allies within 5 feet of you (up to a maximum of +3) while you wield this shield. This bonus is in addition to the shield's normal bonus to AC.

When a creature you can see within 5 feet of you takes damage, you can use your reaction to take that damage, instead of the creature taking it. When you do so, the damage type changes to force.

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
