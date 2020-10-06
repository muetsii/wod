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
