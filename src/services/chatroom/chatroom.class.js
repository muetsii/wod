const { Service } = require('feathers-memory');

const ChatHouse = require('../../entities/ChatHouse');

exports.ChatRoom = class ChatRoom extends Service {
    // join
    async create(data) {
        const roomName = data.chatroom.name;
        const playerInfo = {
            name: data.player.name,
            avatar: data.player.avatar,
        };

        const result = ChatHouse.singleton().join(roomName, playerInfo);

        const response = {
            playerid: result.player.id,
            roomname: roomName,
        };

        return response;
    }

    // leave
    async remove(data) {
        const roomname = data.chatroom.name;
        // FIXME: this is a scurity risk, we allow clients to disonnect other users
        // I should store player information in the connection instead
        const { player } = data;

        ChatHouse.st().leave(roomname, player);

        return { roomname, player };
    }
};
