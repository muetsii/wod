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
const assert = require('assert').strict;
const axios = require('axios');
const url = require('url');
const app = require('../src/app');

const port = app.get('port') || 8998;
const getUrl = pathname => url.format({
    hostname: app.get('host') || 'localhost',
    protocol: 'http',
    port,
    pathname
});

describe('Feathers application tests', () => {
    let server;

    before(function(done) {
        server = app.listen(port);
        server.once('listening', () => done());
    });

    after(function(done) {
        server.close(done);
    });

    it('starts and shows the index page with required components', async () => {
        const { data } = await axios.get(getUrl());

        assert.ok(data.indexOf('<div id="chat-area">') !== -1);
        assert.ok(data.indexOf('<div id="dice-area">') !== -1);
        assert.ok(data.indexOf('<div id="player-area">') !== -1);
    });

    describe('404', function() {
        it('shows a 404 HTML page', async () => {
            try {
                await axios.get(getUrl('path/to/nowhere'), {
                    headers: {
                        'Accept': 'text/html'
                    }
                });
                assert.fail('should never get here');
            } catch (error) {
                const { response } = error;

                assert.equal(response.status, 404);
                assert.ok(response.data.indexOf('<html>') !== -1);
            }
        });

        it('shows a 404 JSON error without stack trace', async () => {
            try {
                await axios.get(getUrl('path/to/nowhere'), {
                    json: true
                });
                assert.fail('should never get here');
            } catch (error) {
                const { response } = error;

                assert.equal(response.status, 404);
                assert.equal(response.data.code, 404);
                assert.equal(response.data.message, 'Page not found');
                assert.equal(response.data.name, 'NotFound');
            }
        });
    });
});
