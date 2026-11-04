---
name: skill-creator
description: Skill creation — create a new skill from the DM's intent and hand it to its first dogfood run. For an existing skill, use dogfood.
---

# Skill creator

Turn the DM's intent into a minimal new skill, then hand it to `skill://dogfood`, which improves it through real work from then on.

## Steps

1. **Intent.** Create the workspace with `cd "$(mktemp -d)" && pwd -P` and write `brief.md` there with the target path and two or three concrete use cases (the user's goal, the steps and the tools each takes). The brief also gives the trigger phrases (one per distinct branch) and the inputs and outputs. It ends with the acceptance criteria the DM will judge by. When the DM points at a workflow already in the conversation, extract these from its history (tools used, sequence, corrections, formats) and ask only for the gaps. The skill's home is `.omp/skills/<name>/` unless the DM chooses another.
2. **Author.** Dispatch `skill-writer` with `brief.md` and the target path. It drafts a minimal `SKILL.md` in that home and, for a skill that creates D&D content, one default case in `evals/cases.yaml` per `evals/README.md` § Design. On return, run `bun run cfcli -- eval validate <skill-dir>` and check that the description lists the trigger branches and every pointer resolves to an existing file. Return concrete gaps to the writer until the skill matches the brief and validates.
3. **Trigger check (optional).** Offer it when the body is stable, and run it when the DM accepts, following [`references/description-evals.md`](references/description-evals.md).
4. **Hand off.** Start a DM-started `dogfood` run with the new skill as its target.
