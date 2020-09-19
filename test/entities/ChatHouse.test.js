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
});
