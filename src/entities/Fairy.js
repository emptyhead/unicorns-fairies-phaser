// src/entities/Fairy.js
import { generateFairyTexture } from '../utils/PlaceholderGraphics.js';

export class Fairy {
    constructor(id, isMain = false) {
        this.id = id;
        this.isMain = isMain;
        this.learnedActions = {
            feed: isMain, // Main fairy knows all
            love: isMain,
            play: isMain,
            sleep: isMain
        };
        this.cooldown = 0;
        
        // Phaser sprite reference (set when added to scene)
        this.sprite = null;
    }

    /**
     * Create a sprite for this fairy in the given scene
     * @param {Phaser.Scene} scene - The scene to add the sprite to
     * @param {number} x - X position
     * @param {number} y - Y position
     * @returns {Phaser.GameObjects.Sprite} The created sprite
     */
    createSprite(scene, x, y) {
        const textureKey = generateFairyTexture(scene, this.isMain);
        this.sprite = scene.add.sprite(x, y, textureKey);
        return this.sprite;
    }
}