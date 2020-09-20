const logger = require('../logger');

const ChatMessage = require('./ChatMessage');

let nextId = 0;

class ChatRoom {
    constructor(name) {
        this.name = name;
        this.messages = [];
        this.players = {};
        this.id = nextId++;
        this.nextMsgId = 0;
    }

    addPlayer(player) {
        // TODO: enforce maximum
        this.players[player.id] = player;
    }

    addMessage(player, message) {
        // TODO: have a maximum and rotate them
        this.messages.push(
            // we could have the id from length... until we start rotating
            new ChatMessage(this.nextMsgId++, player, message)
        );
        return this.messages[this.messages.length - 1];
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

    listPlayers() {
        return Object.keys(this.players).map(id => this.players[id]);
    }

    getPlayerById(playerid) {
        return this.players[playerid];
    }
}

module.exports = ChatRoom;
