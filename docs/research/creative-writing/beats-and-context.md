# BeatsAndContext report (verbatim scout output)

All indented fenced blocks are VERBATIM quotes; each carries its source URL and section. Prose between quotes is my analysis or clearly-labeled vendor claims.

# 1. Novelcrafter Beats Cookbook

## 1.1 Beat definition and minimum fields (what-are-beats, 'What should beats include?')

```text
At minimum, your beats should feature:
1. The characters in the scene - Name them specifically instead of using pronouns (the AI can mix up who's who!)
2. The actions they perform - What physically happens
3. Conversation topics - If dialogue occurs, note what they discuss
4. Location changes - If characters move to a new place, include it
```
(https://www.novelcrafter.com/courses/beats-cookbook/what-are-beats)

Structure hierarchy given: Acts > Chapters > Scenes > Beats; beats 'can be as small as "she crossed the room"'. Access convention: type `/` or `|` + space in Write mode. Key tradeoff, verbatim ('The balancing act'):

```text
- Too vague, and the AI might go off in unexpected directions
- Too detailed, and you might not get much prose expansion beyond what you wrote
- Just right, and the AI enhances your vision with polished prose
```

## 1.2 Simple beat (simple-beats, 'Example' + 'Common pitfalls')
Definition: 'one or two sentences describing what happens next... as simple as "continue the story"'. Example beat, verbatim:

```text
Bob has found out that Jane has a secret phone and wants to confront them about it. When Jane arrives home, there is a twist.
```
(https://www.novelcrafter.com/courses/beats-cookbook/simple-beats)

Course-correction technique, verbatim: 'delete the text from where it veers off, and starting your next beat from there (think of this as course correction)'. Documented limitation: prose drifts 'the further the text generation goes'; more requested words = more drift.

## 1.3 Detailed beat (detailed-beats, 'Setup'/'Example')
Include, verbatim: 'Setting / Characters/motivations / Key actions / Key lines of dialogue / Beginning/ending of the scene (this stops the AI from straying too far from your original vision)'. Full example with bracket stage directions, verbatim:

```text
Bob clutches the phone as they wait for Jane to return home from work. They catastrophize the situation, wondering if this is tied into why Jane has been more withdrawn recently. They resist the urge to turn on the phone, warring between their respect for Jane's privacy, and their burning desire for answers. [Slowly build up the tension - from small actions, to larger moments. Bring up memories and how they tie in, and show how irrational Bob is feeling. They are self-aware, but that doesn't mean they stop.]

When Jane enters the house, Bob stands, ready to confront them. Only... Jane has red-eyes, their makeup is ruined, and their clothes torn. They run into Bob's arms, seeking solace. As Jane sobs, Bob sneaks the phone back into their pocket. [The wind is taken from Bob's sails here. They don't know what to do, how to respond, and have all of this pent up tension that they can't do anything with.]
```
(https://www.novelcrafter.com/courses/beats-cookbook/detailed-beats)

Variant 'Forms': beat as a field list (POV character, goals, location, conflict) instead of prose — same technique, helps the author check output. Limitation: 'output is not that much greater in length than the input'; you must explicitly say where creativity/elaboration is allowed.

## 1.4 Dialogue beat (dialogue-beats)
'A script for the AI to follow.' Include, verbatim:

```text
- The dialogue
- Who is saying each line, who they're saying it to, and what their emotional state is
- Anyone else present in the scene (even if they don't talk, they still exist!)
- Any key actions that you want mentioned
- The setting
```
(https://www.novelcrafter.com/courses/beats-cookbook/dialogue-beats)

Example format (trimmed, verbatim except [...]):

```text
*Bob and Jane's house. Bob is pacing the lounge, waiting for Jane to come home. Jane left her phone behind that morning.*

Bob: (looking at Jane's phone, to himself) "This is ridiculous..."
*The front door opens. Jane enters, crying.*
Jane: "Bob."
Bob: "What happened?"
Jane: "I can't. I can't do this anymore."
[...]
*The sound of sirens gets closer.*
```

Conventions: italics for stage business, `Name: (emotion, direction) "line"`. Limitations: output 'proportional to the amount of dialogue you put in'; AI may alter quoted dialogue at high temperature — check temperature/model.

## 1.5 Full-scene beat (scene-beat)
Requires a custom prompt: 'the general purpose prompt is has a default set at 400 words. Unless your scene is super short, you will want to change this value.' Also: 'you may need to ask for an artificially high word count' ('AI has dubious counting skills'); some models 'can be coaxed to write 3-4000 words'. Examples: simple = one-sentence 'Delilah investigates...' beat; detailed = multi-paragraph Delilah/PDACC beat with brackets, e.g. verbatim: '[Delilah is caught off guard, now in a situation she is not strong in (talking to others) and has to improvise. Show this without making it obvious - she tries to hide her weaknesses!]'. Pacing control verbatim: 'You can also use square brackets to tell the ai where to [slow down] or [quicken the pace].'

## 1.6 Bracket convention (bracketed-instructions)

```text
Think of square bracketed instructions here as stage directions. You are instructing the AI how to portray something, or what is going on behind the scenes. They aren't direct depictions of the action, or what any characters say, but rather *how* these actions are done.
```
(https://www.novelcrafter.com/courses/novelcrafter-cookbook/bracketed-instructions)

Two uses: (1) inline in beats; (2) inside prose before an Expand/Rephrase prompt — 'Add your instruction for the rephrase within the prose you want changed... Select the entire text you want expanded **including** you bracketed instructions.' Scene-beat lesson adds a double-bracket form: '[[expand the dialogue/description/thought'.

## 1.7 Six-beat scene skeleton (plan FAQ, 'Scene Beats')
'A beat will result in a small moment, roughly 500 words of prose'; scenes have 'often six or more' beats:

```text
1. Include the setting, time of day, and the characters that are present. Give one of the characters (probably the POV character) a goal.
2. Describe how the character's goal leads to a conflict.
3. Tell how the conflict leads to an outcome, it could be a disaster or a victory, large, small or simply in the imagination of the POV character.
4. The outcome causes a reaction in a character.
5. The reaction leads to a dilemma. (Delilah can either choose to let the dog find the earring, or distract it)
6. The dilemma leads to a decision. In a subsequent scene/chapter, this decision will result in a goal that starts the beat flow anew.
```
(https://www.novelcrafter.com/help/faq/plan/where-do-i-put-my-scene-chapter-act-book-summary-what-about-my-beats)

# 2. Novelcrafter Codex context system

## 2.1 Inclusion algorithm (codex-context-in-prompting, verbatim, whole)

```text
When collecting up all the Codex data for your prompts, we work in the following order:

1. All mentions within the beat/chat message AND text prior to the beat are added to the context.
2. Any manual references to the scene are added
3. The POV entry (if any, and not already mentioned) is added
4. All global entries are added
5. Any related (child) entries to the context in steps 1-4 are added (the relation between the two is NOT added).
6. We then filter out any entries that don't have a description or any text within them.

The Codex entries are then sorted in the prompt by:

1. Global entries
2. By Type
3. By Name

Because the ordering happens after all Codex entries are added, it does not matter which order you mention any Codex entries, or whether you add them to the scene vs beat context.
```
(https://www.novelcrafter.com/help/faq/ai-and-prompting/codex-context-in-prompting)

Exceptions (same page, verbatim): 'Always Include' (formerly global) always at top; 'Include when detected'; 'Don't include when detected' — 'Skipped when MENTIONED in message/prior text / Can be added manually/via being related to a Codex entry that are mentioned'; 'Never include' — 'literally never included'. Dedup: additional-context section merges codex entries into the general codex context; snippets/scenes go to another section. Tags are human-only: '**These are not seen by the AI**'; info the AI needs must live in a field or description. Research/notes tab explicitly excluded from prose-generation context. Relations pull children in on a single mention ('The Council of Five' example).

## 2.2 Tracking options (codex-tracking, 'AI Context' table, verbatim)

```text
| Always include | The entry is always added to the AI context, regardless of whether it was detected in the current text. Formerly called a global entry. |
| Include when detected | (Default) The entry is included in the AI context when its name or an alias is detected in the selected text, scene beats, or chat message. |
| Don't include when detected | The entry is excluded from the AI context even when detected. It can still be pulled in when manually added as scene context or referenced via a relation. |
| Never include | The entry is never sent to the AI. Useful for private notes, spoilers, or reference-only entries. |
```
(https://www.novelcrafter.com/help/docs/codex/codex-tracking)

Matching details: case-insensitive by default with optional case-sensitive mode, auto-pluralisation for English ('Goblin'->'Goblins', not 'Wolf'->'Wolves'), exclusion list for false positives ('Will' vs 'will').

## 2.3 Progressions (state over story time) (progressions-additions, verbatim)

```text
Think of these as addendums to your Codex, that are only "seen" by AI when you are working on a scene **on/after the addition has been created**. If you need to go back to the earlier scene, these progressions are not in the context.
```
(https://www.novelcrafter.com/help/docs/codex/progressions-additions)

Two modes: Addition (default; 'character gets a piercing, but otherwise everything... stays the same') and Replacement ('the original detail is null and void' — actions menu 'replace, not add'). Boundaries verbatim: 'Codex additions are for major progressions or changes in your story. **They are not meant to replace plot points** (include these in your scene instructions).' When multiple scenes/chapters are added to context, entries auto-advance 'to the chronologically last scene included'; only Characters-type entries can be POV.

## 2.4 Context budget (ai-cost, 'Example Prompt', verbatim)

```text
- We have used the system general purpose prompt, with 1,982 words of prose before being read.
- We have called 9 codex entries, with a combined word count of 643 words.
- 367 words of chapter summaries has been included.
- We have an output of 400 words = around 500 tokens
```
(https://www.novelcrafter.com/help/faq/ai-and-prompting/ai-cost)

So a real beat-to-prose prompt is ~3k words in / ~400 out. Scene summaries 'prior to the scene you are currently working on are used as the context for the AI in the system prompt'; one scene per chapter means the scene summary doubles as chapter summary. Vendor guidance: no act/book-summary slot by design — 'it is advised not to put your book summary anywhere the AI can access' (foreshadowing risk); keep it in a reference-only snippet. Context budget doc also warns (via blog): 200k windows exist 'but they are not yet reliable for writing an entire chapter using simple prompting'. No published evaluations; these are cost examples, not quality claims.

## 2.5 Style from samples (writing-samples FAQ)
Workflow: install a 'Your Voice' prompt preset -> put sample prose in a named snippet -> in the manuscript 'create a scene beat, and select Your Writing Style > Tweak and Generate' -> add the snippet to Context -> Generate. Style conditions via context injection, not fine-tuning.

# 3. Sudowrite (vendor blog/docs — treat all performance numbers as vendor claims)

## 3.1 Pipeline stages (workflow post, steps 1-13)
Braindump (no editing: 'Do not edit. Do not arrange.') -> Synopsis ('Sudowrite proposes a 200-400 word version'; author red-pens it, 'asked Brainstorm for five alternative angles on the supernatural element. Picked one. Rewrote.' — 3 passes) -> Character cards -> Worldbuilding cards -> Outline (22-30 chapters; author edits against beat-sheet lens: 'Is your inciting incident in the first 10%?') -> Scenes (2-4 per chapter) -> Write -> Rewrite/Describe/Tone Shift/Expand -> Chapter Continuity -> Chat -> publishing prep.

## 3.2 Character card exact fields (workflow post step 3, verbatim)

```text
- **Voice**: how they speak. Sentence length. Tells. Words they refuse to use.
- **Personality**: not adjectives. Specific behaviors under specific pressures.
- **Backstory**: what they know and what they remember (these are different).
- **Want vs. Need**: the gap that drives them.
- **Arc**: who they are at the start, the midpoint, and the end.
```
(https://sudowrite.com/blog/sudowrite-complete-workflow/)

Example voice notes, verbatim: 'Speaks in measurements. Calls things "load-bearing." Won't say "I love you" for the first 70,000 words.' Craft rule: 'write each character's first dialogue line three times before locking the card... If you can't tell Cass and Rook apart with the tags stripped, the cards aren't tight enough.' 'Sudowrite reads these cards every time you generate prose' (vendor claim).

## 3.3 Worldbuilding/scene fields
World cards: Settings, Lore, Rules, Factions, Items; 'Keep cards short. A 200-word card beats a 2,000-word one because Sudowrite has to use it.' Scene brief, verbatim: 'Each scene gets a one-paragraph brief: POV, location, what changes, what gets revealed, what stays buried. Sudowrite drafts from briefs better than from nothing. The brief is your contract with the model.'

## 3.4 Guided vs Auto (workflow post step 8, verbatim)

```text
**Auto** follows your story. It reads previous prose, the Story Bible, and the scene brief, then continues. Use Auto when a scene has momentum and you want to ride it. The model produces 150-300 words per click. Keep what works. Delete what doesn't. Generate again.

**Guided** takes a direction prompt. "Cass notices the watermark on the wall is fresh, but the tide hasn't been that high in 80 years." Sudowrite writes toward that beat.
```

Honest-ratio claim: 'real drafting is 70% Guided and 30% Auto. Auto is faster, but it drifts.' Creativity dial '6-7' for gothic; guide says dial is 1-11, 'Lower settings (3-5) stay closer to your established patterns.'

## 3.5 Tool-to-task map (guide, verbatim)

```text
- **Write (Guided):** When you know what should happen but can't find the words
- **Write (Auto):** When you want the AI to continue naturally from context
- **Brainstorm:** When you need ideas for any story element (plot, character, setting)
- **Twist:** When a scene feels predictable and needs surprise
- **Expand:** When you've written a sparse draft that needs fleshing out
- **Describe:** When scenes lack sensory immersion
- **Rewrite:** When prose exists but needs polish
```
(https://sudowrite.com/blog/story-ai-generator-the-complete-guide-for-fiction-writers/)

Rewrite modes, verbatim: 'Show Don't Tell / More Inner Conflict / Longer / Shorter / Customize' with e.g. '"Rewrite this paragraph in tighter Abercrombie-style sentences."' Describe: proposes all five senses; 'Pick one or two. Never all five.'

## 3.6 State/memory + continuity
Guide claim: 'Write reads up to 20,000 words of context plus all your Story Bible data... every single time' and 'across up to 25 linked chapters and 20,000 words of context' (template post). Chapter Continuity: 'reads across chapters, compares against your Story Bible, and surfaces contradictions. Most novels turn up 15-40 issues on first pass'; 'Run it again after revisions.' Chat 'reads your Story Bible' — 'Use Chat to pressure-test, not to draft.'

## 3.7 Style-from-sample (guide, verbatim)

```text
The Style Examples feature is underused and incredibly powerful. Feed Sudowrite 2-3 passages that exemplify your prose at its best. The Muse model uses these as templates for voice matching.

Update your Style Examples as your writing evolves.
```

Character-card pro tip (same guide): 'Include speech examples in character cards. Show, don't tell. A sample line of dialogue teaches the AI more than five paragraphs of description.'

## 3.8 Alternatives/revision UX
'The AI proposes; you dispose (or accept, or modify).' 'Regenerate. Compare options. Use the variations as raw material for your judgment.' 'Don't edit while generating. Separate the creation phase from the revision phase.' Author intervention points: every stage hand-off (synopsis/outline/cards are generated drafts the author rewrites), per-click accept/delete, per-scene brief, weekly continuity runs.

## 3.9 Evaluation findings — ALL VENDOR CLAIMS, unsourced/first-party
'92% complete manuscripts faster' (own user survey); '400% increase in first-draft speed' (user reports); '89% of writers using specialized fiction AI tools report improved prose quality' (attributed to a 'Fiction Writers Survey'); '40% faster on average' (attributed to 'Publishing Perspectives'); '73% of fiction writers' block stat (attributed to 'Writer's Digest survey'). No methodology published; treat as marketing. Novelcrafter publishes no quality evaluations at all — only cost/wordcount engineering numbers.

## 3.10 Published limitations
Sudowrite (own blog): Auto drift ('it keeps your novel from becoming Sudowrite's novel'), continuity drift 'silent killer', 'Editors smell it on page one', human beta readers/line editor still required, 8-16 weeks realistic for 90k words. Novelcrafter (own docs): output length proportional to beat detail; word-count requests unreliable; simple beats drift with length; dialogue rewritten at high temperature; 200k context unreliable for whole chapters; AI 'can mix up who's who' without named characters.

# Adoptable in a prompt-only skill workflow
1. **Beat types as a repertoire** (simple/detailed/dialogue/full-scene) — pick per scene need; simple = delegation to subagent creativity, detailed = tight control.
2. **Bracket stage-directions** `[...]` inside beats/prose for how-to-portray meta-instructions the model must not render literally — zero-harness, pure text convention.
3. **Six-beat goal->conflict->outcome->reaction->dilemma->decision skeleton** — ready-made scene structure a planner agent can fill and chain across scenes (decision becomes next scene's goal).
4. **Minimum beat contract** (named characters, actions, topics, location changes) — cheap prompt checklist that prevents pronoun/who's-who errors.
5. **Codex inclusion algorithm** (mentions->manual->POV->global->related->filter-empty; sort global/type/name) — directly implementable as a context-assembly procedure in skill instructions.
6. **Four-state tracking per entry** (always/when-detected/don't-when-detected/never) — spoiler-safe context control, e.g. 'never include' for secret endings.
7. **Progressions with story-time scoping** (addition vs replacement, visible only on/after anchor scene) — solves 'scar mentioned too early' without rewriting the codex; replays of early scenes see early state.
8. **Context budget concreteness** (~2k words prose + ~650 codex + ~370 summaries -> ~400-word output) — realistic sizing for subagent prompts; keep summaries rolling, cap codex entries.
9. **Style conditioning via 2-3 sample passages** in context, updated as voice evolves, plus per-character speech samples — pure prompting, no training.
10. **Auto/Guided distinction + 70/30 guidance** — the planner decides where the author steers each generation vs where momentum carries.
11. **Structured alternatives UX** (brainstorm N angles, compare, keep/delete per fragment) and **generate-then-judge separation** — maps to parallel subagent candidate generation.
12. **Character card field set** (voice/personality-as-behaviors/knows-vs-remembers/want-vs-need/3-point arc + first-line test) and **scene brief fields** (POV, location, what changes/revealed/buried).
13. **Word-count hedging** (ask artificially high; state where elaboration is allowed) — documented mitigation for LLM underproduction.

# Not adoptable
1. **Chapter Continuity as an automated cross-manuscript checker** — vendor black-box feature; a prompt-only workflow can ask an agent to hunt contradictions, but the 'reads across chapters vs Story Bible' automation with 15-40 issue yields is a product claim, not a technique.
2. **Model-per-genre matrix (Muse/Claude/Deepseek/GPT-4o)** — vendor-specific product routing; inapplicable to a harness with its own model set.
3. **Performance statistics (92%, 400%, 89%, 40%, 73%)** — unsourced vendor survey claims; no methodology; must not inform design decisions.
4. **'Story Bible auto-catalogs as you write' / 'zero continuity errors'** — vendor marketing; the adoptable core is the manual keep-the-bible-honest discipline, which they themselves state ('you forgot to tell the Story Bible she doesn't do that').
5. **Custom-prompt infrastructure details** (general-purpose prompt 400-word default, prompt preset library mechanics, BYOK pricing) — Novelcrafter UI plumbing; a markdown skill has no such layer, only equivalent instructions to state output length explicitly.
6. **'Your Voice' preset/snippet mechanics** — the mechanism is UI-specific; adopt the underlying technique (sample passages in context), not the feature.
7. **Series Folder shared-bible claims** — multi-book product claim; nothing beyond 'persist state per campaign' for a skill workflow, which the repo already does via files.

[You have received this identical output 3 times. Re-reading 'agent://BeatsAndContext/report:raw' will not change it — use a narrower selector (path:A-B), or proceed with the edit.]