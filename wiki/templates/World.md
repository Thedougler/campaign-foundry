---
title: ""
type: World
summary: ""
sources: []
revealed: ""
---

> [!narration] The World
> %% Optional. Include it when the DM pitches the World to the Players. Spoken pitch, second person, about 100 words. Give what this World feels like, and end on the promise of what they will do. %%

## Player pitch

%% Give what a Player could be told in a minute, one line per bullet. Tone comes first. Powers links the Factions and Deities that rule the World. Table promise is what the Players will get to do. %%

- **Tone.**
- **Magic and technology.**
- **Era.**
- **Powers.**
- **Table promise.**

## Calendar

%% Optional. Include it when the World keeps its own calendar. Give the months with their lengths and the weekdays. Add year numbering with its epoch, and the holidays people keep. Use a table for the months. %%

| Month | Days | Season or note |
| ----- | ---- | -------------- |
|       |      |                |

## Cosmology

%% Optional. Include it when the World's planes, gods and forces reach play. DM only. Give them as the World arranges them. Link Lore pages for each story and keep the full account there. %%

## History in brief

%% Optional. Include it when past eras still shape the present. DM only. Give the eras the present still feels, each linked to its Lore. %%

## Hidden truths

%% Optional. Include it when the World hides a truth the Party can learn. DM only. Give each truth with how the Party can learn it. %%

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
