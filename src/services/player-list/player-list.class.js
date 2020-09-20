const { Service } = require('feathers-memory');
const chatHouse = require('../../entities/ChatHouse').st();

exports.PlayerList = class PlayerList extends Service {
    // list
    async find(data) {
        const { roomName } = data.query;

        return chatHouse.listPlayers(roomName);
    }
};
