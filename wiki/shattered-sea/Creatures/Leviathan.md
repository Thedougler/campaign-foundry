---
type: Creature
summary: "A named elemental horror that hunts the open water around the Drowned Maw."
sources:
 - "archive/leviathan.md"
 - "archive/ssw-what-sunk-the-vestra.md"
---

## At a glance

- **Role at the table.** A bruiser that crushes and drags.
- **Threat.** CR 17, with a bite that spans fifteen feet and a coil that spans twenty.
- **Tell.** A ring of churning water that travels with it across flat sea.
- **Weak to.** Dry land, where its pace drops from sixty feet of swim to twenty of crawl.
- **Used by.** [[Bloodhawk]] patrols the same territory.

> [!narration] First sight
> Where the sea lies open, a patch of water begins to churn and boil over a long dark bulk. Steam lifts off the foam, and a back the length of a longboat rolls through the middle of it, sleek and dark. The rough water keeps pace with the bulk in a moving ring, and the sea outside it is calm. Then the back settles, the ring slows with it, and the leviathan goes on turning below, wide and slow.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Leviathan"
size: Gargantuan
type: elemental
alignment: unaligned
ac: 19 (natural armor)
hp: 314
hit_dice: "17d20 + 136"
speed: "20 ft., swim 60 ft."
stats: [26, 14, 26, 6, 16, 10]
saves:
  - Dex: +8
  - Con: +14
  - Wis: +9
skillsaves:
  - perception: 9
damage_resistances: "lightning; bludgeoning, piercing, and slashing from nonmagical attacks"
damage_immunities: "cold"
condition_immunities: "blinded, exhaustion, frightened, prone"
senses: "blindsight 120 ft. (blind beyond this radius), passive Perception 19"
languages: "understands Aquan but can't speak"
cr: "17"
traits:
  - name: "Amphibious"
    desc: "The Leviathan can breathe air and water."
  - name: "Turbulent Wake"
    desc: "While the Leviathan is within 30 feet of the surface, the water around it churns and boils, and the area within 15 feet of it is difficult terrain for Small or larger creatures."
actions:
  - name: "Multiattack"
    desc: "The Leviathan makes two attacks: one Bite and one Crushing Coil."
  - name: "Bite"
    desc: "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 34 (4d12 + 8) piercing damage."
  - name: "Crushing Coil"
    desc: "Melee Weapon Attack: +14 to hit, reach 20 ft., one creature. Hit: 30 (4d10 + 8) bludgeoning damage, and the target is grappled (escape DC 22). Until this grapple ends, the target is restrained, and the Leviathan can't use Crushing Coil on another target."
  - name: "Riftbolt (Recharge 5–6)"
    desc: "The Leviathan discharges planar lightning in a 90-foot line that is 5 feet wide. Each creature in that line must make a DC 16 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much damage on a successful one."
legendary_actions:
  - name: ""
    desc: "The Leviathan can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The Leviathan regains spent legendary actions at the start of its turn."
  - name: "Surge"
    desc: "The Leviathan moves up to half its speed without provoking opportunity attacks."
  - name: "Coil (Costs 2 Actions)"
    desc: "The Leviathan makes one Crushing Coil attack."
  - name: "Submerge Pulse"
    desc: "Each creature within 15 feet of the Leviathan must succeed on a DC 16 Strength saving throw or be knocked prone."
```

## Play

### Tactics

It strikes from below and leads with Riftbolt, a ninety-foot line of planar lightning, then Surge carries it in to close its coil around one swimmer while the bite takes another. Crowded, it brings Submerge Pulse down and puts swimmers on their backs, and it withdraws into depth when it loses the open water.

### Outside a fight

Rough water on a calm sea marks its patrol, and a party that reads the travelling ring early keeps to the shore side of the Drowned Maw's open water. It stays over deep water, where its advantages hold.

## Depth

### Ecology

Its range is the open water around the Drowned Maw, and it reads that whole sea through blindsight. Observant sailors pick its signs out with Wisdom (Survival).

### Hidden truths

Its habits repeat with its patrol, and a successful Intelligence check turns the pattern into its weaknesses.

The [[Pearl of Souls]] lies whole below the [[Red Lady]]'s decks, and the leviathan knows it is there. Its ring crosses the wreck on every circuit, and it has left the Pearl unclaimed. A boat that keeps station at the rim sees the beast pass over it each time. Where the beast learned of the Pearl, and why it lets it lie, are questions for [[What Sunk the Vestra]].

## Links

Related page, [[Bloodhawk]].

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
