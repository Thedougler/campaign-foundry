---
description: Wiki dashes follow the campaign-config Dashes ruling.
condition: "[—–]"
scope: "tool:write(wiki/**/*.md), tool:edit(wiki/**/*.md)"
---

Numeric ranges take an en dash (`3–5`). Em dashes stand only where prose punctuation needs one, per the campaign-config `**Dashes:**` bullet, which in practice means a converted page's replacements for triple hyphens.
Every other dash becomes a full stop, a comma or "and". The gate (`ai-tells.EmDashUsage`, and `Narration.NoEmDash` inside narration callouts) still fails both dashes in a page the agent writes itself.
