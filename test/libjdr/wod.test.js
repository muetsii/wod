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
