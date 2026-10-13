---
title: Priest of Osybus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Priest of Osybus
size: Small or Medium
type: humanoid
alignment: Neutral Evil
ac: 12
hp: 60
hit_dice: 8d8 + 24
modifier: 2
speed: 20 ft., climb 20 ft.
stats: [ 10, 14, 16, 18, 17, 11 ]
saves:
  - int: 7
  - wis: 6
  - cha: 3
senses: Darkvision 120 ft., passive Perception 13
languages: Common plus two other languages
cr: "6"
traits:
  - name: Tattoo of Osybus
    desc: If damage reduces the priest to 0 Hit Points, it receives a random boon. Roll 1d6 to determine the boon the priest receives. The priest revives at the start of its next turn with half its Hit Points, and its creature type is now Undead.
  - name: "1: Dread Boon"
    desc: An aura of dread fills a 15-foot Emanation originating from the priest. *Wisdom Saving Throw:* DC 15, each non-Undead creature that starts its turn in the Emanation. *Failure:* The target has the Frightened condition until the start of its next turn
  - name: "2: Ectoplasmic Boon"
    desc: Sticky ectoplasm slows creatures in a 15-foot Emanation originating from the priest. *Strength Saving Throw:* DC 15, each creature that starts its turn in the Emanation. *Failure:* The target's Speed is reduced by 10 feet until the start of its next turn.
  - name: "3: Vampiric Boon"
    desc: When the priest deals Necrotic damage to a creature, the priest gains Temporary Hit Points equal to the damage dealt.
  - name: "4: Blazing Boon"
    desc: The priest has a Fly Speed of 30 feet and Immunity to Fire damage.
  - name: "5: Spectral Boon"
    desc: The priest has Resistance to Bludgeoning, Piercing, and Slashing damage, and it has Vulnerability to Radiant damage. Additionally, the priest can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - name: "6: Deathly Boon"
    desc: |-
      When the priest revives with this boon, all corpses of Small or Medium Humanoids in a 30-foot Emanation originating from the priest rise as Skeletons under the priest's control. Additionally, at the end of each of the priest's turns, each non-Undead creature in a 5-foot Emanation originating from the priest takes 5 (1d10) Necrotic damage.

      The priest dies and this trait doesn't function if the priest receives a boon it already has or the priest's tattoo of Osybus is destroyed. The tattoo is destroyed only if the priest takes 15 damage or more on a single turn while the priest has 0 Hit Points.
actions:
  - name: Multiattack
    desc: The priest makes two attacks, using Soul Blade or Necrotic Bolt in any combination.
  - name: Soul Blade
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 9 (2d4 + 4) Piercing damage. If the target is a creature, it has the Paralysed condition until the start of the priest's next turn. If this damage reduces a Medium or smaller creature to 0 Hit Points, the creature dies, and its soul becomes trapped in a soul tattoo on the priest's body. The soul is freed if the priest dies."
  - name: Necrotic Bolt
    desc: "*Ranged Attack Roll:* +7, range 120 ft. *Hit:* 30 (4d12 + 4) Necrotic damage, and the target can't regain Hit Points until the start of the priest's next turn."
bonus_actions:
  - name: Soul Tattoo (Recharge 5–6)
    desc: The priest magically animates a soul tattoo on its body that becomes a Shadow in an unoccupied space within 5 feet of the priest. The shadow takes its turn immediately after the priest on the same Initiative count, and it obeys the priest. The shadow remains animate until it is destroyed, it is more than 120 feet from the priest, the priest dies, or the priest uses this Bonus Action again.
```
