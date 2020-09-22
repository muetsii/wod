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

