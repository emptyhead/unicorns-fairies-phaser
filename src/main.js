import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import EnclosureScene from './scenes/EnclosureScene.js';
import OverworldScene from './scenes/OverworldScene.js';

/**
 * Phaser 3 Game Configuration
 * 
 * Resolution: 1280x720 (16:9 landscape)
 * Scale Mode: FIT - responsive scaling while maintaining aspect ratio
 * Centering: CENTER_BOTH - centers canvas in container
 */
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#2d2d44',
    audio: {
        disableAudio: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, EnclosureScene, OverworldScene]
};

// Initialize game
const game = new Phaser.Game(config);
