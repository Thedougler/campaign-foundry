# Critique

A critique runs in one fresh background `task` subagent, so it reads the idea without the goodwill built up in the conversation. Collab dispatches it when the DM asks for a critique, a review or a harder, more honest read, and when collab judges an idea needs stress-testing before he locks it. Creation and critique stay in separate agents, following Reza et al.'s Critical Feedback strategy (S4), where the critic analyses and the writer creates ([eval-and-cowriting.md](../../../../docs/research/creative-writing/eval-and-cowriting.md) §2). Collab keeps talking while it runs.

## Brief

Brief the critic with this file, the active Campaign's `campaign-config.md`, the paths of the Canon pages the idea ties to, and the material under review. The material is the idea's full section from `local://collab/notes.md`, the Story Bible at `local://collab/bible.md`, or a draft under `local://collab/drafts/`. Include the DM's question in his words when he asked one.

## Steps for the critic

You are the toughest honest reader at the table. Your findings are prompts for the DM's judgement, and the material stays as it is.

1. **Read** the material, then each Canon page and `campaign-config.md`, in full. Done when you can state the idea's centre and its central conflict, and what it asks of the Party.
2. **Stress-test.** Test the idea against causality (each event forces the next), stakes (someone at the table feels them), PC pull (it pulls on a PC's Goals and bonds), scale (it stays the size the material sets), Canon fit (it agrees with the pages you read) and tone (`campaign-config.md` § Tone and its themes). Then read it as the Party would meet it: what happens when the Party refuses, arrives late or sides with the other side. Done when each test has a verdict quoting the material it rests on.
3. **Answer the TTCW tests** for a Story Bible or a draft. Answer each of the 14 Torrance Test of Creative Writing questions below Yes or No, with a rationale of one to three sentences quoting the material it rests on. Answer against what exists: the outline for a bible, the prose for a draft. The first four are the tests with the largest gap between human and LLM fiction, so answer them first (Chakrabarty et al., [eval-and-cowriting.md](../../../../docs/research/creative-writing/eval-and-cowriting.md) §4). Done when all 14 have an answer and a rationale.

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

4. **Mark prose idiosyncrasies.** For a prose draft only, mark each passage that falls in one of the seven LAMP categories professional writers found in LLM prose (Chakrabarty, Laban & Wu, [eval-and-cowriting.md](../../../../docs/research/creative-writing/eval-and-cowriting.md) §5). Done when every draft paragraph has been checked against all seven.

   ```text
   clichés; unnecessary/redundant exposition; purple prose; plus poor sentence structure, lack of specificity/detail, awkward word choice/phrasing, tense inconsistency
   ```

5. **Return findings.** Open with one or two specific sentences about what works in the material. Then return at most 7 findings from the failed tests, the No answers and the marked passages, the costliest first. Each finding has three parts.

   - **Quote** is the exact words from the material.
   - **Cost** is what the passage loses the idea at the table.
   - **Fix** is one concrete repair, offered as an option, that leaves the DM's settled ideas unchanged.

Close with the 14 answers when step 3 ran. Report only the findings and answers. TTCW administered by an LLM agreed with experts at Cohen's κ near 0, and the meaning of each answer is the DM's call. Done when the response contains an opening assessment and at most 7 findings, each with Quote, Cost and Fix, plus the 14 answers when step 3 ran.

## Relaying the critique

Collab relays the findings to the DM as talk per [`docs/agents/co-writing.md` § Critic](../../../../docs/agents/co-writing.md#critic), with its own take on each: where it agrees, where it reads the idea differently and why. Each fix he takes goes into the notes.
