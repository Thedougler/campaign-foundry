---
type: Creature
summary: "A Vine Lash creature (CR 3) used as a controller in The Shattered Sea."
sources:
  - "archive/vine-lash.md"
revealed: ""
title: ""
---

![[Vine Lash - Portrait.png]]

## At a glance

- **Role at the table.** It pins the Party in place, one hanging bundle per captive.
- **Threat.** CR 3. Its fifteen-foot tendrils and its thirty-foot blind sense decide where a fight can happen.
- **Tell.** One hanging root tip twitches just before the stems tighten.
- **Weak to.** Fire above all, and a blade that cuts the stem bundle holding a captive. Destroying a bundle frees its prisoner and leaves the plant unharmed.
- **Used by.** [[Wolfrabbit]] patrols the same territory.

> [!narration] First sight
> Pale stems wind round a branch over the path, leafless and ringed with grey bark, and a few loose root tips hang down past head height. The bundle has hung there so long. It could pass for a length of spare rigging. Then one tip twitches, and the whole coil shifts its grip on the branch.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Vine Lash"
size: Medium
type: plant
alignment: unaligned
ac: "12 (natural armor)"
hp: 52
hit_dice: "8d8 + 16"
speed: "10 ft., climb 10 ft."
stats: [14, 8, 14, 1, 10, 1]
damage_vulnerabilities: "Fire"
condition_immunities: "Blinded, Deafened, Frightened"
senses: "Blindsight 30 ft. (blind beyond this radius), passive Perception 10"
languages: "none"
cr: "3"
traits:
  - name: "False Appearance"
    desc: "While the vine lash is motionless, it is indistinguishable from ordinary jungle vines."
  - name: "Spider climb"
    desc: "The vine lash can climb difficult surfaces, including upside down on ceilings, without an ability check."
  - name: "Grasping Bundle"
    desc: "Each creature the vine lash grapples is held by its own bundle of stems (AC 12, 8 Hit Points). A creature can attack a bundle; damage to it doesn't harm the vine lash, and reducing it to 0 Hit Points ends that grapple."
  - name: "Island's Hand"
    desc: "When a creature makes a claim under Aruhe's law within 60 feet, the nearest vine lash wakes at the end of that creature's next turn. It attacks the marked creature first, then the nearest other creature within reach. It never attacks a creature that has eaten fallen fruit on Aruhe and made no claim since. It withdraws into the canopy when reduced to 26 Hit Points or fewer, or after 1 minute."
actions:
  - name: "Multiattack"
    desc: "The vine lash makes two Tendril attacks, or one Tendril attack and one use of Constrict."
  - name: "Tendril"
    desc: "Melee Attack Roll: +4, reach 15 ft. Hit: 7 (2d4 + 2) Bludgeoning damage, and the target has the Grappled condition (escape DC 12). While Grappled, the target's Speed is 0. The vine lash can grapple up to two creatures at a time."
  - name: "Constrict"
    desc: "One creature Grappled by the vine lash takes 9 (2d6 + 2) Bludgeoning damage. The grapple remains until the target escapes or its bundle is destroyed."
```

## Play

### Tactics

It hangs motionless over the path until a claim staked beneath Aruhe's law nearby wakes it, and it marks the claimant first. Play the twitching tip as the telegraph. Fire and cut bundles free its captives, and trading blows from past the thirty feet its blind sense covers leaves the Party beyond its fifteen-foot tendril reach. Wounded to half or fewer, or once a minute has passed, the plant pulls back up into its canopy.

### Outside a fight

Motionless, it passes for any tangle of jungle vines, and the warning before an encounter is a branch hung with leafless stems above the trail. Any creature that ate of the fallen fruit and has claimed nothing since may pass it by, and it does not chase far past its own canopy.

## Depth

### Ecology

A plant of the World's jungles, it hangs from branches above walking paths. What it feeds on follows its plant form, and a traveller who studies its cut stems identifies the signs with Wisdom (Survival).

### Hidden truths

A destroyed bundle or the branch it hung from tells its habits, and where fire fits among its weaknesses. A successful Intelligence check of the right kind confirms the law that wakes it when a claim is made.

## Links

```base
filters:
 and:
  - file.hasLink(this.file)
views:
 - type: table
  name: Linked from
  groupBy:
   property: note.type
   direction: ASC
  order:
   - file.name
   - note.summary
```
