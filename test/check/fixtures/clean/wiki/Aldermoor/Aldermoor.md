---
type: World
summary: "A river country on the edge of the Ashen Reach."
sources: []
---

## At a glance

- **Tone.** Grim and warm.
- **Magic and technology.** Text.
- **Era.** Text.
- **Powers.** The [[Ember Court]] and the god [[Orsa]].
- **Table promise.** Text.

> [!narration] The World
> Spoken text for the table.

## Calendar

| Month | Days | Season or note |
| ----- | ---- | -------------- |
|       |      |                |

## Depth

Text.

### Cosmology

Lore: [[Crown Fire]]. Rules: [[Old Crossing Rules]]. Region: [[Ashen Reach]]. Campaign: [[Ashes of the Crown]].

### History in brief

The Crown burned in a night.

### Hidden truths

The Lantern remembers: [[Ashen Lantern]], [[Cinder Ward]], [[Gull's Errand]].

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
