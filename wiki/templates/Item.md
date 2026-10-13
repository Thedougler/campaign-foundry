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

> [!narration] First look
> %% Optional. Include it when the Party will see or use the Item. Spoken, second person, per `skill://theatre-of-the-mind`: how it looks, and how it looks and sounds when used. %%

## Properties

%% The DM runs the Item from its properties alone (ADR 0005). Write the Item as a published 2024 entry.
Open with its classification line in italics, ending on a full stop: category and any subtype, rarity, and attunement with any limit, as `*Wondrous Item (Tattoo), Very Rare (Requires Attunement).*`. Mundane gear and a plot object give their category alone.
Follow it with one plain sentence on what the object is. Then give each mechanic its own paragraph, opening on its name in bold italics (`***Damage Resistance.***`). Give the trigger and action cost, uses and recovery, range and targets, saves and damage, duration and limits.
A curse, a sentient Item's mind, a growing Item's stages and an artifact's destruction are named properties too. Every Item page holds its Properties. A World-free page holds them and its frontmatter alone. %%

## Rulings

%% Optional. Include it when a Campaign's play raises a question the rules text leaves open, or the DM asks for rulings. DM only. Rule on each question play has raised. %%

## History

%% Optional. Include it when a Campaign gives the Item a past or a holder. DM only. Give its maker, its owners past and present and contested claims, with the marks each left on the object. Link each page involved, the current holder included. %%

## Hidden truths

%% Optional. Include it when the Item keeps a property hidden from the Party. DM only. Give each property the Party can't yet see, with its tell and how the Party can learn it. %%

## Links

%% Optional. Include it when the DM wants this page's backlinks listed here. %%

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
