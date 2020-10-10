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
const app = require('../../src/app');

describe('\'PlayerList\' service', () => {
    it('registered the service', () => {
        const service = app.service('player/list');

        expect(service, 'Registered the service').to.be.an('object');
    });

    describe('find (list)', () => {
        let players;
        let roomName;

        beforeEach(() => {
            roomName = 'Sueños de la Alhambra';
            players = [
                { name: 'Salim' },
                { name: 'Harald' },
                { name: 'Kamal' },
                { name: 'Enrico' },
            ];
        });

        it('remembers the players', async () => {
            // Arrange
            const chatRoomService = app.service('chatroom');
            const playerids = [];
            for (let player of players) {
                const body = { player, chatroom: { name: roomName }};
                playerids.push(
                    (await chatRoomService.create(body)).playerid
                );
            }
            const service = app.service('player/list');

            // Act
            const plaList = await service.find({query: { roomName }});

            // Assert
            expect(
                plaList.map(p => p.name)
            ).to.have.members(
                players.map(p => p.name)
            );
            expect(
                plaList.map(p => p.id)
            ).to.have.members(
                playerids
            );
        });
    });
});
