---
type: World
summary: ""
sources: []
---

## At a glance

%% 3-5 facts a Player could be told in ten seconds. Tone first. %%

- **Tone.**
- **Magic and technology.**
- **Era.**
- **Powers.**
- **Table promise.**

> [!narration] The World
> %% Spoken pitch to the Players: what this World feels like, in second person, about 100 words. %%

## Calendar

%% The Calendar: months and lengths, weekdays, year numbering and its epoch, notable holidays. A table for months. %%

| Month | Days | Season or note |
| ----- | ---- | -------------- |
|       |      |                |

## Depth

%% Cosmology, the shape of history, what powers shape the World. Link Lore; do not retell it here. %%

### Cosmology

### History in brief

### Hidden truths

## Links

```base
filters:
  and:
    - file.inFolder(this.file.folder)
views:
  - type: table
    name: Regions
    filters:
      and:
        - 'note.type == "Location"'
        - 'note.kind == "Region"'
    order:
      - file.name
      - note.summary
  - type: table
    name: Campaigns
    filters:
      and:
        - 'note.type == "Campaign"'
    order:
      - file.name
      - note.summary
  - type: table
    name: House Rules
    filters:
      and:
        - 'note.type == "House Rule"'
    order:
      - file.name
      - note.summary
```
