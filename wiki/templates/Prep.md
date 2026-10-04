---
type: Prep
summary: ""
sources: []
date: ""
---

## At a glance

%% 3-5 facts. date is the in-world date of the Session. Length comes from DM Settings or the Campaign. %%

- **Session question.**
- **Party at.**
- **Length.**
- **Threads in play.**

## Scene Chart

%% The planned order: a Hook, then alternating Developments and Cliffhangers, then a Climax and a Resolution. About half an hour per Scene. It paces the Session and never fixes outcomes. Link each Scene page. %%

| #   | Scene | Kind | Minutes | Threads |
| --- | ----- | ---- | ------- | ------- |
| 1   |       | Hook |         |         |

## Threads

%% One line per Thread in play: where it stands and the lever it gives the Party this Session. %%

## Opposition

%% Creatures and NPCs the Party can meet. Link each; embed a statblock only on the Scene where it is fought. %%

## Clues

%% About ten true, concrete facts, unattached until play shows where they belong. Each can be found in more than one Scene. %%

| Clue | Found in |
| ---- | -------------- |
|      |                |

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
