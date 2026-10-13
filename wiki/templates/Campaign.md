---
title: ""
type: Campaign
summary: ""
sources: []
session_length_hours:
revealed: ""
---

> [!narration] The Campaign
> %% Optional. Include it before the first Session, as the opening the DM speaks. Spoken, second person, about 100 words. Give the Party's situation, and end on the promise of what they will do. %%

## Players and table

%% One line per bullet. Players pairs each Player with their PC, since the pull replaces the sheet side of PC pages. Party links the PCs. Session length inherits DM Settings unless `session_length_hours` is set. House Rules links each House Rule in force. %%

- **Players.**
- **Party.**
- **Cadence.** %% Optional. Add it when the table keeps a set schedule. %%
- **Session length.** %% Optional. Add it when the Campaign sets its own. %%
- **Table agreements.** %% Optional. Add it when the table has agreed any. %%
- **House Rules.** %% Optional. Add it when a House Rule is in force. %%

## Premise

%% Optional. Include it when the DM gives the Campaign's premise. DM only. Give the central tension the Party walks into. Tone and Lines and Veils belong in `campaign-config.md`. %%

## Themes

%% Optional. Include it when the DM names the Campaign's themes. DM only. Give the pressures the Campaign keeps returning to, as the DM names them. %%

## Direction

%% Optional. Include it when the DM gives the Campaign's direction. DM only. Give the DM's anchors that later planning keeps, then other futures written as possibilities. %%

## Links

%% Optional. Include it when the DM wants this page's backlinks listed here. %%

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
