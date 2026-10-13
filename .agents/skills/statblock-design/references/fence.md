# The statblock fence

A statblock is one fence opened with ` ```statblock `, holding YAML that the Obsidian Fantasy Statblocks plugin renders through its `Basic 5e Layout`. It sits under the `## Statblock` heading of a Creature or NPC page (`docs/wiki-layout.md` **Stat blocks**), under a PC page's `## Sheet` ([PC sheet](#pc-sheet)), or alone in a reply.

The field set follows the plugin's own layout definition, `src/layouts/basic 5e/basic5e.ts` in the [Fantasy Statblocks repository](https://github.com/javalent/fantasy-statblocks), which matches the copy installed at `wiki/.obsidian/plugins/obsidian-5e-statblocks/` (version 4.10.3). The plugin's sample blocks use 2014 wording. This Wiki writes 2024 wording, and the `statblock` check layer (`src/check/statblock/`) recomputes the numbers. Push reads the same fields into Foundry Actors.

## Write

1. **Fields.** Copy the fence from `wiki/templates/creature.md` § Statblock and keep its key order. Fill each key per [Fields](#fields). Copy a published block's values from its source. Keep every number except a derived one that [Derived numbers](#derived-numbers) computes differently. **Done when** every template key contains a value, an empty key contains `""` or `[]`, and the template's `#` comment lines are deleted.
2. **Entries.** Write each trait and action in the 2024 form [Entries](#entries) gives for its kind. Published entries in mixed 2014 and 2024 wording are rewritten into those forms. **Done when** every attack, saving throw, condition, limited use, spell and legendary entry reads in its form.
3. **Derived numbers.** Compute each from `stats` and `cr` per [Derived numbers](#derived-numbers), and write the result in its field or entry. **Done when** every modifier-based number in the block is its computed value.
4. **Verify.** A block on a Wiki page is verified by that page's gate (`skill://lint` § Commands), whose `statblock` layer runs the arithmetic. A block with no page is verified in a scratch vault. Make the vault with `sb=$(cd "$(mktemp -d)" && pwd -P); echo "$sb"` and write `<sb>/check.md`: a frontmatter of `type: Creature` between `---` lines, a blank line, then the fence. Then run, spelling the path out:

   ```bash
   bun run cfcli -- check "<sb>/check.md" --vault "<sb>" --layer statblock
   ```

   Each finding gives the field and its expected value, with the arithmetic behind it. Correct the block and rerun. **Done when** the check prints `ok: 0 findings`.

## Fields

|Key|Value|
|---|---|
|`layout`|`Basic 5e Layout`, always the first line.|
|`name`|The page's name. A World-free block uses the kind's plain name.|
|`size`|`Tiny`, `Small`, `Medium`, `Large`, `Huge` or `Gargantuan`, or two joined by `or`. It sets the Hit Die.|
|`type`, `subtype`|The 2024 creature type in lower case, such as `humanoid`, and its tag, or `""`.|
|`alignment`|As the source prints it, such as `neutral evil` or `unaligned`.|
|`ac`, `ac_class`|The AC as a number, and what grants it, such as `natural armor`, which renders in brackets.|
|`hp`, `hit_dice`|The average Hit Points as a number, and the Hit Dice as a quoted string that includes the Constitution term: `"8d8 + 16"`. The plugin renders them as `52 (8d8 + 16)`.|
|`modifier`|The initiative bonus as a number: `7` for a block that prints `Initiative +7 (17)`. A block that prints none takes the Dexterity modifier.|
|`speed`|One string: `"30 ft., swim 40 ft."`.|
|`stats`|The Str, Dex, Con, Int, Wis, Cha scores, in that order: `[16, 12, 14, 8, 10, 8]`.|
|`saves`|Proficient saving throws only, as a list of one-key maps with the total bonus: `- dex: 4`. Keys are `str`, `dex`, `con`, `int`, `wis`, `cha` or the full ability name.|
|`skillsaves`|Proficient skills only, as a list of one-key maps with the total bonus: `- perception: 4`. Keys are the skill's name in lower case, spaces kept (`sleight of hand`).|
|`damage_vulnerabilities`, `damage_resistances`, `damage_immunities`, `condition_immunities`|One string each, or `""`.|
|`gear`|The items a 2024 block lists on its Gear line, as a list of strings: `- "three daggers"`. Left out when the block has none.|
|`senses`|One string ending in `passive Perception <n>`: `"darkvision 60 ft., passive Perception 12"`.|
|`languages`|One string, or `""`.|
|`cr`|A number or a fraction: `5`, `1/4`, `"1/8"`. It sets the proficiency bonus. Left out when the source prints none, as a summoned creature's block does.|
|`traits`, `actions`, `bonus_actions`, `reactions`, `legendary_actions`|Lists of entries, each `- name: <Name>` then `desc: "<text>"`, or `[]`.|
|`legendary_description`|The legendary actions' opening rule, or `""`.|
|`mythic_description`, `mythic_actions`|A mythic monster's opening rule for its mythic actions, and those actions as an entry list, written as `legendary_description` and `legendary_actions` are.|
|`lair_actions`, `regional_effects`|A lair's actions and the effects on the land around it, as entry lists like `actions`.|

The plugin hides an empty field, and a block leaves out each mythic, lair and regional key the monster doesn't have. `lair_actions` and `regional_effects` have no opening-rule field, so the timing ("On initiative count 20, losing ties, …") opens the first entry's `desc`. Spellcasting is an entry in `actions` ([Entries](#entries)). The plugin's `spells` list stays unused because the check reads the spellcasting ability from entries only. Leave `proficiency_bonus` out: the check derives it from `cr`, and a written one must match.

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

## PC sheet

A PC page carries its numbers in the same fence under `## Sheet`, after its Player and class bullets and with no `cr` (`wiki/templates/PC.md` § Sheet). `pull-pcs` writes it from D&D Beyond when the character is public. This run writes or repairs it when the pull can't, because the character is private or the page has no `dndbeyond_url`, and it migrates a sheet still in the retired bullet shape. The page is canon. The fence restates what the page and the Player's words establish.

1. **Gather.** Read the whole PC page, its retired sheet bullets and ability table included, then each archived file its `sources` lists. A Player's own words there, such as a reported level-up, feat or item, are part of the PC's record, and a later record replaces an earlier one. **Done when** each field and each feature that acts in a fight has its source on the page or in an archived file.
2. **Fields.** Copy the fence from `wiki/templates/PC.md` § Sheet, keep its key order and fill each key per [Fields](#fields). `name` is the page title and `subtype` the species. `ac`, `hp` and `speed` are the values the sheet records. `hit_dice` is the PC's Hit Dice by class with the Constitution term, such as `"5d8 + 10"`, and `modifier` is the initiative bonus. Move each retired bullet's fact into its field (passive Perception into `senses`, saving throws into `saves`, the ability table into `stats`), then delete the bullets and the table. **Done when** every template key has a value and no retired bullet or table remains.
3. **Entries.** Write each feature that acts in a fight as an entry in its [Entries](#entries) form: each weapon as an attack action, a damage rider such as Sneak Attack as a trait, a reaction feature under `reactions`. A limited use goes in the name, as `(3/Long Rest)`, `(2/Short Rest)`, `(1/Day)` or `(Recharge 5–6)`. A caster gets one `Spellcasting` action naming its ability, spell save DC and spell attack bonus, with the spells it casts in a fight, and `## Spells` keeps the full list. A feature that never acts in a fight stays in `### Features` alone. **Done when** each feature on the page that acts in a fight has its entry.
4. **Numbers.** Keep each number the page records. Compute each one it leaves out from the recorded class, level and scores by the 2024 rules. The proficiency bonus follows level: +2 at levels 1 to 4, +3 at 5 to 8, +4 at 9 to 12, +5 at 13 to 16 and +6 at 17 to 20. Apply it in the formulas of [Derived numbers](#derived-numbers) in place of the CR's bonus, and add each item bonus the Inventory lists, such as a +1 weapon's. A figure the page neither records nor lets you compute stays out of the fence and goes to the DM as a question. **Done when** each number in the fence is recorded or computed, and the reply lists each computed one with its formula.
5. **Verify.** Run the page gate (`skill://lint` § Commands). Its `statblock` layer reads the fence's YAML and shape, and with no `cr` it skips the arithmetic, so step 4's formulas are the arithmetic check. **Done when** the page gate prints `ok: 0 findings`.
