const logger = require('../logger');

const ChatMessage = require('./ChatMessage');

let nextId = 0;

class ChatRoom {
    constructor(name) {
        this.name = name;
        this.messages = [];
        this.players = [];
        this.id = nextId++;
        this.nextMsgId = 0;
    }

    addPlayer(player) {
        // TODO: enforce maximum
        this.players.push(player);
    }

    addMessage(player, message) {
        // TODO: have a maximum and rotate them
        this.messages.push(
            // we could have the id from length... until we start rotating
            new ChatMessage(this.nextMsgId++, player, message)
        );
    }

    getMessages(lastId) {
        if (lastId > this.messages.length - 1) {
            logger.warn(
                `Trying message too high for room ${this.name}`,
                { lastId },
            );
            return [];
        }

        // this will have to change when we rotate
        return this.messages.slice(
            lastId
        );
    }
}

module.exports = ChatRoom;
