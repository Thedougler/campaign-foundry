---
type: Location
kind: Site
summary: "A stop on the Midchain run where a yard bell rings from shore and the hand behind it has never shown itself."
sources:
 - "archive/kalowe.md"
parent: "[[Midchain]]"
---

## At a glance

- **Draws the Party because.** A yard bell rings from Ashkevet's shore, and the hand behind it has never shown itself.
- **Danger.** Unmeasured. The bell is the only reported feature.

> [!narration] Entering
> Your boat finds the landing and the sound comes across the water again, a yard bell rung in steady strokes behind the rooftops. The landing shows empty stone, and the ringing goes on at its own pace while you look for the rope.

## Play

### Likely actions

- Go and find the rope, or whatever swings it.

## Depth

### History

The bell is the whole recorded history, and whatever rings it has never come to light.

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
