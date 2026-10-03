---
type: Creature
summary: "A Whip Shark creature (CR 8) used as a controller in The Shattered Sea."
sources:
 - "archive/whip-shark.md"
---

## At a glance

- **Role at the table.** It clears decks, snaring one creature in its tail and hauling it overboard while its bite opens the hull.
- **Threat.** CR 8, with a bite that crushes hulls and a tail that reaches thirty feet.
- **Tell.** The coils along its flank cinch tighter a heartbeat before the tail snaps out.
- **Weak to.** Shallow water, where its bulk crawls ten feet a round. Party members who spread wide also strain it, since each tail holds only one captive.
- **Used by.** [[Leviathan]] patrols the same territory.

> [!narration] First sight
> A shark longer than any fishing boat rests in the shallows, its tail wound into tight coils against its flank. Slowly the broad head swings from one side to the other across the water, and the whole body holds its ground. Along the flank the coiled tail stands out in ridges, and water slaps at each one as it flexes. Then the coil pulls a little tighter, and the shark waits with its jaws just under the water.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Whip Shark"
size: Gargantuan
type: beast
alignment: unaligned
ac: 16
hp: 203
hit_dice: "14d20 + 56"
speed: "10 ft., swim 60 ft."
stats: [24, 12, 19, 3, 12, 5]
saves:
  - constitution: 7
skillsaves:
  - perception: 7
senses: "Blindsight 60 ft., passive Perception 17"
languages: "none"
cr: "8"
traits:
  - name: "Amphibious"
    desc: "The Whip Shark can breathe air and water."
  - name: "Blood Scent"
    desc: "The Whip Shark has Advantage on Wisdom (Perception) checks that rely on smell, and it can pinpoint the location of a wounded creature within 1 mile if the creature is in the same body of water."
  - name: "Hull Breaker"
    desc: "The Whip Shark deals double damage to objects and structures with its Bite."
actions:
  - name: "Multiattack"
    desc: "The Whip Shark makes one Bite attack and one Tail Lash attack."
  - name: "Bite"
    desc: "Melee Attack Roll: +10, reach 10 ft. Hit: 22 (3d10 + 6) Piercing damage."
  - name: "Tail Lash"
    desc: "Melee Attack Roll: +10, reach 30 ft. Hit: 17 (2d10 + 6) Bludgeoning damage. If the target is Large or smaller, it has the Grappled condition (escape DC 18). The Whip Shark can have only one creature Grappled by this attack at a time."
  - name: "Tail Snare (Recharge 5–6)"
    desc: "The Whip Shark's tail coils visibly before it strikes. Dexterity Saving Throw: DC 18, one creature within 60 feet. Failure: 22 (4d10) Bludgeoning damage, and the target has the Grappled condition (escape DC 18). The Whip Shark pulls the target up to 30 feet toward itself. If the target is on a vessel, it falls overboard when the pull reaches the vessel's edge. Success: Half damage only."
```

## Play

### Tactics

It hunts from open water, sniffing out a wounded creature a mile off through the same water and snaring one victim to drag overboard while its bite works the hull. Show the cinching coils before every snare, and let spacing, cover, and focused fire carry the answer. It breaks off when its wounds mount or the water stops favouring it.

### Outside a fight

Crush-bitten planks on beached hulls are the warning a Party learns to read. It keeps to the waters that favour it and does not chase prey onto land, where it can only crawl.

## Depth

### Ecology

An amphibious beast of the World's shallows, it takes the prey that bleeds into its waters. Reading its signs calls for Wisdom (Survival).

### Hidden truths

The bite-marks on a wrecked hull tell of its habits, and a successful Intelligence check made with the right skill confirms that its scent finds the wounded a mile away in shared water.

## Links

Related page, [[Leviathan]].

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
