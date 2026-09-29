---
name: creature-design
description: Makes or retunes a Creature page, a 2024-rules stat block tuned against the current Party, sourced Wiki first, then SRD, then the web, then new design. Use when a Creature is needed for a Scene, an NPC or a Location, when an NPC needs statistics, or when the DM says a Creature felt too soft or too hard.
---

# Creature design

A Creature is rules, never a person: the person is an NPC, whose page links here through `creature`. A good Creature is, in order:

1. **A fight worth having** against the Party the DM actually has, not the average party its CR assumes, with every feature a question the Players must answer.
2. **A real thing in the World** that eats, nests, hunts and leaves signs, which the World's people have names, rules and uses for.
3. **A look the table remembers,** where every ability shows on the body as a **tell** a sharp player can read.

## Steps

1. **Read the Party.** From each PC's `## Sheet` in the active Campaign, note level, AC, HP, weak saves, best first-round damage, signature trick and mobility. Then total their **nova** (everyone's best first round), their sustained damage per round, their healing and their hard control. With no active Campaign, tune to the CR's assumed party and say so. Done when every PC has a row and the totals are written.
2. **Read the Canon.** With qmd, find the Creature's page if it exists, every page that links to it, its home Region and Sites, its prey and predators, and every Faction that hunts, fears, tames or worships it. Note the other Creatures in its Region and the niche each fills. Done when every hit is either used or set aside with a reason.
3. **Source it** in the order `AGENTS.md` sets. A Wiki Creature that fits is reused. Otherwise look for a peer: the SRD first (the `dnd5e-srd-api` skill), then official and homebrew material on the web. Choose the path and write one line saying why it is enough:
   - **Reuse** a stat block whole (ADR 0005 puts full text in the Wiki), when the fight and the fiction both fit. A reused block gets a lean page: At a glance, the block, a Tactics line and a line of Ecology, with the reply to match.
   - **Reskin** when only the fiction changes. The numbers stay, though step 6 may still retune them.
   - **Variant** when one or two features change.
   - **New design**, built from the closest peers, when neither the role nor the fight can be reached otherwise.
4. **Make it this Creature and no other** (variant and new design). Write the stock version in one line ("a big wolf"). Break one rule it keeps, using Canon: the lich whose phylactery is a place. Give it a niche no neighbour fills, or the same niche taken another way (another time of day, another prey). Draw each signature ability from a body part or habit the Players can see. Then run the **swap test**: put a neighbour's name in place of this Creature's, and rewrite every line that stays true. Done when its twist, niche and signature are true of this Creature only.
5. **Retuning** starts from the fight that felt wrong: name what happened in it (its Recap and Scene), then give each changed number its reason. List in your reply every NPC whose `creature` is this one, since they change too.
6. **Build the fight** with [references/fight.md](references/fight.md): difficulty target, one role, a signature move written as tell, threat, at least two answers and payoff, escalation for a solo or boss, and when it flees or bargains. Cut every feature that has no answer or payoff.
7. **Set the numbers** with [references/numbers.md](references/numbers.md), then script its first three rounds against the Party. Done when you can state four figures, each inside the difficulty target: the rounds it lasts, the rounds it needs to drop the most exposed PC, the CR its defence matches, and the CR its offence matches, with the stat block's `cr` their average.
8. **Place it in the World.** Each ability leaves a sign before anyone meets it (tracks, kills, sheds, a sound that stops). Decide its habitat, what it eats and leaves behind, how it lives (alone, pack, court), what locals call it and guard against, what its body is traded for, and its origin and secrets. Wikilink every page involved. New facts the Canon lacks are decided now, as Canon (ADR 0003), and listed in your reply.
9. **Narration.** Hand `theatre-of-the-mind` the First sight slot with its facts: body plan and size against something familiar, the striking feature (usually the twist), colour and texture tied to the body part carrying them, one sound or smell, what it does at rest, and each signature ability's tell as plain appearance.
10. **File** to `wiki/templates/Creature.md` in `<World>/Creatures/`:
   - **At a glance:** role at the table, threat (CR and what it does to a Party), tell, what it is weak to, and the NPCs it stands behind.
   - **Statblock:** one `statblock` block in the 2024 phrasing, every derived number written out ([references/numbers.md](references/numbers.md) has the field format).
   - **Play:** Tactics (opening, signature tell, what it does when countered, what shuts it down, when it flees) and Outside a fight.
   - **Depth:** Ecology (habitat, diet, signs, uses), and Hidden truths, each with how the Party can learn it.

   Run `pnpm check <page>` until it passes (its `statblock` layer checks the arithmetic), and log the page in the operation's `cf log` entry (`--op create` when this skill runs on its own).

## Done

- The Party read and the Canon read are written.
- The path has a one-line reason; a variant or new design passes the swap test.
- The signature move has a tell, two answers and a payoff, and every feature asks the Players something.
- The four figures are stated against this Party and sit inside the difficulty target.
- Every signature ability has a sign in the World and a tell in the Narration.
- `pnpm check` passes on the page, and the reply lists every new fact decided as Canon, with the pages it grew from.
