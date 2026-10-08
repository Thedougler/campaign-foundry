---
type: Creature
summary: "An unarmored Dravosi Crown deck sailor, uncertain the moment a boarding turns strange and quick to follow illusions."
sources:
 - "archive/ssw-session-01.md"
---

## At a glance

- **Role at the table.** Deck filler for Crown boarding parties. It crowds a rail, and the first real fight kills it.
- **Threat.** CR 0 and four hit points apiece. They count by numbers, not quality.
- **Tell.** Boards in a pair, hesitating at anything that does not look like a deck.
- **Weak to.** Uncertainty. An illusion or a strong first blow turns them.
- **Used by.** [[Barnaby Rook]].

> [!narration] First sight
> Salt-stiff coats and no armour among them. They crowd the cutter's rail and go over the side one behind the other, eyes on their officer before every rung.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Dravosi Deckhand"
size: Medium
type: humanoid
subtype: human
alignment: neutral
ac: 10
ac_class: unarmored
hp: 4
hit_dice: "1d8 + 0"
speed: "30 ft."
stats: [10, 10, 10, 10, 10, 10]
saves: []
skillsaves: []
senses: "passive Perception 10"
languages: "Common"
cr: "0"
traits:
  - name: Training
    desc: "The deckhand has proficiency in one skill of the GM's choice and has Advantage whenever it makes an ability check using that skill."
actions:
  - name: Roped Boarding Pike
    desc: "Melee Attack Roll: +2, reach 5 ft. Hit: 2 (1d4) Piercing damage."
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

### Tactics

Deckhands board in numbers and keep to whatever rail or hatch they are pointed at. In the Saltwright's hold they came down uncertain and followed an illusory doorway because their officer did. None came back.

### Outside a fight

They row, haul and repair under Crown officers. Four of them died in the Saltwright boarding, and the Crown replaced them without ceremony.

## Depth

### Ecology

Deckhands are Dravosi sailors serving Crown cutters, drawn from the same pressed decks as [[Geoffrey Draves]], who served as one aboard the Surety before he defected.

### History

The Saltwright boarding at Session 1 killed four: two behind Perrin Black-Jaw's illusory doorway with Cap'n Gorgeous, and two more when the Party cleared the deck above the Saltwright's hold.

### Hidden truths

- Rook ran his deck crews underpaid on purpose. [[Geoffrey Draves]]'s wage arithmetic shows the practice. The Party can learn it from any Crown deckhand they turn.

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
