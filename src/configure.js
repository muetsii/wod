// TODO: read configuration from file, or remote conf

const configuration = {};

function get(name) {
    return configuration[name] === undefined ? configuration[name] : process.env[name];
}

function set(name, value) {
    return configuration[name] = value;
}

module.exports = {
    get,
    set,
};
