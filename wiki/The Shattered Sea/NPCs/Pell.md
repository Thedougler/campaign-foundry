---
type: NPC
summary: "A gnome enslaved as a labourer at Sorn, killed in the reprisal after Jean-Claude freed slaves."
sources:
 - "archive/ssw-midchain.md"
 - "archive/ssw-grung.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Gnome labourer enslaved at Sorn.
- **Wants.**
- **Voice.** He spoke to [[Jean-Claude Tabarnack]] as though Jean-Claude were already familiar to him.
- **Found at.** Sorn before his death.

> [!narration] First look
> At Sorn, a gnome labourer speaks to Jean-Claude with the familiarity of someone who has met him before.

## Play

Use the First look only for a remembered meeting before Pell's death.

- **Opens them up.**
- **Shuts them down.**
- **Will share.**
- **Will not share.**
- **If pressed.**

## Depth

### History

Pell worked as an enslaved labourer at Sorn. [[Simone Tabarnack]] reported him and [[Jean-Claude Tabarnack]]. Jean-Claude freed slaves, and Pell died in the reprisal. His death drove Jean-Claude to flee the Grung.

### Threads

His death lies behind [[Simone's Hunters]].

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
