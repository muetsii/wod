const wod = require('../libjdr/wod');

class Roll {
    constructor(nDices, options = {}) {
        this.result = wod.xd(nDices, options);
    }
};

module.exports = Roll;
