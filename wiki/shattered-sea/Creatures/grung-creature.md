---
type: Creature
summary: "A Grung creature (CR 1/4) used as a scout in The Shattered Sea."
sources:
  - "archive/grung.md"
revealed: "Session 4"
title: "Grung (Creature)"
---

## At a glance

- **Role at the table.** Scout.
- **Threat.** CR 1/4. It presses with a dagger thrown out to sixty feet and a standing leap that covers twenty-five feet.
- **Tell.** It goes dead still and stares at one point before the dagger hand moves.
- **Weak to.** Its poison works only by touch, and a spear's reach is the longer of the two weapons. A steady spear holds it off.
- **Used by.** [[grung-elite-warrior|Grung Elite Warrior]] patrols the same territory.

> [!narration] First sight
> Something small rises out of the shallows ahead of you and pulls itself onto a half-sunken rock, water running off its back. It moves in springs rather than steps. One jump takes it out of the water and onto the rock. A dagger hangs ready in its hand, the blade bare. Then it goes still, watching the water, and has not turned your way yet.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Grung"
size: Small
type: humanoid
subtype: grung
alignment: Typically Neutral Evil
ac: 12
hp: 11
hit_dice: 2d6 + 4
speed: "25 ft., climb 25 ft."
stats: [7, 14, 15, 10, 11, 10]
saves:
  - dexterity: 4
skillsaves:
  - athletics: 2
  - perception: 2
  - stealth: 4
  - survival: 2
damage_immunities: "poison"
condition_immunities: "poisoned"
senses: "passive Perception 12"
languages: "Grung"
cr: "1/4"
traits:
  - name: "Amphibious"
    desc: "The grung can breathe air and water."
  - name: "Poisonous Skin"
    desc: "Any creature that grapples the grung or otherwise comes into direct contact with the grung's skin must succeed on a DC 12 Constitution saving throw or become poisoned for 1 minute. A poisoned creature no longer in direct contact with the grung can repeat the saving throw at the end of each of its turns, ending the effect on a success."
  - name: "Standing Leap"
    desc: "The grung's long jump is up to 25 feet and its high jump is up to 15 feet, with or without a running start."
actions:
  - name: "Dagger"
    desc: "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. Or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage plus 5 (2d4) poison damage."
```

## Play

### Tactics

Open at the water's edge, where the scout can leap and swim, and let the sudden stillness announce the strike. A braced line takes the leap away, and cover blunts the thrown daggers. Concentrated fire catches it before it swims clear. It retreats through the shallows once its watching is spoiled or it is badly hurt.

### Outside a fight

Toe-marks at the waterline, and a small form on the rocks that watches without turning, warn the Party before an encounter. It keeps to the shallows and banks of its range, and open water is the line it will not cross.

## Depth

### Ecology

It lives along the Shattered Sea's shallows and banks, and its diet follows what those waters give it. A traveller working Wisdom (Survival) reads its sign at the water's edge.

### Hidden truths

Examination of its haunts shows how far its kind range from the water, and with the pattern its weaknesses. A successful relevant Intelligence check confirms the ranging pattern, and with it the touch-only poison of its skin.

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
