---
title: ""
type: Quest
summary: ""
sources: []
status: ""
revealed: ""
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Set `status` to offered, active, done or failed. Offered by links the giver. Done when and Failed when are events the table can see. Advances links the Thread. %%

- **Offered by.**
- **Reward.**
- **Deadline.**
- **Done when.**
- **Failed when.**
- **Advances.**

> [!narration] The offer
> %% Spoken, second person: the request, rumour or posted notice as the Party meets it. %%

## Play

%% Give how the Quest runs, one line per bullet. Leads gives each starting point with where it is found. Opposition links whoever works against it. Payoff gives what changes in the World when it is done. %%

- **Leads.**
- **Opposition.**
- **Complications.**
- **Payoff.**

## Depth

%% Optional. Include it when the Quest hides something, such as a detail the giver keeps back. %%

### Hidden truths

%% Give each truth with how the Party can learn it. %%

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
