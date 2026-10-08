---
type: Vehicle
summary: ""
sources: []
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Speed gives each mode. Crew gives the minimum crew beside the crew aboard now. Captain and Berth link their pages. %%

- **Kind.**
- **Size.**
- **Speed.**
- **Crew.**
- **Captain.**
- **Berth.**

> [!narration] First sight
> %% Spoken, second person. Give size and silhouette and how the craft rides in the water or on the road. Show where a boat comes alongside or a climber gets up. Add one sense beyond sight, and the visible signs of the hold and the quirk. %%

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

%% Give its current errand (route, cargo or orders) and what it does on meeting the Party. Give two to four manoeuvres or conditions that change a choice. Then give how a chase and a boarding run, and three to five decks or areas at body scale. %%

## Depth

%% DM only. Give the craft's past and what it hides. %%

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
