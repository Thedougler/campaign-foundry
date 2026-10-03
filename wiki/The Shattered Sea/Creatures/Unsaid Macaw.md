---
type: Creature
summary: "A macaw that echoes surface thoughts and can briefly compel a truthful sentence."
sources:
 - "archive/unsaid-macaw.md"
---

![[Unsaid Macaw - Portrait.jpg]]

## At a glance

- **Role at the table.** Social hazard.
- **Threat.** CR 0. It repeats foremost thoughts aloud in the thinker's own voice.
- **Tell.** A familiar voice from the branch, and a beak still working through the words.
- **Weak to.** Three hit points, ended by the first stone thrown its way.
- **Used by.** [[Vine Lash]] patrols the same territory.

> [!narration] First sight
> A macaw flutters down from the canopy and lands on a low branch ahead, head tipped toward you. Then its beak opens, and a companion's voice pours out while every mouth among you stays still. The macaw's throat keeps working through every word, and the bird sits there with its head cocked, waiting.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Unsaid Macaw"
size: Small
type: beast
alignment: unaligned
ac: 12
hp: 3
hit_dice: "1d6"
speed: "10 ft., fly 50 ft."
stats: [2, 14, 10, 3, 12, 8]
senses: "passive Perception 11"
languages: "none"
cr: 0
traits:
  - name: "Surface Echo"
    desc: "The macaw repeats a nearby creature's foremost current thought in that creature's voice."
actions: []
```

## Play

### Tactics

It sits in reach and repeats whatever a character thinks loudest, in that character's voice, until the Party's half-formed plans start arguing among themselves, and kept close it can press one brief truthful sentence from a speaker.

### Outside a fight

It gives itself away by giving the Party away, its echoes of their own thoughts marking the ground as its own long before the bird is seen.

## Depth

### Ecology

It keeps to the canopy over the trails, and Observant travellers mark its ground with Wisdom (Survival) where voices travel wrong.

### Hidden truths

An Intelligence check reveals the compulsion, for the echo can squeeze one truthful sentence out of a speaker, and the warned Party weighs each word said beneath its branch.

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
