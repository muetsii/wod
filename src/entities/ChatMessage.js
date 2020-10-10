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
const Roll = require('./Roll');

class ChatMessage {
    constructor(id, player, message, nDice) {
        this.id = id;
        this.player = player;
        this.message = message;
        if (nDice && nDice > 0) {
            this.roll = new Roll(nDice);
        }
    }

    /**
     * Wether this has an associated roll
     */
    hasRoll() {
        return !!this.roll;
    }
}

module.exports = ChatMessage;
