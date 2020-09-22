// Initializes the `PlayerList` service on path `/player/list`
const { PlayerList } = require('./player-list.class');
const hooks = require('./player-list.hooks');

module.exports = function (app) {
    const options = {
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/player/list', new PlayerList(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('player/list');

    service.hooks(hooks);
};
