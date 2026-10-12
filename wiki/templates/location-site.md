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

## At a glance

%% Give the DM a ten-second read, one line per bullet. Entrance gives how visitors arrive and what limits access now. Prize is what the Party can gain. %%

- **Draws the Party because.** %% Optional. Add it when the Site sits in a Campaign's play, giving the reason the Party goes. %%
- **Entrance.**
- **Occupants.** %% Optional. Add it when someone lives or keeps watch here, linking each. %%
- **Danger.**
- **Prize.**

> [!narration] Entering
> %% Optional. Include it when the Party will enter the Site. Spoken, second person, present tense. Give what the Party perceives at the threshold at body scale, and end on something they can use. %%

## Play

%% Run the visit from here. A one-space Site keeps one compact entry under Areas. %%

### Areas

%% Give one entry per space, a paragraph each or a `####` heading each on a larger Site, in an order the DM can follow from the entrance. Each entry opens with a Cue (`==…==`). Then give occupants and activity, usable objects, immediate danger, hidden answers and onward exits. A Site the Party may fight in opens Areas with its battle map, a bare `![[<slug>-battle-map.png]]` made by `skill://visuals`. %%

### Hazards

%% Give each fixed hazard with its sign and trigger, its effect, how the Party can counter or bypass it, and the leverage that helps. Any check or save gives its Cues (`==…==`) for success and for failure. %%

### Occupants

%% Link each keeper or inhabitant. Give where they are and what they seek here. Then give their offer and how they answer the Party. If ignored, give their next act. Stat blocks belong on Creature pages, embedded by a Scene's Encounter. %%

### Likely actions

%% Give what visitors can buy, learn, repair, cross or bargain over, and what changes when they do. %%

### Pressure

%% Use this for a Site explored under time. Give the starting clock and the triggers that advance it, the signs, and the consequence at each threshold. Add how the Party can change its pace. %%

### Rest

%% Use this for a Site explored under time. Give where the Party can shelter and who can find them there. Add what a rest costs in time and pressure, and what changes while they are away. %%

## Depth

%% Optional. Include it when the Site's past or secrets reach play. DM only. Give the Site's past and what it hides. %%

### History

%% Give the Site's original use and what disrupted it, and the traces that change what the Party finds. %%

### Hidden truths

%% Give each truth with the Clue that reveals it, and the area where the Party finds that Clue. %%

### Threads

%% Link each Thread that touches the Site, with its next event and the time it comes. %%

## Links

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
