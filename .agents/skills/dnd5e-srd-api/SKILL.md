---
name: dnd5e-srd-api
description: "D&D 5e SRD lookups, 2024 rules by default, from the dnd5eapi.co API over curl; the 2024 API holds the complete SRD 5.2. Use when an answer needs SRD spell text, a monster stat block, a class level table, an item, species, condition, feat or feature, or any 5e rule checked against source rather than memory. 2014 rules only when asked."
---

# D&D 5e SRD API

Base `https://www.dnd5eapi.co/api/2024` (SRD 5.2). It is public and keyless, and what it lists is the complete SRD 5.2. Set `B=https://www.dnd5eapi.co/api/2024` once per shell. The 2014 ruleset is a separate base, covered in [2014 deltas](#2014-deltas).

## Lookup

1. **Find the index.** `curl -s "$B/spells?name=fire" | jq -c '.results[]'`
2. **Fetch the entity.** `curl -s "$B/spells/fireball" | jq`
3. **Follow links.** Every `url` field is a path. Prefix it with `https://www.dnd5eapi.co`.

Every figure in the answer is read from a fetched response.

## Collections

`curl -s $B` lists all 24 (`spells`, `monsters`, `classes`, `species`, `equipment`, `conditions`, ...). Entities are addressed by `index`, lowercase and hyphenated: `spells/fire-bolt`, `monsters/goblin-warrior`. Search by `name` first; 2024 renamed many indexes (`goblin` is now `goblin-warrior`, `monsters/goblin` is a 404).

Sub-resources hang off an entity:

```bash
curl -s "$B/classes/wizard/levels/3" | jq .spellcasting   # slots, cantrips, prepared_spells at one level
curl -s "$B/classes/wizard/spells" | jq -c '.results[]'   # the class spell list
curl -s "$B/classes/wizard" | jq -c .subclasses            # a class's subclasses
curl -s "$B/equipment-categories/simple-weapons" | jq -c '.equipment[]'
curl -s "$B/equipment/flail" | jq '{damage, properties, mastery}'   # mastery is top-level, not in properties
```

Monster records are large, so project the fields you need: `curl -s "$B/monsters/goblin-warrior" | jq '{armor_class, hit_points, challenge_rating, actions}'`.

## Filters

List endpoints take query filters. Comma-separated values are OR.

| Collection | Filters |
|---|---|
| any | `name` (case-insensitive substring) |
| `spells` | `level=1,2` `school=Evocation` |

Filters combine: `spells?level=3&school=Evocation`. REST monster lists hold only `index` and `name`. To find monsters by challenge rating (or type, size, damage resistances), use the GraphQL endpoint:

```bash
curl -s -X POST https://www.dnd5eapi.co/graphql/2024 -H 'content-type: application/json' \
  -d '{"query":"{ monsters2024(challenge_rating: {eq: 14}, limit: 50) { index name challenge_rating } }"}' | jq -c '.data.monsters2024[]'
```

Number filters take `eq`, `in`, `nin` or `range`.

## Gotchas

- **Pin the version in the path.** Unversioned `/api/...` answers 301 to **2014**, not 2024.
- **Bad filters are ignored.** `?bogus=1` or `monsters?challenge_rating=1` returns the whole collection with status 200. A `count` equal to the full collection size is the tell.
- **List shape varies.** Most collections return `{count, results}`. `classes/{index}/levels` returns a bare array.
- **Errors are plain text.** A missing index returns the text `Not Found` with status 404. Check the status before piping to `jq`. `classes/{index}/subclasses` is one such 404 in 2024.
- **SRD content only.** Coverage is the SRD 5.2, with nothing from other books. An empty result means the SRD omits it.
- **Rate limit is 100 requests per window.** `x-ratelimit-remaining` in the response headers shows what is left. Fetch the one entity needed and skip a crawl of the collection.

## 2014 deltas

Use `https://www.dnd5eapi.co/api/2014` (SRD 5.1) only when the user names the 2014 rules or a source needs them. Same lookup steps; these differ:

| | 2024 | 2014 |
|---|---|---|
| Ancestry | `species`, `subspecies` | `races`, `subraces` |
| Prose fields | `description`, `higher_level` are strings | `desc`, `higher_level` are arrays of paragraphs |
| Monster filter | `name` only | `challenge_rating=0.25,0.5` works |
| Subclass list | `classes/{index}` `.subclasses` | `classes/{index}/subclasses` |
| Subclass index | `evoker` | `evocation` |
| Monster index | `goblin-warrior` | `goblin` |
| Only in one | `poisons`, `weapon-mastery-properties` | |
