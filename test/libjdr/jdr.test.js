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
const sinon = require('sinon');

const jdr = require('../../src/libjdr/jdr');
const RandomCheater = require('./RandomCheater');

describe('libjdr/jdr', () => {
    describe('d0', () => {
        let cheater;

        beforeEach(() => {
            cheater = new RandomCheater();
            jdr.setRandomizer(cheater.shift.bind(cheater));
        });

        it('gets 0 and sides in the borders', () => {
            // Arrange
            cheater.push(0);
            cheater.push(0.9999999);
            const sides = 100;

            // Act
            const result0 = jdr.d0(sides);
            const result100 = jdr.d0(sides);

            // Assert
            expect(result0).to.equal(0);
            expect(result100).to.equal(100);
        });

        it('returns numbers between 0 and sides', () => {
            const nsides = 100;
            for (let i=0.0; i<1; i += 0.01) {
                cheater.push(i);
                expect(jdr.d0(nsides), `${i}`).to.be.within(0, nsides);
            }
        });

        afterEach(() => {
            sinon.restore();
        });
    });

    describe('d10', () => {

    });

});
