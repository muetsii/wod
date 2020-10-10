/*
This file is part of World of Diceness, an online dice roller focused
on rolling dice quickly.

Copyright 2020 Los Archivos de la Noche

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
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
