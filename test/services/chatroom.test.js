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

describe('\'chatroom\' service', () => {
    it('registered the service', () => {
        const service = app.service('chatroom');

        expect(service, 'Registered the service').to.be.an('object');
    });

    describe('create (join)', () => {
        let body;

        beforeEach(() => {
            body = {
                player: { name: 'Edweena' },
                chatroom: { name: 'Rebus sic Stantibus' },
            };
        });

        it('returns integer ids', async () => {
            // Arrange
            const service = app.service('chatroom');

            // Act
            const res = await service.create(body);

            // Assert
            expect(res.playerid).to.be.a('number');
            expect(res.roomname).to.equal(body.chatroom.name);
        });

        it('gets the same room with same name', async () => {
            // Arrange
            const bodyDifferent = {
                player: { name: 'Jordi' },
                chatroom: { name: 'Barcenlona delenda est' },
            };
            const bodySame = {
                player: { name: 'Kixx' },
                chatroom: { name: body.chatroom.name },
            };
            const service = app.service('chatroom');

            // Act
            const rebus = await service.create(body);
            const bcnde = await service.create(bodyDifferent);
            const rebu2 = await service.create(bodySame);

            // Assert
            expect(rebu2.roomname).to.equal(rebus.roomname);
            expect(bcnde.roomname).not.to.equal(rebus.roomname);
        });
    });

    describe('remove (leave)', () => {
        it('does not explode', async () => {
            // Arrange
            const service = app.service('chatroom');

            const chatroom = { name: 'Crossover paths' };
            const playerNames = [
                { name: 'Gui Ren' },
                { name: 'Hengeyokai' },
                { name: 'Mage' },
                { name: 'Hsien' },
            ];

            const players = await playerNames.map(async (playerName) => {
                return {
                    name: playerName.name,
                    id: (await service.create({
                        chatroom,
                        player: playerName
                    })).playerid,
                };
            });

            // Act
            for (let player of players) {
                await service.remove({chatroom, player});
            }
            // Assert
        });

    });
});
