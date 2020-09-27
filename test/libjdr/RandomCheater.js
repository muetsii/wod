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
