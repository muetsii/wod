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
const rewire = require('rewire');

const Player = rewire('../../src/entities/Player');

describe('Player', () => {
    describe('constructor', () => {
        beforeEach(() => {
            Player.__set__('nextId', 0);
        });

        it('gets incremental id', () => {
            const player0 = new Player('player0');
            const player1 = new Player('player1');
            const player2 = new Player('player2');

            expect(player0.id).to.equal(0);
            expect(player1.id).to.equal(1);
            expect(player2.id).to.equal(2);
        });
    });
});

