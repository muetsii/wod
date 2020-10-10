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

