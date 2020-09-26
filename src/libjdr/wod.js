const jdr = require('./jdr');

/**
 * Roll a pool of x dice (d10)
 * @param {number} x The number of dice
 * @return {Array[number]} An array with the results
 */
function xd(x) {
    return new Array(x).fill(1).map(() => jdr.d10());
}

module.exports = {
    ...jdr,
    xd,
};
