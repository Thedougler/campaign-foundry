---
name: cliffhanger-scene
description: "Cliffhanger — build or revise a physical contest from a Prep Scene Chart row or a direct request for a fight, chase or hazard Scene."
---

# Cliffhanger Scene

A Cliffhanger puts bodies, a Vehicle or a Location at physical risk, with the result decided in play. It turns the preceding Development's information into a test. The following Scene deals with the resulting change.

The shared procedure is [`docs/agents/scene-pages.md`](../../../docs/agents/scene-pages.md). Each step below references the section of it that applies.

## Steps

1. **Orient and ground.** Read `docs/agents/scene-pages.md` whole, then apply its **Orient** and **Ground**. The template is `wiki/templates/Scene - Cliffhanger.md`. **Done when** both sections' Done criteria hold.
2. **Locate the test.** From the Scene Chart row and preceding conditional outcomes, identify the Thread being tested, what the Party can physically gain or lose, and the receiving Scene. A direct request without Prep takes the standalone path from **Orient**. Follow scene-pages **Scripting the Game**: alternating Development and Cliffhanger middle slots, with the Session's highest stakes reserved for the Climax. **Done when** each possible incoming state gives the Party a position, usable information and a danger it can act on, whatever the preceding Scene's result.
3. **Choose the contest.** Select a card from **Cards** below, recorded as scene-pages **Card** directs, and the Fight, Chase or race, or Hazard engine under **Rulings**. Set a pacing target of three to five combat rounds, or twenty to thirty minutes for a non-combat contest, within the Scene's roughly half-hour slot. State the objective, the deadline and the condition that ends play. Pressure brings play to that condition if neither side finishes earlier. **Done when** the card fits physical peril and pressure brings play to its end condition, with a ruling for each required decision.
4. **Resolve the cast.** Apply scene-pages **Cast**. **Done when** its Done criterion holds.
5. **Make the stakes visible.** Start the page as scene-pages **Page format** directs. Under `### Stakes`, state each side's objective, the body, Vehicle, Location or Item at risk, and what winning, losing or abandoning the contest changes. Give the Party a perceivable warning and a first decision. **Done when** every incoming state has its objective, risk and first decision on the page.
6. **Build the engine.** Fill the selected **Rulings** branch and the card's requirements, after the Reuse audit reconciles reused rules with their owners.
   - `### Terrain`: two or three usable features with numbers, and one triggered change.
   - `### Pressure`: give a tick each round or turn. It moves the goal, alters an exit or increases danger. State its timing, effect, counterplay and terminal state.
   - `### Checks`: each check and save in the Page format Checks table, with its action cost.
   - `## Encounter`, whenever a Creature can be fought, including a fight avoided by negotiation: scene-pages **Encounters**. Under `### Creatures`, give each side its opening tactic, response to interference, break point and departure route or surrender terms. A creature-free contest leaves `## Encounter` out and follows the Hazard **Calibration** bullet.

   **Done when** every reused effect and budget figure agrees with its read source, and the DM can resolve a full turn, a Party countermeasure and a pressure tick up to the end condition from the page and its embeds.
7. **Opening.** Write the `Opening` and any Creature or NPC entering callouts with scene-pages **Narration**, recipe `### Cliffhanger`. Its caller input includes every incoming state that changes the visible cast, carrier, passengers or threat, and each such state gets its own variant. The first sentence is the immediate threat, and the block ends before its resolution. **Done when** each incoming state selects a factually fitting, compliant spoken block with quoted Final check evidence, and its Players can act before danger or an outcome is resolved.
8. **Carry the result forward.** Fill `## Outcomes` with scene-pages **Outcomes**, distinguishing success, failure, withdrawal or surrender, and any plausible split result. Each row states its trigger, changed positions, conditions, resources or possession, the cost that remains, and the receiving Scene's entry state.
   - A loss creates a playable problem, such as capture with terms and a destination or separation with known positions. When the Party loses an Item, state its holder. A closed route leaves remaining options.
   - State lethal consequences where the fiction and Campaign tone allow them, with their triggers and escape opportunities.
   - Hand to the next Scene Chart row, normally a Development. A final middle slot may hand to the Climax when the Chart lists it next. A standalone Cliffhanger states the next Development premise and entry state. A requested Chart change goes to `prep-session`.
   - Fill `## Depth` with hidden truths and the Spotlight. State what each result does to the tested Thread.

   **Done when** every plausible result has a conditional continuation, including a prevented escape or a declined fight, and no continuation stacks another Cliffhanger.
9. **Cold read and complete.** Apply scene-pages **Cold read** to the Scene and its dependencies. Trace each incoming state through the actual Narration, Play, Encounter and Outcomes, checking the chosen card's requirements and the rulings for avoiding or interrupting the contest. Reconcile every local rules summary with its owner and every Balance value with the `bun run cf -- encounter-budget` output. Then apply **Completion**, Standalone or Composed as **Orient** resolved. **Done when** every branch is runnable from the filed page and both sections' Done criteria hold.

## Rulings

Keep rules beside the action that uses them. Use Campaign House Rules first, then sourced 2024 rules. Declare a new procedure as a House Rule through its owner. Each check states its Ability (Skill), DC or opposed modifier, action cost, success and failure effects. Each saving throw states the ability, DC, damage and conditions, their duration and how they end.

**Reuse audit.** Read the rules-bearing sections of every terrain, hazard, Creature, Item and Vehicle owner used by the contest. Match the Scene's damage, DCs, movement costs, triggers, frequency, duration, escape and recovery procedures to those sections. Preserve their values and conditions when summarising. A new progress track measures that Canon procedure and leaves it in place. Add Scene-specific rulings only where the sources lack one, marking their design status and following the source hierarchy. Before cold read, cross-check every local rules line against its owner so a convenient engine has not silently changed the danger.

### Fight

- **Position.** State starting distances, cover, elevations, entrances and exits. Give each damaging terrain feature a warning, trigger, target, frequency and resolution. Give each climb, leap, obstruction or interactable feature its relevant ruling.
- **Opposition.** State Creature counts, starting positions and who pursues which objective. Reinforcements have a trigger, arrival position and limit, and their XP belongs in the shared balance calculation. Preserve the uncertainty of retreat, capture and escape: resolve them through reachable routes, Creature abilities and Party interference.
- **Risk.** Balance every possible fight with scene-pages **Encounters**. For a champion's duel, the budget counts that champion only. If the command cannot run, report that prerequisite rather than calling the Encounter balanced. A force intended to drive flight has an explicit warning and feasible exits. Give its capture or defeat consequences, and label its actual danger.
- **Initiative.** Resolve a sprung Ambush through the sourced 2024 detection, Surprise and Initiative rules. Surprise gives Disadvantage on Initiative. The ambushers' opening tactic takes a normal turn in Initiative order.

### Chase or race

- **Track.** State who pursues whom, starting positions or lead, movement speeds, route length and the interval used to update progress. Give a numerical catch, escape or finish condition and a deadline. If using zones, define their distances and movement costs.
- **Turns.** State how movement, Dash, attacks, Spells, obstacles and hiding affect progress, and how the sides act each interval. Source any Dash limits, Exhaustion or other chase rules used. Fix the rival's movement policy before play so its progress follows the same declared procedure.
- **Route.** Give at least three complications with DCs or movement costs, success/failure effects and a way to bypass or exploit each. Rule shortcuts, misdirection, interference and dropping or protecting the objective. A good idea changes the track or the obstacle itself.
- **Contact.** State what happens when someone catches the quarry, the Party splits, a participant is outpaced, or the objective changes hands. If contact can turn into combat, give that fight starting positions and embedded Creatures. Balance its Encounter for the Party.

### Hazard

- **Warning and trigger.** State the visible or otherwise perceivable tell, the hazardous area, what activates it and when its effect repeats. Essential warnings and routes are available before committing to the risk.
- **Effect.** Give the affected targets, checks or saves, DCs, damage, conditions, movement or object effects, duration and recovery. Place a fixed hazard's reusable rules on its Site and bring the Scene's usable rulings into Play. A carried hazard belongs to its Item.
- **Counterplay.** Provide at least two workable approaches, such as disabling, bypassing, sheltering or exploiting it, with action costs and consequences. Include a concrete effect for failure that changes the physical situation while leaving a continuation.
- **Calibration.** A creature-free contest leaves out the optional `## Encounter`. Under `### Stakes`, state that there is no Creature opposition or combat XP budget, and explain the danger against these PCs through DCs, damage, exposure, resource costs and available countermeasures. Where Creatures and a hazard overlap, calculate Creature XP and separately explain the extra hazard risk. Leave the hazard out of the Creature XP sum.

For a mixed contest, state the trigger that switches engines, what carries over and which clock keeps running. Resolve each action under one rules procedure.

## Cards

Select for the fiction, then satisfy the requirements in the page's existing sections. The card sets up the contest, and play settles its result.

| Card | Contest and required decisions |
| --- | --- |
| Ambush | One side attempts a concealed attack. Place the hidden force, its detection opportunities and cover, opening tactic and fallback. Prepared PCs can detect, reverse or evade the ambush through the stated rulings. |
| Confrontation | Force backs a demand before anyone strikes. State the demand, visible advantage, deadline, threshold for violence and costs of defiance, bargaining, bluffing or compliance. Prepare the contingent fight. Physical coercion can resolve without blows. |
| Chase | The Party pursues someone or something it needs to catch. Define the lead, route and escape point. Give the quarry a response when caught and ways for Party tactics to change the lead. |
| Pursuit | The Party is the quarry. Make the superior force legible, give hiding and diversion rulings, and state the terms and destination of capture. Escape, concealment and sacrifice have measurable effects. |
| Race | Both sides seek the same physical goal. Give each route, checkpoints, rival progress and what possession grants. Shortcuts, sabotage and cooperation can change the result. |
| Fist Fight | An unarmed clash with agreed or improvised limits. State the stake, participants, current Unarmed Strike, Grapple and Shove rulings, yield condition, audience influence and the cost of violating the terms. |
| Duel | Champions fight under terms. State eligible combatants, weapons or permitted powers, victory and yield conditions, enforcement and consequences for refusal, substitution, cheating or outside intervention. Balance for those actually fighting. |
| Battle | Open combat over objectives. State each side's force and goal, the Party's reachable objective, battlefield change, morale break and withdrawal terms. For larger forces, define which Creatures enter this Encounter and how the surrounding conflict affects it. |
| Monster | A dangerous Creature's needs drive the contest. Give signs before contact, its goal, a usable behavioural pattern or weakness and the conditions for appeasing, diverting or driving it off. |
| Obstacles | Collapse, flood, fire, storm, trap or barrier threatens passage or survival. Give the tell, trigger, numbered effects and multiple solutions. Tie any earlier Clue to a concrete advantage here. |
| Dogfight | Aerial combat involving Vehicles, mounts or flying Creatures. Establish altitude, range, movement, crew actions and a sky feature. Use linked Vehicle rules and fought Creature embeds. Rule disengagement, forced landing, falling and a damaged craft's fate. |
| Contest | A bounded physical competition with bodily or material risk. State the task, modifiers, scoring, time limit, stakes, yield and interference rulings before the first roll. A purely cerebral competition belongs in a Development. |
| Skirmish | A brief clash exposes part of a larger force. Give a limited objective, opposition break point, telegraphed escape method and a way to stop it. Victory, capture and a thwarted retreat each produce their own aftermath. |
