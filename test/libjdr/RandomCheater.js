class RandomCheater {
    constructor() {
        this.cheats = [];
    }

    push(result, sides) {
        if (sides) {
            result = (result - 1) / sides;
        }
        this.cheats.push(result);
    }

    shift() {
        return this.cheats.shift();
    }
}

module.exports = RandomCheater;
