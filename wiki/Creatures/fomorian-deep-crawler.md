---
title: Fomorian Deep Crawler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fomorian Deep Crawler
size: Huge
type: giant
alignment: Any alignment
ac: 14
ac_class: natural armour
hp: 184
hit_dice: 16d12 + 80
modifier: 2
speed: 30 ft., climb 30 ft.
stats: [ 23, 15, 20, 9, 17, 6 ]
skillsaves:
  - perception: 7
  - stealth: 6
senses: darkvision 120 ft., passive Perception 17
languages: Giant, Undercommon
cr: "10"
traits:
  - name: Contortionist
    desc: The fomorian can enter a space large enough for a Large creature without squeezing.
  - name: Crawling Stance
    desc: While the fomorian has the prone condition, crawling does not cost it extra movement. In addition, the prone condition does not grant advantage on attack rolls against the fomorian.
  - name: Spider Climb
    desc: The fomorian can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The fomorian makes two Slam attacks and uses Crawling Hex if it is available.
  - name: Slam
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 22 (3d10 + 6) bludgeoning damage."
  - name: Crawling Hex (Recharge 4–6)
    desc: The fomorian targets one creature it can see within 60 feet of itself. The target must succeed on a DC 15 Wisdom saving throw or take 31 (7d8) psychic damage, have the prone condition, and become cursed for 1 hour. While cursed this way, the target can't stand up and end the prone condition on itself.
```
