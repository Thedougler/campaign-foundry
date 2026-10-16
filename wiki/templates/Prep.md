---
title: ""
type: Prep
summary: ""
sources: []
date: ""
revealed: ""
cssclasses:
  - cf-prep
---

## Session question

%% Set `date` to the in-world date of the Session. Give the one question the Climax settles, then where the Party starts, with the Location linked. %%

## Scene Chart

%% Order the Scenes as a Hook, alternating Developments and Cliffhangers, a Climax and a Resolution, at about half an hour each. The chart paces the Session and leaves outcomes to play. Link each Scene page. Under the table, add one planning note per row. Each note gives the row's situation and independent trigger with its card and Spotlight. Then it gives the incoming alternatives and conditional destination, with any escalation. %%

| #   | Scene | Kind | Minutes | Threads |
| --- | ----- | ---- | ------- | ------- |
| 1   |       | Hook |         |         |

> [!tiles]
>
> %% One ordered item per row, in chart order, led by the Scene's scene-setter embed and its name in bold: `1. ![[<scene-slug>-scene.webp]] **Skarn's last stand.** …`. An item whose Scene has no scene-setter yet opens on the bold name. %%

## Threads

%% Optional. Include it when a Thread is in play this Session. Give one line per Thread in play, linked. Say where it is planted and tested, where it moves or resolves, and the Angle it gives the Party this Session. %%

### Spotlights

%% Optional. Include it when the Session has PCs. One item per PC in the callout below. The first item, `- **Lead PC.**`, links the Lead PC and their journey Thread, then the possibilities this Session offers that hero's journey and the Scenes that hold them. It never says what the PC will choose. Then one item per other PC, led by the PC and their rows in bold (`- **Delmar, rows 2 and 4.**`), giving the linked Scene and the goal, bond or fear their Player may act on. %%

> [!tiles]
>
> %% Optional. Include it whenever the page has `### Spotlights`. %%

## Opposition

%% Optional. Include it when someone works against the Party this Session. Link each opposing NPC, Creature and Faction, with its Session goal and means and why that goal crosses the Party's path. Then give its unopposed timeline. Each entry pairs a trigger with an action and its sign, and states the consequence and what interference changes. Each speaking cast member gets a bench line with the moment they grab the Scene and how to play them at once, ending on the Cue (`==…==`) they open with. Statblocks are embedded only on the Scene where they are fought. %%

## Clues

%% Optional. Include it when the Session has facts to discover. Give about ten true, concrete facts, each findable in at least two linked Scenes, with the source or interaction that reveals it in each. A conclusion essential to progress gets three independent routes. %%

| Clue | Found in |
| ---- | -------- |
|      |          |

## Links

%% Optional. Include it when the DM wants this page's backlinks listed here. %%

```base
filters:
  and:
    - file.inFolder(this.file.folder)
views:
  - type: table
    name: Scenes
    filters:
      and:
        - 'note.type == "Scene"'
    groupBy:
      property: note.kind
      direction: ASC
    order:
      - file.name
      - note.summary
  - type: table
    name: Handouts
    filters:
      and:
        - 'note.type == "Handout"'
    order:
      - file.name
      - note.summary
```
