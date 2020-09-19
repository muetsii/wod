const { expect } = require('chai');

const ChatRoom = require('../../src/entities/ChatRoom');
const Player = require('../../src/entities/Player');

describe('ChatRoom', () => {
    describe('addMessage', () => {
        it('adds messages with player and generates ids', () => {
            // Arrange
            const player0 = new Player('Sandor');
            const player1 = new Player('Salvatore');
            const chat = new ChatRoom('Comillos en la Noche');
            chat.addPlayer(player0);
            chat.addPlayer(player1);
            const message0 = 'I do not involve myself in human affairs';
            const message1 = 'You should';
            
            // Act
            chat.addMessage(player0, message0);
            chat.addMessage(player1, message1);

            // Assert
            expect(chat.messages[0].player).to.equal(player0);
            expect(chat.messages[0].message).to.equal(message0);
            expect(chat.messages[0].id).to.equal(0);
            expect(chat.messages[1].player).to.equal(player1);
            expect(chat.messages[1].message).to.equal(message1);
            expect(chat.messages[1].id).to.equal(1);
        });
    });
});

