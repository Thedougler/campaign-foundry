---
type: NPC
summary: "One line."
sources: []
creature: ""
parent: "[[Ravenhold]]"
revealed: ""
title: ""
---

## At a glance

- **Role.** Text.
- **Wants.** Text.
- **Voice.** Text.
- **Found at.** Text.

> [!narration] First look
> Spoken text for the table.

## Play

- **Opens them up.** Text.
- **Shuts them down.** Text.
- **Will share.** Text.
- **Will not share.** Text.
- **If pressed.** Text.

## Depth

Text.

### History

Plain [[Ravenhold]], aliased [[Ravenhold|the keep]], with heading [[Ravenhold#Areas]], nested [[Ravenhold#Play#Areas]].
By path [[Aldermoor/Locations/Ravenhold]], with extension [[Ravenhold.md]], lowercase [[ravenhold]].
By title [[Nona Black-Jaw]] and by slug stem [[nona-black-jaw]], whose file is `nona-black-jaw.md`; by alias, [[Black-Jaw]].
Statblock embed: ![[Bandit Captain#Statblock]]
Image: ![[map.png]] and sized ![[map.png|300]] and by path ![[attachments/map.png]].
Same page: [[#Depth]], and a block reference [[Valid Links#^pointer]].

| Link | Note |
| ---- | ---- |
| [[Ravenhold\|the keep]] | escaped bar in a table |

This paragraph carries a block id. ^pointer

Code is ignored: `[[Nowhere]]` and the fence below.

```
[[Also Nowhere]]
```

%% [[Guidance Nowhere]] %%

### Hidden truths

Text.

### Threads

Text.

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
