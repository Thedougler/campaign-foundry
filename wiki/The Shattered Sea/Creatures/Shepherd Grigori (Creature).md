---
type: Creature
summary: "Shepherd Grigori as a CR 19 undead: a sorcerer-lich whose blood phylactery is the Family of cured heirs."
sources:
 - "archive/ssw-shepherd-grigori-island.md"
 - "archive/shepherd-grigori.md"
---

## At a glance

- **Role at the table.** Combat profile for [[Shepherd Grigori]], the [[Khlysty]] shepherd.
- **Threat.** CR 19, and the blood phylactery walks him back out of death while a cured heir lives anywhere.
- **Tell.** A hummed hymn while his magic works, and cold hands on the patient.
- **Weak to.** Mad Monk's Resilience fails against radiant damage and critical hits, and every dead anchor narrows his road back.
- **Used by.** [[Shepherd Grigori]].

> [!narration] First sight
> The wounded lie quiet under his hands, and a hymn drifts out of him, more hum than prayer. Wine rides in his free hand, untouched, while the other settles on a fevered brow and the fever breaks beneath it. He asks the sick man's name, and stays for the answer.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Shepherd Grigori"
size: Medium
type: undead
subtype: sorcerer
alignment: "lawful evil"
ac: 17
ac_class: "Natural Armor"
hp: 263
hit_dice: "31d8 + 124"
speed: "30 ft."
stats: [11, 18, 18, 16, 15, 21]
saves:
  - constitution: 10
  - charisma: 11
skillsaves:
  - deception: 11
  - insight: 8
  - perception: 8
  - persuasion: 11
  - religion: 9
damage_resistances: "Cold, Necrotic, Poison; Bludgeoning, Piercing, and Slashing from Nonmagical Attacks"
condition_immunities: "Charmed, Exhaustion, Frightened, Paralyzed, Poisoned"
senses: "Darkvision 120 ft., passive Perception 18"
languages: "Common, Celestial"
cr: "19"
traits:
  - name: "Blood Phylactery"
    desc: "Grigori's phylactery is the Family: the living web of blood-threads binding every noble heir he has healed. While any healed heir lives, Grigori can't be permanently destroyed. If he dies, he reforms beside a living heir in 1d10 days if ten or more healed heirs live, in 1d10 weeks if at least three live, or in 1d10 months if fewer than three live. Ending him forever means ending every healed heir first."
  - name: "Mad Monk's Resilience"
    desc: "If damage reduces Grigori to 0 Hit Points, he makes a Constitution saving throw (DC 18), provided the damage isn't Radiant and didn't come from a Critical Hit. On a success, he drops to 1 Hit Point instead."
  - name: "Magic Resistance"
    desc: "Grigori has Advantage on saving throws against Spells and other magical effects."
  - name: "Turn Resistance"
    desc: "Grigori has Advantage on saving throws against any effect that turns Undead."
  - name: "Family Reunion"
    desc: "The Family gathers to their shepherd. Whenever Grigori takes the Multiattack action, he makes one additional Blood Touch attack for each healed heir within 5 feet of him."
  - name: "Sorcerer Metamagic"
    desc: "Grigori shapes his spells with Metamagic without spending Sorcery Points: Careful Spell or Subtle Spell at will; Distant Spell or Extended Spell 5/day each; Quickened Spell, Seeking Spell, or Transmuted Spell 3/day each; Heightened Spell or Twinned Spell 2/day each."
spells:
  - "Spellcasting. Grigori casts spells using Charisma as his spellcasting ability (spell save DC 19, +11 to hit with spell attacks), requiring no Material components."
  - "At will: Alter Self, Chill Touch, Command, Hold Person, Thaumaturgy"
  - "3/day each: Cure Wounds (3rd Level), Counterspell, Fear, Hypnotic Pattern"
  - "2/day each: Blight, Dominate Person, Mass Suggestion"
  - "1/day each: Circle of Death, Finger of Death, Power Word Heal"
actions:
  - name: "Multiattack"
    desc: "Grigori makes two Blood Touch attacks."
  - name: "Blood Touch"
    desc: "*Melee Attack Roll:* +10, reach 5 ft. *Hit:* 13 (2d8 + 4) Necrotic damage."
legendary_actions:
  - name: ""
    desc: "Legendary Action Uses: 3. Immediately after another creature's turn, Grigori can expend one use to take one of the following actions. He regains all expended uses at the start of each of his turns."
  - name: "Cantrip"
    desc: "Grigori casts Chill Touch or Thaumaturgy."
  - name: "Might of Bloodline (Costs 2 Uses)"
    desc: "Grigori lashes a cord of his own blood at one creature he can see within 60 feet. Dexterity Saving Throw: DC 19. Failure: 28 (8d6) Necrotic damage. Success: Half damage."
  - name: "Reanimate Family (Costs 2 Uses)"
    desc: "Grigori calls dead kin back to service. One humanoid corpse within 60 feet rises: if it is a healed heir of the Family, the heir returns to life with 1 Hit Point; any other corpse rises as a Zombie under Grigori's command."
  - name: "Blood Sacrifice (Costs 2 Uses)"
    desc: "Grigori shares communion with one willing healed heir within 5 feet of him. The heir loses 10 (3d6) Hit Points, and Grigori regains Hit Points equal to twice that number."
  - name: "Family Influence (Costs 3 Uses)"
    desc: "Grigori casts Dominate Person or Mass Suggestion without expending one of that spell's daily uses."
```

## Play

### Tactics

Grigori treats a fight as hospitality failed. Dominate person and mass suggestion end most of them with everyone still breathing, and cure wounds serves the wounded on either side. Cornered, with the Family gone and no road back, he stops being gentle.

### Outside a fight

He cooks, pours and asks questions, and people answer more than they meant to. A cure comes free and takes twenty minutes, and by the next day the household is telling the story to anyone who will listen.

## Depth

### Ecology

A Hierarch of the [[Khlysty]], Grigori hides his phylactery in other people: noble heirs across the Scatter whose incurable illnesses he cured, each one a living anchor. Dead anchors thin his protection, and the search for new ones never stops. He presents as a living man, down to the wine and the appetite.

### Hidden truths

- The healing reads as necromancy up close. A dim red light clings to caster and patient while it works, and a faint taste of copper hangs in the air at close range. A DC 22 Arcana check against a cured patient finds the blood-thread, and counterspell breaks the healing and the binding together.

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
