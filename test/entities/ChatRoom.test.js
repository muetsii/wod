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

    describe('getMessages', () => {
        // weird test, internal joke
        it('gets messages after lastId', () => {
            // Arrange
            const player = new Player('Enrico');
            const chat = new ChatRoom('Comillos en la Noche');
            chat.addPlayer(player);
            const messageWords = 'you and I will be great friends and that is an order';
            const messages = messageWords.split(' ');
            for (let m of messages) {
                chat.addMessage(player, m);
            }
            const lastId = messages.findIndex(m => m == 'that');

            // Act
            const chatMsgs = chat.getMessages(lastId);

            // Assert
            const greatSentence = chatMsgs.map(m => m.message).join(' ');
            expect(greatSentence).to.equal('that is an order');
        });
    });
});

