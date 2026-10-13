---
title: ""
type: Location
kind: Region
summary: ""
sources: []
parent: "" # Campaign-bound. Link the containing Location, or leave it blank on a top-level Region; a World-free page leaves it out.
revealed: "" # Campaign-bound. Set it per CONTEXT.md **Revealed**; a World-free page leaves it out.
---

%% Optional. Add `inspired_by: "<work>"` to the frontmatter only when the DM names what inspired this page. Root `AGENTS.md` **Sourcing** sets its use. %%

%% Optional. Include each when the Region has a banner or a map from `skill://visuals`: the bare embeds below, named with the page's slug. %%

![[<slug>-banner.webp]]

![[<slug>-map.webp]]

> [!narration] Arrival
> %% Optional. Include it when the Party will travel into the Region. Spoken, second person, present tense. Show the country as a traveller first meets it and the one feature that sets it apart. %%

## Travel

%% Give what the Party does here, at the scale of the travel asked for, keeping to what changes a travel choice. The `summary` property gives what sets the land apart. Give at least two routes where the geography allows. Each route gives its endpoints and mode with its time and cost. Add the supplies it needs and its warning signs. Add landmarks with their uses, and named stops for rest and supply. Uncertain navigation gives its 2024 check and DC with the cost of failure. %%

## Places

%% Optional. Include it when the Region has child Locations. Link each, with the reason to go and the route that leads there. %%

## Powers

%% Optional. Include it when a power acts here. Link each. Give what it controls and seeks here, its next move with its timing, and the signs of that move along the routes. %%

## Travel events

%% Optional. Include it when the Party will travel through the Region. Give a d6 table of travellers, Creatures, Factions and weather or terrain events from this Region, each linked. Each result gives its sign and current activity, a possible interaction, and the outcome if the Party ignores it. %%

## Rumors

%% Optional. Include it when travellers carry claims the Party can test. Give each rumour as spoken, with the DM's truth and a way for the Party to check it. %%

## History

%% Optional. Include it when past events still decide routes, borders or powers. DM only. Give those events. %%

## Hidden truths

%% Optional. Include it when the Region hides a truth the Party can learn. DM only. Give each truth with the Clue that reveals it, and the route or Location where the Party finds that Clue. %%

## Threads

%% Optional. Include it when a Thread touches the Region. DM only. Link each Thread, with what it changes here. %%

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
