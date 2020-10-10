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

    removePlayer(playerId) {
        if (this.players[playerId]) {
            this.players[playerId].setActive(false);
        } else {
            logger.error(
                'Trying to remove a non existing player',
                { roomName: this.name, playerId }
            );
        }
    }

    isEmpty() {
        return Object.keys(this.players).every(
            (id) => this.players[id].isActive()
        );
    }

    addMessage(player, message, nDice) {
        // TODO: have a maximum and rotate them
        this.messages.push(
            // we could have the id from length... until we start rotating
            new ChatMessage(this.nextMsgId++, player, message, nDice)
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
            lastId + 1
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
