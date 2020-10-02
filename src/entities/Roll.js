const wod = require('../libjdr/wod');

class Roll {
    constructor(nDice, options = {}) {
        this.nDice = nDice;
        this.result = wod.xd(nDice, options);
    }
};

module.exports = Roll;
