# D&D Beyond public character endpoint

Researched 2026-09-28 for `cf pull` (issue #11, ADR 0009). Everything under "Verified" was observed by calling the endpoint and reading the responses and the packages' code; "Sources" lists what was read.

## Verified

- **Endpoint.** `GET https://character-service.dndbeyond.com/character/v5/character/<id>`, where `<id>` is the number in a character link (`https://www.dndbeyond.com/characters/<id>`, or `/profile/<user>/characters/<id>`). The response header `api-supported-versions: 5.0` matches the `v5` in the path.
- **Auth.** None for a public character: a plain `curl` with no cookies or headers returns the whole character (HTTP 200, about 250 to 490 KB of JSON). The endpoint is unofficial and undocumented; a D&D Beyond forum reply says there is no public documentation because it is not a supported API. RealmVTT's import and hobby scrapers (`pfaocle/dndbeyond-characters` in PHP, `wifimug/campsync-firebase-react` in Python) use it, and forum posts say it replaced the older `/character/<id>/json` route, which was removed.
- **Private or missing characters.** HTTP 403 with `{"success":false,"message":"An unexpected error has occurred","data":{"serverMessage":"Unauthorized Access Attempt.","errorCode":"4403b11"}}`. Private and non-existent ids give the same 403, so the error message tells the DM to set the character to public and to check the id. Other refusals seen: 400 (`The parameters provided are invalid.`) for a non-numeric id, 409 (`No adequate concurrency handler.`) for an implausibly large id.
- **Rate limits.** None documented and no `x-ratelimit-*`, `retry-after` or similar headers on a 200. `cf pull` fetches PCs one at a time (a Party is four to six requests per pull) and sends a `user-agent` naming itself. Any non-200 other than 403/404 is reported as a per-PC error with "wait a minute and run cf pull --pc again", never retried in a loop.
- **Envelope.** `{"id":0,"success":true,"message":"Character successfully received.","data":{...},"pagination":null}`. The character is `data`.
- **Not computed.** The payload holds ingredients only, no Armor Class, maximum Hit Points, saves, passive scores or spell save DC:
  - `stats` (base scores, `id` 1 to 6 for Str to Cha), `bonusStats`, `overrideStats`;
  - `baseHitPoints` (hit dice only, no Con), `bonusHitPoints`, `overrideHitPoints`, `removedHitPoints`, `temporaryHitPoints`;
  - `classes[]` (each with `level`, `definition` including `classFeatures`, `hitDice`, `spellCastingAbilityId`, `spellRules`, and a `subclassDefinition`);
  - `race` (`fullName`, `weightSpeeds.normal`, `racialTraits`), `feats`, `background`;
  - `modifiers` split by source: `race`, `class`, `background`, `feat`, `item`, `condition`. Each modifier has `type` (`bonus`, `set`, `proficiency`, `expertise`, `half-proficiency`, ...), `subType` (`strength-score`, `armor-class`, `saving-throws`, `perception`, `speed-flying`, `sorcerer-spell-save-dc`, ...), `value`/`fixedValue`, `statId`, `restriction`, `dice`, `componentId`. Class modifiers arrive already filtered to the character's level (a level 5 Rogue has no level 6 Expertise). Item modifiers are **not** filtered: an unequipped or unattuned item's modifiers are present and must be gated on the inventory entry (`equipped`, `isAttuned`, `definition.canAttune`, `definition.isConsumable`);
  - `inventory[]` (`quantity`, `equipped`, `isAttuned`, `definition` with `armorClass`, `armorTypeId` 1 light / 2 medium / 3 heavy / 4 shield, `filterType`, `rarity`, `grantedModifiers`), `currencies`;
  - `classSpells[].spells` and `spells.{race,feat,item,background}` (`prepared`, `alwaysPrepared`, `countsAsKnownSpell`, `definition.name`/`level`).
- **`spellSlots` is unreliable.** On a 2024 Sorcerer 9 it reports `available: 0` at every level while the class table gives 4/3/3/3/1, so slots are taken from the class's `spellRules.levelSpellSlots[classLevel]` (index = level), the standard multiclass table for several casters, and a formula for Warlock pact magic.
- **Both rulesets.** Characters built on the 2014 and the 2024 rules use the same shape (2024 species ability increases and origin feats arrive as ordinary `bonus` modifiers).

## Packages considered

| Package | Verdict |
| --- | --- |
| `@natowb/ddb-parser` 0.2.2 | The only npm package that parses this JSON into AC, HP, saves and spell DC. Last published 2024-10-04, CJS, 728 lines, no spells or inventory. Run against the three public characters below it agrees with the hand-worked values where no item or feature bonus applies, and disagrees where one does: it ignores item and class bonuses (a Cloak of Protection's +1 AC and saves, a +1 spell save DC item), ignores Expertise in Passive Perception (18 by hand, 15 from the package for the Rogue), and takes speed from the species only. Not sound enough to depend on, so it was not installed. |
| `@grahamethompson/dndbeyond-mcp`, `@iamjameslennon/ddb-mcp` | MCP servers for a signed-in D&D Beyond account (cookie or Google auth), not parsers. Wrong tool: ADR 0009 chose public characters over the DM's account. |
| `alchemyrpg/ddb2alchemy` (MIT) | Converts to Alchemy's format, not published to npm, last push 2023-11. |
| `MrPrimate/ddb-importer` | The most complete parser, but a Foundry module tied to Foundry's data model (and Foundry is never a source, AGENTS.md). |

**Decision.** No established, maintained npm package computes these values soundly, so `src/pull/sheet.ts` is the narrowest parser that covers the sheet side. It is validated against hand-worked values from the recorded payloads (`test/pull/sheet.test.ts`), and cross-checked against `@natowb/ddb-parser` where that package models the same rule.

## What the parser models

Ability scores (base + `bonusStats` + `bonus` modifiers, capped at 20, raised by `set` modifiers, replaced by `overrideStats`), level and proficiency bonus, maximum Hit Points (base + Con x level + per-level bonuses, or `overrideHitPoints`), Armor Class (worn armor by `armorTypeId` with the Dex cap, shield, magic bonuses on armor, `bonus armor-class` modifiers, Unarmored Defense from `set unarmored-armor-class`), speeds (species, `set speed-*` modifiers such as Winged Boots, `bonus speed`), saving throws (proficiency + `saving-throws` bonuses), Passive Perception (proficiency, Expertise, half proficiency, passive bonuses), spellcasting per class or subclass (save DC and attack with class-specific bonuses), spell slots, spells, features and inventory. Modifiers with `dice`, or with a restriction that does not hold (`against being charmed`), are conditional and left out; three restriction phrasings about armor are evaluated against what is worn.

Not modeled (rare, or state that changes at the table): abilities above 20 (Epic Boons), Monk Unarmored Defense with a shield, the +5 Passive Perception for advantage, conditions and exhaustion, current or temporary Hit Points, wild shape, encumbrance and armor Strength requirements, `customSpeeds`, `customProficiencies`, and homebrew classes that reuse the name Warlock. A page whose numbers look wrong for one of these is a parser gap: file it with the character link.

## Public characters used

Ids found in open-source projects' docs; all three answered 200 without auth on 2026-09-28.

- `137918847`, Human Rogue 5 (2014 rules): `InsiderPhD/badger-dnd` README.
- `158776848`, Halfling Sorcerer 9 (2024 rules): `ImDevinC/wmchars` AGENTS.md.
- `101991519`, Eladrin Artificer 12 (2014 rules): `wifimug/campsync-firebase-react` `backend/scraper.py`.

Cross-check against `@natowb/ddb-parser` (its value, then ours, only where they differ): Sorcerer save DC 16 vs 18 (a +1 class feature and a +1 attuned item), Con save +7 vs +8 (Cloak of Protection); Rogue Passive Perception 15 vs 18 (Expertise). Equal on all three: HP 65/38/75, AC 13/15/15, proficiency bonus 4/3/4, Artificer save DC 17 and saves.

`test/pull/fixtures/character-*.json` are trimmed recordings of the first two (`scripts/trim-ddb-payload.ts`): prose, images, notes, the account and campaign are dropped and the id and name replaced.

## Sources

- The endpoint itself, called with `curl` on 2026-09-28 (statuses, headers and bodies above).
- D&D Beyond forums: "D&D Beyond API" (public character JSON works once the character is public; no documentation), "Removed undocumented API endpoints" (the old `/json` route), "Can I use the API for free".
- RealmVTT forum "D&D Beyond character import sync" (the same endpoint, character must be public).
- Code read: `@natowb/ddb-parser` 0.2.2 (npm), `@grahamethompson/dndbeyond-mcp` 0.2.2 README, `alchemyrpg/ddb2alchemy` README, `pfaocle/dndbeyond-characters` README.
