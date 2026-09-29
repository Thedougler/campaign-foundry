---
type: Lore
summary: ""
sources: []
---

## At a glance

%% 3-5 facts. The truth in one plain sentence, with its limits. %%

- **The truth.**
- **Who knows it.**
- **Limits.**
- **Reaches play through.**

> [!narration] As it is told
> %% Spoken: the version people in the World say aloud, in a teller's voice. The common telling may differ from the truth. %%

## Play

%% How the Lore reaches the table. %%

- **Players notice.**
- **Clues.**
- **Accounts.**

## Depth

%% The full truth and its shape. Use ### for each part, named for what it holds (Chronology, Tenets, How it works). %%

### The full truth

### Chronology

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
