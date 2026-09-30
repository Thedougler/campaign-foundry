---
type: Creature
summary: "A Crown Squid creature (CR 17) used as a controller in The Shattered Sea."
sources:
 - "archive/crown-squid.md"
---

![[Crown Squid - Portrait.jpg]]

## At a glance

- **Role at the table.** Controller.
- **Threat.** CR 17. Use its attack range, movement, or control to pressure the Party.
- **Tell.** Its body advertises its next attack before it commits.
- **Weak to.** Cover, terrain, and breaking its preferred range or formation.
- **Used by.** [[Deer-Stalker]] patrols the same territory.

> [!narration] First sight
> The crown squid reveals itself through a distinctive silhouette and the tell of its signature attack, making its danger clear before it strikes.

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

Open from its preferred terrain, announce the tell of its strongest option, and let the Party answer with positioning, cover, or focused fire. It retreats when its preferred advantage is gone or it is badly wounded.

### Outside a fight

Its tracks, feeding signs, and territorial behaviour warn the Party before an encounter. It acts according to its habitat and does not pursue beyond the terrain that gives it an advantage.

## Depth

### Ecology

The World is its habitat. Its diet follows its form. Observant travellers can identify its signs with Wisdom (Survival).

### Hidden truths

A careful examination of its remains or territory reveals its habits and weaknesses. A successful relevant Intelligence check confirms them.

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
