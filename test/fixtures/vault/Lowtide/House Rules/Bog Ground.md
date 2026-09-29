---
type: House Rule
summary: "Marsh mud and silt cost extra movement and can drop a runner on their face."
sources: []
---

## At a glance

- **Changes.** Extends Difficult Terrain in the 2024 rules with a fall risk for fast movement.
- **Applies to.** Every marsh, mud flat and silted floor in Lowtide that the DM marks as Bog Ground.
- **In one line.** Bog Ground is Difficult Terrain, and Dashing across it can knock you Prone.

## Play

Any marsh, mud flat or silt-covered floor that the DM declares to be Bog Ground counts as Difficult Terrain, and every foot of movement across it costs 1 extra foot.

When a creature takes the Dash action and moves across Bog Ground, it must succeed on a DC 10 Dexterity saving throw at the end of that movement or have the Prone condition. A creature wearing Heavy armor has Disadvantage on the save.

Boards, causeways, stone floors and firm ground are not Bog Ground. A creature with a Swim speed treats Bog Ground as if it were water and is not subject to the save.

## Depth

### Why

The Brack is the World's main danger for a Party that travels on foot. The rule gives terrain a cost without slowing every trip to a crawl, and it rewards Parties who plan a route over boards.

### Edge cases

- A creature that can't Dash, such as one with a speed of 0, never makes the save.
- The [[Ebb Lantern]] makes the area it affects firm ground for a minute, and the area is not Bog Ground while the effect lasts.
- [[Mire Drowner]] creatures ignore the extra movement cost through Mire Step but make the save if they Dash on land.

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
