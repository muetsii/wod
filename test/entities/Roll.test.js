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

const Roll = require('../../src/entities/Roll');

describe('entities/Roll', () => {
    describe('constructor', () => {
        it('makes the roll', () => {
            // Arrange
            const nDice = 20;

            // Act
            const roll = new Roll(nDice);

            // Assert
            expect(roll.nDice).to.equal(nDice);
            expect(roll.result).to.be.an('Array');
            expect(roll.result).to.have.lengthOf(nDice);
            for(let die of roll.result) {
                expect(die).to.be.a('number').within(1, 10);
            }
        });
    });
});
