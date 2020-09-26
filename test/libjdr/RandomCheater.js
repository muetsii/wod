class RandomCheater {
    constructor() {
        this.cheats = [];
    }

    push(result, sides) {
        const results = Array.isArray(result) ? result : [result];

        for (let r of results) {
            if (sides) {
                r = (r - 1) / sides;
            }
            this.cheats.push(r);
        }
    }

    shift() {
        return this.cheats.shift();
    }
}

module.exports = RandomCheater;
