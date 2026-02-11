# GAME_RULES.md

## 1. Core Architecture

* **Engine:** Phaser 3 (JavaScript/ES Modules).
* **Resolution:** 16:9 Landscape, responsive `Scale.FIT`.
* **Stage Isolation:** Only the active Scene processes logic. Transitioning between scenes (Enclosure ↔ Overworld) pauses the previous scene and passes data via a `GlobalState` object.
* **Save System:** "Coarse" persistence. Save to `localStorage` only at Day/Night transitions.

## 2. Entity Logic: Unicorns

* **Stages:** Young (Lead to bed/Screams), Teen (Auto-sleep delay), Adult (Wings/Cloud Biome access).
* **Stats (0-100):** Food, Love, Play, Sleep.
* **Decay:** Stats rise over time. 100 = Unhappy (Slower speed, crying animation).
* **Growth:** Hidden `growthXP` fills when all needs are < 100.
* **EXP:** Young = 1, Teen = 3, Adult = 10.

## 3. Entity Logic: Fairies

* **Limit:** Max 6. Player is "Main Fairy."
* **Learning:** Acquired Fairies unlock "Auto-Fix" buttons only after the Player manually completes the corresponding minigame while the Acquired Fairy is present in the Enclosure.
* **Behavior:** Auto-Fixes have a radial cooldown.

## 4. Overworld & Exploration

* **Navigation:** Node-based map.
* **Fear Mechanic:** * `TotalSpookiness = Sum(Mob factors)`.
* If `TotalSpookiness > PartyEXP`: Fear Meter increases.
* If Fear = 100%: Forced retreat to previous node.


* **Type Advantage:** * Water → Fire Biome (-10 Spookiness).
* Fire → Leaf Biome (Visual light).
* Leaf → Wind Biome (2x Food).
* Wind → Electric Biome (+Speed).
* Electric → Water Biome (2x Fear Recovery).


* **Cloud Biome:** Safe zone. Requires an Adult Unicorn in party. Contains the Queen.

## 5. Technical Requirements

* **Input:** Pointer-based (handles touch and click).
* **Assets:** No collision physics required. Use depth layering (Fairies > Unicorns > Background).
* **Naming:** Random `Prefix + Suffix` on discovery. Editable by player.
