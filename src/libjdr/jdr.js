const RANDOMIZER_DEFAULT = Math.random;
let randomReal = RANDOMIZER_DEFAULT;

/**
 * Setup a function to generate random numbers
 * For example, can be used for alternate pseudo random number
 * generators or even true random generator
 * @param {function} randomizer A function that returns a number greater
 * than or equal than 0, less than 1
 */
function setRandomizer(randomizer) {
    randomReal = randomizer;
}

function resetRandomizer() {
    randomReal = RANDOMIZER_DEFAULT;
}

function d (sides) {
    return Math.floor(randomReal() * sides) + 1;
}

/**
 * @return 0-sides
 */
function d0 (sides) {
    return d(sides+1) - 1;
}

function d10 () {
    return d(10);
}


module.exports = {
    setRandomizer,
    resetRandomizer,
    randomReal,
    d,
    d0,
    d10,
};
