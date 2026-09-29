---
type: Quest
summary: ""
sources: []
status: ""
---

## At a glance

%% Six facts at most. status is offered, active, done or failed. Advances links the Thread. %%

- **Offered by.**
- **Reward.**
- **Deadline.**
- **Done when.**
- **Failed when.**
- **Advances.**

> [!narration] The offer
> %% Spoken: the request, rumor or posted notice as the Party meets it. Second person. %%

## Play

%% How the Quest runs. %%

- **Leads.**
- **Opposition.**
- **Complications.**
- **Payoff.**

## Depth

%% Hidden truths (each with how the Party can learn it), what the giver is not saying. %%

### Hidden truths

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
