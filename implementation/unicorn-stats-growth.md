# Unicorn Stats & Growth System Implementation

**Branch:** `feature/unicorn-stats-growth`  
**Date:** 2026-02-12

## Summary

Implemented the core stat decay and growth system for unicorns as specified in GAME_RULES.md. Unicorns now progress through stages (Young → Teen → Adult) based on their stats, with visual feedback when they become unhappy.

## Files Created

None (modifications only).

## Files Modified

| File | Changes |
|------|---------|
| `src/entities/Unicorn.js` | Added stat decay rates, `update()` method, stage transitions, visual feedback properties, `reduceStat()` method |
| `src/scenes/EnclosureScene.js` | Updated to drive unicorn updates, added visual feedback methods (`updateUnicornVisuals()`, `showStageTransitionMessage()`), updated stat bars with critical state colors |
| `src/utils/PlaceholderGraphics.js` | Added `generateTearTexture()` function for crying effect particles |

## Features Implemented

### Stat Decay System
- **Decay Rates:** Each stat decays at a different rate:
  - Food: 2.5 pts/sec
  - Love: 1.5 pts/sec
  - Play: 3.0 pts/sec
  - Sleep: 1.0 pts/sec
- Stats rise from 0 (satisfied) to 100 (critical)

### Growth XP System
- **Accumulation:** +10 XP per second when all stats < 100
- **Thresholds:**
  - Young → Teen: 100 XP
  - Teen → Adult: 300 XP
- Growth resets after each stage transition

### Stage Transitions
- Visual notification when unicorn evolves
- Sprite texture updates automatically
- Adult unicorns display wings (existing feature)

### Unhappy State
- Triggered when any stat reaches 100
- **Visual Effects:**
  - Tear particles falling from unicorn
  - Alpha pulsing animation
  - Shake effect
  - "Unhappy!" text indicator

### Critical Stat Warnings
- Stat bars turn red when stats reach 80%+
- Labels change to red at critical threshold

## Balance Values (Tunable)

Located in `src/entities/Unicorn.js`:

```javascript
static DECAY_RATES = {
    food: 2.5,
    love: 1.5,
    play: 3.0,
    sleep: 1.0
};

static STAGE_THRESHOLDS = {
    Young: 100,
    Teen: 300,
    Adult: 600
};
```

## Testing Checklist

- [ ] Stats decay over time when unicorn is idle
- [ ] Growth XP accumulates when all stats < 100
- [ ] Unicorn transitions to Teen at 100 growth XP
- [ ] Unicorn transitions to Adult at 300 growth XP
- [ ] Unicorn shows crying effect when any stat reaches 100
- [ ] Stat bars turn red when stats are critical (>= 80)
- [ ] Stage transition message appears on evolution
- [ ] Click interaction reduces love stat
- [ ] No console errors during gameplay

## Risks Introduced

- None. This is a core game system that follows the design in GAME_RULES.md.
- All existing functionality is preserved.

## Next Steps

1. **Care Interactions:** Add UI buttons for feeding, playing, sleeping to reduce stats
2. **Fairy Auto-Fix:** Fairies can automatically reduce stats with cooldowns
3. **Overworld Exploration:** Apply stat effects to exploration mechanics
4. **Stage-Specific Behaviors:** Young unicorns lead to bed, Teens auto-sleep, Adults fly

## Controls

- **Click Unicorn:** Reduces love stat by 15 points (care interaction placeholder)
- **Watch:** Stats decay over time, growth accumulates, unicorn evolves
