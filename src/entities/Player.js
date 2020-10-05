let nextId = 0;

/**
 * The player is a user of the chat
 */
class Player {
    constructor(name, avatar) {
        this.name = name;
        this.avatar = avatar;
        this.id = nextId++;
        this.active = true;
    }

    isActive() {
        return this.active;
    }

    setActive(active) {
        this.active = active;
    }
}

module.exports = Player;
