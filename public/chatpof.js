// Socket.io is exposed as the `io` global.
const socket = io('http://api.feathersjs.com');
  // p@feathersjs/client is exposed as the `feathers` global.
const app = feathers();

console.log('hello');

const ROOM_NAME = 'losArchivosDeLaNoche';

const chatroom = { name: ROOM_NAME };
const me = { name: `PJ_${Math.random()%100}` };
const players = { me };

async function joinRoom() {
    console.log('joinRoom start');
    try {
        const chatRoomService = await app.service('chatroom');
        const { playerid, chatroomid } = await chatRoomService.create({
            chatroom,
            player: me,
        });

        me.id = playerid;
        chatroom.id = chatroomid;
        players[me.id] = me;
        console.log('I am ', me);
    } catch (e) {
        console.error(e);
    }
}


// Set up Socket.io client with the socket
app.configure(feathers.socketio(socket));

// Receive real-time events through Socket.io
app.service('chat-message')
    .on('created', message => console.log('New message created', message));

// Call the `messages` service
app.service('chat-message').create({
    text: 'A message from a REST client'
});

joinRoom().then();
