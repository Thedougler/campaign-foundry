---
type: Location
kind: Settlement
summary: "The sea elves' primary settlement in the Shattered Sea and the seat of
  their worship of Deep Sashelas."
sources:
  - "archive/ssw-sea-elf.md"
  - "archive/ssw-midchain.md"
  - "archive/ssw-umberlee.md"
parent: "[[Midchain]]"
revealed: ""
title: ""
---

## At a glance

- **Size.**
- **Ruled by.**
- **Mood.**
- **Unsettled by.**
- **Known for.** The [[Sea Elf|sea elves]]' primary settlement, built into Teikhinos Reef and invisible from above the water, and the seat of their worship of [[Deep Sashelas]].

> [!narration] Arrival
> Beneath the water, a settlement stands within the reef around you.

## Play

### Districts

The settlement is built into Teikhinos Reef, concealed from ships passing overhead.

Use the Arrival callout for an underwater approach.

## Depth

### History

The settlement predates every colonial record. The folk predate [[Umberlee]]'s claim on the sea as well, and do not acknowledge it. [[Coralyra Dranra]], sorcerer and bard of the [[Sea Elf|sea elves]], held the title of Aoidos here before she exiled herself.

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
