// src/entities/Unicorn.js
import { generateUnicornTexture } from '../utils/PlaceholderGraphics.js';

export class Unicorn {
    // Decay rates: how fast each stat rises per second (0 -> 100)
    static DECAY_RATES = {
        food: 2.5,
        love: 1.5,
        play: 3.0,
        sleep: 1.0
    };

    // Growth XP thresholds for stage transitions
    static STAGE_THRESHOLDS = {
        Young: 100,
        Teen: 300,
        Adult: 600
    };

    constructor(config) {
        this.id = config.id || Date.now();
        this.name = config.name || "New Friend";
        this.type = config.type || 'Leaf'; // Water, Fire, Leaf, Wind, Electric, Special
        this.stage = config.stage || 'Young'; // Young, Teen, Adult
        
        // Stats: 0 is satisfied, 100 is critical
        this.stats = {
            food: config.stats?.food || 0,
            love: config.stats?.love || 0,
            play: config.stats?.play || 0,
            sleep: config.stats?.sleep || 0
        };

        this.growthProgress = config.growthProgress || 0;
        this.isUnhappy = false;
        
        // Visual feedback properties
        this.isCrying = false;
        this.movementSpeed = 1.0;
        this.stageChanged = false; // Flag for scene to detect transitions
        
        // Phaser sprite reference (set when added to scene)
        this.sprite = null;
        
        // Stat bar references (set when created)
        this.statBars = null;
        this.statBarOffset = 25; // Distance above sprite (positions bottom bar 5px above sprite)
    }

    getEXP() {
        const values = { 'Young': 1, 'Teen': 3, 'Adult': 10 };
        return values[this.stage];
    }

    /**
     * Create a sprite for this unicorn in the given scene
     * @param {Phaser.Scene} scene - The scene to add the sprite to
     * @param {number} x - X position
     * @param {number} y - Y position
     * @returns {Phaser.GameObjects.Sprite} The created sprite
     */
    createSprite(scene, x, y) {
        const textureKey = generateUnicornTexture(scene, this.type, this.stage);
        this.sprite = scene.add.sprite(x, y, textureKey);
        return this.sprite;
    }

    /**
     * Update the sprite texture (e.g., after stage change)
     * @param {Phaser.Scene} scene - The scene containing the sprite
     */
    updateSpriteTexture(scene) {
        if (this.sprite) {
            const textureKey = generateUnicornTexture(scene, this.type, this.stage);
            this.sprite.setTexture(textureKey);
        }
    }

    /**
     * Update unicorn state - applies stat decay and growth
     * @param {number} delta - Time elapsed in milliseconds since last update
     */
    update(delta) {
        // delta is in milliseconds, convert to seconds
        const deltaSeconds = delta / 1000;
        
        // Apply decay to each stat
        for (const stat in this.stats) {
            this.stats[stat] += Unicorn.DECAY_RATES[stat] * deltaSeconds;
            this.stats[stat] = Math.min(100, Math.max(0, this.stats[stat]));
        }
        
        // Check if unhappy (any stat at 100)
        this.isUnhappy = Object.values(this.stats).some(stat => stat >= 100);
        
        // Update visual feedback state
        this.isCrying = this.isUnhappy;
        this.movementSpeed = this.isUnhappy ? 0.5 : 1.0;
        
        // Accumulate growth XP if all needs met
        if (!this.isUnhappy) {
            this.growthProgress += deltaSeconds * 10; // 10 XP per second when happy
            this.stageChanged = this.checkStageTransition();
        } else {
            this.stageChanged = false;
        }
    }

    /**
     * Check if unicorn should transition to next stage
     * @returns {boolean} True if stage changed
     */
    checkStageTransition() {
        const stages = ['Young', 'Teen', 'Adult'];
        const currentIndex = stages.indexOf(this.stage);
        
        if (currentIndex < stages.length - 1) {
            const nextStage = stages[currentIndex + 1];
            if (this.growthProgress >= Unicorn.STAGE_THRESHOLDS[nextStage]) {
                this.stage = nextStage;
                this.growthProgress = 0; // Reset for next stage
                return true; // Stage changed
            }
        }
        return false;
    }

    /**
     * Reduce a stat (used when player performs care action)
     * @param {string} statName - The stat to reduce
     * @param {number} amount - Amount to reduce by
     */
    reduceStat(statName, amount) {
        if (this.stats.hasOwnProperty(statName)) {
            this.stats[statName] = Math.max(0, this.stats[statName] - amount);
        }
    }

    /**
     * Create stat bars for this unicorn
     * @param {Phaser.Scene} scene - The scene to add bars to
     * @param {number} x - X position (unicorn center)
     * @param {number} y - Y position (unicorn center)
     */
    createStatBars(scene, x, y) {
        if (this.statBars) return; // Already created
        
        this.statBars = {
            container: scene.add.container(0, 0),
            bars: {},
            labels: {}
        };
        
        const stats = ['food', 'love', 'play', 'sleep'];
        const colors = {
            food: 0xff9800,
            love: 0xe91e63,
            play: 0x4caf50,
            sleep: 0x9c27b0
        };
        const warningColor = 0xff0000;
        const criticalThreshold = 80;
        
        stats.forEach((stat, index) => {
            const yPos = index * 6; // Reduced spacing
            const isCritical = this.stats[stat] >= criticalThreshold;
            
            // Label on left side (right-aligned)
            const label = scene.add.text(-45, yPos + 1, stat.charAt(0).toUpperCase() + stat.slice(1), {
                fontSize: '10px', // Smaller font
                fill: isCritical ? '#ff6666' : '#ffffff'
            }).setOrigin(1, 0.5);
            
            // Background bar (80px wide, 3px tall) - centered
            const bgBar = scene.add.rectangle(0, yPos + 1, 80, 3, 0x333333).setOrigin(0, 0);
            
            // Fill bar
            const fillWidth = Math.max(1, (80 / 100) * (100 - this.stats[stat])); // Scale to 80px max
            const fillBar = scene.add.rectangle(
                0, yPos + 1, fillWidth, 3, 
                isCritical ? warningColor : colors[stat]
            ).setOrigin(0, 0);
            
            this.statBars.labels[stat] = label;
            this.statBars.bars[stat] = {
                fill: fillBar,
                bg: bgBar,
                color: colors[stat]
            };
            
            this.statBars.container.add([bgBar, fillBar, label]);
        });
        
        this.statBars.container.setDepth(100);
        this.updateStatBarsPosition(x, y);
        this.statBars.container.setVisible(true);
    }

    /**
     * Update stat bar visuals (widths and colors)
     */
    updateStatBars() {
        if (!this.statBars) return;
        
        const warningColor = 0xff0000;
        const criticalThreshold = 80;
        
        ['food', 'love', 'play', 'sleep'].forEach(stat => {
            if (this.statBars.bars[stat]) {
                const fillWidth = Math.max(1, (80 / 100) * (100 - this.stats[stat]));
                this.statBars.bars[stat].fill.width = fillWidth;
                
                const isCritical = this.stats[stat] >= criticalThreshold;
                this.statBars.bars[stat].fill.fillColor = isCritical ? warningColor : this.statBars.bars[stat].color;
                
                // Update label color
                this.statBars.labels[stat].setStyle({
                    fill: isCritical ? '#ff6666' : '#ffffff'
                });
            }
        });
    }

    /**
     * Update stat bar position to follow the unicorn
     * @param {number} x - Current X position of unicorn
     * @param {number} y - Current Y position of unicorn
     */
    updateStatBarsPosition(x, y) {
        if (this.statBars && this.statBars.container) {
            this.statBars.container.setPosition(x, y - this.statBarOffset);
        }
    }

    /**
     * Destroy stat bars (cleanup)
     */
    destroyStatBars() {
        if (this.statBars) {
            if (this.statBars.container) {
                this.statBars.container.destroy();
            }
            this.statBars = null;
        }
    }
}
