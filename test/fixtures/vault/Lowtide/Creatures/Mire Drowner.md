---
type: Creature
summary: "A drowned dead thing that lies in silt and drags the living down by the ankle."
sources: []
---

## At a glance

- **Role at the table.** An ambusher that pins one target in mud or water.
- **Threat.** CR 1. One attack a round for 11 damage, plus a grapple that restrains. 75 Hit Points.
- **Tell.** Bubbles rise in still water, and the mud around the ambush point is smoother than the rest.
- **Weak to.** Dry ground (where Mire Step gives it nothing) and anything that clears the water and silt around it.
- **Used by.** [[Sable]].

> [!narration] First sight
> The thing rises from the silt like a man climbing out of a bath. The skin is grey and swollen, and mud runs from the eyes and mouth. It smells of old water and cold iron. Water drips from its fingertips, and every step leaves a wet print that fills before it dries.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Mire Drowner"
size: "Medium"
type: "undead"
subtype: ""
alignment: "neutral"
ac: 13
ac_class: "natural armor"
hp: 75
hit_dice: "10d8 + 30"
speed: "30 ft., swim 30 ft."
stats: [14, 12, 16, 6, 10, 5]
saves: []
skillsaves:
  - stealth: 3
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: "Poison"
condition_immunities: "Exhaustion, Poisoned"
senses: "darkvision 60 ft., passive Perception 10"
languages: "Understands the languages it knew in life but can't speak"
cr: 1
traits:
  - name: "Amphibious"
    desc: "The drowner can breathe air and water."
  - name: "Mire Step"
    desc: "Difficult Terrain caused by mud, silt or shallow water doesn't cost the drowner extra movement."
actions:
  - name: "Drowning Grasp"
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 11 (2d8 + 2) Bludgeoning damage, and the target has the Grappled condition (escape DC 12). Until the grapple ends, the target has the Restrained condition and the drowner can't use Drowning Grasp on another target."
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

### Tactics

A drowner waits submerged in silt or water and grabs the first creature that passes within reach. Once it has a target grappled it does not let go, and it drags the target toward deep water if it can. It ignores everyone else unless the grappled creature dies or escapes.

### Outside a fight

Drowners do not speak, and they do not leave water. A drowner that is not hunting sits motionless in the mud for days. Mire Step lets them ignore the extra movement cost of [[Bog Ground]].

## Depth

### Ecology

Each drowner is a person who drowned in the Brack and did not go on. They cluster near places where many died at once, such as the streets of old Vessen.

### Hidden truths

- The drowners of the Vessen flats were the citizens who could not get out. They remember the gate opening. The Party can learn this from [[Sable]], who is one of them and remembers everything.

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
