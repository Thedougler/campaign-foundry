# Eval cases isolate one behaviour

ADR 0017 gave each content skill one default case for a complete piece of its type. The npc-design pilot under issue #44 then ran a default case that merged a statblock scale-up with complete person and first-meeting play. `zai/glm-5.3-flash` failed it across six rounds, and on 2026-10-11 the case was split into three asks. That day the DM set the purpose of eval cases: "to isolate and confirm the desired behaviour is being reliably performed, and to iterate quickly and efficiently. Evaluation cases should be split up if they are unrealistic and should be tightly scoped to accurately and naturally control for the correct behaviour without coaching or wasting tokens."

Two research passes back the decision. A survey of primary sources from 2025 and 2026 covered Anthropic's ["Demystifying evals for AI agents"](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) and its claude-api [`eval-hillclimb.md`](https://github.com/anthropics/skills/blob/main/skills/claude-api/shared/evals/eval-hillclimb.md), OpenAI's ["Testing Agent Skills Systematically with Evals"](https://developers.openai.com/blog/eval-skills) and Hamel Husain and Shreya Shankar's [AI Evals FAQ](https://hamel.dev/blog/posts/evals-faq/). A search of the DM's Second Brain covered AI Agent Self-Improvement, the Agentic Co-DM simplification conversation of 2026-09-24, Deterministic linting for agent-facing text and the campaign-foundry hub. Their strongest findings agree:

- **Structural isolation.** Ground truth stays out of the subject's reach by construction. An instruction not to look is only a backstop.
- **Deterministic first.** Code checks are fast, cheap and reproducible. A model grader is kept for judgement that code cannot make.
- **One behaviour per criterion.** Binary criteria that each judge one behaviour detect change with fewer runs, and a composite hides which behaviour moved.
- **Cost is a quality dimension.** Compare tokens, calls, latency and scope alongside success, and optimise for equal or better outcomes at less effort. This is the DM's own position across the Second Brain.

Decision:

- **Isolate.** Each case confirms one behaviour through one natural DM ask, whose facets it may bundle. A prompt combining two separate asks, or an unrealistic one, becomes one case per realistic ask. Every criterion judges one behaviour pass/fail.
- **Plain ask.** The prompt is the DM's request and the facts it needs. Every expectation about the answer is written in Checks and rubrics, and no Runner dispatch contains them.
- **Tight scope.** `source_pages` list exactly the pages the ask and its criteria need.
- **Efficient iteration.** Checks run before rubrics, one run decides each verdict, and avoidable token and time cost is a `dogfood` finding.

`evals/README.md` § Design holds the operative rules. This refines ADR 0017: the default case stays, and a split case becomes an extra case. The Runner's `read` and `bash` can still reach `evals/`, so that half of answer isolation remains instruction-backed through `.omp/agents/test-subject.md`.
