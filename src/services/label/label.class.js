// TODO: read from configuration
const LABELS = {
    wod: 'World of Diceness',
    send: 'send!',
};

/* eslint-disable no-unused-vars */
class Label {
    constructor (options) {
        this.options = options || {};
    }

    async find (params) {
        return LABELS;
    }
}

Label.CONF = ['sitename'];

module.exports.Label = Label;
