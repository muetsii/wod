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

        it('include a roll', () => {
            // Arrange
            const id = 1444;
            const player = new Player('Miguelito');
            const message = 'ola k ase';
            const nDice = 6;

            // Act
            const chtMsg = new ChatMessage(id, player, message, nDice);

            // Assert
            expect(chtMsg.hasRoll()).to.be.true;
            expect(chtMsg.roll.result).to.be.an('Array').
                that.has.lengthOf(nDice);
        });
    });
});

