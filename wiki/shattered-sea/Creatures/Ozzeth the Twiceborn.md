---
type: Creature
summary: "Ozzeth the Twiceborn, a unique Creature stat block from the archived
  NPC record."
sources:
  - "archive/ozzeth-the-twiceborn.md"
revealed: ""
title: ""
---

## At a glance

- **Role at the table.** The NPC himself, as a named Creature unique to this record.
- **Threat.** CR 8, most of it from nine levels of spell slots.
- **Tell.** Skin that runs blue against red, the colours wandering as he moves.
- **Weak to.** Room, for his venom must touch skin and his tongue stops at ten feet.
- **Used by.** The NPC of the same name brings him to the table.

> [!narration] First sight
> A small grung crouches ahead on the trail, skin blue in one place and red in another, the colours sliding over him as he moves. His throat swells, and a bitter scent rises with the first movement of his fingers. When he moves on, he springs into one long flat leap, and a pale tongue flicks out to drag its catch a step toward him.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Ozzeth, the Twiceborn"
size: Small
type: humanoid
subtype: grung
alignment: lawful evil
ac: 16
ac_class: mage armour (chromatic ward)
hp: 130
hit_dice: 20d6 + 60
speed: "25 ft., climb 25 ft., swim 30 ft."
stats: [8, 16, 16, 20, 14, 16]
saves:
  - constitution: 6
  - intelligence: 8
  - wisdom: 5
skillsaves:
  - arcana: 8
  - deception: 6
  - insight: 5
  - stealth: 6
damage_immunities: "poison"
condition_immunities: "poisoned"
senses: "passive Perception 12"
languages: "Grung, Common, Deep Speech"
cr: 8
traits:
  - name: Twiceborn Will
    desc: "Ozzeth has advantage on Constitution saving throws to maintain concentration, and advantage on saving throws against being charmed or frightened. A being whose own body has broken the caste order does not bend easily to anyone else's."
  - name: Chromatic Anomaly
    desc: "Ozzeth's skin runs blue and red at once, the colours shifting as he moves. He is never surprised while he can see, and a creature that tries to read his caste, rank, or intent by sight (an Insight check to gauge him) has disadvantage , the signal he broadcasts is a contradiction. Purely diegetic. It grants no combat bonus beyond this."
  - name: Standing Leap
    desc: "Ozzeth's long jump is 25 feet and his high jump is 15 feet, with or without a running start."
  - name: Toxic Skin
    desc: "A creature that touches Ozzeth or hits him with a melee attack while within 5 feet, or that grapples him, must succeed on a DC 14 Constitution saving throw or take 5 (2d4) poison damage and be poisoned until the start of its next turn."
  - name: Spellcasting
    desc: "Ozzeth is a 9th-level spell caster. His spellcasting ability is Intelligence (spell save DC 16, +8 to hit with spell attacks). He casts with no verbal components , his conjuring is scent, gesture, and colour. Cantrips (at will): mind sliver, minor illusion, poison spray, message. 1st level (4 slots): shield, charm person, disguise self, silent image. 2nd level (3 slots): hold person, misty step, mirror image. 3rd level (3 slots): fireball, fear, hypnotic pattern. 4th level (3 slots): greater invisibility, dimension door, phantasmal killer. 5th level (1 slot): dominate person."
  - name: "Legendary Resistance (2/Day)"
    desc: "If Ozzeth fails a saving throw, he can choose to succeed instead."
actions:
  - name: Multiattack
    desc: "Ozzeth casts one cantrip and makes one Venom Lash attack."
  - name: Venom Lash
    desc: "Melee Weapon Attack (tongue): +6 to hit, reach 10 ft., one target. Hit: 5 (1d4 + 3) piercing damage, and the target must succeed on a DC 14 Constitution saving throw or take 7 (2d6) poison damage. Ozzeth can pull a target of Medium size or smaller 5 feet toward him on a hit."
  - name: Poison Spray (Cantrip)
    desc: "One creature within 10 feet must succeed on a DC 16 Constitution saving throw or take 11 (2d10) poison damage. (Grung venom, wept as a needle-fine mist.)"
bonus_actions:
  - name: Misty Step (2nd-Level Slot)
    desc: "Ozzeth teleports up to 30 feet to an unoccupied space he can see."
reactions:
  - name: Shield (1st-Level Slot)
    desc: "When hit by an attack or targeted by magic missile, Ozzeth gains a +5 bonus to AC until the start of his next turn, including against the triggering attack, and takes no damage from magic missile."
legendary_actions:
  - name: Weeping Cantrip
    desc: "Ozzeth casts a cantrip (typically poison spray or mind sliver)."
  - name: Slip the Skin
    desc: "Ozzeth moves up to his speed without provoking opportunity attacks. He may climb or enter water as part of this move."
  - name: Pull the Thread (Costs 2 Actions)
    desc: "Ozzeth targets one creature charmed, frightened, or dominated by him that he can see within 60 feet. That creature immediately uses its reaction to move up to its speed and make one weapon attack against a target of Ozzeth's choice."
```

## Play

### Tactics

Each round he casts a minor spell and flicks his tongue, hauling the struck creature five feet toward him, and hold person, fear or hypnotic pattern arrives when the Party clusters. Misty Step and Slip the Skin slide him out of a closing ring, while Pull the Thread sets the creatures he has charmed against their friends. He withdraws when his objective is lost or his advantage spent.

### Outside a fight

Away from a fight he is the NPC the table already knows, a grung whose skin wanders colour to colour, and scent and moving fingers are all his casting shows.

## Depth

### Ecology

His archived record lists his haunts, diet and traces, and travellers who study the ground can pick his signs out with Wisdom (Survival).

### Hidden truths

His history sits in the archive, twiceborn past the grung caste order, and examination or the right question brings it into the open.

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
