// src/ui/InteractionButtons.js
import Phaser from 'phaser';
import { generateButtonTexture } from '../utils/PlaceholderGraphics.js';

/**
 * InteractionButtons - Radial menu for unicorn care actions
 * 
 * Displays four action buttons (Feed, Love, Play, Sleep) around a unicorn
 * when the fairy reaches it.
 */
export class InteractionButtons {
    /**
     * Create the interaction buttons
     * @param {Phaser.Scene} scene - The scene to add buttons to
     */
    constructor(scene) {
        this.scene = scene;
        this.container = null;
        this.isVisible = false;
        this.targetX = 0;
        this.targetY = 0;
        
        // Callbacks for button actions
        this.onFeed = null;
        this.onLove = null;
        this.onPlay = null;
        this.onSleep = null;
        
        // Button references
        this.buttons = {};
    }

    /**
     * Create the button container (call once during scene create)
     */
    create() {
        // Create container
        this.container = this.scene.add.container(0, 0);
        this.container.setDepth(100); // Above everything
        this.container.setVisible(false);
        
        // Button configuration
        const buttonSize = 50;
        const radius = 70; // Distance from center
        const buttonConfigs = [
            { name: 'feed', label: 'Feed', angle: -90, color: 0xff9800 },
            { name: 'love', label: 'Love', angle: 0, color: 0xe91e63 },
            { name: 'play', label: 'Play', angle: 90, color: 0x4caf50 },
            { name: 'sleep', label: 'Sleep', angle: 180, color: 0x9c27b0 }
        ];
        
        buttonConfigs.forEach(config => {
            // Calculate position
            const rad = Phaser.Math.DegToRad(config.angle);
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            
            // Create button texture
            const textureKey = generateButtonTexture(this.scene, config.name, buttonSize, config.color);
            
            // Create button sprite
            const button = this.scene.add.sprite(x, y, textureKey)
                .setInteractive({ useHandCursor: true })
                .setScale(0.8);
            
            // Create label
            const label = this.scene.add.text(x, y + buttonSize/2 + 5, config.label, {
                fontSize: '12px',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);
            
            // Hover effects
            button.on('pointerover', () => {
                button.setScale(1);
                this.scene.tweens.add({
                    targets: button,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 100
                });
            });
            
            button.on('pointerout', () => {
                button.setScale(0.8);
            });
            
            // Click handler
            button.on('pointerdown', () => {
                this.handleButtonClick(config.name);
            });
            
            this.buttons[config.name] = { button, label };
            this.container.add([button, label]);
        });
    }

    /**
     * Handle button click
     * @param {string} action - The action name
     */
    handleButtonClick(action) {
        switch (action) {
            case 'feed':
                if (this.onFeed) this.onFeed();
                break;
            case 'love':
                if (this.onLove) this.onLove();
                break;
            case 'play':
                if (this.onPlay) this.onPlay();
                break;
            case 'sleep':
                if (this.onSleep) this.onSleep();
                break;
        }
        
        // Visual feedback
        const btn = this.buttons[action];
        if (btn) {
            this.scene.tweens.add({
                targets: btn.button,
                scaleX: 0.6,
                scaleY: 0.6,
                duration: 50,
                yoyo: true
            });
        }
    }

    /**
     * Show the interaction buttons at a position
     * @param {number} x - X position (unicorn center)
     * @param {number} y - Y position (unicorn center)
     */
    show(x, y) {
        this.targetX = x;
        this.targetY = y;
        this.container.setPosition(x, y);
        this.container.setVisible(true);
        this.isVisible = true;
        
        // Animate buttons appearing
        Object.values(this.buttons).forEach((btn, index) => {
            btn.button.setScale(0);
            btn.button.setAlpha(0);
            
            this.scene.tweens.add({
                targets: btn.button,
                scaleX: 0.8,
                scaleY: 0.8,
                alpha: 1,
                duration: 150,
                delay: index * 50,
                ease: 'Back.easeOut'
            });
        });
    }

    /**
     * Hide the interaction buttons
     */
    hide() {
        if (!this.isVisible) return;
        
        // Animate buttons disappearing
        Object.values(this.buttons).forEach((btn, index) => {
            this.scene.tweens.add({
                targets: btn.button,
                scaleX: 0,
                scaleY: 0,
                alpha: 0,
                duration: 100,
                delay: index * 25,
                onComplete: () => {
                    if (index === Object.keys(this.buttons).length - 1) {
                        this.container.setVisible(false);
                        this.isVisible = false;
                    }
                }
            });
        });
    }

    /**
     * Set callback for feed button
     * @param {Function} callback - Callback function
     */
    setOnFeed(callback) {
        this.onFeed = callback;
    }

    /**
     * Set callback for love button
     * @param {Function} callback - Callback function
     */
    setOnLove(callback) {
        this.onLove = callback;
    }

    /**
     * Set callback for play button
     * @param {Function} callback - Callback function
     */
    setOnPlay(callback) {
        this.onPlay = callback;
    }

    /**
     * Set callback for sleep button
     * @param {Function} callback - Callback function
     */
    setOnSleep(callback) {
        this.onSleep = callback;
    }

    /**
     * Update button positions (if needed for moving targets)
     */
    update() {
        if (this.isVisible) {
            this.container.setPosition(this.targetX, this.targetY);
        }
    }
}