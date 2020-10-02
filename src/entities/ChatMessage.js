const Roll = require('./Roll');

class ChatMessage {
    constructor(id, player, message, nDice) {
        this.id = id;
        this.player = player;
        this.message = message;
        if (nDice && nDice > 0) {
            this.roll = new Roll(nDice);
        }
    }

    /**
     * Wether this has an associated roll
     */
    hasRoll() {
        return !!this.roll;
    }
}

module.exports = ChatMessage;
