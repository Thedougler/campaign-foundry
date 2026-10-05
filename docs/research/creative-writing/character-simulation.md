# CharacterSimulation report (verbatim scout output)

# 1. Yu, Shi, Zhao & Penn 2025 — Multi-Agent Character Simulation for Story Writing

**Pipeline.** Plan P_p (syuzhet, presentation order) → LLM sorts scenes into P_c (fabula, chronological) → per-scene role-play loop → per-scene rewrite into story text in presentation order. Scene S = {name, outline bullets, plot_element (exposition…resolution), place (specific/detailed), importance 1–10, characters each with a scene-level CHARACTER GOAL}. Character = name, gender, age, narrative role, setup, speaking characteristics, character goal.

**Director agent** (group-chat manager). Three LLM calls per turn: should_terminate, next_speaker, next_command.

Chronological outline creation (§B.1.2):
```
Sort, and rewrite the scene outline bullet points to be suitable for a role-playing game (RPG). Ensure that:
- Strict chronological order: Events must be structured in the order they occur, avoiding retrospective narration (e.g., no "recounting" of past events).
- The outline focuses on character-driven development and role-playing dynamics
- The updated outline should have similar number of word as the original <Outline> provided.
- Do not add any event, only reorder original events mentioned in <Outline> provided.
```
Termination (§B.1.2): "review the <ChatHistories> … decide if the chat has covered the outline of the scene. … The reasoning must be specific, in terms of exact character and event in the scene outline not yet covered."

Command format (§B.1.2, Director Command and Select Agent):
```
1. Continuation Planning: -Examine the <ChatHistories> ... repeat **EXACTLY** the remaining part of the **outline** of the <Scene> provided that is not shown in the <ChatHistories>.
2. Agent Selection and Command: -From your continuation plan, ... choose which character agent should role-play next. Provide the exact name of that agent.-Directly address the chosen agent with a concise, high-level command for one turn. The command should provide a summary directive—indicating the intended action or dialogue direction—tailored to the character's age, gender, and personality. Avoid including detailed dialogue or overly specific descriptions. **Be concise**
```

**Character agent prompt** (§B.1.3), exact input fields: `<Character>` (goal, age, gender, personality schema), `<DirectorCommand>`, `<CharacterMemory>` (string), `<CharacterPhysicalState>` (string), `<RecentHistories>` ("The most recent, up to 10 histories"). Header:
```
You are acting as an agent in a role-playing game. You will produce responses on behalf of the agent from a third-person perspective, describing both the agent's actions and dialogue. Adhere to the agent's goals, age, gender, and personality at all times, **ensuring the response reflects their memory and physical state in a logical way.**
```
Guidelines include: "Do not include any concluding commentary—only provide the agent's response"; observer's perspective; no contradictions with established traits.

**State update (§B.1.3).** On each selection, before responding: memory and physical-state prompts take `<NewChatHistories>` — "history … that is **not yet seen by the current character**" — plus `<Character>` and current memory/state. Memory rule verbatim:
```
Update the memory on what the current character should know based on the history, and return the updated memory. The memory should contain the history of events that the character has experienced, and any information that the character has learned from the conversation. Do not include any irrelavant information, and the memory should be in first character standpoint.
```
Physical state: "must be consistent with the <Character>, in terms of their age, gender and set up, and also make sense based on the <NewChatHistories>." Agents are reused across scenes via a name→agent map so memory/physical state accumulate.

**Rewrite prompt** (§B.2), fields: WritingPrompt, CentralConflict, StorySetting, StoryScenes (all scenes), StoryContent (written so far), SceneCharacters, TaskScene, TaskScenePlotElement, TaskScenePlace, RolePlayHistory. Key instructions verbatim:
```
Refer to the <RolePlayHistory> for **realistic character actions and dialogues** in an RPG game of the <TaskScene>. But begin your portion of the story in a way that naturally flows from the ending of <Story>. Match the writing style, vocabulary, and overall mood of the existing text. Do not re-explain details or events that have already been described. Ensure dialogue and actions **align with character traits**
```
Scenes are written sequentially so a human can edit each scene before the next is generated.

**Evaluation.** GPT-4o (temp 0.9, frequency penalty 0.2, zero-shot) writes all systems' stories; plans synthesized by an O3-mini teacher from gold stories (Tell Me A Story, 28 prompts). Judge: Gemini 1.5 Pro, pairwise, each pair judged twice with swapped order; criteria Plot/Creativity/Development/Language Use + separate Overall; Bradley–Terry on win matrices (App. A). Verbatim answer template: "Based on my assessment, the better story for each dimension is: Plot: [A or B or Same] …". Results (paper-reported): Overall wins — Ours 15–9 over Agents' Room, 33–0 over Dramatron; Dramatron 42–23 over Agents' Room. Normalized BTL log-strengths (Fig. 4, read from figure): Ours ≈2.40 overall (Plot 2.48, Creativity 1.86, Development 2.40, Language 2.25) vs Agents' Room ≈0.97 and Dramatron ≈0.52. LLM-only evaluation; human evaluation is stated future work. Qualitative finding: chronological role-play memory prevents both Dramatron's hallucination of unknown past events and Agents' Room's premature reveal of future info (train-026 example). Failure observed: director repeating the same command when unsatisfied → capped at "a maximum number of 10 iterations".

**Published limitations:** scene-sorting assumes scenes never temporally overlap — interleaved flashbacks within a scene break it; "it does not explicitly enforce privacy during the role-play process"; LLM eval only.

# 2. StoryBox (arXiv 2510.11618v3)

**Sandbox init (App. F/G).** World generated as YAML from premise/setting/character list, hierarchical World:City:Place:Area:Object, every node with a description (example: "Research Desk — A desk cluttered with scientific instruments and papers."). Personas via GPT-4o mini from a scratch.json example; fields per character: Name, Age, Innate (trait adjectives), Learned (background), Currently (current situation/goal), Lifestyle (daily rhythm), Living Area (colon path, e.g. `Frozen City:City Center:Tech Hub:Room 5`), Daily Plan Requirement (numbered tasks, regenerated each simulated day), plus an Abnormal Behavior attribute. Verbatim from Generate Persona Scratch Information:
```
Please note that living_area is related to the world, starting from the root node and using colons to separate each level, with a total of four levels. For example: Frozen City:City Center:Tech Hub:Room 5
```
Spatial memory = the world tree converted to per-persona JSON of known places. Relationships come from the input character descriptions (no separate relationship generator shown in the paper).

**Behavior & events.** Three behavior types: move (go somewhere + act), chat, none ("moments of reflection, rest, or inaction, which contribute to pacing and tension"). Every action is an event: unique ID, start/end time, participants, location, `description` (one-line, e.g. "Starting coding on NLP models") and `detail` — the load-bearing field that "incorporates factors such as the environment, the time of day, the status of the characters involved, and the location … including their actions, emotional states, and possible motivations."

**Routine vs Abnormal Factor.** Daily plans become hour-by-hour schedules. The Abnormal Factor is "a hyperparameter … A higher value for this factor increases the likelihood that the character will break from their routine"; config sets it to 0.3 (30% chance per planning phase). Ablation: removing random abnormal behaviors causes "the sharpest decline, particularly in Creativity, Character Development, and Conflict Quality" (figure-based).

**Storyteller agent.** Events summarized per character per day → dynamic LLM-sized windows → condensed summaries. Then story type → title (iteratively refined, ranked by "relevance, creativity, and coherence") → background, themes, chapter titles, per-chapter conflicts, plot points (counts are hyperparameters; manual inputs skip generation). Chapter loop: retrieve relevant events (keyword + jina-embeddings-v3 dense vectors, FAISS, 512-dim) + prior chapter summaries → generate (a chapter takes several passes) → summarize → append to chapter summary history.

**Config (App. H).** GPT-4o mini, temp 0.8; sqlite3 event store; sim start "2024-09-01 12:00", 1 step = 1 hour; dialogue = "two interaction cycles … a total of four conversational turns"; 5 parse attempts else agent's iteration skipped; context cap 102,400 tokens; eval judge llama3.1:8b-instruct-fp16; ~0.5 real hours per simulated day for 6 characters, 7 days ≈ 4 h.

**Evals.** 20 settings (premise/setting/characters, no references); pairwise on 6 criteria (Plot, Creativity, Character Development, Language Use, Conflict Quality, Overall) by both humans (78 participants, Latin square) and LLM; plus Character Behavior Consistency (0–10) and Average Word Count. CBC rubric (App. E Table 3) verbatim:
```
1. Alignment with ISS: Do the characters' actions, decisions, and speech align with their ISS descriptions (e.g., traits, lifestyle, and current state)?
2. Believability: Are the characters' behaviors logical and consistent within the story's context and their established traits?
3. Avoidance of Contradictions: Are there any moments where characters behave in a way that directly contradicts their ISS?
Provide a score on a scale of 0 to 10, where:
0 means "The characters are completely inconsistent with their ISS descriptions."
10 means "The characters are perfectly consistent with their ISS descriptions."
```
Findings (paper-reported): StoryBox best on all six criteria in both auto and human eval; ~12,000 words average (other long-form ~10,000; vanilla LLMs ~1,000); auto trends "largely aligned" with humans, but humans preferred IBSEN over GPT-4o/DeepSeek-V3 more than the LLM judge did. Duration study: quality gains plateau past 7 simulated days while "token usage roughly doubles with each duration increase" → 7 days default. Ablations: object descriptions → Language Use; abnormal behaviors → biggest drop; dynamic context window → Plot.

**Limitations:** sequential (one character at a time) simulation is slow; evaluation remains costly/hard.

# 3. Generative Agents (Park et al. 2023) — memory techniques only

**Memory stream:** list of records {natural-language description, creation timestamp, last-access timestamp}; seeded from one paragraph split on semicolons. Retrieval score = weighted min-max-normalized combination of recency (exponential decay 0.995 per game hour), importance (LLM-rated), relevance (embedding cosine). Importance prompt verbatim:
```
On the scale of 1 to 10, where 1 is purely mundane (e.g., brushing teeth, making bed) and 10 is extremely poignant (e.g., a break up, college acceptance), rate the likely poignancy of the following piece of memory.
```
**Reflection:** triggered when summed importance of recent events exceeds 150 ("roughly two or three times a day"); asks over the 100 most recent records: "Given only the information above, what are 3 most salient high-level questions we can answer about the subjects in the statements?" then "What 5 high-level insights can you infer from the above statements? (example format: insight (because of 1, 5, 3))" — reflections cite supporting memory IDs and are stored back, forming reflection trees. **Reacting:** before each step, prompt with summary description + observation + relationship-memory summary and "Should John react to the observation, and if so, what would be an appropriate reaction?" Dialogue generated from each speaker's summarized memory of the other. Agents keep non-omniscient environment trees ("Agents are not omniscient: their tree may get out of date as they leave an area").

**Findings (paper-reported):** 100 evaluators, TrueSkill over 5 interview categories: full architecture best (μ=29.89, σ=0.72), beating ablations and the crowdworker human baseline; each ablation (no reflection, no planning, no observation) ranked worse. Emergent info diffusion: party knowledge 4%→52%, candidacy 4%→32% in two game days; network density 0.167→0.74; only 1.3% (6/453) hallucinated acquaintance claims. Failure modes: retrieval misses, memory embellishment ("he's going to make an announcement tomorrow" was fabricated detail), overly formal/cooperative dialogue from instruction tuning.

# 4. CharacterBox (arXiv 2412.05631) — consistency evaluation + narrator

**Narrator agent as world model:** after each character action it (1) analyzes influence and picks the single most-affected responder, (2) adjudicates the interaction result R, (3) updates both characters' "memories, physical positions, and psychological states", (4) updates the environment. Characters hold BDI-style self-beliefs (identity, self-awareness, goals) and environment-beliefs, plus a Generative-Agents-style vector-DB memory. Scene crafting uses three LLM roles — screenwriter, director, evaluator — and only accepts scenes passing "creativity, coherence, conformity, and detail".

**Metrics (1–5 each, GPT-4 critiques the trajectory first, then scores):** Character Fidelity = Knowledge Accuracy ("Ensures information provided by character is factually correct and aligned with their background knowledge") + Behavioral Accuracy; Human-Likeness = Emotional Expression + Personality Traits; Consistency = Immersion + Adaptability + Behavioral Coherence. Findings: GPT-4 top (avg 3.926 English / 4.342 Chinese scenes); Cronbach α mostly >0.9; Pearson 0.688 vs expert humans; reflective trajectory fine-tuning +19.9% EN / +12.8% ZH (training-based — not adoptable). Limitation implied by design: needs narrator reliability; distilled narrator (CharacterNR) trades accuracy for cost.

# Adoptable in a prompt-only skill workflow
1. **Fabula→syuzhet split** (role-play scenes chronologically, then rewrite into presentation order) — directly fixes flashback hallucination and premature-reveal failure modes the paper demonstrates.
2. **Chronology-forcing outline rewrite** — "avoid retrospective narration … present tense … Do not add any event, only reorder" — makes any outline role-playable.
3. **Director loop with EXACTLY-ONE-NAME speaker selection + one-turn, high-level command** "tailored to the character's age, gender, and personality … Avoid including detailed dialogue" — separates author goal from character goal.
4. **Termination check requiring specific reasoning** (which outline bullet, which character, not yet covered) — cheap, robust scene-ending rule.
5. **Hard iteration cap (10)** on repeated director commands — the paper's own fix for director loops.
6. **Character context = 5 fields:** profile (incl. speaking characteristics + scene goal), command, memory string, physical-state string, last-10 history items. Third-person responses so output doubles as prose source material.
7. **Memory/state updates fed only the history the character hasn't seen**, memory "in first character standpoint" — gives knowledge boundaries (who knows what) without any secret-tracking machinery.
8. **Rewrite prompt:** RolePlayHistory + story-so-far + style-match + "Do not re-explain details"; generate scene-by-scene so the DM can edit between scenes.
9. **StoryBox sandbox init as markdown:** world tree with colon paths and per-node descriptions; persona scratch (Innate/Learned/Currently/Lifestyle/Living Area/Daily Plan Requirements); regenerate daily plans per in-game day.
10. **Event ledger with description + detail fields** (detail = environment, time, statuses, emotions, motivations) — the detail field is what makes later prose rich; ablation supports environment descriptions mattering.
11. **Abnormal-Factor-style routine deviation** (~30% chance an NPC breaks routine) — ablation shows it's the single biggest driver of creativity/conflict quality.
12. **Layered summarization + chapter-summary history + hybrid retrieval** (per-character daily summaries; search event log by keyword and semantic search if available) for long-horizon coherence.
13. **Pairwise LLM judging with order swap** and the 4/5-criterion rubrics; reuse CharacterBox's **critique-then-score** ordering and its Knowledge Accuracy item as the explicit knowledge-boundary audit.
14. **Importance rating + threshold-triggered reflection** from Generative Agents for compressing NPC memory in long campaigns.

# Not adoptable
- **Embedding/FAISS/sqlite/Phaser infrastructure** (StoryBox, Generative Agents): needs a code harness; a skill approximates retrieval with grep/semantic search over markdown event logs.
- **Fine-tuning pipelines** (CharacterBox guided/reflective trajectory FT, CharacterNR/RM): requires training; not available in a markdown-skill harness.
- **Statistical eval machinery** (Bradley–Terry over full win matrices, TrueSkill, 100-person Prolific studies): overkill per-session; keep only pairwise+swap judging.
- **O3-mini teacher plan back-translation** (Yu eval setup): an artifact of evaluating against gold stories; a real campaign already has plans.
- **Whole-society simulation scale** (25 agents, "thousands of dollars" per two days, paper-reported): DM sessions need a handful of NPCs per scene.
- **Exact hyperparameters** (temp 0.8/0.9, decay 0.995, threshold 150, 0.3 factor): treat as starting defaults, not validated for this model/harness.
- **Yu's no-overlapping-scenes assumption:** must be stated as a constraint or the chronological sort silently misorders interleaved flashbacks (their own limitation).

# Isolation of per-character context vs one model playing all characters
Per-character isolation (own profile + own memory updated only from unseen history + last-10 turns) buys three things a single model playing every character cannot: (1) **true knowledge boundaries** — Aerie cannot reference the site visit before she has played that scene, so the same model that hallucinated under Dramatron (no access to chronologically earlier events) and leaked under Agents' Room (full outline visible) stays correct in Yu's train-026 analysis; secrets stay secret as a side effect of memory bookkeeping, not prompt rules. (2) **Voice stability** — each generation sees exactly one persona, so speech patterns and goals don't blur across characters in one shared context. (3) **Cheaper, focused turns** — ~10 history items + memory instead of a growing full script. The cost is call volume (director + per-turn state updates per character) and that world-facts now propagate only through witnessed events — which is exactly why StoryBox's event `detail` ledger and Generative Agents' retrieval matter as the shared ground truth both the director and the rewrite step read. Yu's stated gap — role-play isn't explicitly privacy-enforced — is the failure mode to watch: the rewrite step sees the full RolePlayHistory, so presentation-order secrets must be enforced there, not in the transcript.