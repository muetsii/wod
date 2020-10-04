const logger = require('../logger');

const ChatRoom = require('./ChatRoom');
const Player = require('./Player');

/**
 * This is the entry point for the business logic
 */


class ChatHouse {
    static singleton() {
        return singleton;
    }

    static st() {
        return ChatHouse.singleton();
    }

    static reset() {
        singleton.chatRooms = [];
    }

    constructor() {
        this.chatRooms = {};
    }

    join(roomName, playerInfo) {
        const player = new Player(playerInfo.name, playerInfo.avatar);
        const chatRoom = this.chatRooms[roomName] ||
              (this.chatRooms[roomName] = new ChatRoom(roomName));
        chatRoom.addPlayer(player);
        return {
            player,
            chatRoom
        };
    }

    leave(roomName, playerInfo) {
        const chatRoom = this.chatRooms[roomName];
        if (chatRoom) {
            chatRoom.removePlayer(playerInfo.id);
            if (chatRoom.isEmpty()) {
                delete this.chatRooms[roomName];
            }
        } else {
            logger.error('Trying to leave a non existing room', { roomName, playerInfo });
        }
    }

    listPlayers(roomName) {
        return this.chatRooms[roomName].listPlayers();
    }

    getChatMessages(roomName, lastId) {
        return this.chatRooms[roomName].getMessages(lastId);
    }

    sendChatMessage(roomName, playerid, message, nDice) {
        const room = this.chatRooms[roomName];
        const player = room.getPlayerById(playerid);
        return room.addMessage(player, message, nDice);
    }
}

const singleton = new ChatHouse();

module.exports = ChatHouse;
