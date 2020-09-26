const assert = require('assert');
const app = require('../../src/app');

describe('\'label\' service', () => {
    it('registered the service', () => {
        const service = app.service('label');

        assert.ok(service, 'Registered the service');
    });
});
