---
type: Creature
summary: "A Crown Squid creature (CR 17) used as a controller in The Shattered Sea."
sources:
 - "archive/crown-squid.md"
---

![[Crown Squid - Portrait.jpg]]

## At a glance

- **Role at the table.** Controller. It hooks its prey from a distance and holds each catch at the end of a line while the arms close.
- **Threat.** CR 17. Its hook-tipped lines reach 80 feet, four catches can hang at once, and each Reel hauls a creature 30 feet closer.
- **Tell.** The hooked arm goes still above the gap, and all eight eyes settle on one spot before the line shoots.
- **Weak to.** Cover, terrain, and breaking its preferred range or formation. The spot directly beneath the mantle's centre hides from all eight eyes, and cutting the lines frees the fight.
- **Used by.** [[Deer-Stalker]] patrols the same territory.

> [!narration] First sight
> Where the hanging roots part, a mantle big as a ship's sail hangs under the canopy, propped on eight thick arms. One arm stretches out past the rest, ringed with hooks, and it sways over the gap in the roots. Eight eyes ring the mantle's rim, all of them aimed down into the foliage below. Branches creak under the whole weight, and the hooked arm holds still above the way through.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Great Crown Squid"
size: Gargantuan
type: monstrosity
alignment: unaligned
ac: 17
hp: 283
hit_dice: "21d20 + 63"
speed: "20 ft., climb 50 ft."
stats: [24, 20, 17, 7, 20, 6]
saves:
  - dexterity: 11
  - constitution: 9
  - wisdom: 11
skillsaves:
  - Athletics: 13
  - Perception: 17
  - Stealth: 11
senses: "darkvision 120 ft., passive Perception 27"
languages: "none"
cr: 17
traits:
  - name: "Canopy Camouflage"
    desc: "While among foliage, branches, or hanging roots, the squid can Hide even when lightly obscured. If it has not moved since the end of its previous turn, it has advantage on Dexterity (Stealth) checks."
  - name: "Eight-Eyed Awareness"
    desc: "The squid has advantage on Wisdom (Perception) checks relying on sight and cannot be surprised while conscious unless the surprising creature is inside its Mouth-Blind Zone."
  - name: "Mouth-Blind Zone"
    desc: "The squid cannot visually perceive a creature within 10 feet directly beneath the center of its mantle unless that creature is grappled by the squid or touching one of its arms. Such a creature is unseen by the squid, and the squid cannot make opportunity attacks against it."
  - name: "Spider-Braced"
    desc: "While at least three primary arms touch solid surfaces, the squid cannot be knocked prone or moved against its will."
  - name: "Buoyant Mantle"
    desc: "The squid takes no falling damage while its gas mantle remains intact and falls no faster than 60 feet per round. It cannot use this trait to fly."
  - name: "Siege Predator"
    desc: "The squid deals double damage to objects and structures. Nonmagical plant growth never costs it additional movement."
  - name: "Selected Prey"
    desc: "The squid has advantage on its first Hookline Tentacle attack each turn against a creature that has no conscious ally within 10 feet."
actions:
  - name: "Multiattack"
    desc: "The squid makes three attacks, only one of which can be a Beak attack."
  - name: "Hookline Tentacle"
    desc: "Melee Weapon Attack: +11 to hit, reach 80 ft., one creature. Hit: 18 (2d10 + 7) slashing damage, and the target has the Grappled and Restrained conditions (escape DC 19). The squid can maintain up to four Hookline grapples at once."
  - name: "Crushing Arm"
    desc: "Melee Weapon Attack: +13 to hit, reach 20 ft., one creature. Hit: 25 (4d8 + 7) bludgeoning damage. The squid can grapple the target (escape DC 19) or push it up to 20 feet."
  - name: "Beak"
    desc: "Melee Weapon Attack: +13 to hit, reach 10 ft., one creature grappled by the squid. Hit: 33 (4d12 + 7) piercing damage."
  - name: "Reel"
    desc: "Each creature grappled by a Hookline is pulled up to 30 feet directly toward the squid."
  - name: "Canopy Pounce (Recharge 5–6)"
    desc: "The squid moves up to its climb speed without provoking opportunity attacks, provided it ends that movement touching a tree or similarly massive structure. At any two points during this movement, it can make a Hookline Tentacle attack."
legendary_actions:
  - name: ""
    desc: "The squid can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The squid regains spent legendary actions at the start of its turn."
  - name: "Skitter"
    desc: "The squid moves up to 20 feet using its climb speed without provoking opportunity attacks."
  - name: "Hookline"
    desc: "The squid makes one Hookline Tentacle attack."
  - name: "Reel"
    desc: "One creature grappled by the squid is pulled up to 20 feet toward it."
  - name: "Rip Through (Costs 2)"
    desc: "The squid tears apart a 10-foot cube of nonmagical wood or vegetation within reach. Creatures in that area make a DC 19 Dexterity saving throw, taking 18 (4d8) bludgeoning damage and falling prone on a failure, or half damage on a success. The destroyed area becomes difficult terrain."
```

## Play

### Tactics

Open among the hanging roots, where it braces itself on its arms, and mark the hooked arm gone still before the first line flies. Let the Party answer with positioning, cover, or focused fire. It releases its grip and hauls itself up into the canopy when its height no longer serves or its wounds tell.

### Outside a fight

Branches that creak under more than wind, and a broad mantle hanging among the roots, warn the Party before an encounter. It keeps to one stretch of canopy and does not chase beyond the roots it knows.

## Depth

### Ecology

It lives high in the Shattered Sea's canopy and eats what its long lines haul up to it. A traveller working Wisdom (Survival) reads its signs in the stripped bark along its paths.

### Hidden truths

Careful study of its territory shows the habits of the hooks, and with them the space beneath the mantle's centre where its eight eyes cannot reach. A successful relevant Intelligence check confirms what the stripped wood suggests.

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
