---
type: Creature
summary: "Geoffrey Draves, the crew's carpenter — a background crew stat block useful for his ship's hand, not his cutlass."
sources:
 - "archive/geoffrey-draves.md"
 - "archive/ssw-geoffrey-draves.md"
---

## At a glance

- **Role at the table.** Background crew in boarding actions; his value is carpentry, not combat.
- **Threat.** CR 1/8. A cutlass and sea legs. He fights only because Crown boarding duty made him.
- **Tell.** He reads a hull before a fight: which seams need work now, which can wait a week.
- **Weak to.** Anything that turns a fight. He dropped his sword once already when it did.
- **Used by.** [[Geoffrey Draves]], crew carpenter aboard [[Uncertainty]].

> [!narration] First sight
> A lean young sailor holds his cutlass like a tool he was issued, not one he chose. When the deck lurches he doesn't, and his eyes have already found the plank that will fail.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Geoffrey Draves"
size: Medium
type: humanoid
subtype: human
alignment: neutral
ac: 13
hp: 11
hit_dice: 2d8+2
speed: "30 ft."
stats: [11, 13, 12, 12, 10, 8]
skillsaves:
  - athletics: 2
  - perception: 2
senses: "passive Perception 12"
languages: "Common"
cr: 1/8
traits:
  - name: Sea Legs
    desc: "Difficult terrain caused by ship movement, waves, or wet deck does not cost Geoffrey extra movement."
  - name: Ship's Hand
    desc: "Geoffrey is proficient with navigator's tools and knows the Midchain shipping lanes, inspection procedures, and cargo manifests from his time on the HCS Surety. When assisting a creature making a check related to navigation, rigging, repairs, or maritime law, he grants advantage rather than the normal +2 from the Help action."
actions:
  - name: Cutlass
    desc: "Melee Attack Roll: +3, reach 5 ft. Hit: 4 (1d6 + 1) Slashing damage."
```

## Play

### Tactics

He is a carpenter first, second, and third. The cutlass is a byproduct of Crown boarding duties, not combat training. Use him as background crew in boarding actions, useful for his carpentry, not as a combat threat.

### Outside a fight

He reads a hull the way a good medic reads a patient. Ask him what the ship needs and he names what wants attention this week and what can ride to the next port. He does the repairs himself when the ship carries the materials and the crossing leaves him the time.

## Depth

### Ecology

A Dravosi human of the Crown service, raised to the sea by his father's connections rather than by calling. His knowing the Midchain lanes, inspection procedures, and cargo manifests comes from his time on the HCS Surety.

### Hidden truths

His Ship's Hand trait hides the depth of his Crown training: he knows Midchain inspection procedures and cargo manifests from the inside, and grants advantage rather than a token +2 when he helps. The Party sees this the first time he walks them through what a Crown inspector will ask for. What he will not explain is why a man this good at the work was on that side of the gangplank.

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
