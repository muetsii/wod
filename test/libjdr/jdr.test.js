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
