const { expect } = require('chai');
const assert = require('assert');
const app = require('../../src/app');

describe('\'label\' service', () => {
    it('registered the service', () => {
        const service = app.service('label');

        assert.ok(service, 'Registered the service');
    });

    describe('find', () => {
        describe('hook: after', () => {
            it('adds the sitename to the labels', async () => {
                // Arrange

                // Act
                const labels = await app.service('label').find();

                // Assert
                expect(labels.sitename).to.equal(app.get('sitename'));
            });
        });
    });
});
