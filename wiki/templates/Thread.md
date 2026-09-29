---
type: Thread
summary: ""
sources: []
status: ""
---

## At a glance

%% 3-5 facts. status is active, dormant or resolved. %%

- **Driven by.**
- **Stands at.**
- **If nobody acts.**
- **Levers.**

## Play

%% How it shows up at the table, and what the Party can pull. A Thread moves whether or not the Party engages. %%

- **Shows up as.**
- **Next development.**
- **Levers.**
- **Resolves when.**

## Depth

%% Origin, hidden truths (each with how the Party can learn it), how it could end. %%

### Origin

### Hidden truths

### Possible endings

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
