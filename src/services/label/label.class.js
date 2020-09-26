// TODO: read from configuration
const LABELS = {
    wod: 'World of Diceness',
    send: 'send!',
};

/* eslint-disable no-unused-vars */
exports.Label = class Label {
    constructor (options) {
        this.options = options || {};
    }

    async find (params) {
        return LABELS;
    }
};
