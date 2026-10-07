---
type: PC
summary: ""
sources: []
dndbeyond_url: ""
---

%% Two sides. The D&D Beyond pull (ADR 0009) replaces the sheet side (Sheet, Spells, Inventory) whole, so nobody edits it by hand. The pull leaves the story side (Story, Goals and bonds, Plans) as written. %%

## Sheet

%% Sheet side, pulled. The numbers the DM needs mid-round, with the ten-second read first. %%

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

## Story

%% Story side, left alone by the pull. %%

> [!narration] Portrait
> %% Spoken, third person. Give how the other characters see this PC, with face and build, clothing and posture, and one detail beyond sight. %%

### Backstory

%% Give the Player's own story for the PC as they wrote it, with each person and place linked. %%

## Goals and bonds

%% Story side. Give the PC's goals, fears and debts, the people they love and the people hunting them, each linked to its owner page. These drive Spotlights. %%

- **Goal.**
- **Bond.**
- **Fear.**

## Plans

%% Story side, DM only. Give the DM's plans for this PC, with the Threads that touch them and Spotlight ideas. %%

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
