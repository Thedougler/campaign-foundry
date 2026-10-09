---
type: Creature
summary: "Bazzoth the Steeped, a unique Creature stat block from the archived
  NPC record."
sources:
  - "archive/bazzoth-the-steeped.md"
revealed: "Session 5"
title: "Bazzoth the Steeped"
---

## At a glance

- **Role at the table.** Unique named Creature represented by the NPC, the distiller of the reagent-spirits himself.
- **Threat.** See the stat block, CR 6. His hurled flasks, his sump-reek cloud, and the envenomed lash do the harm.
- **Tell.** A swig from the gourd means the rite has begun, and a cocked arm means a flask is already loose.
- **Weak to.** His own throws, each announced early. The cocked arm gives away every flask, and the sealed one shows the cloud while it is still in his hand. Break his concentration and the rite ends with it.
- **Used by.** The NPC of the same name. His archived record is the source of every line above.

> [!narration] First sight
> A small grung figure waits at a bench behind an apron of bone plates, flasks racked along the harness, and the air reeks of reagent-spirits. He tips his gourd back for a long swig, and the stiff old shoulders loosen as the spoken rite takes hold. His first flask is out of the rack, arm cocked, before he ever looks your way.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Bazzoth, the Steeped"
size: Small
type: humanoid
subtype: grung
alignment: lawful evil
ac: 15
ac_class: bone-plate apron and bench-harness
hp: 132
hit_dice: 24d6 + 48
speed: "25 ft., climb 25 ft., swim 25 ft."
stats: [9, 14, 15, 18, 12, 15]
saves:
  - constitution: 5
  - intelligence: 7
skillsaves:
  - arcana: 7
  - medicine: 7
  - nature: 7
  - insight: 4
damage_immunities: "poison"
condition_immunities: "poisoned"
senses: "passive Perception 11"
languages: "Grung, Common"
cr: 6
traits:
  - name: Steeped
    desc: "Bazzoth is soused on the same reagent-spirits he distils, and it has pickled fear and doubt out of him. He has advantage on saving throws against being charmed or frightened, and on Constitution saving throws made to maintain concentration. A creature relying on scent to track or read him works at a disadvantage."
  - name: Toxic Secretion
    desc: "A creature that touches Bazzoth or hits him with a melee attack while within 5 feet, or that grapples him, must succeed on a DC 13 Constitution saving throw or take 5 (2d4) poison damage and be poisoned until the start of its next turn."
  - name: Standing Leap
    desc: "Bazzoth's long jump is 25 feet and his high jump is 15 feet, with or without a running start. He rarely bothers , until the rite is on him (see Shed the Years)."
  - name: Master of the Bench
    desc: "Bazzoth is never surprised while conscious, and is immune to the effects of his own concoctions. A creature that is poisoned has disadvantage on saving throws against his concoctions until the end of its next turn."
  - name: "Legendary Resistance (1/Day)"
    desc: "If Bazzoth fails a saving throw, he can choose to succeed instead. The old vintage does not go over on the first push , and the rite does not break on the first good hit."
actions:
  - name: Multiattack
    desc: "Bazzoth makes two attacks, using Hurled Flask or Envenomed Lash in any combination. While Shed the Years is active, he makes one additional Envenomed Lash attack."
  - name: Hurled Flask
    desc: "Ranged Weapon Attack: +6 to hit, range 30/90 ft., one target. Hit: 11 (2d8 + 2) acid damage. Bazzoth can deal poison damage instead of acid (his choice each throw), and the target has disadvantage on the next saving throw it makes against one of Bazzoth's concoctions before the end of Bazzoth's next turn."
  - name: Envenomed Lash
    desc: "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 9 (2d6 + 2) poison damage, and the target must succeed on a DC 15 Constitution saving throw or be poisoned until the end of its next turn. While Shed the Years is active, this attack is magical, is made at +8 to hit, and deals an extra 5 (1d10) force damage."
  - name: "Sump-Reek Bomb (Recharge 5–6)"
    desc: "Bazzoth hurls a sealed bone flask that bursts into a 20-foot-radius cloud centred on a point he can see within 60 feet. Each creature in that area makes a DC 15 Constitution saving throw, taking 21 (6d6) poison damage on a failure, or half as much on a success. A creature that fails is also poisoned and repeats the save at the end of each of its turns, ending the effect on a success. The cloud lingers and heavily obscures its area until the start of Bazzoth's next turn. A creature that enters it for the first time on a turn, or starts its turn there, is subjected to the save."
bonus_actions:
  - name: Clinging Ichor
    desc: "Bazzoth lobs a flask of sump-glue at a point he can see within 30 feet, coating a 10-foot-radius area that is difficult terrain until the start of his next turn. A creature in the area when it lands, or that enters it for the first time on a turn, must succeed on a DC 15 Strength saving throw or have its speed reduced to 0 until the end of its next turn. He cannot use this the same turn he invokes Shed the Years."
  - name: "Shed the Years"
    desc: "Bazzoth swigs from his gourd and speaks a red-caste rite over his own body, and decades unspool from it. He concentrates to maintain the rite (as if concentrating on a spell). It lasts up to 1 minute. While active: his walking speed increases by 15 feet and his movement no longer provokes opportunity attacks. He gains a +2 bonus to AC and has advantage on Dexterity saving throws. His melee attacks become magical, more accurate, and harder-hitting (see Envenomed Lash). And his Multiattack includes one additional Envenomed Lash. If his concentration is broken, the rite ends."
reactions:
  - name: "Reeking Step (3/Day)"
    desc: "When Bazzoth takes damage, or a creature ends its turn within 5 feet of him, he speaks a short rite and steps through a puff of stinging reek, teleporting to an unoccupied space he can see within 30 feet. This movement does not provoke opportunity attacks."
```

## Play

### Tactics

His archived record holds the full tactics, and the sealed bone flask shows the Sump-Reek Bomb before it flies. His reek cloud catches a whole crowd at once. The Party spreads out and keeps to cover. Its fire comes down on him alone. He quits the bench when his purpose is lost or his edge is spent.

### Outside a fight

The reek of reagent-spirits, the cast-off flasks, and the bone-plate apron identify him before an encounter. Away from a fight he keeps to the role and habitat the NPC record gave him.

## Depth

### Ecology

His habitat, diet, and signs live in the archived NPC record. A traveller working Wisdom (Survival) reads the signs, and the stinging reek is the loudest of them.

### Hidden truths

His history sits in the archived record, and so do the motives behind the calm the spirits left him. Examination, or the right questions, reveals them.

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
