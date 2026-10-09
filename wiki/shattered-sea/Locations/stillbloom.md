---
type: Location
kind: Site
summary: "A vibration-triggered Aruhe plant that launches venomous spines at
  fast grounded creatures and rewards careful passage."
sources:
  - "archive/stillbloom.md"
parent: "[[the-quiet|The Quiet]]"
revealed: ""
title: "Stillbloom"
---

![[Stillbloom - Handout Art.jpg]]

## At a glance

- **Draws the Party because.** It makes speed, cover and movement choices matter.
- **Entrance.** Quiet-to-Marsh trails, sun breaks and Rot transition paths.
- **Occupants.** Charged waxy stalks and scavengers on the root mat.
- **Danger.** Fast grounded movement triggers a piercing volley and venom.
- **Prize.** A safe route through careful movement or a weaponised patch.

> [!narration] Entering
> Dull waxy stalks rise where green leaves blacken. Hollow bracts cup dark needles beneath a cream-white flower. Punctured carcasses and narrow scavenger trails mark the shallow roots.

## Play

### Areas

The charged patch, root mat, reload window and nearby cover.

### Hazards

A grounded Small or larger creature moving more than ten feet, Dashing, jumping, falling or being forced ten feet triggers a 15-foot volley. Dexterity DC 14 avoids 2d6 piercing and Exposure.

### Occupants

[[stillbloom|Stillbloom]] stalks and slow scavengers.

### Likely actions

Move ten feet or less, fly without touching the mat, spread out, use cover, lure a volley with an object or clear the venom.

## Depth

### History

Stillbloom responds to vibration rather than malice. After firing it reloads for one minute. Watching scavengers for one minute reveals the safe pattern.

### Hidden truths

Exposure spreads from local numbness to Poisoned, Restrained or Paralysed states, but poison-clearing effects remove the venom.

### Threads

[[taking-on-aruhe|Taking on Aruhe]].

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
