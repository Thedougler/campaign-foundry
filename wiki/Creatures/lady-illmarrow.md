---
title: Lady Illmarrow
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Lady Illmarrow
size: Medium
type: undead
alignment: Neutral Evil
ac: 19
ac_class: natural armour
hp: 199
hit_dice: 21d8 + 105
modifier: 3
speed: 30 ft., fly 40 ft.
stats: [ 16, 16, 20, 27, 21, 24 ]
saves:
  - con: 12
  - int: 15
  - wis: 12
skillsaves:
  - arcana: 15
  - history: 15
  - insight: 12
  - perception: 12
damage_resistances: cold, lightning
damage_immunities: necrotic; poison; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, paralysed, petrified, poisoned, stunned
senses: truesight 120 ft., passive Perception 22
languages: Common, Draconic, Elvish
cr: "22"
traits:
  - name: Spellcasting
    desc: |-
      Illmarrow is a 20th-level spellcaster. Her spellcasting ability is Intelligence (spell save DC 23, +15 to hit with spell attacks). Illmarrow has the following wizard spells prepared:

      **Cantrips (at will):** *chill touch* (see "Actions" below), *fire bolt*, *mage hand*, *prestidigitation*, *ray of frost*

      **1st level (4 slots):** *magic missile*, *shield*, *sleep*

      **2nd level (3 slots):** *blur*, *detect thoughts*, *mirror image*

      **3rd level (3 slots):** *animate dead*, *counterspell*, *fireball*, *fly*, *lightning bolt*

      **4th level (3 slots):** *blight*, *confusion*, *polymorph*

      **5th level (3 slots):** *cloudkill*, *cone of cold*, *hold monster*, *scrying*

      **6th level (2 slots):** *chain lightning*, *circle of death*, *create undead*

      **7th level (2 slots):** *finger of death*, *forcecage*, *prismatic spray*

      **8th level (1 slots):** *incendiary cloud*, *maze*

      **9th level (1 slots):** *power word kill*, *time stop*
  - name: Legendary Resistance (3/Day)
    desc: If Illmarrow fails a saving throw, she can choose to succeed instead.
  - name: Magic Resistance
    desc: Illmarrow has advantage on saving throws against spells and other magical effects.
  - name: Rejuvenation
    desc: Illmarrow's body turns to dust when she drops to 0 hit points, and her equipment is left behind. She gains a new body after 1d10 days, regaining all her hit points and becoming active again. The new body appears within two hundred miles of the location at which she was destroyed.
actions:
  - name: Chill Touch (Cantrip)
    desc: "*Ranged Spell Attack:* +15 to hit, range 120 ft., one creature. *Hit:* 18 (4d8) necrotic damage, and the target can't regain hit points until the start of Illmarrow's next turn. If the target is undead, it also has disadvantage on attack rolls against Illmarrow until the end of her next turn."
  - name: Paralysing Claw
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one creature. *Hit:* 13 (3d6 + 3) slashing damage plus 10 (3d6) cold damage, and the target must succeed on a DC 20 Constitution saving throw or be paralysed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Poison Breath (Recharge 5–6)
    desc: |-
      Illmarrow exhales poisonous gas in a 30-foot cone. Each creature in that area must make a DC 20 Constitution saving throw. On a failed save, a creature takes 35 (10d6) poison damage and is poisoned for 1 minute. While poisoned in this way, the creature can't regain hit points. On a successful save, the creature takes half as much damage and isn't poisoned.

      A humanoid reduced to 0 hit points by this damage dies and rises at the start of Illmarrow's next turn as a zombie. The zombie acts immediately after Illmarrow in the initiative count and is permanently under her command, following her verbal orders.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Lady can expend a use to take one of the following actions. Lady regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Cantrip
    desc: Illmarrow casts a cantrip.
  - name: Paralysing Claw
    desc: Illmarrow uses her Paralysing Claw.
  - name: Frightening Presence (Costs 2 Actions)
    desc: Illmarrow targets up to three creatures she can see within 30 feet of her. Each target must succeed on a DC 20 Wisdom saving throw or be frightened for 1 minute. A frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a target's saving throw is successful or the effect ends for it, the target is immune to Illmarrow's Frightening Presence for the next 24 hours.
  - name: Poison Breath (Costs 3 Actions)
    desc: Illmarrow recharges her Poison Breath and uses it.
```
