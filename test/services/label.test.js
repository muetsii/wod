const { expect } = require('chai');
const sinon = require('sinon');

const assert = require('assert');
const app = require('../../src/app');

describe('\'label\' service', () => {
    it('registered the service', () => {
        const service = app.service('label');

        assert.ok(service, 'Registered the service');
    });

    describe('find', () => {
        beforeEach(() => {
            app.service('label').labels = undefined;
        });

        afterEach(() => {
            sinon.restore();
        });

        it('returns labels', async () => {
            // Arrange
            sinon.stub(app, 'get').returns('en');

            // Act
            const labels = await app.service('label').find();

            // Assert
            expect(labels.action.send).to.equal('send');

            // Disarrange
            sinon.restore();
        });

        it('gets spanish translation', async () => {
            // Arrange
            sinon.stub(app, 'get').returns('es');
            console.log(app.service('label').labels);

            // Act
            const labels = await app.service('label').find();

            // Assert
            expect(labels.action.send).to.equal('enviar');

            // Disarrange
            sinon.restore();
        });

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
