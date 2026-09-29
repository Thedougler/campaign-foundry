---
type: Creature
summary: "Young Red Dragon, from the SRD 5.2 monsters."
sources: []
---

## At a glance

- **Role at the table.** Text.
- **Threat.** Text.
- **Tell.** Text.
- **Weak to.** Text.
- **Used by.** Text.

> [!narration] First sight
> Spoken text for the table.

## Statblock

```statblock
layout: Basic 5e Layout
name: Young Red Dragon
size: Large
type: dragon
subtype: ""
alignment: chaotic evil
ac: 18
ac_class: ""
hp: 178
hit_dice: 17d10 + 85
speed: 40 ft., climb 40 ft., fly 80 ft.
stats:
  - 23
  - 10
  - 21
  - 14
  - 11
  - 19
saves:
  - dex: 4
  - wis: 4
skillsaves:
  - perception: 8
  - stealth: 4
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: fire
condition_immunities: ""
senses: darkvision 120 ft., blindsight 30 ft., passive Perception 18
languages: Common, Draconic
cr: 10
traits: []
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks.
  - name: Rend
    desc: "*Melee Attack Roll:* +10, reach 10 ft. *Hit:* 13 (2d6 + 6) Slashing damage plus 3 (1d6) Fire damage."
  - name: Fire Breath
    desc: "*Dexterity Saving Throw:* DC 17, each creature in a 30-foot Cone. *Failure:* 56 (16d6) Fire damage. *Success:* Half damage."
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

Text.

## Depth

Text.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    order:
      - file.name
```
