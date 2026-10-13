---
title: Barrowghast
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Undead
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Barrowghast
size: Huge
type: undead
alignment: typically Chaotic Evil
ac: 12
ac_class: natural armour
hp: 138
hit_dice: 12d12 + 60
modifier: -1
speed: 40 ft.
stats: [ 21, 8, 20, 5, 9, 6 ]
damage_resistances: necrotic, poison
condition_immunities: exhaustion, poisoned
senses: darkvision 60 ft., passive Perception 9
languages: Giant
cr: "7"
traits:
  - name: Stench
    desc: Any creature that starts its turn within 10 feet of the barrowghast must make a DC 16 Constitution saving throw. On a failed save, the creature has the poisoned condition for 1 minute. While poisoned this way, the creature can't regain hit points. On a successful save, the creature is immune to the Stench of all barrowghasts for 24 hours.
actions:
  - name: Multiattack
    desc: The barrowghast makes two Slam attacks. It can replace one Slam attack with a Life Drain attack.
  - name: Slam
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 18 (2d12 + 5) bludgeoning damage."
  - name: Life Drain
    desc: |-
      *Melee Weapon Attack:* +8 to hit, reach 10 ft., one creature. *Hit:* 9 (1d8 + 5) necrotic damage, and the target must succeed on a DC 16 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.

      A Humanoid slain by this attack immediately rises as a zombie (see the Monster Manual). The zombie acts as an ally of the barrowghast but isn't under its control.
reactions:
  - name: Noxious Wound
    desc: Immediately after the barrowghast takes piercing or slashing damage, poisonous ichor sprays from the wound. Each creature within 5 feet of the barrowghast must make a DC 16 Dexterity saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one.
```
