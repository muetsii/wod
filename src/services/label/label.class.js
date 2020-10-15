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
const fs = require('fs');
const yaml = require('yaml');
const _ = require('lodash');

/* eslint-disable no-unused-vars */
class Label {
    constructor (options) {
        this.options = options || {};
    }

    readLabels(language) {
        if (!this.labels) {
            this.labels = _.merge(
                {},
                yaml.parse(fs.readFileSync(`locale/en.yml`, 'utf8')),
                yaml.parse(fs.readFileSync(`locale/${language}.yml`, 'utf8')),
            );
        }
    }

    async find () {
        return this.labels;
    }
}

Label.CONF = ['sitename'];

module.exports.Label = Label;
