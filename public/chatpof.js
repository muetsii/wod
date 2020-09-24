// Socket.io is exposed as the `io` global.
const socket = io();
// p@feathersjs/client is exposed as the `feathers` global.
const app = feathers();

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

async function receiveMessage() {
    const htmlMessageList = document.getElementById('message-list');
    const lastId = me.lastId || 0;

    const chatMessages = await app.service('chatmessage').find({
        query: {
            roomName: chatroom.name,
            lastId,
        }
    });

    const msgElements = chatMessages.map(
        cm => `${cm.message}`
    ).join('</li><li>');

    const joinedMessage = `<li>${msgElements}</li>`;

    htmlMessageList.innerHTML += joinedMessage;

    me.lastId = chatMessages[chatMessages.length - 1].id;
    console.log(joinedMessage);
}

// Set up Socket.io client with the socket
app.configure(feathers.socketio(socket));


joinRoom().then(async () => {
    // Receive real-time events through Socket.io
    app.service('chatmessage')
        .on('created', receiveMessage);

    // Call the `messages` service
    await app.service('chatmessage').create({
        chatroom,
        playerid: me.id,
        message: 'ola k ase',
    });

    // Call the `messages` service
    console.log(await app.service('chatmessage').find({
        query: { roomName: chatroom.name },
    }));

    // Call the `messages` service
    await app.service('chatmessage').create({
        chatroom,
        playerid: me.id,
        message: 'otro mensaje',
    });
});
