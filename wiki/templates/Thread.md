---
type: Thread
summary: ""
sources: []
status: ""
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Set `status` to active, dormant or resolved. Driven by links the Faction or NPC behind it. Stands at is where it is now. If nobody acts is the outcome its driver gets unopposed. %%

- **Driven by.**
- **Stands at.**
- **If nobody acts.**
- **Levers.**

## Play

%% Give how it shows up at the table. A Thread moves whether or not the Party engages. Shows up as gives the signs the Party meets. Next development gives the next step with its time or trigger and its sign, and what follows if the Party ignores it. Levers gives each thing the Party can pull and what it changes. Resolves when is the event that ends it. %%

- **Shows up as.**
- **Next development.**
- **Levers.**
- **Resolves when.**

## Depth

%% DM only. Give where it began and where it can go. %%

### Origin

%% Give the event that started it, linked to its Recap or Lore. %%

### Hidden truths

%% Give each truth with how the Party can learn it. %%

### Possible endings

%% Write each outcome play can bring about as a condition, with the state of the World after it. A villain's plan keeps at least three live. %%

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
