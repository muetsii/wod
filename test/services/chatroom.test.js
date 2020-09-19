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
            expect(res.chatroomid).to.be.a('number');
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
            expect(rebu2.chatroomid).to.equal(rebus.chatroomid);
            expect(bcnde.chatroomid).not.to.equal(rebus.chatroomid);
        });
    });
});
