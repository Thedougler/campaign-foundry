---
title: Shield of Missile Attraction
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Shield (*Shield*), Rare (Requires Attunement), 6 lb.*

AC +2

While holding this Shield, you have Resistance to damage from attacks made with Ranged weapons.

***Curse.*** This Shield is cursed. Attuning to it curses you until you are targeted by a *Remove Curse* spell or similar magic. Removing the Shield fails to end the curse on you. Whenever an attack with a Ranged weapon targets a creature within 10 feet of you, the curse causes you to become the target instead.

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
