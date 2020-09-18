const { expect } = require('chai');

const Player = require('../../src/entities/Player');

describe('Player', () => {
    it('gets incremental id', () => {
        const player0 = new Player('player0');
        const player1 = new Player('player1');
        const player2 = new Player('player2');

        expect(player0.id).to.equal(0);
        expect(player1.id).to.equal(1);
        expect(player2.id).to.equal(2);
    });
});

