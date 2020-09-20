// Initializes the `chatroom` service on path `/chatroom`
const { ChatRoom } = require('./chatroom.class');
const hooks = require('./chatroom.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/chatroom', new ChatRoom(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('chatroom');

  service.hooks(hooks);
};
