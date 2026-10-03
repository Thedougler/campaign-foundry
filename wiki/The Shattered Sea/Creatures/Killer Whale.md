---
type: Creature
summary: "A pack hunter of the eastern water that tests wounded hulls, and of the Galewall's cold water, where pods follow lifeboats for hours."
sources:
 - "archive/ssw-outer-reach.md"
 - "archive/ssw-galewall.md"
---

## At a glance

- **Role at the table.** A pack hazard of the eastern road's traffic.
- **Threat.** Unrecorded so far. The danger lands on steering and on boats.

> [!narration] First sight
> A fin cuts across your wake, and another keeps pace. The pack works along the rudder line, the way a wound is tested.

## Statblock

The template's neutral shell stands in below.

```statblock
layout: Basic 5e Layout
name: Killer Whale
size: Large
type: ""
subtype: ""
alignment: ""
ac: 10
ac_class: ""
hp: 5
hit_dice: "1d10"
speed: "0 ft."
stats: [10, 10, 10, 10, 10, 10]
saves: []
skillsaves: []
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: "passive Perception 10"
languages: ""
cr: 0
traits: []
actions: []
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

### Tactics

The [[Outer Reach]] record has a pack testing the rudder line of a wounded hull until the steering suffers.

## Depth

### Ecology

They follow wounded ships along the eastern road, from the chart edge to the water past [[Keth-Naar]]. Pods also work the cold water on both sides of the [[Galewall]] storm belt, where they follow lifeboats and debris for hours. Not always attacking. The circling is the part survivors describe as worse.

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
