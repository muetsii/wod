const fs = require('fs');
const yaml = require('yaml');

/* eslint-disable no-unused-vars */
class Label {
    constructor (options) {
        this.options = options || {};
    }

    readLabels(language) {
        if (!this.labels) {
            this.labels = yaml.parse(
                fs.readFileSync(`locale/${language}.yml`, 'utf8')
            );
        }
    }

    async find () {
        return this.labels;
    }
}

Label.CONF = ['sitename'];

module.exports.Label = Label;
