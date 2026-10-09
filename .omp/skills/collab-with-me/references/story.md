# Story stage

The Story stage turns an idea into a Story the DM believes in. Build the Story Bible at `local://collab/bible.md` section by section from the DM's words plus the Canon pages you have read, and end it in an outline of Beats. Prose drafts come only when the DM asks. The DM edits at the bible and outline level: in DOC's study, writers preferred editing a layered outline to editing prose-level plans 75 to 80% of the time on intent, control, intuition and quality ([planning-architectures.md](../../../../docs/research/creative-writing/planning-architectures.md) §3).

## Bible sections

Head each section with its label, exactly as written here. The first five are the Agents' Room scratchpad labels. The Story stage adds the last two. At Open, collab creates the skeleton from these seven labels and copies the tone, themes and Lines and Veils from `campaign-config.md` into `[Premise]`. The Story stage fills every section.

`[Premise]`, `[Central Conflict]`, `[Character Descriptions]`, `[Setting]`, `[Key Plot Points]`, `[Story Outline]`, `[Ending]`

Each section's contract is the Agents' Room planning prompt for it (Huot et al., quoted from [planning-architectures.md](../../../../docs/research/creative-writing/planning-architectures.md) §1). A section is done when it answers every question in its prompt.

**`[Premise]`** adds the idea in the DM's words, one to three sentences, above the tone, themes and Lines and Veils copied there at Open.

**`[Central Conflict]`.** The protagonists are the Party. Their goal comes from the PC pages.

```text
describe the central conflict in detail (more than 5 sentences). The description should answer the following questions:
⋆ What's the protagonist's main goal in this story?
⋆ Why do they want it?
⋆ What's stopping them from achieving it?
```

The antagonist passes Colville's test ([story-vs-campaign.md](../../../../docs/research/creative-writing/story-vs-campaign.md) §1):

```text
"If you can't explain why the Villain is the Hero in his own story...you don't
know your Villain well enough."
```

**`[Character Descriptions]`** contains one card per character.

```text
describe the characters in detailed bullet points (more than 5 sentences for each character). The description should answer the following questions:
⋆ What do the characters sound like? Are they talkative or quiet? What kind of slang do they use? What is their sense of humor like?
⋆ What do they look like? Do they have any defining gestures? What's the first thing people notice about them?
⋆ What are their motivations and internal characteristics? What are their flaws? What are their values? What are they afraid of? How will they change and grow over the course of this story?
```

Each NPC card also adds Sudowrite's five card fields ([beats-and-context.md](../../../../docs/research/creative-writing/beats-and-context.md) §3.2):

```text
- **Voice**: how they speak. Sentence length. Tells. Words they refuse to use.
- **Personality**: not adjectives. Specific behaviors under specific pressures.
- **Backstory**: what they know and what they remember (these are different).
- **Want vs. Need**: the gap that drives them.
- **Arc**: who they are at the start, the midpoint, and the end.
```

Then add three sample lines, the ask and the refusal and the line under pressure, as the Voice section of `npc-design`'s [`references/craft.md`](../../../../.agents/skills/npc-design/references/craft.md) defines them. Each card must pass that file's closing Check.

PC cards record only what each PC page's `Goals and bonds` and `Plans` say. The PC's thoughts and feelings belong to its Player. Write every PC decision in the Story as one possible choice, marked `Party choice:`.

**`[Setting]`.**

```text
describe the setting in detail (more than 5 sentences). The description should answer the following questions:
⋆ Where does the story take place? Is it set in a fictional world, or is it simply set in someone's backyard?
⋆ When does the story take place? What decade is it set in? How much time elapses over the course of the story?
```

Answer the time questions in the World's Calendar.

**`[Key Plot Points]`.**

```text
describe the key plot points in detailed bullet points.
```

**`[Story Outline]`** expands the plot points into a tree of Beats. Each node has 2 to 5 children, following WriteHERE's planning rule ([planning-architectures.md](../../../../docs/research/creative-writing/planning-architectures.md) §4). Every Beat states its place and the characters present, and a leaf Beat runs Novelcrafter's six-beat skeleton ([beats-and-context.md](../../../../docs/research/creative-writing/beats-and-context.md) §1.7), with its decision feeding the next Beat's goal:

```text
1. Include the setting, time of day, and the characters that are present. Give one of the characters (probably the POV character) a goal.
2. Describe how the character's goal leads to a conflict.
3. Tell how the conflict leads to an outcome, it could be a disaster or a victory, large, small or simply in the imagination of the POV character.
4. The outcome causes a reaction in a character.
5. The reaction leads to a dilemma. (Delilah can either choose to let the dog find the earring, or distract it)
6. The dilemma leads to a decision. In a subsequent scene/chapter, this decision will result in a goal that starts the beat flow anew.
```

When the decision belongs to a PC, mark it `Party choice:`.

**`[Ending]`** states how this Story ends if the Party makes the marked choices, written as one possible ending among several.

## Prose drafts

Draft prose only when the DM asks, one Beat at a time, so the DM can edit between Beats. For each Beat:

1. Find the Beat's pages. `bun run cf -- context -` on the Beat's text gives the pages it names literally. Search QMD (`.omp/AGENTS.md` § Wiki access) for each subject the Beat describes without its page's name. Read the candidates and keep each page the Beat is about.
2. Dispatch one `creative-writer` with the brief below. Its field labels are Re3's and DOC's drafting labels ([planning-architectures.md](../../../../docs/research/creative-writing/planning-architectures.md) §2 and §3), and its closing instructions are the Agents' Room continuation instructions (§1), each carried exactly as written. Add the pointer to the [Content stance](../../../../AGENTS.md#content-stance).

   ```text
   Premise: <the bible's [Premise]>
   Relevant Context: <the facts from the pages read in step 1, plus the cards of the characters present>
   Previous story summary: <the outline Beats before the previous one>
   Events immediately prior to the upcoming passage: <a summary of the last drafted Beat>
   The characters currently in the scene are <names>.
   In the upcoming passage, <this Beat, then the next Beat as future context>
   ```

   When earlier Beats have drafts, append:

   ```text
   Begin your portion of the story in a way that naturally flows from the previous ending. Match the writing style, vocabulary, and overall mood of the existing text. Do not re-explain details or events that have already been described.
   ```

   When this Beat is not the last, append, with the Beat's title in place of `<<section>>`:

   ```text
   Focus only on the <<section>> part of the story. Do not write about the following parts of the story. Do not end the story.
   ```

3. Save the returned prose under the Beat's heading in `local://collab/drafts/<slug>.md`.

When the DM asks to see versions, dispatch 3 `creative-writer` agents in one `task` batch with the same brief, each naming a different Stance from [`docs/agents/co-writing.md`](../../../../docs/agents/co-writing.md#seeds). Present all three. The DM picks or merges them.

## Done

Tell the DM the outline as talk, per [`docs/agents/co-writing.md`](../../../../docs/agents/co-writing.md#talk). In a few sentences, follow the spine from the root Beat to the `[Ending]` and name each `Party choice:` where it falls. Then offer `local://collab/bible.md` for the full tree.

Done when every bible section exists and answers its contract, the DM has heard the outline that way, and every PC decision is marked `Party choice:`.
