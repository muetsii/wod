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
    let tens, ntens;
    switch(options.speciality) {
    case 'v3':
        ntens = dice.filter(d => d == 10).length;
        for (let i = 0; i < ntens; i++) {
            const die = jdr.d10();
            if (die == 10) ntens++;
            dice = dice.concat(die);
        }
        break;
    case 'v20':
        tens = dice.filter(d => d == 10);
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
