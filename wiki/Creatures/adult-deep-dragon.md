---
title: Adult Deep Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Dragon
size: Huge
habitat:
  - Underdark
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Deep Dragon
size: Huge
type: dragon
alignment: Neutral Evil
ac: 17
hp: 161
hit_dice: 17d12 + 51
modifier: 10
speed: 40 ft., burrow 30 ft., fly 80 ft., swim 40 ft.
stats: [ 20, 14, 17, 16, 16, 18 ]
saves:
  - dex: 6
  - wis: 7
skillsaves:
  - perception: 11
  - stealth: 10
damage_resistances: poison, psychic
condition_immunities: charmed, frightened, poisoned
senses: Blindsight 60 ft., Darkvision 150 ft., passive Perception 21
languages: Common, Draconic, Undercommon
cr: "11"
traits:
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks.
  - name: Rend
    desc: "*Melee Attack Roll:* +9, reach 10 ft. *Hit:* 14 (2d8 + 5) Slashing damage plus 5 (1d10) Poison damage."
  - name: Nightmare Breath (Recharge 5–6)
    desc: "*Wisdom Saving Throw:* DC 15, each creature in a 30-foot Cone. *Failure:* 38 (7d10) Psychic damage, and the target has the Frightened condition until the end of the dragon's next turn. *Success:* Half damage only."
bonus_actions:
  - name: Shape-Shift
    desc: The dragon shape-shifts into a Small or Medium Humanoid or a Small or Medium Beast, or it returns to its true form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Pounce
    desc: The dragon moves up to half its Speed, and it makes one Rend attack.
  - name: Spore Salvo
    desc: "*Constitution Saving Throw:* DC 15, one creature within 30 feet of the dragon that it can see. *Failure:* 13 (3d8) Poison damage, and the target has the Poisoned condition. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. *Failure or Success:* The dragon can't take this action again until the start of its next turn."
```
