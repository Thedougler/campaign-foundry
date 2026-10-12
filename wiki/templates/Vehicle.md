---
title: ""
type: Vehicle
summary: ""
sources: []
revealed: "" # Campaign-bound. Set it per CONTEXT.md **Revealed**; a World-free page leaves it out.
---

%% Optional. Add `inspired_by: "<work>"` to the frontmatter only when the DM names what inspired this page. Root `AGENTS.md` **Sourcing** sets its use. %%

%% Optional. Include it when the craft has a banner from `skill://visuals`: the bare embed below, named with the page's slug. %%

![[<slug>-banner.webp]]

## At a glance

%% Give the DM a ten-second read, one line per bullet. Speed gives each mode. Crew gives the minimum crew beside the crew aboard now. %%

- **Kind.**
- **Size.**
- **Speed.**
- **Crew.**
- **Captain.** %% Optional. Add it when someone in the World commands the craft, linking their page. %%
- **Berth.** %% Optional. Add it when the craft has a home port or yard in the World, linking it. %%

> [!narration] First sight
> %% Optional. Include it when the Party will see the craft. Spoken, second person, per `skill://theatre-of-the-mind`. %%

## Play

%% Give everything a chase, a boarding or a stowaway's sneak needs, from the craft's 2024 class. %%

### Statistics

%% Give Armor Class, Hit Points and Damage Threshold for each component (hull, control, movement, weapons). Add speed by mode, passengers and cargo. %%

| Armor Class | Hit Points | Speed | Damage Threshold |
| ----------- | ---------- | ----- | ---------------- |
|             |            |       |                  |

### Crew and stations

%% Give each station with who works it now, and what happens when it goes unattended. Link a Creature for each fighting crew member. %%

### Components and weapons

%% Give each weapon's attack and damage, and what fails when a component drops. %%

### Underway

%% Give its current errand (route, cargo or orders) and what it does on meeting the Party. Give the manoeuvres or conditions that change a choice. Then give how a chase and a boarding run, and the decks or areas they move through at body scale. %%

## Depth

%% Optional. Include it when the craft has a past in a World or hides something. DM only. Give the craft's past and what it hides. %%

### History

%% Give its owners and voyages, and the damage still visible on the hull. %%

### Hidden truths

%% Give each truth with how the Party can learn it. %%

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
