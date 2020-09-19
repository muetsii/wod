const { expect } = require('chai');

const ChatMessage = require('../../src/entities/ChatMessage');
const Player = require('../../src/entities/Player');

describe('ChatMessage', () => {
    describe('constructor', () => {
        it('keeps id, player and message', () => {
            // Arrange
            const id = 1444;
            const player = new Player('Miguelito');
            const message = 'ola k ase';

            // Act
            const chtMsg = new ChatMessage(id, player, message);

            // Assert
            expect(chtMsg.id).to.equal(id);
            expect(chtMsg.player).to.equal(player);
            expect(chtMsg.message).to.equal(message);
        });
    });
});

