function randomReal () {
    return Math.random();
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
    randomReal,
    d,
    d0,
    d10,
};
