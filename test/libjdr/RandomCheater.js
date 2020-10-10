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
/**
 * Class that can be used as randomizer, but is all except random.
 *
 * Mainly for testing purposes, it allows to push the results you
 * want to get in the rolls.
 */
class RandomCheater {
    constructor() {
        this.cheats = [];
    }

    /**
     * Push a result you want to obtain in te rolls
     *
     * @param {Array|number} result Some numbers between 0 (inc) and 1 (exc)
     * that libjdr will use as a random number (i.e. instead of
     * Math.random()), or the number you want to get (see sides
     * parameter).
     * If result is an array, every element will be pushed.
     *
     * @param {number} sides If != 0, result is interpreted as the
     * number to get if a die of those sides is requested.
     */
    push(result, sides) {
        const results = Array.isArray(result) ? result : [result];

        for (let r of results) {
            if (sides) {
                r = (r - 1) / sides;
            }
            this.cheats.push(r);
        }
    }

    /**
     * Return the first of the pushed results and remove it from
     * the queue
     *
     * @return {number} The fist result in queue
     */
    shift() {
        return this.cheats.shift();
    }
}

module.exports = RandomCheater;
