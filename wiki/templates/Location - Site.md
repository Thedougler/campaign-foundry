---
type: Location
kind: Site
summary: ""
sources: []
parent: ""
---

## At a glance

%% 3-5 facts. Hazards that cannot be carried belong to the Site. %%

- **Draws the Party because.**
- **Entrance.**
- **Occupants.**
- **Danger.**
- **Prize.**

> [!narration] Entering
> %% Spoken: what the Party perceives at the threshold, at body scale. Second person, present tense, ending on something they can use. %%

## Play

%% Run the Site from here. Key areas as ### with a one-line spoken cue each; hazards inline. %%

### Areas

### Hazards

### Occupants

%% Link NPCs and Creatures. Stat blocks are embedded only in the Encounter of the Scene where they are fought. %%

### Likely actions

## Depth

%% History that changes what the Party finds, hidden truths (each with the Clue that reveals it), Threads. %%

### History

### Hidden truths

### Threads

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
