const chatroom = require('./chatroom/chatroom.service.js');
const chatMessage = require('./chat-message/chat-message.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(chatroom);
  app.configure(chatMessage);
};
