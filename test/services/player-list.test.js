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
                { name: "Salim" },
                { name: "Harald" },
                { name: "Kamal" },
                { name: "Enrico" },
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
