---
title: ""
type: Quest
summary: ""
sources: []
status: ""
revealed: ""
---

> [!narration] The offer
> %% Optional. Include it when the Party hears or reads the Quest before taking it. Spoken, second person: the request, rumour or posted notice as the Party meets it. %%

## Terms and leads

%% Give how the Quest runs, one line per bullet. Set `status` to offered, active, done or failed. Done when is an event the table can see. Leads gives each starting point with where it is found. Opposition links whoever works against it. Payoff gives what changes in the World when it is done, linking each Thread it moves. %%

- **Offered by.** %% Optional. Add it when someone offers the Quest, linking the giver. %%
- **Done when.**
- **Failed when.** %% Optional. Add it when a visible event ends the Quest in failure. %%
- **Deadline.** %% Optional. Add it when the Quest has a deadline. %%
- **Reward.** %% Optional. Add it when a reward is promised or known. %%
- **Leads.**
- **Opposition.**
- **Complications.**
- **Payoff.**

## Hidden truths

%% Optional. Include it when the Quest hides something, such as a detail the giver keeps back. DM only. Give each truth with how the Party can learn it. %%

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
