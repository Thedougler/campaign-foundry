---
title: ""
type: Lore
summary: ""
sources: []
revealed: "" # Campaign-bound. Set it per CONTEXT.md **Revealed**; a World-free page leaves it out.
---

%% Optional. Add `inspired_by: "<work>"` to the frontmatter only when the DM names what inspired this page. Root `AGENTS.md` **Sourcing** sets its use. %%

## At a glance

%% Give the DM a ten-second read, one line per bullet. Write the truth as one plain sentence. Limits gives what the truth leaves out. %%

- **The truth.**
- **Who knows it.** %% Optional. Add it when NPCs or Factions act on the truth, linking each. %%
- **Limits.**
- **Reaches play through.** %% Optional. Add it when the truth touches a person, place or prize in the current Campaign, linking it. %%

> [!narration] As it is told
> %% Optional. Include it when people in the World tell this Lore aloud. Spoken in a teller's voice: the common version people in the World say aloud, which may differ from the truth. %%

## Play

%% Give how the Party meets this Lore at the table. Players notice gives the signs they see before anyone explains them. Clues lists each Clue with the page it appears on, three in different places for each conclusion the Party needs. Accounts gives each version people tell, with its teller and whether it is true, distorted or false. Quote any text the Party can read word for word. %%

- **Players notice.**
- **Clues.**
- **Accounts.**

## Depth

%% Optional. Include it when the truth needs more than its one sentence. DM only. Give the full truth in `###` parts titled for their content, such as Chronology, How it works or Tenets. %%

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
