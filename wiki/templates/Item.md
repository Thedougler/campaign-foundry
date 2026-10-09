---
title: ""
type: Item
summary: ""
sources: []
revealed: ""
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Kind is consumable, magic item, artifact, plot object or mundane gear. Changes is the one choice it alters at the table. Held by links the current holder. %%

- **Kind.**
- **Rarity.**
- **Attunement.**
- **Changes.**
- **Held by.**

> [!narration] First look
> %% Spoken, second person. Give the plain noun and its size against a hand, then material, wear and marks. Add one sense beyond sight and a visible sign of each hidden property. %%

## Play

%% The DM runs the Item from this section alone (ADR 0005). %%

### Properties

%% Write the full rules text in 2024 wording. Give the trigger and action cost, uses and recovery, range and targets, saves and damage, duration and limits. One to three sentences cover a simple Item. Add a sentient Item's mind here (scores, alignment, communication, senses, purpose and demands) and a growing Item's stages. For an artifact, add how it can be destroyed. %%

### In use

%% Give how it looks and sounds when used and the choice it gives its bearer. Then rule on the questions the Players will raise. %%

## Depth

%% DM only. Give where it came from and what it hides. %%

### History

%% Give its maker, past owners and contested claims, with the marks each left on the object. Link each page involved. %%

### Hidden truths

%% Give each hidden property or curse with how the Party can learn it. A curse gives its tell and trigger, its effect, how it deepens and the way out. %%

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
