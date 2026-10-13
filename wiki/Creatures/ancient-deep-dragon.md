---
title: Ancient Deep Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Dragon
size: Gargantuan
habitat:
  - Underdark
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Deep Dragon
size: Gargantuan
type: dragon
alignment: Neutral Evil
ac: 20
hp: 247
hit_dice: 15d20 + 90
modifier: 15
speed: 40 ft., burrow 40 ft., fly 80 ft., swim 40 ft.
stats: [ 23, 16, 22, 19, 18, 21 ]
saves:
  - dex: 9
  - wis: 10
skillsaves:
  - perception: 16
  - stealth: 15
damage_resistances: poison, psychic
condition_immunities: charmed, frightened, poisoned
senses: Blindsight 60 ft., Darkvision 300 ft., passive Perception 26
languages: Common, Draconic, Undercommon
cr: "18"
traits:
  - name: Legendary Resistance (4/Day, or 5/Day in Lair)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks.
  - name: Rend
    desc: "*Melee Attack Roll:* +12, reach 15 ft. *Hit:* 17 (2d10 + 6) Slashing damage plus 5 (1d10) Poison damage."
  - name: Nightmare Breath (Recharge 5–6)
    desc: "*Wisdom Saving Throw:* DC 20, each creature in a 90-foot Cone. *Failure:* 44 (8d10) Psychic damage, and the target has the Frightened condition until the end of the dragon's next turn. *Success:* Half damage only."
bonus_actions:
  - name: Shape-Shift
    desc: The dragon shape-shifts into a Small or Medium Humanoid or a Small or Medium Beast, or it returns to its true form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Pounce
    desc: The dragon moves up to half its Speed, and it makes one Rend attack.
  - name: Spore Salvo
    desc: "*Constitution Saving Throw:* DC 20, one creature within 30 feet of the dragon that it can see. *Failure:* 16 (3d10) Poison damage, and the target has the Poisoned condition. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. *Failure or Success:* The dragon can't take this action again until the start of its next turn."
```
