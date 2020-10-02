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
