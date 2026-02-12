// src/utils/PlaceholderGraphics.js
import Phaser from 'phaser';

/**
 * PlaceholderGraphics - Utility for generating placeholder sprites
 * 
 * Creates programmatic graphics that can be replaced with real assets later.
 * All methods return Phaser.GameObjects.Graphics or generate textures.
 */

// Color palette for unicorn types
const UNICORN_COLORS = {
    Water: 0x4a90d9,
    Fire: 0xe85d4c,
    Leaf: 0x5dba4d,
    Wind: 0x8dd9a8,
    Electric: 0xf4d03f,
    Special: 0xd94ae8
};

// Fairy colors
const FAIRY_COLOR = 0xf5a623;
const FAIRY_MAIN_COLOR = 0xff6b9d;

/**
 * Generate a unicorn placeholder texture
 * @param {Phaser.Scene} scene - The scene to generate the texture in
 * @param {string} type - Unicorn type (Water, Fire, Leaf, Wind, Electric, Special)
 * @param {string} stage - Growth stage (Young, Teen, Adult)
 * @returns {string} The texture key
 */
export function generateUnicornTexture(scene, type = 'Leaf', stage = 'Young') {
    const key = `unicorn-${type}-${stage}`;
    
    // Don't regenerate if texture exists
    if (scene.textures.exists(key)) {
        return key;
    }

    const graphics = scene.add.graphics();
    const color = UNICORN_COLORS[type] || UNICORN_COLORS.Leaf;
    
    // Size based on stage
    const sizes = {
        Young: { w: 40, h: 50 },
        Teen: { w: 60, h: 75 },
        Adult: { w: 80, h: 100 }
    };
    const size = sizes[stage] || sizes.Young;
    
    // Draw body (ellipse)
    graphics.fillStyle(color, 1);
    graphics.fillEllipse(size.w / 2, size.h / 2, size.w * 0.8, size.h * 0.6);
    
    // Draw head
    graphics.fillEllipse(size.w / 2, size.h * 0.2, size.w * 0.4, size.h * 0.3);
    
    // Draw horn
    graphics.fillStyle(0xffffff, 1);
    graphics.fillTriangle(
        size.w / 2, size.h * 0.05,
        size.w / 2 - 4, size.h * 0.15,
        size.w / 2 + 4, size.h * 0.15
    );
    
    // Draw legs
    graphics.fillStyle(color, 1);
    const legWidth = size.w * 0.12;
    const legHeight = size.h * 0.25;
    graphics.fillRect(size.w * 0.2, size.h * 0.6, legWidth, legHeight);
    graphics.fillRect(size.w * 0.35, size.h * 0.6, legWidth, legHeight);
    graphics.fillRect(size.w * 0.55, size.h * 0.6, legWidth, legHeight);
    graphics.fillRect(size.w * 0.7, size.h * 0.6, legWidth, legHeight);
    
    // Draw eye
    graphics.fillStyle(0x000000, 1);
    graphics.fillCircle(size.w * 0.4, size.h * 0.18, 3);
    
    // Adult unicorns get wings
    if (stage === 'Adult') {
        graphics.fillStyle(0xffffff, 0.8);
        graphics.fillEllipse(size.w * 0.1, size.h * 0.4, size.w * 0.3, size.h * 0.2);
        graphics.fillEllipse(size.w * 0.9, size.h * 0.4, size.w * 0.3, size.h * 0.2);
    }
    
    // Generate texture
    graphics.generateTexture(key, size.w, size.h);
    graphics.destroy();
    
    return key;
}

/**
 * Generate a fairy placeholder texture
 * @param {Phaser.Scene} scene - The scene to generate the texture in
 * @param {boolean} isMain - Whether this is the main fairy
 * @returns {string} The texture key
 */
export function generateFairyTexture(scene, isMain = false) {
    const key = isMain ? 'fairy-main' : 'fairy';
    
    // Don't regenerate if texture exists
    if (scene.textures.exists(key)) {
        return key;
    }

    const graphics = scene.add.graphics();
    const color = isMain ? FAIRY_MAIN_COLOR : FAIRY_COLOR;
    const size = 24;
    
    // Draw body (small circle)
    graphics.fillStyle(color, 1);
    graphics.fillCircle(size / 2, size / 2, size / 3);
    
    // Draw wings
    graphics.fillStyle(0xffffff, 0.6);
    graphics.fillCircle(size * 0.25, size * 0.35, size * 0.25);
    graphics.fillCircle(size * 0.75, size * 0.35, size * 0.25);
    
    // Draw glow effect
    graphics.fillStyle(color, 0.3);
    graphics.fillCircle(size / 2, size / 2, size / 2);
    
    // Generate texture
    graphics.generateTexture(key, size, size);
    graphics.destroy();
    
    return key;
}

/**
 * Generate a tear particle texture for crying unicorns
 * @param {Phaser.Scene} scene - The scene to generate the texture in
 * @returns {string} The texture key
 */
export function generateTearTexture(scene) {
    const key = 'tear';
    
    // Don't regenerate if texture exists
    if (scene.textures.exists(key)) {
        return key;
    }

    const graphics = scene.add.graphics();
    const size = 12;
    
    // Draw tear drop shape
    graphics.fillStyle(0x87CEEB, 1);
    graphics.fillCircle(size / 2, size / 2, size / 3);
    
    // Generate texture
    graphics.generateTexture(key, size, size);
    graphics.destroy();
    
    return key;
}

/**
 * Generate a stat bar texture
 * @param {Phaser.Scene} scene - The scene to generate the texture in
 * @param {number} width - Width of the bar
 * @param {number} height - Height of the bar
 * @param {number} fillColor - Fill color
 * @returns {string} The texture key
 */
export function generateStatBarTexture(scene, width = 100, height = 12, fillColor = 0x4caf50) {
    const key = `statbar-${width}-${height}-${fillColor}`;
    
    // Don't regenerate if texture exists
    if (scene.textures.exists(key)) {
        return key;
    }

    const graphics = scene.add.graphics();
    
    // Background
    graphics.fillStyle(0x333333, 1);
    graphics.fillRoundedRect(0, 0, width, height, 3);
    
    // Fill
    graphics.fillStyle(fillColor, 1);
    graphics.fillRoundedRect(1, 1, width - 2, height - 2, 2);
    
    // Generate texture
    graphics.generateTexture(key, width, height);
    graphics.destroy();
    
    return key;
}

/**
 * Generate all placeholder textures for a scene
 * @param {Phaser.Scene} scene - The scene to generate textures in
 */
export function generateAllPlaceholders(scene) {
    // Generate unicorn textures for all types and stages
    const types = ['Water', 'Fire', 'Leaf', 'Wind', 'Electric', 'Special'];
    const stages = ['Young', 'Teen', 'Adult'];
    
    types.forEach(type => {
        stages.forEach(stage => {
            generateUnicornTexture(scene, type, stage);
        });
    });
    
    // Generate fairy textures
    generateFairyTexture(scene, true);
    generateFairyTexture(scene, false);
    
    // Generate tear particle texture
    generateTearTexture(scene);
    
    // Generate stat bar
    generateStatBarTexture(scene);
}

export { UNICORN_COLORS, FAIRY_COLOR, FAIRY_MAIN_COLOR };
