// src/systems/GameState.js
export const GameState = {
    unicorns: [],
    fairies: [new Fairy('starter', true)],
    inventory: {
        food: 5,
        unicornEggs: 0,
        fairyEggs: 0
    },

    save() {
        const data = JSON.stringify(this);
        localStorage.setItem('unicorn_game_save', data);
    },

    load() {
        const data = localStorage.getItem('unicorn_game_save');
        if (data) {
            const parsed = JSON.parse(data);
            Object.assign(this, parsed);
        }
    }
};