---
title: ""
type: Creature
summary: ""
sources: []
revealed: "" # Campaign-bound. Set it per CONTEXT.md **Revealed**; a World-free page leaves it out.
---

%% Optional. Add `inspired_by: "<work>"` to the frontmatter only when the DM names what inspired this page. Root `AGENTS.md` **Sourcing** sets its use. %%

%% Optional. Include it when this Creature has a portrait from `skill://visuals`: the bare embed below, named with the page's slug. %%

![[<slug>-portrait.webp]]

> [!narration] First sight
> %% Optional. Include it when the Party will see this Creature. Spoken, second person, per `skill://theatre-of-the-mind`. %%

## Statblock

%% Write this block per `skill://fantasy-statblock`: the Fantasy Statblocks `Basic 5e Layout` fields, 2024 wording, and every derived number written out. Delete the YAML comments once the fields are filled. A World-free page (`CONTEXT.md` **World-free page**) holds its `## Statblock` and `## Links` alone. %%

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

## Tactics

%% Optional. Include it when the Party may fight this Creature. Build its own fight from its statblock and habitat. Open on its role at the table, the job it does on its first turn, and what it threatens against this Party. Give where it opens and the tell before its signature as a Cue (`==…==`). Give at least two answers the Party has to that signature, each with the opening it creates. Then give the morale or wound that ends its fight. Tie each line to this Creature's own body or terrain. A solo or boss adds its escalation. A Creature made for one NPC keeps its body, habits and habitat on this page, and leaves that person's voice, talk, bonds and history to the NPC page. %%

## Outside a fight

%% Optional. Include it when the Party may meet this Creature without fighting it. Give what it is doing when the Party finds it at rest, and how it answers talk, trade, hiding or retreat. %%

## Ecology

%% Optional. Include it when the Creature's habitat gives the Party something to find. DM only. Give where it lives and how it fits there, such as what it eats, lives beside or is used for, and say where it came from. For each signature ability, give a trace the Party can find before contact. %%

## Hidden truths

%% Optional. Include it when the Creature hides a truth the Party can learn. DM only. Give each truth with how the Party can learn it. %%

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
