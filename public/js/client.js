// Socket.io is exposed as the `io` global.
const socket = io();
// p@feathersjs/client is exposed as the `feathers` global.
const app = feathers();
// Set up Socket.io client with the socket
app.configure(feathers.socketio(socket));

let labels = {};
let roomName = 'ROOM';
const chatroom = { name: roomName };
const me = { name: `PJ_${Math.random()%100}` };
const players = { me };
let chatMessages;

async function fillLabels() {
    labels = await app.service('label').find();
}

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

async function loadRoomInfo() {
    const [
        roomPlayers,
        roomChatMessages,
    ] = await Promise.all([
        app.service('player/list').find({ query: { roomName } }),
        app.service('chatmessage').find({ query: { roomName } }),
    ]);

    for (const p of roomPlayers) {
        players[p.id] = p;
    }
    chatMessages = roomChatMessages;
}

const Document = {
    data() {
        return {
            roomName,
            wod: labels.wod,
        };
    }
};

const ChatArea = {
    data() {
        return {
            labelSend: labels.send,
            inputMessage: '',
            chatMessages,
        };
    },

    methods: {
        send() {
            console.log(this.inputMessage);
            this.addMessage();
            this.inputMessage = '';
        },

        addMessage() {
            this.chatMessages.push({
                player: players.me,
                message: this.inputMessage,
            });
        },
    },
};

const PlayerArea = {
    data() {
        return {
            players
        };
    },
};


window.onload = async () => {
    await fillLabels();
    await joinRoom();
    await loadRoomInfo();
    Vue.createApp(Document).mount('#title');
    Vue.createApp(Document).mount('#main-menu-bar');
    Vue.createApp(ChatArea).mount('#chat-area');
    Vue.createApp(PlayerArea).mount('#player-area');
    Document.data();
}
