const { Service } = require('feathers-memory');
const chatHouse = require('../../entities/ChatHouse').st();

exports.ChatMessage = class ChatMessage extends Service {
    // get
    async find(params) {
        const { roomName } = params.query;
        const lastId = params.query.lastId !== undefined ?
            params.query.lastId : -1;

        const chatMessages = chatHouse.getChatMessages(roomName, lastId);

        return chatMessages.map(cm => {
            return {
                id: cm.id,
                message: cm.message,
                playerid: cm.player.id,
                roll: cm.roll
            };
        });
    }

    // send
    async create(body, params) {
        const chatMessage = chatHouse.sendChatMessage(
            body.chatroom.name,
            body.playerid,
            body.message,
            body.roll && body.roll.ndice,
        );

        const response = {
            chatmessageid: chatMessage.id,
            roomname: body.chatroom.name,
        };
        if (chatMessage.hasRoll()) {
            response.roll = chatMessage.roll;
        }

        super.create(response, params);
        return response;
    }
};
