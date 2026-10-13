---
title: Bodytaker Plant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Plant
size: Huge
habitat:
  - Forest
  - Grassland
  - Hill
  - Swamp
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bodytaker Plant
size: Huge
type: plant
alignment: Neutral Evil
ac: 16
hp: 138
hit_dice: 12d12 + 60
modifier: -1
speed: 10 ft., climb 10 ft., swim 10 ft.
stats: [ 18, 8, 20, 14, 14, 18 ]
damage_vulnerabilities: poison
condition_immunities: blinded, charmed, exhaustion, frightened, prone
senses: Blindsight 120 ft., passive Perception 12
languages: telepathy 120 ft.
cr: "7"
traits:
  - name: Podling Link
    desc: The plant can see through and communicate telepathically with any of its podlings within 10 miles of it. When the plant dies, its podlings also die.
  - name: Rejuvenation
    desc: If the plant dies, it revives with all its Hit Points in 1d10 days. This trait doesn't function if the plant is reduced to 0 Hit Points by Poison damage or its remains are sprinkled with salt.
actions:
  - name: Multiattack
    desc: The plant makes three Vine attacks. It can replace one attack with a use of Entrapping Pod.
  - name: Vine
    desc: "*Melee Attack Roll:* +7, reach 20 ft. *Hit:* 17 (3d8 + 4) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from one of four vines."
  - name: Entrapping Pod
    desc: |-
      *Strength Saving Throw:* DC 15, one Large or smaller creature the plant is grappling. *Failure:* The target is pulled into the plant's space, is no longer Grappled, and is trapped in the plant's pod. While trapped, the target has the Blinded and Paralysed conditions, and it has Total Cover against attacks and other effects outside the pod. After 2d4 hours, the trapped target dies, and if it was a Humanoid, a Bodytaker Podling resembling it emerges from the pod.

      A creature outside the pod and within 5 feet of the plant can take an action to make a DC 14 Strength (Athletics) check. On a successful check, the target is removed from the pod, falls in a space within 5 feet of the plant, and has the Prone condition. If the plant dies, the trapped target is no longer Blinded or Paralysed and can escape from the pod using 5 feet of movement, exiting Prone.
reactions:
  - name: Transfer Harm
    desc: "Trigger: An attack roll hits the plant while a podling is within 5 feet of the plant. _Response:_ The plant halves the damage it takes from that attack, and the podling takes the other half of the damage."
```
