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
}

const singleton = new ChatHouse();

module.exports = ChatHouse;
