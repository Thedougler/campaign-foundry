---
type: Creature
summary: "A giant bird crews place above the Ashwall spires, riding the Galewall
  stormfronts in high weather."
sources:
  - "archive/ssw-galewall.md"
revealed: ""
title: "Roc"
---

## At a glance

- **Role at the table.** Crews tell the stories half seriously in high weather, of something huge holding station on the stormfront where no bird should manage it.
- **Used by.** The stormfronts above the [[ashwall-islands|Ashwall Islands]] spires, on the [[galewall|Galewall]]'s western edge.

> [!narration] First sight
> A shadow without a cloud behind it slides through the storm above the masthead. It sweeps the canvas from astern, and for a breath the light dies along the whole deck. High over the spires, where the wind shears white off the wave tops, a bird the size of a ship's longboat turns into the weather and holds.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Roc"
size: Gargantuan
type: monstrosity
alignment: unaligned
ac: 15
ac_class: natural armor
hp: 248
hit_dice: "16d20 + 80"
speed: "20 ft., fly 120 ft."
stats: [28, 10, 20, 3, 10, 9]
saves:
  - dexterity: 4
  - wisdom: 4
skillsaves:
  - perception: 8
senses: "passive Perception 18"
languages: "none"
cr: 11
traits: []
actions:
  - name: Multiattack
    desc: "The roc makes two Beak attacks. It can replace one attack with a Talons attack."
  - name: Beak
    desc: "Melee Attack Roll: +13, reach 10 ft. Hit: 28 (3d12 + 9) Piercing damage."
  - name: Talons
    desc: "Melee Attack Roll: +13, reach 5 ft. Hit: 23 (4d6 + 9) Slashing damage. If the target is a Huge or smaller creature, it has the Grappled condition (escape DC 19) from both talons, and it has the Restrained condition until the grapple ends."
bonus_actions:
  - name: Swoop (Recharge 5–6)
    desc: "If the roc has a creature Grappled, the roc flies up to half its Fly Speed without provoking Opportunity Attacks and drops that creature."
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

### Outside a fight

Crews tell the stories in high weather, when the stormfronts above the volcanic spires show movement that is not spray. The telling is steadier than the sighting, which is how the western crews like their monsters.

## Depth

### Ecology

They are placed above the Ashwall spires by crew stories, riding the weather the [[galewall|Galewall]] stacks on itself. The trade records say nothing of what they take. They only record that the stories come back every time a hull makes the run.

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
