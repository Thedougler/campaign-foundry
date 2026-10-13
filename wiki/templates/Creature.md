---
title: ""
type: Creature
summary: ""
sources: []
cr: ""
creature_type: ""
size: ""
habitat: []
sourcebooks: []
revealed: "" # Campaign-bound. Set it per CONTEXT.md **Revealed**; a World-free page leaves it out.
---

%% Optional. Add `inspired_by: "<work>"` to the frontmatter only when the DM names what inspired this page. Root `AGENTS.md` **Sourcing** sets its use. %%

%% `cr`, `creature_type`, `size`, `habitat` and `sourcebooks` let Creatures sort and filter in Obsidian. Copy `cr` from the statblock as a number, `0.25` for 1/4, and leave it `""` when the statblock has none. `creature_type` is the statblock `type`, capitalised, and `size` is the statblock `size`. `habitat` lists the 2024 habitat names, such as `Underdark` or `Planar (Abyss)`, or stays `[]`. `sourcebooks` lists the full name of each published book the Creature appears in, or stays `[]` for homebrew. A Creature with no statblock leaves all five blank. %%

%% Optional. Include it when this Creature has a portrait from `skill://visuals`: the bare embed below, named with the page's slug. %%

![[<slug>-portrait.webp]]

> [!narration] First sight
> %% Optional. Include it when the Party will see this Creature. Spoken, second person, per `skill://theatre-of-the-mind`. %%

## Statblock

%% Optional. Include it when this Creature fights or its rules matter at the table. The fence below alone is a complete Creature page, written the way a published 2024 monster prints, as a 5etools monster is. Write it per `skill://statblock-design`: the Fantasy Statblocks `Basic 5e Layout` fields, plus `modifier` (the initiative bonus), `mythic_description`, `mythic_actions`, `lair_actions`, `regional_effects` and `gear` when the Creature has them, in 2024 wording with every derived number written out. Delete the YAML comments once the fields are filled. Every other part of the page is optional. %%

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
modifier: 0
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

%% Optional. Include it when the Party may fight this Creature. Build its own fight from its statblock and habitat. Open on its role at the table, the job it does on its first turn, and what it threatens against this Party. Give where it opens and the tell before its signature as a Cue (`==…==`). Give at least two answers the Party has to that signature, each with the opening it creates. Then give the morale or wound that ends its fight. Tie each line to this Creature's own body or terrain. A solo or boss adds its escalation. %%

## Outside a fight

%% Optional. Include it when the Party may meet this Creature without fighting it. Give what it is doing when the Party finds it at rest, and how it answers talk, trade, hiding or retreat. %%

## Ecology

%% Optional. Include it when the Creature's habitat gives the Party something to find. DM only. Give where it lives and how it fits there, such as what it eats, lives beside or is used for, and say where it came from. For each signature ability, give a trace the Party can find before contact. %%

## Hidden truths

%% Optional. Include it when the Creature hides a truth the Party can learn. DM only. Give each truth with how the Party can learn it. %%

## Links

%% Optional. Include it when the DM wants this page's backlinks listed here. %%

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
