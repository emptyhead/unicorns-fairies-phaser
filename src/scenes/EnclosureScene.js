import Phaser from 'phaser';
import { Unicorn } from '../entities/Unicorn.js';
import { Fairy } from '../entities/Fairy.js';
import { generateAllPlaceholders } from '../utils/PlaceholderGraphics.js';

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

        // Create stat bars for the unicorn (positioned above it)
        this.testUnicorn.createStatBars(this, width / 2, height / 2);

        // Display growth progress
        this.growthText = this.add.text(width / 2, height / 2 + 110, 
            `Growth: ${Math.round(this.testUnicorn.growthProgress)}/${Unicorn.STAGE_THRESHOLDS['Teen']}`, {
            fontSize: '14px',
            fill: '#aaaaaa'
        }).setOrigin(0.5);

        // Display stage
        this.stageText = this.add.text(width / 2, height / 2 + 130, 
            `Stage: ${this.testUnicorn.stage}`, {
            fontSize: '16px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Scene title
        this.add.text(width / 2, 20, 'Enclosure Scene', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Instructions
        this.add.text(width / 2, height - 30, 'Click unicorn to interact - watch stats decay!', {
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
     * Handle clicking on the unicorn
     */
    handleUnicornClick() {
        // Reduce love stat (care action)
        this.testUnicorn.reduceStat('love', 15);
        this.testUnicorn.updateStatBars();
        
        // Visual feedback - scale tween
        this.tweens.add({
            targets: this.testUnicorn.sprite,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 100,
            yoyo: true
        });
    }

    /**
     * Update unicorn visual state based on mood
     */
    updateUnicornVisuals() {
        if (!this.testUnicorn.sprite) return;
        
        const unicorn = this.testUnicorn;
        
        // Remove existing tweens on sprite
        this.tweens.killTweensOf(unicorn.sprite);
        
        if (unicorn.isUnhappy) {
            // UNHAPPY: Crying effect
            if (!unicorn.cryingEffect) {
                // Create tear particles
                unicorn.cryingEffect = this.add.particles(0, 0, 'tear', {
                    x: unicorn.sprite.x,
                    y: unicorn.sprite.y - 20,
                    lifespan: 800,
                    speedY: { min: -30, max: -60 },
                    speedX: { min: -10, max: 10 },
                    scale: { start: 0.4, end: 0 },
                    frequency: 150,
                    emitting: true
                });
            }
            
            // Sad pulsing animation
            this.tweens.add({
                targets: unicorn.sprite,
                alpha: 0.6,
                duration: 600,
                yoyo: true,
                repeat: -1
            });
            
            // Shake effect
            this.tweens.add({
                targets: unicorn.sprite,
                x: unicorn.sprite.x - 2,
                duration: 50,
                yoyo: true,
                repeat: -1
            });
            
            // Update unhappy indicator
            if (!unicorn.unhappyText) {
                unicorn.unhappyText = this.add.text(
                    unicorn.sprite.x, 
                    unicorn.sprite.y - 50, 
                    'Unhappy!', 
                    { fontSize: '14px', fill: '#ff6666' }
                ).setOrigin(0.5);
            }
        } else {
            // HAPPY: Remove crying effect
            if (unicorn.cryingEffect) {
                unicorn.cryingEffect.destroy();
                unicorn.cryingEffect = null;
            }
            
            // Remove unhappy text
            if (unicorn.unhappyText) {
                unicorn.unhappyText.destroy();
                unicorn.unhappyText = null;
            }
            
            // Happy bounce animation
            this.tweens.add({
                targets: unicorn.sprite,
                y: unicorn.sprite.y - 5,
                duration: 400,
                yoyo: true,
                repeat: -1
            });
        }
    }

    /**
     * Show stage transition message
     */
    showStageTransitionMessage(newStage) {
        const message = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 100,
            `${this.testUnicorn.name} evolved to ${newStage}!`,
            {
                fontSize: '28px',
                fill: '#FFD700',
                stroke: '#000000',
                strokeThickness: 4
            }
        ).setOrigin(0.5);
        
        this.tweens.add({
            targets: message,
            y: message.y - 50,
            alpha: 0,
            duration: 2500,
            onComplete: () => message.destroy()
        });
    }

    update(time, delta) {
        // Update unicorn stats (decay over time)
        if (this.testUnicorn) {
            this.testUnicorn.update(delta);
            this.testUnicorn.updateStatBars();
            this.updateUnicornVisuals();
            
            // Update stat bars position to follow unicorn
            if (this.testUnicorn.sprite) {
                this.testUnicorn.updateStatBarsPosition(
                    this.testUnicorn.sprite.x, 
                    this.testUnicorn.sprite.y
                );
            }
            
            // Update growth text
            const nextThreshold = Unicorn.STAGE_THRESHOLDS[
                this.testUnicorn.stage === 'Young' ? 'Teen' : 
                this.testUnicorn.stage === 'Teen' ? 'Adult' : 'Adult'
            ];
            this.growthText.setText(
                `Growth: ${Math.round(this.testUnicorn.growthProgress)}/${nextThreshold}`
            );
            
            // Update stage text
            this.stageText.setText(`Stage: ${this.testUnicorn.stage}`);
            
            // Check for stage transition
            if (this.testUnicorn.stageChanged) {
                this.testUnicorn.updateSpriteTexture(this);
                this.showStageTransitionMessage(this.testUnicorn.stage);
                this.testUnicorn.stageChanged = false;
            }
        }
        
        // TODO: Handle fairy cooldowns
    }
}

export default EnclosureScene;
