---
type: World
summary: ""
sources: []
---

## At a glance

%% Give what a Player could be told in ten seconds, one line per bullet. Tone comes first. Powers links the Factions and Deities that rule the World. Table promise is what the Players will get to do. %%

- **Tone.**
- **Magic and technology.**
- **Era.**
- **Powers.**
- **Table promise.**

> [!narration] The World
> %% Spoken pitch to the Players, second person, about 100 words. Give what this World feels like, and end on the promise of what they will do. %%

## Calendar

%% Give the months with their lengths and the weekdays. Add year numbering with its epoch, and the holidays people keep. Use a table for the months. %%

| Month | Days | Season or note |
| ----- | ---- | -------------- |
|       |      |                |

## Depth

%% DM only. Give the World's large structure. Link Lore pages for each story and keep the full account there. %%

### Cosmology

%% Give the planes, gods and forces as the World arranges them. %%

### History in brief

%% Give the eras the present still feels, each linked to its Lore. %%

### Hidden truths

%% Give each truth with how the Party can learn it. %%

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
