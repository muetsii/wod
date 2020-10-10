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
            const lastId = messages.findIndex(m => m == 'friends');

            // Act
            const chatMsgs = chat.getMessages(lastId);

            // Assert
            const greatSentence = chatMsgs.map(m => m.message).join(' ');
            expect(greatSentence).to.equal('and that is an order');
        });
    });
});

