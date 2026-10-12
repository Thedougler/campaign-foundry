---
title: ""
type: Quest
summary: ""
sources: []
status: ""
revealed: ""
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Set `status` to offered, active, done or failed. Done when is an event the table can see. %%

- **Offered by.** %% Optional. Add it when someone offers the Quest, linking the giver. %%
- **Reward.** %% Optional. Add it when a reward is promised or known. %%
- **Deadline.** %% Optional. Add it when the Quest has a deadline. %%
- **Done when.**
- **Failed when.** %% Optional. Add it when a visible event ends the Quest in failure. %%
- **Advances.** %% Optional. Add it when the Quest moves a Thread, linking it. %%

> [!narration] The offer
> %% Optional. Include it when the Party hears or reads the Quest before taking it. Spoken, second person: the request, rumour or posted notice as the Party meets it. %%

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
