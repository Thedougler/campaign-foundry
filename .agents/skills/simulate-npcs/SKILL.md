---
name: simulate-npcs
description: "Plays NPCs as isolated Persona agents, one per NPC, under a Director: test a Story's cast, draft dialogue in each voice, rehearse a social Scene or find NPCs' offscreen moves. Use when an outcome hinges on what NPCs would do or say."
---

# Simulate NPCs

A Simulation plays a cast of NPCs scene by scene. You are its Director. Only the top-level session can dispatch Personas (root `AGENTS.md` **Flat dispatch**), so the Director is always the top-level session. A subagent whose work needs a Simulation (a Prep runner, say) returns a request for one, giving its purpose, cast, scenes and span, and the top-level session runs it and sends the requester the step 6 report. Each NPC is one `persona` agent that knows only its dossier and the events it witnessed, so no Persona learns another NPC's secrets and each NPC speaks in its own voice. The method follows Yu et al. 2025, StoryBox and CharacterBox, quoted from [the research](../../../docs/research/creative-writing/character-simulation.md).

Everything a Simulation produces is a possibility. It becomes Canon only when the DM keeps it.

## Steps

1. **Frame.** State the purpose: `story test`, `voice`, `rehearsal` or `offscreen`. Choose a short kebab-case slug for the run. List the scenes, each with a name, outline bullets, a specific place, the NPCs present and each NPC's goal for that scene. Label every input `Canon:` when it comes from a played Session or a Wiki page, and `Possibility:` when it comes from a Story Bible, a pitch or Prep. Then order the scenes with Yu's chronological-outline instruction, reading `<Outline>` as your scene list:

   ```
   Sort, and rewrite the scene outline bullet points to be suitable for a role-playing game (RPG). Ensure that:
   - Strict chronological order: Events must be structured in the order they occur, avoiding retrospective narration (e.g., no "recounting" of past events).
   - The outline focuses on character-driven development and role-playing dynamics
   - The updated outline should have similar number of word as the original <Outline> provided.
   - Do not add any event, only reorder original events mentioned in <Outline> provided.
   ```

   Each scene occupies its own stretch of in-world time. Split any scene that overlaps another into separate scenes. **Done when** the purpose and slug are stated, every input has its label, and the scene list runs in chronological order with no two scenes sharing in-world time.

2. **Dossiers.** For each NPC, read its Wiki page and, when a Story Bible exists, its card in `local://collab/bible.md`. Write `local://collab/sim/<slug>/<Npc>.md` holding:
   - Yu's profile fields: name, gender, age, narrative role, setup, speaking characteristics and the goal for each scene the NPC plays
   - the NPC's knowledge, drawn from the page's `Play` lines and its `Depth` (History, Hidden truths): the facts it knows, the things it wrongly believes and the lies it tells. Keep only this NPC's own knowledge. Leave out another NPC's secrets and DM truths this NPC lacks. Retell every rules term as what the NPC perceived, per [In-world voice](../../../AGENTS.md#in-world-voice). The dossier contains only in-world words
   - physical state: body, wounds, gear and the NPC's position when the first scene opens
   - three sample lines: an ask, a refusal and a line under pressure. Copy them from the bible card or the page's `Play` when they exist; otherwise write them from the page's Voice per the `Voice` section and closing check of [npc-design's craft reference](../npc-design/references/craft.md)

3. **Cast.** In one `task` batch, spawn one `persona` agent per NPC, named `Persona<NpcNameCamelCase>` (`PersonaTalonSkarn`). Each task is that NPC's dossier text, pasted whole, followed by your first Director command for it. The batch's shared `context` contains only what every Persona may know, such as the scene's place and in-world time. PCs stay with you: the Party enters the Simulation only as events you narrate, each labelled `Possible Party action:`. **Done when** every NPC in the scene list has exactly one running Persona and every PC appears only through labelled Director events.

4. **Direct.** Run each scene in chronological order. Before every command, apply Yu's termination check, reading `<ChatHistories>` as the scene's ledger entries:

   ```
   review the <ChatHistories> … decide if the chat has covered the outline of the scene. … The reasoning must be specific, in terms of exact character and event in the scene outline not yet covered.
   ```

   While the outline has uncovered events, write the next command with Yu's command format, reading `<Scene>` as the scene's outline bullets:

   ```
   1. Continuation Planning: -Examine the <ChatHistories> ... repeat **EXACTLY** the remaining part of the **outline** of the <Scene> provided that is not shown in the <ChatHistories>.
   2. Agent Selection and Command: -From your continuation plan, ... choose which character agent should role-play next. Provide the exact name of that agent.-Directly address the chosen agent with a concise, high-level command for one turn. The command should provide a summary directive—indicating the intended action or dialogue direction—tailored to the character's age, gender, and personality. Avoid including detailed dialogue or overly specific descriptions. **Be concise**
   ```

   Send each turn with `write agent://<id>`, using the id the batch returned for that Persona. The message contains the events that Persona witnessed since its last turn, from the ledger's witnesses field, followed by the command. The Persona's reply arrives as its delivered result, and `read agent://<id>` shows the latest one. Append the reply to the ledger (step 5) before the next command.

   For the `offscreen` purpose, run `echo $((RANDOM % 10))` before each command. On 0 to 2, StoryBox's Abnormal Factor of 0.3, the command invites the NPC to break from routine in a way true to its dossier.

   A scene ends when the termination check finds the outline covered, or at 12 commands. **Done when** every scene has ended, each with its termination reasoning or the cap recorded in the ledger.

5. **Ledger.** Keep `local://collab/sim/<slug>/ledger.md` as one entry per event, every Persona reply and every Director-narrated event alike, with StoryBox's fields: id, in-world time, place, participants, witnesses, description and detail. The description is one line. The detail follows StoryBox's definition:

   ```
   incorporates factors such as the environment, the time of day, the status of the characters involved, and the location … including their actions, emotional states, and possible motivations.
   ```

   Witnesses are the NPCs present at the place who could perceive the event. Each Persona hears next only the events that list it as a witness. **Done when** every turn and narrated event of the run has a ledger entry with all seven fields filled.

6. **Report.** Return to your caller:
   - each NPC's decisions
   - surprises against the Story Bible or the NPC's page
   - knowledge leaks: each Persona line using knowledge outside its dossier and its witnessed events, judged with CharacterBox's Knowledge Accuracy criterion
     ```
     Ensures information provided by character is factually correct and aligned with their background knowledge
     ```
   - quoted voice lines the DM could reuse in play, attributed to their NPC
   - offscreen moves, each with its in-world time and the sign a Party could perceive
   - the ledger path

   Label the whole report as possibilities for the DM to keep or drop. **Done when** every Persona line has been checked for leaks, and every section above is present or stated as empty.

7. **Persistence.** Within one run, send later scenes to the same Persona ids, so each Persona's own session stores its memory of earlier scenes. A new run spawns fresh Personas. Idle Personas park and revive natively. **Done when** every scene of the run went to the Personas cast in step 3.
