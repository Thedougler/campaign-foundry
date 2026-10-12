---
title: Quaal's Feather Token
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item.*

This object looks like a feather. Different types of feather tokens exist, each with a different single-use effect. The DM chooses the kind of token or determines it randomly by rolling on the Quaal's Feather Tokens table. The type of token determines its rarity.

#### Quaal's Feather Tokens

| | 1d100 |   |    Token  | |  Rarity  | |
| :-----: | :-----------: | :----------: |
| | 01-20 |  |   *Anchor* | | Uncommon | |
| | 21-35 |  |    *Bird*  | |   Rare   | |
| | 36-50 |   |    *Fan*  | | Uncommon | |
| | 51-65 | | *Swan Boat* | |   Rare   | |
| | 66-90 |  |    *Tree*  | | Uncommon | |
| | 91-00 |  |    *Whip*  | |   Rare   | |

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
