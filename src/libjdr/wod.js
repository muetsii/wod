const jdr = require('./jdr');

/**
 * Roll a pool of x dice (d10)
 * @param {number} x The number of dice
 * @param {string} [options.speciality] If the speciality applies.
 * Values: 'v3' (explosion), v20 (2x10), dav (roll one extra die)
 * @return {Array[number]} An array with the results
 */
function xd(x, options = {}) {
    let dice = new Array(x).fill(1).map(() => jdr.d10());
    switch(options.speciality) {
    case 'v3':
        let ntens = dice.filter(d => d == 10).length;
        for (let i = 0; i < ntens; i++) {
            const die = jdr.d10();
            if (die == 10) ntens++;
            dice = dice.concat(die);
        }
        break;
    case 'v20':
        const tens = dice.filter(d => d == 10);
        if (tens) {
            dice = dice.concat(tens);
        }
        break;
    case 'dav':
        dice.push(jdr.d10());
    }

    return dice;
}


module.exports = {
    ...jdr,
    xd,
};
