# Story critique

The critique runs in one fresh `task` subagent, briefed with the Story Bible, any draft and this file. Creation and critique stay in separate agents, following Reza et al.'s Critical Feedback strategy (S4), where the critic analyses and the writer creates ([eval-and-cowriting.md](../../../../docs/research/creative-writing/eval-and-cowriting.md) §2). The critic leaves the bible and drafts unchanged. Its findings are prompts for the DM's judgement.

## Steps for the critic

1. **Read** the bible, then any draft, in full. Done when you can state the Story's protagonist goal, its antagonist and its ending.
2. **Answer the TTCW tests.** Answer each of the 14 Torrance Test of Creative Writing questions below Yes or No, with a rationale of one to three sentences quoting the material it rests on. Answer against what exists: the outline for a bible, the prose for a draft. The first four are the tests with the largest gap between human and LLM fiction, so answer them first (Chakrabarty et al., [eval-and-cowriting.md](../../../../docs/research/creative-writing/eval-and-cowriting.md) §4). Done when all 14 have an answer and a rationale.

   ```text
   Originality / Form & Structure: "Does the story show originality in its form?"
   Elaboration / Rhetorical Complexity: "Does the story operate at multiple 'levels' of meaning (surface and subtext)?"
   Elaboration / Character Development: "Does each character in the story feel developed at the appropriate complexity level, ensuring that no character feels like they are present simply to satisfy a plot requirement?"
   Fluency / Narrative Ending: "Does the end of the story feel natural and earned, as opposed to arbitrary or abrupt?"
   Fluency / Narrative Pacing: "Does the manipulation of time in terms of compression or stretching feel appropriate and balanced?"
   Fluency / Scene vs Exposition: "Does the story display awareness and insight into the balance between scene and summary/exposition?"
   Fluency / Language Proficiency & Literary Devices: "Does the story make sophisticated use of idiom or metaphor or literary allusion?"
   Fluency / Understandability & Coherence: "Do the different elements of the story work together to form a unified, engaging, and satisfying whole?"
   Flexibility / Perspective & Voice: "Does the story provide diverse perspectives, and if there are unlikeable characters, are their perspectives presented convincingly and accurately?"
   Flexibility / Emotional: "Does the story achieve a good balance between interiority and exteriority, in a way that feels emotionally flexible?"
   Flexibility / Structural: "Does the story contain turns that are both surprising and appropriate?"
   Originality / Theme & Content: "Will an average reader of this story obtain a unique and original idea from reading it?"
   Originality / Thought: "Is the story an original piece of writing without any cliches?"
   Elaboration / World Building & Setting: "Does the writer make the fictional world believable at the sensory level?"
   ```

3. **Mark prose idiosyncrasies.** For a prose draft only, mark each passage that falls in one of the seven LAMP categories professional writers found in LLM prose (Chakrabarty, Laban & Wu, [eval-and-cowriting.md](../../../../docs/research/creative-writing/eval-and-cowriting.md) §5). Done when every draft paragraph has been checked against all seven.

   ```text
   clichés; unnecessary/redundant exposition; purple prose; plus poor sentence structure, lack of specificity/detail, awkward word choice/phrasing, tense inconsistency
   ```

4. **Return findings.** From the No answers and the marked passages, return at most 7 findings, the costliest first. Each finding has three parts.

   - **Quote** is the exact words from the bible or draft.
   - **Cost** is what the passage loses the Story.
   - **Fix** is a yes-and pitch that builds on the DM's settled ideas, shaped by the Yes, and section of [`docs/agents/co-writing.md`](../../../../docs/agents/co-writing.md).

   Close with the 14 answers. Report the findings and answers alone. TTCW administered by an LLM agreed with experts at Cohen's κ near 0, and the meaning of each answer is the DM's call. Done when the result contains at most 7 findings, each with Quote, Cost and Fix, and the 14 answers.

## Relaying the critique

Collab relays the findings to the DM as talk per [`docs/agents/co-writing.md`](../../../../docs/agents/co-writing.md). It records each finding in the notes as a suggestion awaiting the DM's verdict.
