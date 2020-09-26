const { expect } = require('chai');
const sinon = require('sinon');

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
            sinon.stub(Math, 'random').callsFake(() => {
                return cheater.shift();
            });
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

        afterEach(() => {
            sinon.restore();
        });
    });
});
