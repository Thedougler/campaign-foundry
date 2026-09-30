---
type: Location
kind: Site
summary: "A scorched terrace flower that answers violent disturbance by casting a nearby spell back at its attacker."
sources:
 - "archive/Aruhe - Lesser Black Lotus.md"
 - "archive/lesser-black-lotus.md"
parent: "[[Old Gardens]]"
---

![[Lesser Black Lotus - Handout Art.jpg]]

## At a glance

- **Draws the Party because.** Four unstable harvests can refine into a Black Lotus Heart.
- **Entrance.** Wet terrace growth in the Old Gardens.
- **Occupants.** One small ember-veined bloom.
- **Danger.** Attacking, stepping on or violently disturbing it triggers a spell burst.
- **Prize.** Unstable material worth one-quarter of a Black Lotus Heart.

> [!narration] Entering
> A smaller black flower leans from wet terrace growth. Ember-red veins gather heat around its stamens, and sparks crawl along damp petals that are small enough to step around.

## Play

### Areas

The warm petals, centre cup and surrounding moss where old scorch marks show prior bursts.

### Hazards

Perception DC 14 spots the heat. The nearest spell caster chooses a ranged spell attack. The lotus casts it using that caster's highest slot and is destroyed after it resolves.

### Occupants

The [[Lesser Black Lotus]] bloom.

### Likely actions

Step around it, probe ahead, keep casters back, trigger it from range with a disposable target or harvest carefully. Four portions refine with Arcana DC 15 during a Long Rest.

## Depth

### History

The Party found lesser blooms near wolfrabbit grass and the otter camp. Mage Hand once moved one onto the River.

### Hidden truths

A table burst used Tasha's Hideous Laughter rather than the ranged-attack line. The material is unstable after a failed refinement.

### Threads

[[Taking on Aruhe]].

## Links

```base
filters:
 and:
  - file.hasLink(this.file)
views:
 - type: table
  name: Contains
  filters:
   and:
    - parent == this
  groupBy:
   property: note.kind
   direction: ASC
  order:
   - file.name
   - note.summary
 - type: table
  name: Linked from
  filters:
   and:
    - parent != this
  groupBy:
   property: note.type
   direction: ASC
  order:
   - file.name
   - note.summary
```
