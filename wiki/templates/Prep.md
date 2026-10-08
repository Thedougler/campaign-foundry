---
type: Prep
summary: ""
sources: []
date: ""
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Set `date` to the in-world date of the Session. Session question is the one question the Climax settles. Length comes from DM Settings or the Campaign. %%

- **Session question.**
- **Party at.**
- **Length.**
- **Threads in play.**

## Scene Chart

%% Order the Scenes as a Hook, alternating Developments and Cliffhangers, a Climax and a Resolution, at about half an hour each. The chart paces the Session and leaves outcomes to play. Link each Scene page. Under the table, add one numbered planning note per row. Each note gives the row's situation and independent trigger with its card and Spotlight. Then it gives the incoming alternatives and conditional destination, with any escalation. %%

| #   | Scene | Kind | Minutes | Threads |
| --- | ----- | ---- | ------- | ------- |
| 1   |       | Hook |         |         |

## Threads

%% Give one line per Thread in play, linked. Say where it is planted and tested, where it moves or resolves, and the lever it gives the Party this Session. %%

## Opposition

%% Link each opposing NPC, Creature and Faction, with its Session goal and means and why that goal crosses the Party's path. Then give its unopposed timeline. Each entry pairs a trigger with an action and its sign, and states the consequence and what interference changes. Each speaking cast member gets a bench line with the moment they grab the Scene and how to play them at once. Statblocks are embedded only on the Scene where they are fought. %%

## Clues

%% Give about ten true, concrete facts, each findable in at least two linked Scenes, with the source or interaction that reveals it in each. A conclusion essential to progress gets three independent routes. %%

| Clue | Found in |
| ---- | -------- |
|      |          |

## Links

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
