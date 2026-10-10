---
title: ""
type: Creature
summary: ""
sources: []
revealed: ""
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Role at the table is the job it does on its first turn. Threat gives its CR and what it does to this Party. Tell is the wind-up the Players see before its signature strikes. Weak to is an action the Party can take. Used by links every NPC and page that uses these statistics. %%

- **Role at the table.**
- **Threat.**
- **Tell.**
- **Weak to.**
- **Used by.**

> [!narration] First sight
> %% Spoken, second person. Give its size against something familiar and its strangest feature. Add its skin, scales or hide, one sound or smell, what it does at rest, and the visible sign of each signature ability. Leave out rules, secrets and any name the Party has not learned. %%

## Statblock

%% Use Fantasy Statblocks, Basic 5e Layout and the 2024 rules. Write every derived number out. That covers ability modifiers and the proficiency bonus by CR, attack bonuses and save DCs, passive Perception, and HP from Hit Dice and Con (`hit_dice` includes the Con term, as in "8d8 + 16"). Attacks use the 2024 format. Delete the YAML comments once the fields are filled. %%

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

%% Give how this Creature fights, and what it does when nobody is fighting it. %%

### Tactics

%% Build this Creature's own fight from its statblock and habitat. Give where it opens and the tell before its signature as a Cue (`==…==`). Give at least two answers the Party has to that signature, each with the opening it creates. Then give the morale or wound that ends its fight. Tie each line to this Creature's own body or terrain. A solo or boss adds its escalation. %%

### Outside a fight

%% Give what it is doing when the Party finds it at rest, and how it answers talk, trade, hiding or retreat. %%

## Depth

%% DM only. Give where it lives and what the Party can learn about it. %%

### Ecology

%% Give its habitat and diet and its social life. Add its predators or prey and its local use, and say where it came from. For each signature ability, give a trace the Party can find before contact. %%

### Hidden truths

%% Give each truth with how the Party can learn it. %%

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
