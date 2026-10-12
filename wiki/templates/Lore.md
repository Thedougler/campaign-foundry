---
title: ""
type: Lore
summary: ""
sources: []
revealed: "" # Campaign-bound. Set it per CONTEXT.md **Revealed**; a World-free page leaves it out.
---

%% Optional. Add `inspired_by: "<work>"` to the frontmatter only when the DM names what inspired this page. Root `AGENTS.md` **Sourcing** sets its use. %%

> [!narration] As it is told
> %% Optional. Include it when people in the World tell this Lore aloud. Spoken in a teller's voice: the common version people in the World say aloud, which may differ from the truth. %%

## Truth, Clues and accounts

%% Give how the Party meets this Lore at the table. The truth is one plain sentence, then what it leaves out. Players notice gives the signs they see before anyone explains them. Clues lists each Clue with the page it appears on, three in different places for each conclusion the Party needs. Accounts gives each version people tell, with its teller and whether it is true, distorted or false, linking each NPC or Faction that acts on the truth. Quote any text the Party can read word for word. %%

- **The truth.**
- **Players notice.**
- **Clues.**
- **Accounts.**

## The full truth

%% Optional. Include it when the truth needs more than its one sentence. DM only. Give what happened and who did it and why, and what it left behind. A truth with more parts adds a `##` section per part, titled for its content, such as How it works or Tenets. %%

## Chronology

%% Optional. Include it when the truth unfolds over time. DM only. Give dated events in the World's Calendar. %%

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
