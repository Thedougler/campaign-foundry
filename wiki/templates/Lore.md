---
type: Lore
summary: ""
sources: []
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Write the truth as one plain sentence. Who knows it links the NPCs and Factions who act on it. Limits gives what the truth leaves out. Reaches play through links the person, place or prize it touches in the current Campaign. %%

- **The truth.**
- **Who knows it.**
- **Limits.**
- **Reaches play through.**

> [!narration] As it is told
> %% Spoken in a teller's voice: the common version people in the World say aloud, which may differ from the truth. %%

## Play

%% Give how the Party meets this Lore at the table. Players notice gives the signs they see before anyone explains them. Clues lists each Clue with the page it appears on, three in different places for each conclusion the Party needs. Accounts gives two to four versions, each with its teller and whether it is true, distorted or false. Quote any text the Party can read word for word. %%

- **Players notice.**
- **Clues.**
- **Accounts.**

## Depth

%% DM only. Give the full truth in `###` parts titled for their content, such as Chronology, How it works or Tenets. %%

### The full truth

%% Give what happened and who did it and why, and what it left behind. %%

### Chronology

%% Give dated events in the World's Calendar, where the truth unfolds over time. %%

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
