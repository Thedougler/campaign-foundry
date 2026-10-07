---
type: Faction
summary: ""
sources: []
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Goal is the change they seek and for whom. Next move is their action if nobody stops them. Led by links the leader's NPC page. Strength gives their numbers and the force they can bring. %%

- **Goal.**
- **Next move.**
- **Led by.**
- **Base.**
- **Strength.**

> [!narration] Public face
> %% Spoken, second person. Show how the Party first meets them at work and how members look and carry themselves. Add their custom and a sign a bystander could spot, and end on the name people use for them. %%

## Play

%% Give the World's response each time the Party meets them, one line per bullet. Faces links the two or three members the Party deals with, each with a goal of their own the Faction lacks. Offers gives the offerer and the pay, then the catch. Rank and file the Party could fight get a count and a linked Creature. %%

- **Faces.**
- **When met.**
- **When opposed.**
- **When ignored.**
- **Offers.**
- **Costs.**
- **How to notice or interfere.**

## Depth

%% DM only. Give their past and their rifts, and the secrets that change a deal. %%

### History

%% Give their origin and the events that made them what they are now. Link the Locations and people involved. %%

### Fracture

%% Give the rift inside the Faction that the Party could widen or heal, and who stands on each side. %%

### Hidden truths

%% Give each truth that changes a deal once learned, with three Clues of different kinds. A person who talks, a thing to see or take, and a place to visit make one such set. %%

### Agenda

%% Use this with no active Campaign. Give three to five milestones. Each has a time and a sign the Party could notice first, and changes one fact. In a Campaign the agenda belongs on a Thread, linked under Threads. %%

### Threads

%% Link each Thread they drive, with the lever it gives the Party. %%

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
