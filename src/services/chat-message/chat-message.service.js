// Initializes the `ChatMessage` service on path `/chatmessage`
const { ChatMessage } = require('./chat-message.class');
const hooks = require('./chat-message.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/chatmessage', new ChatMessage(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('chatmessage');

  service.hooks(hooks);
};
