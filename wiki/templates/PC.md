---
title: ""
type: PC
summary: ""
sources: []
dndbeyond_url: ""
revealed: "Backstory"
---

%% Two sides. The D&D Beyond pull (ADR 0009) replaces the sheet side (Sheet, Spells, Inventory) whole, so nobody edits it by hand. The pull leaves the story side (Backstory, Goals and bonds, Plans) as written. %%

%% Optional. Include each when the PC has a portrait or a reference sheet from `skill://visuals`: the bare embeds below, named with the page's slug. %%

![[<slug>-portrait.webp]]

![[<slug>-reference-sheet.png]]

## Sheet

%% Sheet side, pulled. The numbers the DM needs mid-round, the most used first. %%

- **Player.**
- **Class, species and level.**
- **Armor Class, Hit Points and Speed.**
- **Passive Perception and save DC.**
- **Saving throws.**

| Str | Dex | Con | Int | Wis | Cha |
| --- | --- | --- | --- | --- | --- |
|     |     |     |     |     |     |

### Features

%% Sheet side, pulled: class, species and feat features. %%

## Spells

%% Sheet side, pulled. %%

## Inventory

%% Sheet side, pulled. %%

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

%% Optional. Include it when the DM has plans for this PC. Story side, DM only. Give the DM's plans for this PC, with the Threads that touch them and Spotlight ideas. %%

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
