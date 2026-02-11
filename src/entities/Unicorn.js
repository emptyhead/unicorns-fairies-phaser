// src/entities/Unicorn.js
import { generateUnicornTexture } from '../utils/PlaceholderGraphics.js';

export class Unicorn {
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
        
        // Phaser sprite reference (set when added to scene)
        this.sprite = null;
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

    update(delta) {
        // Handle stat decay and unhappy state checks here
    }
}
