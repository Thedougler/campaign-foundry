---
type: Creature
summary: "A storm-gap singer of the Ashwalls, filed under weather until someone follows the wrong sound inland."
sources:
 - "archive/ssw-ashwall-islands.md"
---

## At a glance

- **Role at the table.** Crews sheltering in the channels hear singing where no singer should be, and the ones who follow it inland are the reason the stories survive.
- **Tell.** Voices in the storm gaps that do not match the wind's direction.
- **Used by.** The [[Ashwall Islands]] storm gaps.

> [!narration] First sight
> Wind fills the channel with one long note, and under it carries another sound, a voice singing where no ship could lie. The spray drives one way and the singing holds another course. It is a clear, patient sound, and it comes from inland, up the black stone.

## Statblock

## Play

### Outside a fight

Most pilots file the stories under weather. The stories keep coming back, because the voice comes from inland and goes on after the wind drops.

## Depth

### Ecology

They are told of in the storm gaps of the Ashwall channels, by crews who sheltered there in high wind. What waits inland at the top of the black stone is the part the stories do not agree on.

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
