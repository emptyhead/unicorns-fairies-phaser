// src/entities/Unicorn.js
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
    }

    getEXP() {
        const values = { 'Young': 1, 'Teen': 3, 'Adult': 10 };
        return values[this.stage];
    }

    update(delta) {
        // Handle stat decay and unhappy state checks here
    }
}

// src/entities/Fairy.js
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
    }
}