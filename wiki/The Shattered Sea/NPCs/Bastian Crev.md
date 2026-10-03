---
type: NPC
summary: "Lizardfolk salvage-hand who rose to captain the Loud Argument in Fisk's Fleet; his fate after the fleet sank is not recorded."
sources:
 - "archive/ssw-lizardfolk.md"
creature: ""
---

## At a glance

- **Role.** Captain of the [[Loud Argument]] in [[Fisk's Fleet]], and a [[Lizardfolk|lizardfolk]].
- **Wants.**
- **Voice.**
- **Found at.** None recorded. The fleet sank over the [[Drowned Maw]].

> [!narration] First look
> A lizardfolk fills the cabin door, broad through the shoulders, hide scored where hull planking has been across it. He takes the room in once, then looks at you. "You want the captain. That's me."

## Play

- **Opens them up.**
- **Shuts them down.**
- **Will share.**
- **Will not share.**
- **If pressed.**

## Depth

### History

Bastian Crev came up through salvage work before Fisk gave him a command. Crev is a use-name, the kind of tool the lizardfolk take from whatever culture they work in. He sailed the [[Loud Argument]] as one of Fisk's five ships that stole the [[Pearl of Souls]] from Umberlee's shrine on Vel-Orn. The fleet sank over the [[Drowned Maw]] when Umberlee struck it, and the record is silent on what became of Crev.

### Threads

- [[Bring the Pearl of Souls to Umberlee]], the debt the fleet's sinking left behind.

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
