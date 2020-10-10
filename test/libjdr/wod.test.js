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

const wod = require('../../src/libjdr/wod');
const RandomCheater = require('./RandomCheater');

describe('libjdr/wod', () => {
    describe('d', () => {
        it('still possible to acess jdr functions', () => {
            expect(wod.d).to.be.a('function');
        });
    });

    describe('xd', () => {
        let cheater;

        beforeEach(() => {
            cheater = new RandomCheater();
            wod.setRandomizer(cheater.shift.bind(cheater));
        });

        it('gets a result for each number', () => {
            // Arrange
            const dice = 10;
            for (let i = 1; i <= dice; i++) {
                cheater.push(i, 10);
            }

            // Act
            const result = wod.xd(dice);

            // Assert
            expect(result.length).to.equal(dice);
            for(const die of result) {
                expect(die).to.be.within(1, 10);
            }
        });

        it('v3 speciality', () => {
            // Arrange
            // chain 3 rolls
            const speciality = 'v3';
            const rolls = [2, 10, 4, 10].concat([8, 10]).concat(3);
            cheater.push(rolls, 10);

            // Act
            const result = wod.xd(4, { speciality } );

            // Assert
            expect(result).to.eql(rolls);
        });

        it('v20 speciality', () => {
            // Arrangep
            const speciality = 'v20';
            const rolls = [2, 10, 4, 10];
            cheater.push(rolls, 10);

            // Act
            const result = wod.xd(4, { speciality } );

            // Assert
            expect(result).to.eql(rolls.concat([10, 10]));
        });

        it('da speciality', () => {
            // Arrange
            const speciality = 'dav';
            const rolls = [2, 3, 4, 7].concat(3);
            cheater.push(rolls, 10);

            // Act
            const result = wod.xd(4, { speciality } );

            // Assert
            expect(result).to.eql(rolls);
        });

        afterEach(() => {
            wod.resetRandomizer();
        });
    });
});
