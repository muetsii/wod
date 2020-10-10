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
