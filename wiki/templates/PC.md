---
type: PC
summary: ""
sources: []
dndbeyond_url: ""
---

%% Two sides. Sheet side (Sheet, Spells, Inventory) is replaced by the D&D Beyond pull (ADR 0009): never hand-edit it. Story side (Story, Goals and bonds, Plans) is never touched by the pull. %%

## Sheet

%% Sheet side, pulled. The numbers the DM needs mid-round: ten-second read first. %%

- **Player.**
- **Class, species and level.**
- **Armor Class, Hit Points and Speed.**
- **Passive Perception and save DC.**
- **Saving throws.**

| Str | Dex | Con | Int | Wis | Cha |
| --- | --- | --- | --- | --- | --- |
|     |     |     |     |     |     |

### Features

## Spells

%% Sheet side, pulled. %%

## Inventory

%% Sheet side, pulled. %%

## Story

%% Story side, never pulled. %%

> [!narration] Portrait
> %% Spoken: face, build, clothing, posture and one detail beyond sight. Second person. %%

### Backstory

## Goals and bonds

%% Story side. What the PC wants, fears and owes; who they love and who hunts them. Each linked to its owner page. These drive Spotlights. %%

- **Goal.**
- **Bond.**
- **Fear.**

## Plans

%% Story side, DM only. What the DM plans for this PC: Threads that touch them, Spotlight ideas. %%

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
