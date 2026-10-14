# Combat sim terms

The glossary for `cfcli combat` and `src/combat/`. [ADR 0048](adr/0048-combat-sim-engine.md) records the design, and `docs/research/combat-sim-coverage.md` tracks parity with the legacy tools. `CONTEXT.md` holds the rest of the glossary.

- **Combat sim**: the Monte Carlo fight simulator behind `cfcli combat`, which plays a Scenario many times from Wiki pages and reports the spread of outcomes. Its numbers are evidence for the DM's Encounter. They are not Canon, and they don't forecast what the Players will do. _Avoid_: combat-sim or dndsim (the legacy tools), battle AI, Simulation (NPC Personas).
- **Combatant**: one PC, NPC or Creature compiled from its page for the Combat sim. It contains the page's numbers and Actions, and lists its Unmodelled features. Ten copies of a Creature are ten Combatants. _Avoid_: actor (a Foundry term), token, unit.
- **Scenario**: the setup the Combat sim plays: the sides and their Combatants, Policies, loadouts, resources, formation and the assumptions behind them. It lives on its Scene page, or in a file for exploratory runs. _Avoid_: encounter (the Scene's plan, which a Scenario models), setup, config.
- **Trial**: one simulated fight played from first initiative to its end. A run plays many Trials of one Scenario from one seed. _Avoid_: iteration, universe, round (six seconds of a fight).
- **Primitive**: one member of the closed vocabulary of effects the Combat sim can resolve. Attacks, saves, damage and conditions are Primitives. Importers compile authored features down to Primitives, and each Primitive has exactly one Mechanic. _Avoid_: ability or feature (those name authored content).
- **Mechanic**: the one module that resolves a Primitive during a Trial and states its expected value for Policies, held to agreement by a test. _Avoid_: rule (the 2024 rules text or a House Rule), executor.
- **Policy**: the swappable decision-maker that picks a Combatant's action, movement and targets each turn. Greedy expected value and focus fire are Policies. Each side of a Scenario has its own. _Avoid_: AI, tactics (the Creature page's prose section).
- **Unmodelled feature**: a feature, action or spell named on a page that the Combat sim cannot resolve. Each report lists the Unmodelled features of its Combatants. A result always shows what it left out. _Avoid_: unsupported, ignored, skipped.
