---
title: Illithilich
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Undead
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Illithilich
size: Medium
type: undead
alignment: Any Evil alignment
ac: 17
ac_class: natural armour
hp: 135
hit_dice: 18d8 + 54
modifier: 3
speed: 30 ft.
stats: [ 11, 16, 16, 20, 14, 16 ]
saves:
  - con: 10
  - int: 12
  - wis: 9
skillsaves:
  - arcana: 19
  - history: 12
  - insight: 9
  - perception: 9
damage_resistances: cold, lightning, necrotic
damage_immunities: poison; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: truesight 120 ft., passive Perception 19
languages: Deep Speech, Undercommon, telepathy 120 ft.
cr: "22"
traits:
  - name: Spellcasting
    desc: |-
      The illithilich is an 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 20, +12 to hit with spell attacks). The lich has the following wizard spells prepared:

      **Cantrips (at will):** *mage hand*, *prestidigitation*, *ray of frost*

      **1st level (4 slots):** *detect magic*, *magic missile*, *shield*, *thunderwave*

      **2nd level (3 slots):** *detect thoughts*, *invisibility*, *Melf's acid arrow*, *mirror image*

      **3rd level (3 slots):** *animate dead*, *counterspell*, *dispel magic*, *fireball*

      **4th level (3 slots):** *blight*, *dimension door*

      **5th level (3 slots):** *cloudkill*, *scrying*

      **6th level (1 slots):** *disintegrate*, *globe of invulnerability*

      **7th level (1 slots):** *finger of death*, *plane shift*

      **8th level (1 slots):** *dominate monster*, *power word stun*

      **9th level (1 slots):** *power word kill*
  - name: Innate Spellcasting (Psionics)
    desc: |-
      The illithilich's innate spellcasting ability is Intelligence (spell save DC 20). It can innately cast the following spells, requiring no components.

      **At will:** *detect thoughts*, *levitate*

      **1/day each:** *dominate monster*, *plane shift* (self only)
  - name: Legendary Resistance (3/Day)
    desc: If the illithilich fails a saving throw, it can choose to succeed instead.
  - name: Rejuvenation
    desc: If it has a phylactery, a destroyed illithilich gains a new body in 1d10 days, regaining all its hit points and becoming active again. The new body appears within 5 feet of the phylactery.
  - name: Turn Resistance
    desc: The illithilich has advantage on saving throws against any effect that turns undead.
  - name: Magic Resistance
    desc: The illithilich has advantage on saving throws against spells and other magical effects.
actions:
  - name: Paralysing Touch
    desc: "*Melee Spell Attack:* +12 to hit, reach 5 ft., one creature. *Hit:* 10 (3d6) cold damage. The target must succeed on a DC 18 Constitution saving throw or be paralysed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Tentacles
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one creature. *Hit:* 21 (3d10 + 5) psychic damage. If the target is Large or smaller, it is grappled (escape DC 15) and must succeed on a DC 20 Intelligence saving throw or be stunned until this grapple ends."
  - name: Extract Brain
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one incapacitated humanoid grappled by the lich. *Hit:* 55 (10d10) piercing damage. If this damage reduces the target to 0 hit points, the lich kills the target by extracting and devouring its brain."
  - name: Mind Blast (Recharge 5–6)
    desc: The illithilich magically emits psychic energy in a 60-foot cone. Each creature in that area must succeed on a DC 18 Intelligence saving throw or take 27 (5d8 + 5) psychic damage and be stunned for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the illithilich can expend a use to take one of the following actions. The illithilich regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Tentacles
    desc: The illithilich makes one attack with its tentacles.
  - name: Extract Brain (Costs 2 Actions)
    desc: The illithilich uses Extract Brain.
  - name: Mind Blast (Costs 3 Actions)
    desc: The illithilich recharges its Mind Blast and uses it.
  - name: Cast Spell (Costs 1–3 Actions)
    desc: The illithilich uses a spell slot to cast a 1st-, 2nd-, or 3rd-level spell that it has prepared. Doing so costs 1 legendary action per level of the spell.
```
