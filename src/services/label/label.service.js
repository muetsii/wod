// Initializes the `label` service on path `/label`
const { Label } = require('./label.class');
const hooks = require('./label.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/label', new Label(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('label');

  service.hooks(hooks);
};
