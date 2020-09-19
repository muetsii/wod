class ChatMessage {
    constructor(id, player, message) {
        this.id = id;
        this.player = player;
        this.message = message;
    }

    /**
     * Wether this has an associated roll
     */
    hasRoll() {
        // to be implemented
        return false;
    }
}

module.exports = ChatMessage;
