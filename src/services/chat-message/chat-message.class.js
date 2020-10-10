/*
This file is part of World of Diceness, an online dice roller focused
on rolling dice quickly.

Copyright 2020 Los Archivos de la Noche

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
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
