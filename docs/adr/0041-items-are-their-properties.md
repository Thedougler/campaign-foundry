# Items are their Properties

Amends [ADR 0005](0005-full-rules-text-in-the-wiki.md) and [ADR 0040](0040-templates-are-minimal-by-default.md).

ADR 0005 gave Items a `## Play` section containing their rules text, with the properties nested inside it, and ADR 0040 made every other section optional around it. The wrapper was still required, and it didn't describe its content: "Play" names what a DM does, while every other page kind names its sections for what they contain. The DM ruled it out on 2026-10-11: "Play is a shit section entirely, not really that descriptive."

Decision:

- **`## Properties` is the section.** An Item page opens on `## Properties`, a level-two heading holding its full rules text: the italic classification line ending on a full stop, then the published mechanics verbatim. Property subheadings nest at level three beneath it.
- **No wrapper.** `## Play` is gone from the template, the converter, the gate's layers and every page. A World-free Item page holds its frontmatter, `## Properties` and `## Links` alone, and that is a complete page.
- **Optional sections sit at level two.** `## In use`, `## At a glance` with its First look callout, and `## Depth` are each an optional level-two section in template order, none nested under another.

Consequences: `wiki/templates/item.md` states this section order, and `cfcli convert-items` emits it. The gate reads the order from the template as before. Existing pages migrate to it when encountered, per ADR 0040's lazy migration, and old-order pages stay flagged by the gate until they do.
