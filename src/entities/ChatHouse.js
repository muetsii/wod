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
