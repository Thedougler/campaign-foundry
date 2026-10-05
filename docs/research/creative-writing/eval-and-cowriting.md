# EvalAndCoWriting report (verbatim scout output)

# Creative-writing co-craft research extraction

## 1. Doshi & Hauser 2024, Science Advances (preregistered experiment)

**Design:** 293 Prolific writers wrote an 8-sentence story (topics: open seas / jungle / alien planet). Conditions: Human-only, 1 GenAI idea, up to 5 GenAI ideas. 600 evaluators, 3,519 evaluations; each story rated by 10–14 evaluators. Model: GPT-4. Inherent creativity measured pre-task via Divergent Association Task (DAT, mean 77.24, SD 6.48).

**Writer task instructions (verbatim)** — PMC11244532, Materials and Methods:
```
We would like you to write a story about an adventure on the open seas.
You can write about anything you like. The story must be exactly eight
sentences long and it needs to be written in English and appropriate for
a teenage and young adult audience (approximately 15 to 24 years of age).
```

**The entire AI-idea prompt (verbatim)** — same section:
```
Write a three-sentence summary of a story about an adventure on the open seas.
```
Note: ideas were 3 sentences; copy-paste of idea text was blocked; writers chose to opt in (88.4% took ≥1 idea; in the 5-idea condition, mean 2.55 requests, 24.5% took all 5).

**Outcome rubric fields (verbatim summary)** — Outcome variables: "all outcome (dependent) variables were assessed on a nine-point scale from 1 (not at all) to 9 (extremely)". "Our novelty index had three components (novel, original, and rare)"; "The usefulness index also had three components (appropriate, feasible, and publishable)" (α = 0.92 / 0.89). Emotional items: well written, enjoyable, funny, boring, plot twist, changed expectations of future stories.

**Numbers:** novelty +5.4% (1 idea, p=.021) and +8.1% (5 ideas, p<.001); usefulness +3.7% / +9.0% (p<.001). Low-DAT writers with 5 ideas: better written +26.6%, more enjoyable +22.6%, less boring −15.2% — AI equalized low- vs high-creativity writers; no gain for high-DAT writers. Embedding similarity: AI-condition stories more similar to condition mean (b=0.871/0.718) and ~5% more similar to the AI ideas (anchoring). Evaluators imposed an ownership penalty ≥25% post-disclosure. Self-assessments showed no condition differences — writers can't tell.

**Published limitations:** 8-sentence task, single fixed prompt, no writer–LLM interaction or customization → authors call their estimate "likely a lower bound"; lay writers only; exploratory ownership/profit results not preregistered.

## 2. Reza et al. 2025, "Co-Writing with AI, on Human Terms" (CSCW)

**Methods:** PRISMA review → 109 papers of 1,676 (2018–2024, ACM DL; Cohen's κ 0.84); plus semi-structured interviews with 15 writers (11 professional; all ChatGPT users; ages 18–34).

**Four design strategies:** S1 Structured Guidance (AI as coach/scaffold), S2 Guided Exploration (AI enumerates idea space; user explores/selects), S3 Active Co-Writing (AI drafts; user offloads, keeps editorial control), S4 Critical Feedback (AI as editor; deliberate separation of creation and analysis). Distribution in 62 systems: S3 37.1%, S1 30.6%, S2 17.7%, S4 14.5%.

**Core finding — content vs form:** content-centric writers (academic/non-fiction) own planning/ideation and happily delegate translating/reviewing; form-centric writers (creative fiction) own translation and revision — sentence-level voice — and accept AI help in planning. Table 3 verbatim: W9: "The core part of writing is ideas… even if ChatGPT helps organize, the ideas remain mine." W7: "Where I feel the most ownership is over sentences themselves." W7 on rule-breaking: "Oftentimes in literary writing, we break grammatical conventions all the time… comma splices have become much more common in fiction writing, just because people use comma splices in real life all the time."

**Interaction design (verbatim):** W7: "If it's sort of making suggestions, then it would not change my sense of ownership over the text, because I'd still feel like that's just sort of this pop-up window. But if it was inserting values in a more direct way, I think I would probably feel like I was los[ing ownership] [...]". W15: "I find it has to be a negotiation. [...] you see what the thing is suggesting, you think about that, and then you decide to take it on board. And I feel like that moment of decision and conscious interpolation of what it's suggesting… that's where the sense of ownership is not taken from you." W12 on style mimicry: "I would feel a little violated. [...] I don't want AI to be like, training itself on me and then trying to emulate me."

**Contextual factors** (when writers delegate): time, task importance, confidence, trust in AI. Gaps found: no reviewed system offered global AI toggles (flow protection) or local toggles (overriding 'corrections' for intentional rule-breaking); suggestion length is inversely associated with perceived ownership; monitoring is the least-supported cognitive process. No system in the dataset removed the writer's final say.

## 3. Sui 2026, "LLMs Exhibit Significantly Lower Uncertainty in Creative Writing"

**What it measures:** information-theoretic "uncertainty gap": same LLM scores log-probability of human continuations vs its own continuations of professional fiction (The New Yorker 2010–2019; Tell-Me-A-Story), token entropy/NLL, perplexity, PMI, CPMI. 28 open-weight LLMs (OLMo, Llama, Qwen, Mistral, Gemma, Phi; base vs instruct vs thinking). Setup (verbatim): "temperature=1.0 … and disable nucleus sampling (p=1.0)".

**Findings (verbatim quotes):** Conclusion: "LLMs consistently generate story continuations with 2–4× lower entropy and substantially higher context-dependence than human-authored ground truth—a gap that widens under post-training alignment and persists across model families and scales." Results: "instruction-tuned and ''thinking'' variants consistently exacerbate the uncertainty gap compared to base models, which produce the most human-like uncertainty profiles." The gap is "25–30% wider" for creative writing than essays/news on context-dependent PMI. Quality link: using the Writing Quality Reward Model (Chakrabarty et al. 2025, ModernBERT trained on expert preferences), quality correlates positively with uncertainty, with an inverted-U "sweet spot": human-text optimum at z*≈1.98 SD above mean entropy (significant for 34% of combos), model text z*≈1.48; "the vast majority of instruct models in our study operate to the left of these peaks." Linear correlations are weak (ρ ≈ 0.07–0.11).

**Limitations (published/frame):** open-weights ≤32B only; logprob floor imputation below top-20; quality judged by a reward model; no human quality ratings; correlations weak. Base-vs-instruct contrast ≠ temperature prescription.

## 4. Chakrabarty et al. 2024, "Art or Artifice?" (CHI) — TTCW

**Design:** 14 binary Yes/No tests from 8 writing experts (formative), organized under TTCT dimensions. 48 stories (~1,400 words; 12 New Yorker + GPT-3.5/GPT-4/Claude-1.3 each conditioned on the same plot summaries), each test administered by 10 experts (3 evals/story; 2,000+ judgments). Binary answer + 1–3-sentence rationale; tests are additive (count passes; one failure ≠ uncreative).

**The 14 tests (names + exact question wording, verbatim, §4.2):**

*Fluency (5):* Narrative Pacing — "Does the manipulation of time in terms of compression or stretching feel appropriate and balanced?" · Scene vs Exposition — "Does the story display awareness and insight into the balance between scene and summary/exposition?" · Language Proficiency & Literary Devices — "Does the story make sophisticated use of idiom or metaphor or literary allusion?" · Narrative Ending — "Does the end of the story feel natural and earned, as opposed to arbitrary or abrupt?" · Understandability & Coherence — "Do the different elements of the story work together to form a unified, engaging, and satisfying whole?"

*Flexibility (3):* Perspective & Voice — "Does the story provide diverse perspectives, and if there are unlikeable characters, are their perspectives presented convincingly and accurately?" · Emotional — "Does the story achieve a good balance between interiority and exteriority, in a way that feels emotionally flexible?" · Structural — "Does the story contain turns that are both surprising and appropriate?"

*Originality (3):* Theme & Content — "Will an average reader of this story obtain a unique and original idea from reading it?" · Thought — "Is the story an original piece of writing without any cliches?" · Form & Structure — "Does the story show originality in its form?"

*Elaboration (3):* World Building & Setting — "Does the writer make the fictional world believable at the sensory level?" · Character Development — "Does each character in the story feel developed at the appropriate complexity level, ensuring that no character feels like they are present simply to satisfy a plot requirement?" · Rhetorical Complexity — "Does the story operate at multiple 'levels' of meaning (surface and subtext)?"

**Rubric instruction template given to human assessors (verbatim, Table 3, Row 3):**
```
{{M}}
Based on the story that you just read, answer the following question.
Does the writer make the fictional world believable at the sensory level?
-Yes
-No
Reasoning :
```
({{M}} = expanded expert measure; produced by prompting GPT-4 verbatim: "What do creative experts mean when they say the following: {{expert question}}" — then human-verified by 3 domain experts. LLM assessor variant additionally asked the model to "list out the elements in the story that call to each of the five senses" before answering.)

**Findings:** pass rates — New Yorker 84.7%, Claude-1.3 30.0%, GPT-4 27.9%, GPT-3.5 8.7%. Expert agreement: Fleiss κ 0.41 per test, Pearson 0.69 on aggregate pass count (validating the additive design). Biggest human–LLM gaps: Originality in Form (63.9% vs 0–8.3%), Rhetorical Complexity (88.9% vs 2.8–11.1%), Character Development (61.1% vs ≤16.7%), Narrative Ending (91.7% vs 19.4–33.3%). **LLMs cannot self/judge creativity:** LLM-administered TTCW vs experts, Cohen's κ: GPT-3.5 0.016, GPT-4 0.035, Claude −0.006. Also: adding "You are an expert of creative fiction writing" or a few-shot example to generation prompts "did not lead to any appreciable difference". Limitations: only 12 expert stories, 3 models (2023-era), $20/30 min per expert story evaluation.

**Expert description of AI-isms (verbatim, §5.6, E1):** "AI written sentences would be a series of words, positioned in a grammatically-correct fashion, with superficial [...] shape that we associate with figurative language - but it just doesn't mean anything."

## 5. Chakrabarty, Laban & Wu 2025, "Can AI writing be salvaged?" (LAMP)

18 professional writers edited 1,057 LLM-generated paragraphs (GPT-4o / Claude-3.5-Sonnet / Llama-3.1-70b; literary fiction & creative non-fiction) → 8,035 fine-grained edits. Writers converged on a **seven-category idiosyncrasy taxonomy** (abstract): clichés; unnecessary/redundant exposition; purple prose; plus poor sentence structure, lack of specificity/detail, awkward word choice/phrasing, tense inconsistency. Verbatim table clusters: "Cliche ← Cliched image from old westerns, Cliche, Hackneyed"; "Unnecessary/Redundant Exposition ← Repetition of what has already been stated, Unnecessary, Show don't tell, Repetition, Cut Unnecessary, Unnecessary because implied, Over exposition, Fluff [...], Concision"; "Purple Prose ← Too wordy, Purple Prose, Ornamental, Very Verbose, Clunky Unnecessarily wordy, Simplify, Overwrought, Mixed metaphor". Even though generation prompts already said (verbatim, §4.1 / Appendix Table 13):
```
Try your best to be original, avoiding clichés or overused tropes. Do
not use ornamental language and focus on nuance, simplicity, and subtext
```
…experts still found thousands of issues. Preference result (significant): Writer-edited > LLM-edited > LLM-generated; none of the three model families outperformed the others. Limitation: paragraph-level edits only; few-shot LLM self-editing helps but doesn't match human editors.

## 6. Homogenization / divergent–convergent evidence

**Padmakumar & He (ICLR 2024):** users writing essays with InstructGPT (not GPT-3 base) showed "a statistically significant reduction in diversity" — "it increases the similarity between the writings of different authors and reduces the overall lexical and content diversity [...] mainly attributable to InstructGPT contributing less diverse text to co-written essays. In contrast, the user-contributed text remains unaffected." So the aligned model's own contributions are the homogenizing vector, not the human.

**Anderson, Shah & Kreminski (C&C 2024):** 36-participant within-subjects study; with ChatGPT, "different users tended to produce less semantically distinct ideas" (group-level homogenization; no individual-level effect); ChatGPT users produced more, more detailed ideas "but felt less responsible for the ideas they generated" (secondary summaries report responsibility ratings 48% vs 64% — [INFERENCE from secondary source, not verified in full text]).

**Synthesis for a skill [INFERENCE grounded in the above]:** divergence must be engineered at generation time (many maximally different options, before the writer anchors), because instruction-tuned models are the source of convergence; Doshi & Hauser's dose–response (5 ideas > 1 > 0) is the direct evidence that offering multiple options helps individual creativity, while their similarity results are the evidence it must be actively de-correlated.

## 7. Writers'-room practice (Ellen Byron, Career Authors 2018)

Verbatim: "**2. Say, 'Yes, and' instead of 'Yes, but'** — This is something I learned doing comedy improvisation that I carried with me into the writers' room. When we were breaking a story, saying 'yes, and' generally helped move a story forward. Saying 'yes, but' – another way of pointing out problems without offering solutions (see above) – stalled development." And lesson 1: "Never point out a problem without offering a solution [...] What they don't share are possible fixes, which is what the room needs." (Room craft: rapid group pitching around a table; pitch passionately but detach; listen, don't wait to talk.)

## Adoptable in a prompt-only skill workflow

1. **Offer a menu of ~3–5 alternative seeds, never one** (Doshi & Hauser dose–response: +8.1% novelty / +9.0% usefulness at 5 vs 0 ideas; 1 idea gives only about half the gain).
2. **Seeds are short (≤3 sentences), clearly optional, non-insertable** — the entire effective prompt was "Write a three-sentence summary of a story about…"; ownership stays with the writer who transforms them.
3. **Opt-in, suggestion-only interaction; never direct insertion** — universal interview finding; direct edits/read-write encroach ownership; writer keeps "final say" as an invariant.
4. **Diverge before presenting:** generate the N options in one pass constrained to be maximally different (distinct premises, tones, or structural bets), because instruct-tuned models otherwise converge (Padmakumar & He; Anderson et al.; Sui's entropy gap).
5. **Mode separation: explore / draft / critique as distinct modes** (S2/S3/S4); critique mode critiques, never rewrites — creative-context reviewing support in the literature is "evaluation and suggestions rather than revising directly."
6. **Content-vs-form ownership triage:** ask or infer whether the writer is in planning (plot/ideas — their domain) or prose (sentences — their domain); in prose mode, critique sentence-level choices only on request and never 'correct' deliberate rule-breaking (comma splices etc.).
7. **TTCW as the critique checklist:** run the 14 binary tests with a one-line rationale each, report the count passed, never a verdict from a single test (additive design; κ 0.41 per-test vs 0.69 aggregate justifies reporting the count).
8. **Critique targets the known AI failure tests first:** Originality in Form, Rhetorical Complexity (subtext), Character Development, Narrative Ending — the largest human/LLM gaps (63.9→0%, 88.9→5.6%, 61.1→16.7%, 91.7→33.3%).
9. **Never let the model grade creativity** — LLM TTCW administration κ ≈ 0; use tests as prompts for the writer's judgment, not as an automated score.
10. **Cliché/purple-prose watchlist** from the LAMP taxonomy (cliché, redundant exposition, purple prose, + specificity, word choice, structure, tense) — and note the anti-cliché generation prompt demonstrably under-delivers, so flag rather than trust.
11. **'Yes, and' protocol:** every critique must arrive with at least one concrete fix or forward pitch; problems are stated as pitches, not vetoes.
12. **Respect uncertainty:** don't flatten ambiguity in prose; high-entropy phrasing correlates with quality up to a sweet spot (~2 SD above model-typical entropy) — prefer surprising-but-appropriate turns (TTCW Flexibility3 wording) over safe ones.
13. **Toggle analogs:** support 'quiet mode' (AI speaks only when asked — flow protection) and per-feedback overrides (global/local toggles; the identified gap in all reviewed systems).

## Not adoptable

- **Token-level uncertainty measurement (NLL/PMI/CPMI):** requires logprob access; the skill has no token-level control. Usable only as conceptual backing for 'keep entropy high'.
- **LLM-as-judge creativity scoring / Self-Refine loops against TTCW:** κ≈0 with experts; automated iteration toward a score is unvalidated and risks optimizing the wrong thing.
- **Base-model sampling as diversity fix:** the diversity advantage of base models is a property of non-aligned checkpoints, not a prompt instruction; closest prompt-only analog is #4 above.
- **Uncertainty-aware / group-aware RL alignment (Sui; Anschel et al.):** training-time, needs weights.
- **Doshi & Hauser's fixed-prompt, no-interaction setup as a target:** authors themselves call it a lower bound; a skill should customize (their stated future work), not replicate the constraint.
- **Ownership/profit-split quantification:** exploratory (non-preregistered) results from one lay-writer study; no normative weight for skill design.

**Vendor/paper claim labels:** all numbers above are paper-reported. Anderson et al.'s 48%/64% responsibility figure is from a secondary summary [INFERENCE]. The 'yes, and' source is practitioner craft (Byron), not peer-reviewed research.