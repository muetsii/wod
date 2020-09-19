const { expect } = require('chai');

const PlayerAvatar = require('../../src/entities/PlayerAvatar');

describe('PlayerAvatar', () => {
    describe('src', () => {
        it('returns the url', () => {
            // Arrange
            const url = 'http://vampiro.asqueados.net';

            // Act
            const avatar = new PlayerAvatar(url);
            const src = avatar.src();

            // Assert
            expect(src).to.equal(url);
        });
    });
});

