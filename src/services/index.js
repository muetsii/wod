const chatroom = require('./chatroom/chatroom.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(chatroom);
};
