---
type: NPC
summary: ""
sources: []
creature: ""
---

## At a glance

%% 3-5 facts. Found at links the Location. The `creature` property links the Creature that holds their statistics. %%

- **Role.**
- **Wants.**
- **Voice.**
- **Found at.**

> [!narration] First look
> %% Spoken: build and age, two or three face details Players can repeat, one sound or smell, what they are doing, then their first line. Second person. %%

## Play

%% How a meeting goes at the table. One line each. %%

- **Opens them up.**
- **Shuts them down.**
- **Will share.**
- **Will not share.**
- **If pressed.**

## Depth

%% Past that still shapes them now, hidden truths (each with how the Party can learn it), Threads they drive or sit in. %%

### History

### Hidden truths

### Threads

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
