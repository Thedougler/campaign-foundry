---
description: Load friction-report when writing or routing `Gap:` and `Friction:` report lines.
condition: '(?m)^\s*(?:[-*]\s+)?(?:\*\*)?(?:Gap|Friction):'
scope: "text"
interruptMode: never
---

Fix the friction at its source. Report only what you cannot fix, in the format `skill://friction-report` sets.
