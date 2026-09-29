---
type: Creature
summary: ""
sources: []
---

## At a glance

%% 3-5 facts. Threat is CR and what it does to a Party; Used by links NPCs. %%

- **Role at the table.**
- **Threat.**
- **Tell.**
- **Weak to.**
- **Used by.**

> [!narration] First sight
> %% Spoken: size and shape, its strangest feature, one sound or smell, what it does at rest, a visible tell for each signature ability. Second person. %%

## Statblock

%% Fantasy Statblocks, Basic 5e Layout, 2024 rules. Every derived number is written out: ability modifiers, proficiency bonus by CR, attack bonuses, save DCs, passive Perception, HP from Hit Dice and Con. Attacks use the 2024 format. Remove the YAML comments when filled. %%

```statblock
layout: Basic 5e Layout
name: ""
size: ""
type: ""
subtype: ""
alignment: ""
ac: 10
ac_class: ""
hp: 1
hit_dice: "1d8"
speed: "30 ft."
# Str Dex Con Int Wis Cha
stats: [10, 10, 10, 10, 10, 10]
# saves and skillsaves are lists of one-key maps, e.g. "- dex: 4" and "- perception: 4"
saves: []
skillsaves: []
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: "passive Perception 10"
languages: ""
cr: 0
# traits, actions, bonus_actions, reactions, legendary_actions: "- name: X" then "desc: ..."
# 2024 attack format: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Bludgeoning damage."
traits: []
actions: []
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

%% How it fights and what it does outside a fight. Weaknesses are things the Party can do. %%

### Tactics

### Outside a fight

## Depth

%% Ecology and origin, hidden truths (each with how the Party can learn it). %%

### Ecology

### Hidden truths

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
