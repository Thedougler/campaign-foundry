---
type: Creature
summary: "Geoffrey Draves, a unique Creature stat block from the archived NPC record."
sources:
 - "archive/geoffrey-draves.md"
---

## At a glance

- **Role at the table.** A Creature profile for the unique NPC Geoffrey Draves, whose shipboard expertise supports other characters.
- **Threat.** The stat block below preserves Geoffrey's archived CR of 1/8.
- **Tell.** Geoffrey's cutlass attack is visible as he prepares to strike.
- **Weak to.** See Tactics for countering Geoffrey with positioning, focused fire and cover.
- **Used by.** Geoffrey Draves is the NPC represented here.

> [!narration] First sight
> The Creature's distinctive silhouette and signature tell are apparent before it attacks.

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
    desc: "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage."
```

## Play

### Tactics

Use Geoffrey's archived tactics alongside his cutlass and shipboard abilities. Show the Party his strongest option before he commits, allowing a response through position, cover or focused fire. Geoffrey withdraws when his objective is lost or his advantage is gone.

### Outside a fight

Geoffrey's appearance, habitual behaviour and traces can identify him before the Party meets him. Keep his actions consistent with his NPC role and habitat. His service aboard the HCS Surety informs that portrayal.

## Depth

### Ecology

Geoffrey's habitat and diet remain those of his archived NPC record, as do his identifying signs. Wisdom (Survival) allows observant travellers to recognise the signs of his activity.

### Hidden truths

Geoffrey's archived account records his history and motives kept from others. Examination or questioning about relevant matters can reveal either.

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
