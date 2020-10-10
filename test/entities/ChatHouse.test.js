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
const { expect } = require('chai');

const ChatHouse = require('../../src/entities/ChatHouse');

describe('ChatHouse', () => {
    describe('join', () => {
        it('creates the room and the player', () => {
            // Arrange
            const roomName = 'Santa Lupita';
            const playerInfo = { name: 'Pilgrim' };

            // Act
            const chatHouse = ChatHouse.singleton();
            const {
                player,
                chatRoom
            } = chatHouse.join(roomName, playerInfo);

            // Assert
            expect(player.name).to.equal(playerInfo.name);
            expect(player.id).to.be.a('number');
            expect(chatRoom.name).to.equal(roomName);
            expect(chatRoom.id).to.be.a('number');
            expect(chatRoom.players[0]).to.equal(player);
        });
    });

    describe('leave', () => {
        it('deletes the room when empty', () => {
            // Arrange
            const roomName = 'Antilla';
            const playerNames = [
                { name: 'Diego' },
                { name: 'Roger' },
                { name: 'Anabelle' },
            ];

            const chatHouse = new ChatHouse();

            const players = playerNames.map((playerName) => {
                return {
                    name: playerName.name,
                    id: chatHouse.join(roomName, playerName),
                };
            });

            // Act
            for (let p of players) {
                chatHouse.leave(roomName, p);
            }

            // Assert
            expect(chatHouse.chatRooms[roomName]).to.be.undefined;
        });
    });
});
