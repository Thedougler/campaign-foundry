---
type: Creature
summary: "Talon Vantyrus (Creature), a unique Creature stat block from the archived NPC record."
sources:
 - "archive/talon-vantyrus.md"
---

## At a glance

- **Role at the table.** Unique named Creature represented by the NPC.
- **Threat.** See the stat block (CR as listed in the archived record).
- **Tell.** Its signature movement or attack is visible before it commits.
- **Weak to.** The counter play described in Tactics.
- **Used by.** The NPC of the same name.

> [!narration] First sight
> The Creature's distinctive silhouette and signature tell are apparent before it attacks.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Talon Vantyrus"
size: Medium
type: humanoid
subtype: aarakocra
alignment: lawful neutral
ac: 22
hp: 238
hit_dice: "28d8 + 112"
speed: "50 ft., fly 80 ft."
stats: [10, 22, 18, 20, 20, 16]
saves:
  - Dex: +12
  - Con: +10
  - Int: +11
  - Wis: +11
skillsaves:
  - Acrobatics: +12
  - Insight: +11
  - Perception: +11
  - Stealth: +12
senses: "passive Perception 21"
languages: "Common, Auran"
cr: 17
traits:
  - name: Evasion
    desc: "When Vantyrus is subjected to an effect that allows him to make a Dexterity saving throw to take only half damage, he instead takes no damage on a successful save and half damage on a failed save."
  - name: Legendary Resistance (3/Day)
    desc: "If Vantyrus fails a saving throw, he can choose to succeed instead."
  - name: Long Sight
    desc: "Vantyrus has advantage on Initiative rolls and can't be surprised while conscious."
  - name: Winter's Stillness
    desc: "While Vantyrus hasn't moved since the end of his last turn, attack rolls against him have disadvantage."
  - name: Fatespinner
    desc: "When Initiative is rolled, Vantyrus rolls three d20s and records the results. Before Vantyrus or a creature he can see within 120 feet makes a D20 Test, Vantyrus can replace the roll with one of the recorded results. He can do so only once per turn, and each recorded result can be used only once."
actions:
  - name: Multiattack
    desc: "Vantyrus makes three Frostglass Blade attacks."
  - name: Frostglass Blade
    desc: "Melee or Ranged Attack Roll: +12 to hit, reach 5 ft. Or range 60/120 ft., one target. Hit: 12 (1d12 + 6) slashing damage plus 9 (2d8) force damage. Immediately after a ranged attack, the blade returns to Vantyrus's hand."
  - name: Five Futures Cut (Recharge 5-6)
    desc: "Vantyrus chooses up to five creatures he can see within 60 feet. Each target must make a DC 20 Dexterity saving throw, taking 33 (6d10) force damage on a failed save or half as much damage on a successful one. Vantyrus then teleports to an unoccupied space he can see within 5 feet of one target."
  - name: Binding Grasp
    desc: "One Large or smaller creature Vantyrus can see within 30 feet must succeed on a DC 20 Strength saving throw or be Restrained until the end of Vantyrus's next turn. While Restrained this way, its Speed is 0 as intersecting threads of possible movement collapse around it."
bonus_actions:
  - name: Between Wingbeats
    desc: "Vantyrus takes the Dash or Disengage action."
  - name: Unchosen Step (3/Day)
    desc: "Vantyrus teleports up to 40 feet to an unoccupied space he can see."
reactions:
  - name: Absent Feather
    desc: "Trigger: Vantyrus is hit by an attack roll. Response: Vantyrus gains a +5 bonus to AC against that attack, potentially causing it to miss. If the attack misses, Vantyrus can move up to 10 feet without provoking Opportunity Attacks."
  - name: Sever the Gesture
    desc: "Trigger: A creature Vantyrus can see within 60 feet casts a spell with Verbal or Somatic components. Response: The caster must succeed on a DC 20 Constitution saving throw or the spell fails and has no effect."
legendary_actions:
  - name: ""
    desc: "Legendary Action Uses: 3. Immediately after another creature's turn, Vantyrus can expend one use to take one of the following actions. He regains all expended uses at the start of his turn."
  - name: Flowing Step
    desc: "Vantyrus moves up to half his Speed without provoking Opportunity Attacks."
  - name: Frostglass Blade
    desc: "Vantyrus makes one Frostglass Blade attack."
  - name: Collapse the Thread (Costs 2 Actions)
    desc: "One creature Vantyrus can see within 60 feet must make a DC 20 Wisdom saving throw. On a failed save, it takes 18 (4d8) psychic damage, can't take Reactions, and has disadvantage on the next D20 Test it makes before the end of its next turn. On a successful save, it takes half as much damage only."
```

## Play

### Tactics

Use the archived tactics and signature abilities. Telegraph the strongest option and let the Party answer with positioning, cover, or focused fire. It withdraws when its objective is lost or its advantage is gone.

### Outside a fight

Its appearance, habits, and traces identify it before an encounter. It acts according to the NPC's established role and habitat.

## Depth

### Ecology

This unique Creature's habitat, diet, and signs follow the archived NPC record. Observant travellers can identify its signs with Wisdom (Survival).

### Hidden truths

The archived NPC record contains the Creature's history and concealed motives. Examination or relevant questioning can reveal them.

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
