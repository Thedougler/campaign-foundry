---
type: Vehicle
summary: ""
sources: []
---

## At a glance

%% 3-5 facts, six at most. Captain and Berth link their pages. %%

- **Kind.**
- **Size.**
- **Speed.**
- **Crew.**
- **Captain.**
- **Berth.**

> [!narration] First sight
> %% Spoken: the craft at its berth, how people get aboard, the features a PC can use. Second person. %%

## Play

%% Every number the craft needs, with crew stations. Link a Creature for each fighting crew member. %%

### Statistics

| Armor Class | Hit Points | Speed | Damage Threshold |
| ----------- | ---------- | ----- | ---------------- |
|             |            |       |                  |

### Crew and stations

### Components and weapons

### Underway

## Depth

%% History of the craft, hidden truths (each with how the Party can learn it). %%

### History

### Hidden truths

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
