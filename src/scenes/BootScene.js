import Phaser from 'phaser';

/**
 * BootScene - Initial loading scene
 * 
 * Handles asset preloading and transitions to EnclosureScene
 * when loading is complete.
 */
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Display loading text
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const loadingText = this.add.text(width / 2, height / 2, 'Loading...', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // TODO: Load game assets here
        // this.load.image('key', 'assets/path/to/image.png');
        // this.load.spritesheet('key', 'assets/path/to/spritesheet.png', { frameWidth: 32, frameHeight: 32 });
        // this.load.audio('key', 'assets/path/to/audio.mp3');
    }

    create() {
        // Transition to EnclosureScene after loading
        this.scene.start('EnclosureScene');
    }
}

export default BootScene;
