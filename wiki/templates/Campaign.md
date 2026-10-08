---
type: Campaign
summary: ""
sources: []
session_length_hours:
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Players pairs each Player with their PC, since the pull replaces the sheet side of PC pages. Party links the PCs. Now gives where the Party stands today. %%

- **Players.**
- **Premise.**
- **Party.**
- **Cadence.**
- **Now.**

> [!narration] The Campaign
> %% Spoken opening for the first Session, second person, about 100 words. Give the Party's situation, and end on the promise of what they will do. %%

## Play

%% Give this Campaign's table agreements, one line per bullet. Session length inherits DM Settings unless `session_length_hours` is set. House Rules links each House Rule in force. %%

- **Session length.**
- **Table agreements.**
- **House Rules.**

## Depth

%% DM only. Give the purpose of the Campaign. Tone and Lines and Veils belong in `campaign-config.md`. %%

### Premise

%% Give the central tension the Party walks into. %%

### Themes

%% Give the pressures the Campaign keeps returning to, as the DM names them. %%

### Direction

%% Give the DM's anchors that later planning keeps, then other futures written as possibilities. %%

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
