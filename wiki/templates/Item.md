---
title: ""
type: Item
summary: ""
sources: []
revealed: "" # Campaign-bound. Set it per CONTEXT.md **Revealed**; a World-free page leaves it out.
---

%% Optional. Add `inspired_by: "<work>"` to the frontmatter only when the DM names what inspired this page. Root `AGENTS.md` **Sourcing** sets its use. %%

%% Optional. Include it when the Item has a render from `skill://visuals`: the bare embed below, named with the page's slug. %%

![[<slug>-render.webp]]

## Play

%% The DM runs the Item from this section alone (ADR 0005). Every Item page holds its Properties. A World-free page holds them, its frontmatter and its Links alone. %%

### Properties

%% Write the Item as a published 2024 entry. Open with its classification line in italics, ending on a full stop: category and any subtype, rarity, and attunement with any limit, as `*Wondrous Item (Tattoo), Very Rare (Requires Attunement).*`. Mundane gear and a plot object give their category alone. Follow it with one plain sentence on what the object is. Then give each mechanic its own paragraph, opening on its name in bold italics (`***Damage Resistance.***`). Give the trigger and action cost, uses and recovery, range and targets, saves and damage, duration and limits. A curse, a sentient Item's mind, a growing Item's stages and an artifact's destruction are named properties too. %%

### In use

%% Optional. Include it when a Campaign's play raises a question the rules text leaves open, or the DM asks for rulings. Give how it looks and sounds when used, then rule on each question. %%

## At a glance

%% Optional. Include it when the Item takes part in a Campaign's play. Give the DM a ten-second read, one line per bullet. Changes is the one choice it alters at the table. %%

- **Changes.**
- **Held by.** %% Optional. Add it when someone in the World holds the Item, linking the holder. %%

> [!narration] First look
> %% Optional. Include it when the Party will see the Item. Spoken, second person. Give the plain noun and its size against a hand, then material, wear and marks. Add one sense beyond sight and a visible sign of each hidden property. %%

## Depth

%% Optional. Include it when a Campaign gives the Item a past or keeps a property hidden from the Party. DM only. Give where it came from and what it hides. %%

### History

%% Give its maker, past owners and contested claims, with the marks each left on the object. Link each page involved. %%

### Hidden truths

%% Give each property the Party can't yet see, with its tell and how the Party can learn it. %%

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
