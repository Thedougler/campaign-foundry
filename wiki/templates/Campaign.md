---
type: Campaign
summary: ""
sources: []
session_length_hours:
---

## At a glance

%% 3-5 facts. Party names the PCs; Now says where the Party stands. %%

- **Players.**
- **Premise.**
- **Party.**
- **Cadence.**
- **Now.**

> [!narration] The Campaign
> %% Spoken opening for the first Session: the Party's situation in second person, about 100 words. %%

## Play

%% Table agreements and rules of this Campaign: cadence, Session length override (set session_length_hours, blank inherits DM Settings), safety tools, House Rules in force. %%

- **Session length.** Inherits DM Settings unless session_length_hours is set.
- **Table agreements.**
- **House Rules.**

## Depth

%% What the Campaign is for: the central tension, themes, where the Threads are heading. DM-only. %%

### Premise

### Themes

### Direction

## Links

```base
filters:
  and:
    - file.inFolder(this.file.folder)
views:
  - type: table
    name: PCs
    filters:
      and:
        - 'note.type == "PC"'
    order:
      - file.name
      - note.summary
  - type: table
    name: Threads
    filters:
      and:
        - 'note.type == "Thread"'
    order:
      - file.name
      - note.summary
      - note.status
  - type: table
    name: Quests
    filters:
      and:
        - 'note.type == "Quest"'
    order:
      - file.name
      - note.summary
      - note.status
  - type: table
    name: Prep
    filters:
      and:
        - 'note.type == "Prep"'
    order:
      - file.name
      - note.summary
      - note.date
  - type: table
    name: Recaps
    filters:
      and:
        - 'note.type == "Recap"'
    order:
      - file.name
      - note.summary
      - note.date
```
