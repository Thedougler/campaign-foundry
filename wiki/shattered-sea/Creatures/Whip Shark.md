---
type: Creature
summary: "A Whip Shark creature (CR 8) used as a controller in The Shattered Sea; the crew killed the one that struck the cutter through the night, and its barb, scales and three eggs went with them."
aliases:
 - "Whip-Shark"
sources:
 - "archive/whip-shark.md"
 - "archive/Session 03 - Recap.md"
 - "archive/ssw-whip-shark-barb.md"
 - "archive/ssw-session-03.md"
 - "archive/ssw-session-04-ingest-recap.md"
---

## At a glance

- **Role at the table.** It clears decks, snaring one creature in its tail and hauling it overboard while its bite opens the hull.
- **Threat.** CR 8, with a bite that crushes hulls and a tail that reaches thirty feet.
- **Tell.** The coils along its flank cinch tighter a heartbeat before the tail snaps out.
- **Weak to.** Shallow water, where its bulk crawls ten feet a round. Separation from the sea is the other weakness, and a Party spread wide strains it too, since one tail grapples only one captive at a time.
- **Used by.** [[Leviathan]] patrols the same territory.

> [!narration] First sight
> The hull booms under your feet, and the cutter shudders along her whole length as the strikes come again from below. Then it surfaces, a whip-shark as long as the cutter herself, and [[Crissdalynn Khinriss]]'s wind closes on its head and lifts its gills into the air while the crew go to work.

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

It strikes from open water, sniffing out a wounded creature a mile off through the same water and snaring one victim to drag overboard while its bite works the hull. Show the cinching coils before every snare, and let spacing, cover, and focused fire carry the answer. It breaks off when its wounds mount or the water stops favouring it.

### Outside a fight

Crush-bitten planks on beached hulls are the warning a Party learns to read. It keeps to the waters that favour it and does not chase prey onto land, where it can only crawl.

## Depth

### Ecology

An amphibious beast of the World's shallows, it takes the prey that bleeds into its waters. Reading its signs calls for Wisdom (Survival).

The one the Party met was a sixty-foot shark of the open sea. It struck the cutter's hull from below, returned during Perrin's watch, and kept coming back through the night until the crew killed it with [[Crissdalynn Khinriss]]'s wind pinning its head above the waves. The crew took three fertilised eggs from it, and its scales patched the cutter's hull. Its meat and teeth came ashore with the crew, and its four-foot barb is the [[Whip-Shark Barb]]. Traders prize whip-shark eggs as a delicacy, and fertilisation spoils the taste, so a fertilised clutch is a curiosity rather than a crop. A market vendor in [[Le Paludi]] still paid [[Jean-Claude Tabarnack]] 100 gp per egg for the three, 300 gp handed over in platinum, on her promise not to eat them.

### Hidden truths

- **The word Grow.** The vision that came to Perrin during the strikes placed him inside a sixty-foot body and left him the word "Grow" ([[Session 3 - Recap]]).
- The bite-marks on a wrecked hull tell of its habits, and a successful Intelligence check made with the right skill confirms that its scent finds the wounded a mile away in shared water.

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
