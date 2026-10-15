---
title: "Halythion"
type: Location
kind: Settlement
summary: "An ancient sea elf city concealed in Teikhinos Reef, outside colonial surveys and devoted to Deep Sashelas."
sources:
  - "archive/ssw-sea-elf.md"
  - "archive/ssw-midchain.md"
  - "archive/ssw-umberlee.md"
  - "archive/agentic-co-dm-Midchain.md"
parent: "[[midchain|Midchain]]"
revealed: ""
---

> [!narration] Arrival
> Beneath the water, a settlement stands within the reef around you.

## Districts

Halythion is built into Teikhinos Reef beneath the eastern [[midchain|Midchain]]. It is invisible from ships passing above and absent from colonial surveys. The [[sea-elf|sea elves]]' primary settlement is also the seat of their worship of [[deep-sashelas|Deep Sashelas]].

Its entrance, depth, internal districts and approach route remain unknown. No ruler, population count or visitor arrangements are established.

## History

Halythion predates every colonial record. Its people also predate [[umberlee|Umberlee]]'s claim on the sea and do not acknowledge it. [[coralyra-dranra|Coralyra Dranra]], sorcerer and bard of the [[sea-elf|sea elves]], held the title of Aoidos here before she exiled herself.

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
