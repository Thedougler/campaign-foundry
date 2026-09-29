---
type: Item
summary: "A brass lantern from Gullhook Lighthouse that can make shallow water and mud draw away for a minute."
sources: []
---

## At a glance

- **Kind.** Wondrous item.
- **Rarity.** Uncommon.
- **Attunement.** None.
- **Changes.** Whether water or mud blocks the Party's way.
- **Held by.** The Party, lent by [[Hobb Tarrow]]. It belongs to [[Gullhook Lighthouse]].

> [!narration] First look
> The lantern is brass, about the size of your forearm, with a thick glass window and a ring handle worn smooth. Green verdigris covers the hinge. The metal is cold to the touch even beside a flame. When you hold it close to your ear you hear the faint sound of water going out through a pipe. A thin white line runs around the glass at the height of a hand.

## Play

### Properties

While lit, the lantern sheds Bright Light in a 30-foot radius and Dim Light for an additional 30 feet. It burns for 8 hours on one flask of oil.

The lantern has 3 charges. It regains 1d3 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the lantern goes dark and never works again.

### In use

As a Magic action, you can expend 1 charge to cause the water and mud in a 10-foot-radius, 10-foot-tall Cylinder to draw away from a point you can see within 30 feet. The point must be in or on water no deeper than 10 feet. It may instead be on mud, silt or marsh. The area becomes firm ground for 1 minute. It is not [[Bog Ground]] while the effect lasts, and creatures within the area are no longer submerged. Water returns when the effect ends, and any creature still in the area is pushed to the nearest unoccupied space.

## Depth

### History

A lantern-wright of Saltwick crafted it in 88 CY for the first keeper of [[Gullhook Lighthouse]], so that the keeper could walk the mud banks and free grounded boats. It has stayed on its hook in the keeper's room ever since.

### Hidden truths

- The lantern was made with water taken from the Long Ebb, and it shows its charges faintly brighter on the six days of an Ebb. The Party can learn this by testing it during an Ebb, or from the keeper's log at the lighthouse.

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
