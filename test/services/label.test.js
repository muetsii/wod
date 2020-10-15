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


        it('not present labels are taken from English', async () => {
            // Arrange
            sinon.stub(app, 'get').returns('es');
            console.log(app.service('label').labels);

            // Act
            const labels = await app.service('label').find();

            // Assert
            expect(labels.info.DONOTTRANSLATE).to.equal('XaaX');

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
