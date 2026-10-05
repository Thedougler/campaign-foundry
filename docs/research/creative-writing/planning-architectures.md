# PlanningArchitectures report (verbatim scout output)

All quotes verbatim with source. My own analysis is unquoted prose.

# 1. Agents' Room (Huot et al., Google DeepMind, arXiv 2410.02603v2)

**Phases/roles.** 4 planning agents ([conflict]→[character]→[setting]→[plot], deterministic order) write only to a shared scratchpad; 5 writing agents ([exposition]→[rising action]→[climax]→[falling action]→[resolution]) write scratchpad + final output; deterministic orchestrator calls them in order; variants: plan-only (adds a single [finalizer]), write-only, plan+write. Zero-shot (Gemini 1.5 Flash) or fine-tuned agents (synthetic data via "distilled backtranslation": a teacher LLM reverse-engineers plan outputs and section splits from gold stories).

**State/memory.** Scratchpad `s` initialized with the prompt, appended `(agent_label, output)` each call; every agent sees the whole labeled scratchpad, so it can parse and avoid duplicating. Format (Appendix B.1):

```
[Creative Writing Task]
<<the original writing prompt>>
[Central Conflict]
<<the output of the conflict agent>>
[Character Descriptions]
<<the output of the character agent>>
[Setting]
<<the output of the setting agent>>
[Key Plot Points]
<<the output of the plot agent>>
[Exposition]
<<the output of the exposition agent>>
... [Rising Action] [Climax] [Falling Action] [Resolution] same pattern
```

**Planning-agent prompts (Appendix B.2)** — note the interview-question style:

```
[Conflict] Agent Prompt
Given <<identifiers found in the scratchpad>>,
describe the central conflict in detail (more than 5 sentences). The description should answer the following questions:
⋆ What's the protagonist's main goal in this story?
⋆ Why do they want it?
⋆ What's stopping them from achieving it?
<<scratchpad>>
```

```
[Character] Agent Prompt
Given <<identifiers found in the scratchpad>>,
describe the characters in detailed bullet points (more than 5 sentences for each character). The description should answer the following questions:
⋆ What do the characters sound like? Are they talkative or quiet? What kind of slang do they use? What is their sense of humor like?
⋆ What do they look like? Do they have any defining gestures? What's the first thing people notice about them?
⋆ What are their motivations and internal characteristics? What are their flaws? What are their values? What are they afraid of? How will they change and grow over the course of this story?
<<scratchpad>>
```

```
[Setting] Agent Prompt
Given <<identifiers found in the scratchpad>>,
describe the setting in detail (more than 5 sentences). The description should answer the following questions:
⋆ Where does the story take place? Is it set in a fictional world, or is it simply set in someone's backyard?
⋆ When does the story take place? What decade is it set in? How much time elapses over the course of the story?
<<scratchpad>>
```

```
[Plot] Agent Prompt
Given <<identifiers found in the scratchpad>>,
describe the key plot points in detailed bullet points.
<<scratchpad>>
```

`<<identifiers found in the scratchpad>>` is rendered as e.g. "a Creative Writing Task, the Central Conflict, and the Character Descriptions" — a natural-language enumeration of what the scratchpad currently holds.

**Writing-agent template (Appendix B.3):**

```
Given <<identifiers found in the scratchpad>>,
continue the story by writing the <<section>> part.
<<If previous sections have been written, include the following in the prompt:>>
Begin your portion of the story in a way that naturally flows from the previous ending. Match the writing style, vocabulary, and overall mood of the existing text. Do not re-explain details or events that have already been described.
<<If this is not the meant to be the last section, include the following in the prompt:>>
Focus only on the <<section>> part of the story. Do not write about the following parts of the story. Do not end the story.
<<scratchpad>>
```

Here the identifiers render as: "a Creative Writing Task, the Content Plan (Central Conflict, Character Descriptions, Setting, Key Plot Points), and the Previous Parts of the Story (Exposition, Rising Action, Climax)". The plan-only variant's `[Finalizer]`: "Given <<identifiers found in the scratchpad>>, write a story using the information below. <<scratchpad>>". Synthetic-data splitting prompt (Appendix C) asks to "Split the following story into sections:" with a ⋆-bulleted definition per section and "For each section, give the section header ... followed by the first sentence of that section, copied exactly from the story."

**Evaluation (paper-reported).** 9,900 pairwise human ratings on Tell me a story (writers/literature grads, κ=0.46); 4 dimensions + overall, Bradley-Terry strengths. Findings: humans still beat all systems; Agents' Room with writing agents beats all E2E baselines on every dimension (best: AR_FT write, AR_FT plan+write); fine-tuned > zero-shot agents; AR plan variants underperform — authors attribute this to "the single [finalizer] agent being too simplistic to make good use of the planned elements"; writing agents ≈2× story length (AR_ZS write 3,278 words vs E2E_ZS 1,207 vs human 1,439) but also most trigram-repetitive; raters preferred the longer story only ~0.51 of the time (length isn't why they win); LLM evaluator (Gemini 1.5 Pro, side-by-side, parsed score table) correlates with humans at ρ=0.62, p<0.01; AR_ZS plan+write beats E2E_ZS decompose 89.09% overall per LLM evaluator (Table 3); holds on Gemma2-9B (80.0% vs E2E_ZS, Table 4).

**LLM evaluator prompt (Appendix E), load-bearing parts:**

```
You will conduct a side-by-side evaluation. You will be given two system-generated stories. Your task is to compare the two stories and determine which one is better based on the following dimensions:
• Plot: The story should have a recognizable structure, e.g., with a connected beginning, middle, and end. The story should exhibit events and turns that move the plot forward. The story should not have logical or conceptual inconsistencies. Surprising or disruptive elements should be intentional, e.g., they serve the story and do not feel jarring, odd, or out of place.
• Creativity: There should be engaging characters, themes, and imagery. The ideas should not feel generic or bland. There should be avoidance of overly cliched characters and storylines, unintentional tropes, and stereotypes. When used, tropes and cliches should serve a purpose (e.g., comedic effect, twist on a common trope etc). The story should include original elements that were not explicitly mentioned in the prompt.
• Development: Characters and settings should be introduced and contextualized with relevant details [...]
• Language Use: The language used should feel varied and rich [...] The story should avoid bland or repetitive phrases (unless used intentionally [...]).
Provide a detailed assessment of the two stories in terms of these four dimensions. Conclude your assessment with scores for each dimension using the template below. [...]
Based on my assessment, the better story for each dimension is:
Plot: [A or B or Same]  Creativity: [...]  Development: [...]  Language Use: [...]  Overall: [A or B or Same]
```

The human rubric (Appendix D) adds: features are cumulative; conventions may be flouted intentionally (only penalized if ineffective); "When rating, do not hesitate to be very critical."

# 2. Re3 (Yang et al., EMNLP 2022)

**Modules.** Plan → Draft → Rewrite → Edit, fully automatic, zero-shot (GPT-3). Plan prompts (exact strings from `plan.py`):

```
setting_prompt = "Premise: " + premise + "\n\nDescribe the setting of the story.\n\nThe story is set in"
initial_characters_prompt = "Premise: " + premise + "\n\nSetting: " + setting + "\n\nList the names and details of all major characters."
# per character, appended: "\n\n1.\n\nFull Name:" then "Character Portrait: {Name} is"
outline_prompt = premise+setting+chars + "\n\n\n\nOutline the 3 main plot points of the story.\n\n1."
```

Rejection sampling filters malformed names/outlines. **Draft (recursive reprompting)** — the continuation prompt is re-composed each passage from plan + story state (exact labels from `beam_candidate.py`):

```
Relevant Context:\n\n{character/setting descriptions selected by DPR relevance}\n\n\n\n
The story is written in third person.
\n\n\n\nPrevious story summary: {earlier outline sections}
\n\n\n\nEvents immediately prior to the upcoming passage: {summary of preceding passages (curie-001)}
\n\n\n\nIn the upcoming passage, {current outline item, first letter lowercased}
\n\n\n\nFull text below:\n\n\n\nChapter 1\n\n{recent story text, verbatim}
```

Coarse-to-fine: distant past = outline points, near past = summary, immediate past = verbatim text. **Rewrite:** rerank k sampled continuations with two trained Longformer rerankers (coherence with previous passage; relevance to outline point) + heuristics (reject repetition, reject first-person to enforce third person). **Edit:** detect character-attribute contradictions via open IE (numbered "Inferred Facts" → attribute-value pairs → NLI entailment flags), then correct via GPT-3 Edit API with instruction built in code as: `"Edit so that " + contradicted_sentence + " Keep the text unchanged as much as possible."`

**Evaluation (paper-reported).** 2000–2500-word stories; pairwise MTurk vs rolling-window baselines: RE3 vs ROLLING — coherent 60.0% vs 45.7%, relevant 64.0% vs 44.0%, humanlike 83.3% vs 74.0%, fewer misc. problems (all p<0.05). **Ablations (§5.1):** removing Plan (DRAFT-REWRITE-EDIT) or Rewrite (PLAN-DRAFT-EDIT) significantly hurts coherence/relevance; removing Edit (PLAN-DRAFT-REWRITE 55.0/60.3/59.3 vs full RE3 57.0/57.3/59.3) — "Both the Plan and Rewrite module are critical to performance, but the Edit module makes little difference." DOC later dropped the Edit step citing exactly this. **Limitations (reported):** stories may still ignore parts of even a 3-point outline; contradictory character identities persist; early errors self-correct thanks to plan injection.

# 3. DOC (Yang et al., ACL 2023)

**Hierarchy.** Keeps Re3's skeleton, drops Edit, and (a) expands a 3-point outline into a depth-3 tree (breadth-first; 2–5 children; ~3,500-word stories) where **each node carries an event, a setting, and a character list**; (b) adds a trained FUDGE token-level controller (OPT-350m discriminator, contrastive training with hard negatives that start on-topic then drift — training the discriminator to *maintain* relevance).

**Outline entity prompts (verbatim, Appendix B).** Event generation (Table 7): prefix = premise + setting + characters + the partial outline with all ancestors and their children, then the literal instruction:

```
List the main events that occur under this heading, starting from the beginning.
i.
```
with a depth-shifted suffix injected via insertion API. Setting detection (Table 8) continues each leaf with `i. {event}. This scene is located in`. Character detection per item (Table 9): `{outline item}\n\nList all characters mentioned in this sentence.\n\n1.`; coreference resolution feeds the character inventory with per-item-updated descriptions. **Character development over time** (Table 12):

```
{outline item}

This context tells us the following about Angie Wang:

1.
```
with suffix `Additionally, we know from elsewhere that {accumulated prior facts}`; new facts are added only if not entailed by prior ones (so later prompt-contexts show character state at that story point).

**Drafting prompt (Table 13, field labels verbatim):**

```
Premise: {premise + ancestor-leaf context}
Relevant Context: {character descriptions incl. facts inferred up to the current outline item}
Previous story summary: {far-past outline items, collapsed}
Events immediately prior to the upcoming passage: {near-past summary}
The characters currently in the scene are {names}.
In the upcoming passage, {previous+current+next outline items as future context}
This part of the story initially takes place in the hospital. The characters then move to Daisy's home.
Full text below:
——————————–
{verbatim recent text}
```

DOC adds versus Re3: explicit setting tracking + announced setting changes, per-leaf variable-length passages with reranker-threshold early stopping (move on when combined relevance+coherence log-prob > −0.5 and stops improving; ≤8×64 tokens per item), and the FUDGE controller with a strength schedule (start 0, +3 per sub-step, cap 10; new-setting constraint at 0.5×, new-character at 0.2×).

**Evaluation (paper-reported).** vs RE3 (same OPT-175B generator, same plan): coherent 67.6 vs 45.1, relevant 65.3 vs 37.1, interesting 60.1 vs 39.4. **Ablations (Table 5/6):** relevance to outline needs *both* parts (DOC-NOOUTLINE 41.2 vs 64.7 relevant; DOC-NOCONTROL 52.0 vs 73.5); the interestingness gain comes mainly from the **detailed outline** (NOOUTLINE 57.8 vs 66.7), and "if anything, the detailed controller may slightly hurt interestingness" (NOCONTROL 58.8 vs 50.0); leaf-level event faithfulness is only 58.5% with controller vs 37.8% without — big gain, low ceiling. **Human-in-the-loop (§4.1):** editing the plan per depth-level (DOC) beat editing prose-level Re3 plans 80/80/80/75 on intent/control/intuition/quality. **Limitations (reported):** leaf items often not followed; outline errors cascade; leaves inconsistently detailed; detected settings/characters sometimes wrong; long-range factual consistency unsolved; more control strength → repetitive, narrowly-focused output.

# 4. WriteHERE (Xiong et al., EMNLP 2025; KAUST)

**Typed task graph.** HTN-style recursive decomposition of a root composition task into a DAG of tasks typed **retrieval / reasoning / composition** (story mode: `think`=Design and `write`; retrieval executors exist only in report mode). Each node: type, goal, dependencies, result. States ACTIVE/SUSPENDED/SILENT; scheduler picks the ACTIVE node with min BFS-depth; IsAtomic decides execute-vs-decompose; context per node = workspace + parent/preceding results (GETINFO), never the whole graph.

**TypedPlan prompt (write_planning.py, load-bearing):**

```
# Overall Introduction
You are a recursive professional novel-writing planning expert adept at planning professional novel writing based on narrative theory. [...]
1. Continue the recursive planning for the specified professional novel-writing sub-tasks. [...] break the tasks down into more granular writing sub-tasks, specifying their scope and specific writing content.
2. Plan design sub-tasks as needed to assist and support specific writing. Design sub-tasks are for designing elements including outlines, character, Writing style, Narrative techniques, viewpoint, setting, theme, tone and scene construction, etc.
3. For each task, plan a sub-task DAG (Directed Acyclic Graph), where the edges represent dependency relationships [...]
# Task Types
## Writing (Core, actual writing)
- **All writing tasks are continuation tasks**: Ensure continuity with the preceding content during planning.
## Design
- **Function**: Analyze and design any novel-writing needs other than actual writing. [...]
# Planning Tips
1. The last sub-task derived from a writing task must always be a writing task.
2. Reasonably control the number of sub-tasks in each layer of the DAG, generally **2 to 5** sub-tasks. If the number of tasks exceeds this, plan recursively.
3. **Design tasks** can serve as **sub-tasks of writing tasks**, and as many design sub-tasks as possible should be generated to enhance the quality of writing.
[...] 9. Unless specified by user, the length of each writing task should be > 500 words. Do not break a writing task less than 500 words into sub-writing tasks.
# Task Attributes
1. **id** [...] 2. **goal** [...] 3. **dependency** [...] 4. **task_type**: [...] `write`, and design tasks are labeled as `think`. 5. **length**: [...] required for writing task. [...] 6. **sub_tasks** [...]
# Output Format
1. First, conduct in-depth and comprehensive thinking in `<think></think>`. 2. Then, in `<result></result>`, output the planning results in the JSON format [...]
```

**IsAtomic + goal update (write_combine_atom_and_update.py):**

```
1. **Goal Updating**: [...] update or revise the current writing task requirements as needed to make them more aligned with demands, reasonable, and detailed. For example, provide more detailed requirements based on design conclusions, or remove redundant content in the already-written novel.
2. **Atomic Writing Task Determination**: [...] evaluate whether the given writing task is an atomic task, meaning it does not require further planning. [...]
# Atomic Task Determination Rules
1. **design Sub-task**: If the writing requires certain design designs for support, and these design requirements are not provided by the **dependent design tasks** or the **already completed novel content**, then an design sub-task needs to be planned.
2. **Writing Sub-task**: If its length equals or less than 500 words, there is no need to further plan additional writing sub-tasks.
If either an design sub-task or a writing sub-task needs to be created, the task is considered a complex task.
```

Output tags: `<goal_updating>`, `<atomic_task_determination>atomic/complex</...>`.

**Reasoner (Design) executor** gets root goal + its task + outer/same-layer design results + already-written novel, with a 10-item "# Design Hints" checklist verbatim: **Structure** ("plot development, pacing, and narrative arc (exposition, rising action, climax, falling action, resolution)"), **Character development**, **Point of view**, **Setting**, **Theme**, **Tone and mood**, **Dialogue**, **Writing style**, **Narrative techniques** ("foreshadowing, flashbacks, symbolism, and irony"), **Scene construction**; plus "Attention!! Your design outcome should be logically consistent and coherent with the existing novel design conclusions." A FinalAggregate variant integrates multiple design results ("Identify and resolve logical inconsistencies or contradictions between Reasoners' results"). **Writer executor** requirements (writer.py):

```
- Start from the previous ending of the story, matching the existing text's writing style, vocabulary, and overall atmosphere. Naturally complete your section according to the writing requirements, without reinterpreting or re-describing details or events already covered.
- Pay close attention to the existing novel design conclusions.
- Use rhetorical, linguistic, and literary devices (e.g., ambiguity, alliteration) to create engaging effects.
- Avoid plain or repetitive phrases [...]
- Employ diverse and rich language: vary sentence structure, word choice, and vocabulary.
- Avoid summarizing, explanatory, or expository content or sentences unless absolutely necessary.
- Ensure there is no sense of disconnection or abruptness in the plot or descriptions. You may write some transitional content to maintain complete continuity with the existing material.
```

**Evaluation (paper-reported).** Tell me a story, LLM judge (Gemini 2.0-Flash, 14 order-balanced trials, Davidson model; judge-human correlation ρ=0.62 as in Agents' Room). GPT-4o overall strengths: WriteHERE 2.143 vs Agents' Room 0.869 vs E2E 0.270; ablations w/o Recursive 1.100, w/o Type 0.717 (both hurt; type-awareness hurts more). Claude-3.5-Sonnet: 2.852 vs 0.694. Advantage over Agents' Room grows with length (comparable at 2K words, decisive at 4K/8K). Report mode beats STORM/Co-STORM and Perplexity Deep Research on relevance/breadth/depth/novelty. **Limitations (stated):** recursive decomposition costs extra compute; no human-in-the-loop editing of the task graph yet; failure diagnosis tooling future work.

# 5. Dramatron (Mirowski et al., arXiv 2209.14958 / CHI 2023; DeepMind)

**Hierarchy.** log line (user input) → title → characters (name + one-sentence description) → plot = list of scenes, each `Place / Plot element (narrative-arc position) / Beat` → per unique place a description → per scene dialogue, generated from place + characters + plot element + beat summary (+ previous scene's beat; a post-study fix, Table 1). Prompt = fixed few-shot prefix (1–4 examples from a Medea or Sci-Fi prompt set) + chain of upstream outputs; markers in the released Colab: `**Logline:** `, `Title: `, `**Character:** ` / `**Description:** `, `**Scenes:**`, `Place: `, `Plot element: `, `Beat: `, `**Dialog:**`, `**END**`. Example title prefix (Appendix E, Listing 1): instruction "Examples of alternative, original and descriptive titles for known play and film scripts." then `Example 1. {log line} Title: {title} <end>` ×3, ending `Example 4. <LOG_LINE> Title:`. The SCENE_PROMPT (Colab, Medea) shows one full 9-beat example — Plot elements: Exposition, Inciting Incident, Conflict, Rising Action, Dilemma, Climax, Falling Action, Resolution, Dénouement — then: "Using the example above and the following logline and list of characters, complete the list of plot points." Gemini system prompt (Colab): "You are a writing assistant. You are given examples of formatted examples of storytelling structures with narratological elements [...] Format your responses to follow exactly the same format as the examples. Your goal is to expand on the input text prompt and to generate the continuation of that text without any comments."

**User edits / regenerate.** At every level the writer can: generate a new suggestion (re-sample), continue generating from the end, or manually edit — and step back up the hierarchy to rewrite the log line and cascade (e.g., regenerate title → new characters → new plot). The Colab logs every intervention as REWRITE/COMPLETE per level with a unified diff of prompts.

**Interview findings (paper-reported; 15 theatre/film professionals, 2-h co-writing sessions, paid £100/h, 13 survey respondents).** Likert: surprised 92% agree (46% strongly); enjoyed 77%; unique 69%; collaborating 77%; helpful 84%; expressed creative goals 77%; ease 61%; proud 46%; **low ownership** (majority felt they did not own the result). Film/TV participants rated everything higher than theatre people. Criticisms: output "too literal and predictable", relationships "so tight and prescriptive", characters state their noble goals in dialogue ("Show, not tell: here we are just telling"); gender bias/ageism ("I am less sexist than the computer"); generation loops; lack of common sense, subtext, character motivation; the log line is a hard, "panic"-inducing starting point and a screenwriting-shaped workflow ("Playwrights do not use the log line in the same way"); parallel per-scene dialogue generation causes inconsistency ("If it didn't read its last scene, how can you get the last scene into the next generation?"). DeepMind's own README (vendor claim, echoing the paper): playwrights said they "wouldn't use [Dramatron] to write a full play" and that output can be "formulaic"; they'd use it for "world building," exploring alternatives, and idea generation. Study artifacts: 5 co-written scripts staged at Edmonton Fringe (*Plays By Bots*). Note: the arXiv v1 paper contains **no** pairwise preference win over experienced screenwriters' scripts — such a claim is not supported by the sources I could access.

---

# Adoptable in a prompt-only skill workflow

1. **Labeled shared scratchpad** (Agents' Room B.1): append each sub-agent's output under a fixed bracketed header; later agents reference by header — maps 1:1 to writing a plan file/section per agent and passing it to `task` subagents.
2. **Interview-question planning prompts**: conflict/character/setting templates above are plain instruction text, model-agnostic, and force goals/flaws/arc/voice — drop-in for a planning subagent.
3. **Section-labeled writing agents with the two conditional instructions** (continuation-flow rule; "Do not write about the following parts... Do not end the story."): directly solves preamble-detection and premature ending in multi-part drafting.
4. **Typed decomposition with atomicity test** (WriteHERE): a recursive planner prompt whose termination rule is checkable in prose ("last sub-task must be a writing task", "2–5 subtasks", "no sub-500-word splits", design-first-if-unsupported) — no code needed, the LLM can enforce it.
5. **Goal-update before execute** (WriteHERE IsAtomic step): refine each task's goal against design results and already-written text before drafting; cheap, prompt-only, catches redundancy.
6. **Coarse-to-fine continuation context** (Re3/DOC): distant past = outline, middle = summary, recent = verbatim tail, plus "In the upcoming passage, {next beat}" — reproducible by an agent assembling each continuation prompt.
7. **Outline nodes carry setting + present characters, and character facts accumulate per outline item** (DOC): prevents silent scene-shifts and character regression; pure prompt/data discipline.
8. **Explicit setting-change announcement in the prompt** ("This part of the story initially takes place in X. The characters then move to Y.").
9. **Candidates + deterministic selection instead of self-critique**: generate N continuations, pick via checklist (repetition heuristics, person consistency, beat relevance) — the rerankers' *role* is prompt-checkable even though Re3's trained models aren't.
10. **Future context for transitions** (DOC): show the *next* outline item in the drafting prompt so passages end pointed at the next beat.
11. **Evaluation rubrics verbatim** (Agents' Room Plot/Creativity/Development/Language Use + "side-by-side, then scored table" output format; DOC's coherent/relevant/interesting) for a DM-facing review agent; the 4-dimension judge prompt is field-tested with ρ=0.62 human correlation.
12. **Human edit points at plan level, not prose level** (DOC §4.1): 80%-preference result says put the DM's edit loop on the outline/plan artifacts, not on generated prose.
13. **Dramatron regenerate-vs-edit interaction**: expose per-artifact re-sample and manual rewrite, with diff logging; plus its per-artifact few-shot prefix pattern (2–3 worked examples + task line) for format lock-in.

# Not adoptable

- **FUDGE token-level controller (DOC)** — logit manipulation; a prompt-only workflow can only imitate it with candidates+filtering, at much weaker control strength (DOC itself shows low leaf adherence even with it).
- **Trained rerankers / ordering models / DPR / NLI entailment / Flair NER (Re3, DOC)** — all require trained models or external pipelines; substitute checklist-based selection.
- **Fine-tuned specialized agents (Agents' Room FT variants)** — needs backtranslation training pipeline; zero-shot prompting of the same templates still beat baselines.
- **Attribute-dictionary contradiction editing (Re3 Edit)** — paper's own ablation: "the Edit module makes little difference"; DOC dropped it. Skip.
- **WriteHERE retrieval executors** — story mode ran without search (`story_writing_wo_search`); only useful if the skill gains a real retrieval subagent, and then it's just `task` dispatch to a search agent.
- **Dramatron's fixed log-line-first pipeline as the DM's main flow** — participants' top structural criticism: log-line-first top-down generation is screenwriting-shaped, formulaic, and produced the lowest ownership scores; adopt its per-level regenerate/edit instead of its single entrypoint. Its narrative-arc beat vocabulary (Exposition…Dénouement) is adoptable, but p4/p5's warning stands: imposing Western dramaturgy feel limiting.
- **Length-by-concatenation alone (Agents' Room write agents)**: writing agents doubled length but also doubled trigram repetition; pair sectioned drafting with explicit anti-repetition/richness instructions (WriteHERE writer rules) rather than relying on sectioning alone.