---
title: ""
type: Location
kind: Site
summary: ""
sources: []
parent: "" # Campaign-bound. Link the containing Location; a World-free page leaves it out.
revealed: "" # Campaign-bound. Set it per CONTEXT.md **Revealed**; a World-free page leaves it out.
---

%% Optional. Add `inspired_by: "<work>"` to the frontmatter only when the DM names what inspired this page. Root `AGENTS.md` **Sourcing** sets its use. %%

%% Optional. Include it when the Site has a banner from `skill://visuals`: the bare embed below, named with the page's slug. %%

![[<slug>-banner.webp]]

> [!narration] Entering
> %% Optional. Include it when the Party will enter the Site. Spoken, second person, present tense. Give what the Party perceives at the threshold at body scale, and end on something they can use. %%

## Areas

%% Run the visit from here. When the Site sits in a Campaign's play, open on one line giving why the Party goes and what it can gain. Then give one entry per space, a paragraph each or a `###` heading each on a larger Site, in an order the DM can follow from the entrance. A one-space Site keeps one compact entry. The first entry gives how visitors arrive and what limits access now. Each entry opens with a Cue (`==…==`). Then give occupants and activity, usable objects, immediate danger, hidden answers and onward exits. A Site the Party may fight in opens Areas with its battle map, a bare `![[<slug>-battle-map.png]]` made by `skill://visuals`. %%

## Hazards

%% Optional. Include it when the Site holds a fixed hazard. Give each with its sign and trigger, its effect, and the ways the Party can answer it: counterplay, a way around or something they can learn or use. Any check or save gives its Cues (`==…==`) for success and for failure. %%

## Occupants

%% Optional. Include it when someone keeps or inhabits the Site. Link each. Give where they are and what they seek here. Then give their offer and how they answer the Party. If ignored, give their next act. Statblocks stay on the Creature and NPC pages, embedded by a Scene's Encounter. %%

## Likely actions

%% Optional. Include it when visitors can buy, learn, repair, cross or bargain over something here. Give each, and what changes when they do. %%

## Pressure

%% Optional. Include it for a Site explored under time. Give the starting clock and the triggers that advance it, the signs, and the consequence at each threshold. Add how the Party can change its pace. %%

## Rest

%% Optional. Include it for a Site explored under time. Give where the Party can shelter and who can find them there. Add what a rest costs in time and pressure, and what changes while they are away. %%

## History

%% Optional. Include it when the Site's past changes what the Party finds. DM only. Give the Site's original use and what disrupted it, and the traces that change what the Party finds. %%

## Hidden truths

%% Optional. Include it when the Site hides a truth the Party can learn. DM only. Give each truth with the Clue that reveals it, and the area where the Party finds that Clue. %%

## Threads

%% Optional. Include it when a Thread touches the Site. DM only. Link each Thread, with its next event and the time it comes. %%

## Links

%% Optional. Include it when the DM wants this page's backlinks listed here. %%

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Contains
    filters:
      and:
        - parent == this
    groupBy:
      property: note.kind
      direction: ASC
    order:
      - file.name
      - note.summary
  - type: table
    name: Linked from
    filters:
      and:
        - parent != this
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
