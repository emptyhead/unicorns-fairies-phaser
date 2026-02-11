import Phaser from 'phaser';
import { Unicorn } from '../entities/Unicorn.js';
import { Fairy } from '../entities/Fairy.js';
import { generateAllPlaceholders, generateStatBarTexture } from '../utils/PlaceholderGraphics.js';

/**
 * EnclosureScene - Main gameplay scene for unicorn care
 * 
 * This scene handles:
 * - Unicorn management (feeding, playing, sleeping)
 * - Fairy interactions and auto-fix abilities
 * - Day/Night cycle transitions
 * - Save system triggers
 */
class EnclosureScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EnclosureScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Generate all placeholder textures
        generateAllPlaceholders(this);

        // Background
        this.add.rectangle(width / 2, height / 2, width, height, 0x2d4a3e);

        // Create a test unicorn
        this.testUnicorn = new Unicorn({
            id: 'test-1',
            name: 'Sparkle',
            type: 'Leaf',
            stage: 'Young'
        });
        this.testUnicorn.createSprite(this, width / 2, height / 2);

        // Create test fairy (main fairy)
        this.testFairy = new Fairy('main', true);
        this.testFairy.createSprite(this, width / 2 + 100, height / 2 - 50);

        // Display unicorn name
        this.add.text(width / 2, height / 2 + 80, this.testUnicorn.name, {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Display stat bars
        this.createStatBars(width / 2 - 150, 50);

        // Scene title
        this.add.text(width / 2, 20, 'Enclosure Scene', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Instructions
        this.add.text(width / 2, height - 30, 'Placeholder graphics - click to interact', {
            fontSize: '16px',
            fill: '#aaaaaa'
        }).setOrigin(0.5);

        // Make unicorn interactive
        this.testUnicorn.sprite.setInteractive();
        this.testUnicorn.sprite.on('pointerdown', () => {
            this.handleUnicornClick();
        });
    }

    /**
     * Create stat bars display
     * @param {number} x - Starting X position
     * @param {number} y - Starting Y position
     */
    createStatBars(x, y) {
        const stats = ['food', 'love', 'play', 'sleep'];
        const colors = {
            food: 0xff9800,
            love: 0xe91e63,
            play: 0x4caf50,
            sleep: 0x9c27b0
        };

        stats.forEach((stat, index) => {
            const yPos = y + (index * 30);
            
            // Label
            this.add.text(x, yPos, stat.charAt(0).toUpperCase() + stat.slice(1), {
                fontSize: '16px',
                fill: '#ffffff'
            });

            // Background bar
            this.add.rectangle(x + 130, yPos + 8, 100, 16, 0x333333).setOrigin(0, 0);
            
            // Fill bar (will be updated based on stat value)
            const fillWidth = Math.max(1, 100 - this.testUnicorn.stats[stat]);
            const fillBar = this.add.rectangle(x + 131, yPos + 9, fillWidth, 14, colors[stat]).setOrigin(0, 0);
            
            // Store reference for updates
            if (!this.statBars) this.statBars = {};
            this.statBars[stat] = fillBar;
        });
    }

    /**
     * Handle clicking on the unicorn
     */
    handleUnicornClick() {
        // Simple interaction: increase love stat
        this.testUnicorn.stats.love = Math.max(0, this.testUnicorn.stats.love - 10);
        this.updateStatBars();
        
        // Visual feedback
        this.tweens.add({
            targets: this.testUnicorn.sprite,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 100,
            yoyo: true
        });
    }

    /**
     * Update stat bar visuals
     */
    updateStatBars() {
        const stats = ['food', 'love', 'play', 'sleep'];
        stats.forEach(stat => {
            if (this.statBars && this.statBars[stat]) {
                const fillWidth = Math.max(1, 100 - this.testUnicorn.stats[stat]);
                this.statBars[stat].width = fillWidth;
            }
        });
    }

    update(time, delta) {
        // TODO: Update unicorn stats (decay over time)
        // TODO: Check growth XP accumulation
        // TODO: Handle fairy cooldowns
    }
}

export default EnclosureScene;
