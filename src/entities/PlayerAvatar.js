/**
 * Player/character image
 * First implementation will be an image url
 * In a future, let's allow to upload an image
 */

class PlayerAvatar {
    constructor(url) {
        this.url = url;
    }

    /**
     * Return the string to use as image src
     */
    src() {
        return this.url;
    }
}

module.exports = PlayerAvatar;
