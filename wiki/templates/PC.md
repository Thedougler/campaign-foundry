---
title: ""
type: PC
summary: ""
sources: []
dndbeyond_url: ""
revealed: "Backstory"
---

%% Two sides, both canon on this page. The sheet side (Sheet, Spells, Inventory) holds the PC's numbers and gear. `skill://pull-pcs` refreshes it from D&D Beyond when the character is public, and when it isn't, agents keep it by hand through `skill://statblock-design`. The story side (Backstory, Goals and bonds, Plans) holds the Player's story, and the pull leaves it as written. %%

%% Optional. Include each when the PC has a portrait or a reference sheet from `skill://visuals`: the bare embeds below, named with the page's slug. %%

![[<slug>-portrait.webp]]

![[<slug>-reference-sheet.png]]

## Sheet

%% Sheet side. The Player and the class line, then the PC's numbers as one Fantasy Statblocks fence, which Obsidian renders and the Combat sim reads. %%

- **Player.**
- **Class, species and level.**

%% Fill the fence per `skill://statblock-design` and its fence reference § PC sheet. `name` is the PC's title and `subtype` its species. `ac`, `hp` and `speed` are the sheet's own, `hit_dice` is the PC's Hit Dice with its Constitution term, and `modifier` is the initiative bonus. List proficient saves and skills with their totals, and end `senses` on passive Perception. Each feature that acts in a fight is an entry in `traits`, `actions`, `bonus_actions` or `reactions`, in the 2024 wording Creature pages use, with any limited use in its name, such as `Lucky (3/Long Rest)`. A caster gets a `Spellcasting` action naming its ability, spell save DC and spell attack bonus. Add `damage_resistances`, `damage_immunities` or `condition_immunities` when the PC has them. A PC has a level, never a `cr`. Delete the YAML comments once the fields are filled. %%

```statblock
layout: Basic 5e Layout
name: ""
size: ""
type: humanoid
subtype: ""
ac: 10
hp: 1
hit_dice: "1d8"
speed: "30 ft."
# Str Dex Con Int Wis Cha
stats: [10, 10, 10, 10, 10, 10]
modifier: 0
# saves and skillsaves are lists of one-key maps, e.g. "- dexterity: 4" and "- perception: 4"
saves: []
skillsaves: []
senses: "passive Perception 10"
languages: ""
# traits, actions, bonus_actions, reactions: "- name: X" then "desc: ...", a limited use in the name: "Lucky (3/Long Rest)"
# 2024 attack format: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Bludgeoning damage."
traits: []
actions: []
bonus_actions: []
reactions: []
```

### Features

%% Sheet side: every class, species and feat feature by name. The fence's entries give the rules of those that act in a fight. %%

## Spells

%% Sheet side. %%

## Inventory

%% Sheet side. %%

## Backstory

%% Story side, left alone by the pull. Give the Player's own story for the PC as they wrote it, with each person and place linked. %%

> [!narration] Portrait
> %% Optional. Include it when the Player or DM describes how the PC looks. Spoken, third person. Give how the other characters see this PC, with face and build, clothing and posture, and one detail beyond sight. %%

## Goals and bonds

%% Story side. Give the PC's goals, fears and debts, the people they love and the people hunting them, each linked to its owner page. These drive Spotlights. %%

- **Goal.**
- **Bond.**
- **Fear.**

## Plans

%% Optional. Include it when the DM has plans for this PC or the PC has a journey Thread. Story side, DM only. Its first bullet, `- **Hero's journey.**`, links the PC's journey Thread. Then give the DM's plans for this PC, with the Threads that touch them and Spotlight ideas. %%

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
