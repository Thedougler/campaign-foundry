---
title: Reaper's Scream
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Weapon (*Morningstar*), Legendary (Requires Attunement), Martial Weapon, Melee Weapon, 4 lb.*

1d8 Piercing

The spikes of this iron morningstar glow with sickly, pale light. The death rune is inscribed on its shaft and inlaid with pearl.

You gain a +2 bonus to attack and damage rolls made with this weapon, and attacks with this weapon deal necrotic damage instead of piercing damage.

When you attack a creature with this weapon and roll a 20 on the attack roll, you gain 10 temporary hit points. Any creature that hits you with a melee attack while you have 1 or more of these temporary hit points takes 10 necrotic damage.

***Invoking the Rune.*** As a bonus action, you can invoke the weapon's rune, unleashing the screams of every creature slain by the weapon in one cacophonous burst. Each creature of your choice within 60 feet of you must succeed on a DC 15 Wisdom saving throw or have the stunned condition until the start of your next turn.

Once the rune has been invoked, it can't be invoked again until the next dawn.

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
