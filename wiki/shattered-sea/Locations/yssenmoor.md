---
title: "Yssenmoor"
type: Location
kind: Site
summary: "Ordinary wetland marsh, foggy some days and clear on others, that Sir Quackers the Fowl guards."
sources:
  - "archive/collab-2026-10-13-sir-quackers.md"
parent: ""
revealed: ""
---

> [!narration] Entering
> The water takes your boots to the ankle, and it's cold. Mud gives under every step. Reeds stand head-high on both sides and lean together wherever the wind finds them, and the air smells of wet peat and green rot. Somewhere out in the reeds a duck calls once, and nothing answers it. Ahead, about thirty feet on, the water gives way to a hummock of firm grass, the only dry footing in sight.

## Areas

The marsh is one open space with one keeper. A Party comes here to cross it or camp in it, and a Party that gives the duck honest answers can gain a strange ally.

==Every duck in the reeds stops calling at once, and then something big hits the water ahead of you hard enough to rock the reeds. "Name. Business. And are you leaving my marsh the way you found it?"==

Anyone can wade in from any side, and nothing blocks the way. Water is ankle-deep to knee-deep, with firm hummocks of grass between the pools, and the reeds hide whatever stands on the far side of them. The weather is normal for a marsh, foggy on some days and clear on others, and nothing about the sound or the light is unnatural. The only danger here is the one who guards it.

[[sir-quackers-the-fowl|Sir Quackers the Fowl]] finds every stranger who comes in and stops them. He asks for a name, a business and a promise to leave the marsh the way it was found, and he waits for a proper answer. The marsh has no maze, trap or hidden door. Hummocks of firm ground are the best spots to stand, camp or talk. The way out is the way in.

## Occupants

- **[[sir-quackers-the-fowl|Sir Quackers the Fowl]].** He is anywhere in the marsh, and he finds strangers before they find him. He seeks a true answer to his three questions. He offers leave to go or to stay to anyone who gives one, and may offer more to a Party he has come to trust: healing, restoration or his blade. He answers a lie by hearing it and a threat to the marsh by fighting. If a Party ignores him, he steps into its path and asks again, then blocks it. If he dies, he reforms a day later somewhere in Yssenmoor.

## History

[[sir-quackers-the-fowl|Sir Quackers the Fowl]] was a wizard's duck familiar. The wizard left him here when he freed him, and he has stayed since, taking the title Blade of the Wetlands and the job of guarding the place his master left him. Nothing else is known of the marsh before him.

## Hidden truths

A powerful ley line crosses the marsh, and over time it changed Quackers into Sir Quackers. Whether his old master knew that it would is open. Clue: *Detect Magic* or a like sense shows a strong aura across the whole marsh, and it comes from no one spot. Area: anywhere in the marsh.

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
