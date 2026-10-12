---
name: spell-design
description: Makes or rebalances a Spell page for a spell that exists nowhere outside the Wiki (homebrew, or a signature spell of this World), with full 2024 rules text and, in a Campaign, a tradition that casts it and a source the Party can learn it from. Use when the DM or a design needs a new spell, or when a homebrew Spell needs balancing.
---

# Spell design

Published spells are used as published, from their World-free pages in `wiki/Spells/`, the SRD or the DM's books, and this skill makes a page only for a spell those sources lack. A good Spell does something no published spell does, clearly enough to run at the table. In a Campaign, it belongs to a tradition in the World, and the Party can learn it from a named source at a price.

A Spell's **minimum** is its name, level and school, casting time, range, components, duration, effect in 2024 rules wording with higher-level scaling where it has one, and classes. A Campaign Spell adds the tradition that casts it and who in the World knows it. Every other part is optional, added only as step 10 allows. Each minimum item comes from the DM's ask, the Canon or a spell the ask names, and step 5 sizes the effect's numbers from them. The steps draft whatever those leave open as a proposal for step 9 to ask about.

## Steps

1. **Route, then read the Canon.** A Spell is World-free by default (`CONTEXT.md` **World-free page**): setting-neutral in every name and line, with no Canon to read, and it skips steps 4, 7 and 8. It is a Campaign Spell only when the ask shows that intent, by naming the Campaign or one of its Factions, people or pages, or by asking for the Spell to explain Campaign Canon. For a Campaign Spell, find with qmd the Spell's page if it exists, every page that links to it, and the traditions, casters, Factions and places it touches. Change each page as its `revealed` property allows (`CONTEXT.md` **Revealed**).
2. **Source it** in the order root `AGENTS.md` § Sourcing sets, starting with both of the Wiki's homes: the Campaign's own `Spells/` and the vault-root corpus `wiki/Spells/` of published spells. Search them by rules function and fantasy as well as name. Glob them by name (`wiki/**/Spells/*wall*`) and grep them by effect (`Restrained condition`, `Dexterity saving throw`). Search them with qmd by fantasy ("a tide that drags its victims under"). Then search the web on every new design, whatever the Wiki turned up, for official spells outside the SRD and homebrew to co-opt. That search keeps you from duplicating a spell that already does the job and shows the wording and scaling conventions a new Spell follows from its published peers. The SRD (`dnd5e-srd-api`, filtered by level and school as in `spells?level=3&school=Evocation`) is the last fallback for peers. It stays the quick source of exact published text for a spell already chosen. A published spell that fits is used as it is, with no new page. Otherwise take the two or three closest as peers and the nearest as the balance anchor. Your reply lists each candidate retrieved with its link, level, school and what it does, what fits and what fails, and the decision. An empty, failed or rate-limited search is an incomplete retrieval: report it as unknown and retry it another way before concluding that no spell fits.
3. **The lever.** One sentence stating what the Spell does that no peer does, and any choice it leaves its caster (where to put the wall, whom to spare, when to end it).
4. **Tie it to the World.** Link the **tradition** that casts it (a Faction, NPC or Creature page). State where its casters learned it and why it exists. Describe the **signature**, the sight, sound or smell of casting it, rooted in that tradition. When it has a **price** beyond the slot, draw it from the World (a material it makes rare, a mark the spell leaves, a debt). Run the swap test with a generic spell's name.
5. **Numbers.** Set each casting field of the minimum in 2024 values, and size the effect against the anchor and the damage table below: its level, school, damage dice and saving throw or attack roll set the starting point, and your reply gives each divergence from them its reason. Damage at higher levels scales like the anchor's.
6. **Rulings.** Answer the tricks Players are likely to try with it, and state how a target or rival caster counters it. When someone in the World would turn it on the Party, name that NPC or Creature.
7. **Discovery.** A named source (an NPC, Item, Site or Faction page) with a reason to hold it, the price of learning it (coin, a favour, a task, a risk), the Clue that tells the Party the source exists, and who notices when a PC first casts it.
8. **Narration.** Hand `theatre-of-the-mind` the Casting slot with the signature.
9. **Ask.** When any minimum item is still your proposal, send your orchestrator one question listing each with your proposed value and its grounds, and file once the DM answers. Your orchestrator puts every open item to the DM in one batched question, and a top-level session is its own orchestrator.
10. **File** to `wiki/templates/spell.md`. A World-free Spell files at `wiki/Spells/<slug>.md` as the template's entry alone, with no `revealed` in its frontmatter. Campaign Spells file at `<campaign-folder>/Spells/<slug>.md`, and a Campaign that needs a World-free Spell copies it there as its own version (`docs/wiki-layout.md` **Campaign versions**). A page already filed keeps its folder. Each part the template marks `Optional.`, the Casting callout included, goes on the page when its guidance condition holds. Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Close per `skill://lint` § Commands with the page path.

## Damage by level

Typical damage for a spell with a save for half. A spell that also imposes a condition or never misses deals less.

| Level | One target | Several targets |
| --- | --- | --- |
| cantrip | 1d10 | 1d6 |
| 1 | 2d10 | 2d6 |
| 2 | 3d10 | 4d6 |
| 3 | 5d10 | 6d6 |
| 4 | 6d10 | 7d6 |
| 5 | 8d10 | 8d6 |
| 6 | 10d10 | 11d6 |
| 7 | 11d10 | 12d6 |
| 8 | 12d10 | 13d6 |
| 9 | 15d10 | 14d6 |

A cantrip with high damage and long range that also skips the saving throw moves to a higher level or gives up one of those strengths. A Spell able to end a Climax outright gets a cost, a contest or a choice.

## Done

- No published spell does its job, the reply records the candidates retrieved from the Wiki and the web with each fit and decision, and the lever states what the Spell does.
- In a Campaign, the tradition links a page, and the signature and any price pass the swap test.
- Each minimum item comes from the ask, the Canon, a named spell or the DM's answer, each casting field holds a 2024 value, and the effect's numbers match the cited anchor or give a reason for each divergence.
- The rules text or Rulings answer each likely trick, and in a Campaign a named source offers the Spell at a price.
- The page gate over the Spell's page reports `ok: 0 findings`, and the reply lists every new fact decided as Canon.
