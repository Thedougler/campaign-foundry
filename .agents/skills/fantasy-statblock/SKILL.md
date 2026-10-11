---
name: fantasy-statblock
description: >-
  Fantasy Statblocks format for a D&D 2024 statblock: the `statblock` fence,
  `layout: Basic 5e Layout`, its YAML fields, 2024 entry wording and every
  derived number written out. Use when writing, filling, converting or
  checking a statblock, on a Creature page or alone in a reply.
---

# Fantasy Statblock

A statblock is one fence opened with ` ```statblock `, holding YAML that the Obsidian Fantasy Statblocks plugin renders through its `Basic 5e Layout`. This skill is the block's format alone. What the Creature is, where its numbers come from and how it is tuned belong to `creature-design`. Which page holds the block is `docs/wiki-layout.md` **Stat blocks**.

The field set follows the plugin's own layout definition, `src/layouts/basic 5e/basic5e.ts` in the [Fantasy Statblocks repository](https://github.com/javalent/fantasy-statblocks), which matches the copy installed at `wiki/.obsidian/plugins/obsidian-5e-statblocks/` (version 4.10.3). The plugin's sample blocks use 2014 wording. This Wiki writes 2024 wording, and the `statblock` check layer (`src/check/statblock/`) recomputes the numbers. Push reads the same fields into Foundry Actors.

`raw/bestiary-cr1-cr30.md` (a Markdown export of about 1,300 published monsters from CR 1 to 30) is a source to read, the reference set for what a complete block contains: traits, actions, bonus actions, reactions, and legendary, lair and regional entries where the monster has them. Its entries mix 2014 and 2024 wording, so rewrite each one in its [Entries](#entries) form. Each block you write is one creature's fence on that creature's own page.

## Steps

### 1. Fill the fields

Copy the fence from `wiki/templates/creature.md` § Statblock and keep its key order. Fill each key per [Fields](#fields). Copy a published block's values from `dnd5e-srd-api`. Keep every number except a derived one that [Derived numbers](#derived-numbers) computes differently.

**Done when** every template key holds a value, an empty key holds `""` or `[]`, and the template's `#` comment lines are deleted.

### 2. Write the entries

Write each trait and action in the 2024 form [Entries](#entries) gives for its kind.

**Done when** every attack, saving throw, condition, limited use, spell and legendary entry reads in its form.

### 3. Write the derived numbers out

Compute each derived number from `stats` and `cr` per [Derived numbers](#derived-numbers), and write the result in its field or entry.

**Done when** every modifier-based number in the block is written as its computed value.

### 4. Verify

A block on a Wiki Creature page is verified by that page's gate (`skill://lint` § Commands), whose `statblock` layer runs the arithmetic. A block with no page is verified in a scratch vault. Make the vault with `sb=$(cd "$(mktemp -d)" && pwd -P); echo "$sb"` and write `<sb>/check.md`: a frontmatter of `type: Creature` between `---` lines, a blank line, then the fence. Then run, spelling the path out:

```bash
bun run cfcli -- check "<sb>/check.md" --vault "<sb>" --layer statblock
```

Each finding names the field, the expected value and the arithmetic behind it. Correct the block and rerun.

**Done when** the check prints `ok: 0 findings`.

## Fields

|Key|Value|
|---|---|
|`layout`|`Basic 5e Layout`, always the first line.|
|`name`|The Creature's name. A block for no World uses the kind's plain name.|
|`size`|`Tiny`, `Small`, `Medium`, `Large`, `Huge` or `Gargantuan`, or two joined by `or`. It sets the Hit Die.|
|`type`, `subtype`|The 2024 creature type in lower case, such as `humanoid`, and its tag, or `""`.|
|`alignment`|As the source prints it, such as `neutral evil` or `unaligned`.|
|`ac`, `ac_class`|The AC as a number, and what grants it, such as `natural armor`, which renders in brackets.|
|`hp`, `hit_dice`|The average Hit Points as a number, and the Hit Dice as a quoted string that includes the Constitution term: `"8d8 + 16"`. The plugin renders them as `52 (8d8 + 16)`.|
|`speed`|One string: `"30 ft., swim 40 ft."`.|
|`stats`|Six scores in the order Str, Dex, Con, Int, Wis, Cha: `[16, 12, 14, 8, 10, 8]`.|
|`saves`|Proficient saving throws only, as a list of one-key maps with the total bonus: `- dex: 4`. Keys are `str`, `dex`, `con`, `int`, `wis`, `cha` or the full ability name.|
|`skillsaves`|Proficient skills only, as a list of one-key maps with the total bonus: `- perception: 4`. Keys are the skill's name in lower case, spaces kept (`sleight of hand`).|
|`damage_vulnerabilities`, `damage_resistances`, `damage_immunities`, `condition_immunities`|One string each, or `""`.|
|`senses`|One string ending in `passive Perception <n>`: `"darkvision 60 ft., passive Perception 12"`.|
|`languages`|One string, or `""`.|
|`cr`|A number or a fraction: `5`, `1/4`, `"1/8"`. It sets the proficiency bonus.|
|`traits`, `actions`, `bonus_actions`, `reactions`, `legendary_actions`|Lists of entries, each `- name: <Name>` then `desc: "<text>"`, or `[]`.|
|`legendary_description`|The legendary actions' opening rule, or `""`.|

The plugin hides an empty field. A monster with a lair or an effect on the land around it writes them in the fence as `lair_actions` and `regional_effects`, entry lists like `actions` that render under their own headings. These keys have no opening-rule field, so the timing ("On initiative count 20, losing ties, …") opens the first entry's `desc`. `mythic_description` with `mythic_actions` works the same way. Spellcasting is an entry in `actions` ([Entries](#entries)). The plugin's `spells` list stays unused because the check reads the spellcasting ability from entries only. Leave `proficiency_bonus` out: the check derives it from `cr`, and a written one must match.

Quote every `desc`, since its `*` and `:` break unquoted YAML: `desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Bludgeoning damage."`.

## Entries

Each form is the 2024 SRD's, with its labels in italics. Damage types and conditions are capitalised.

- **Attack:** `*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 13 (2d8 + 4) Piercing damage.` A ranged attack gives `range 80/320 ft.`, and a thrown weapon reads `*Melee or Ranged Attack Roll:* +4, reach 5 ft. or range 20/60 ft.`
- **Saving throw:** `*Dexterity Saving Throw:* DC 13, each creature in a 15-foot Cone. *Failure:* 10 (3d6) Fire damage. *Success:* Half damage.` Name the targets or area, then give every result.
- **Condition:** name it and how it ends: `it has the Grappled condition (escape DC 13)`, or `until the end of the target's next turn`, or a repeated save at the end of each of its turns.
- **Limited use:** in the entry's name, as `Fire Breath (Recharge 5–6)`, `Legendary Resistance (3/Day)` or `(1/Day each)`.
- **`Multiattack`:** names the attacks it makes: `The creature makes two Bite attacks.`
- **Spellcasting:** an `actions` entry naming the ability and its numbers: `The creature casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13, +5 to hit with spell attacks):`, then the lists, such as `**At Will:** *Light*, *Thaumaturgy*` and `**1/Day Each:** *Bless*, *Hold Person*`. A spell with a Bonus Action or Reaction casting time sits in that section as its own entry. Write the spell's duration and Concentration into any entry that casts it outside Spellcasting.
- **Legendary actions:** `legendary_description` gives the uses and timing: `Legendary Action Uses: 3. Immediately after another creature's turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.`

## Derived numbers

The `statblock` layer recomputes each of these from `stats` and `cr`.

- **Ability modifier:** (score − 10) ÷ 2, rounded down.
- **Proficiency bonus by CR:**

  |CR|0 to 4|5 to 8|9 to 12|13 to 16|17 to 20|21 to 24|25 to 28|29 to 30|
  |---|---|---|---|---|---|---|---|---|
  |Bonus|+2|+3|+4|+5|+6|+7|+8|+9|

- **Saving throw:** the ability modifier + the proficiency bonus.
- **Skill:** the skill's ability modifier + the proficiency bonus, or + twice the bonus with Expertise.
- **Passive Perception:** 10 + the Perception bonus when `skillsaves` lists it, otherwise 10 + the Wisdom modifier.
- **Hit Points:** the Hit Die follows size.

  |Size|Tiny|Small|Medium|Large|Huge|Gargantuan|
  |---|---|---|---|---|---|---|
  |Hit Die|d4|d6|d8|d10|d12|d20|

  The Constitution term is the number of dice × the Constitution modifier. `hp` is the dice's average, (die size + 1) ÷ 2 × number of dice, rounded down, plus that term: 8d8 + 16 gives 36 + 16 = 52.
- **Attack bonus:** the proficiency bonus + the Strength or Dexterity modifier the attack uses, or the spellcasting ability's modifier for a spell attack.
- **Save DC:** 8 + the proficiency bonus + the modifier of the ability the effect uses. A spell save DC uses the spellcasting ability.
- **Escape DC:** 10 + the Strength or Dexterity modifier, or 8 + the proficiency bonus + an ability modifier.
- **Damage:** `13 (2d8 + 4)` puts the average before the dice. The average is the dice's mean plus the flat bonus, rounded down.
