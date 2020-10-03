/*
 * My apologies, fellow developer.
 *
 * The code below is probably very bad. I am a backend developer and
 * it's the first time I do front-end and I learned Vue on the way to
 * do this.
 *
 * On the other hand, this is free software, even more, AGPL, so if you
 * wish to help me to improve me, make me a PR in github.com/muetsii/wod
 * and leave you improvement for all Humanity.
 */

// Socket.io is exposed as the `io` global.
const socket = io();
// p@feathersjs/client is exposed as the `feathers` global.
const app = feathers();
// Set up Socket.io client with the socket
app.configure(feathers.socketio(socket));

let vueChat;
let vuePlayers;

let labels = {};
let roomName = 'ROOM';
const chatroom = { name: roomName };
const me = { name: `PJ_${Math.floor(Math.random() * 100)}` };
const players = {};
let chatMessages;

async function fillLabels() {
    labels = await app.service('label').find();
}

function sendMessage(player, message) {
    // If message is a number or a number followed by ;, this is a roll
    const chatMessage = {
        chatroom,
        playerid: me.id,
        message,
    }
    const ndice = +message.split(';')[0].trim() || undefined;
    if (ndice) {
        chatMessage.roll = { ndice };
    }

    app.service('chatmessage').create(chatMessage);
}

function rollDice(ndice) {
    const chatMessage = {
        chatroom,
        playerid: me.id,
        message: '',
        roll: { ndice },
    };

    app.service('chatmessage').create(chatMessage);
}

async function processChatMessage(chatMessage) {
    chatMessage.player = players[chatMessage.playerid];
    if (chatMessage.roll) {
        const sorted = chatMessage.roll.result.slice(0);
        sorted.sort((a, b) => {
            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            } else {
                return 0;
            }
        });
        chatMessage.roll.sorted = sorted;
    }
}

async function receiveMessage() {
    const lastId = me.lastId !== undefined ? me.lastId : -1;

    const newMessages = await app.service('chatmessage').find({
        query: {
            roomName: chatroom.name,
            lastId,
        }
    });

    newMessages.forEach(m => processChatMessage(m));

    // concat
    Array.prototype.push.apply(vueChat.chatMessages, newMessages);
    me.lastId = chatMessages[chatMessages.length - 1].id;
}

async function receivePlayer(roomPlayers) {
    for(let p of roomPlayers) {
        vuePlayers.players[p.id] = p;
    }
}


async function joinRoom() {
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

async function createRoomListeners() {
    app.service('chatmessage')
        .on('created', receiveMessage);
    app.service('chatroom')
        .on('created', async () => {
            const roomPlayers = await app.service('player/list').find({ query: { roomName } });
            receivePlayer(roomPlayers);
        });
}

async function loadRoomInfo() {
    const [
        roomPlayers,
        roomChatMessages,
    ] = await Promise.all([
        app.service('player/list').find({ query: { roomName } }),
        app.service('chatmessage').find({ query: { roomName } }),
    ]);

    setPlayers(roomPlayers);

    roomChatMessages.forEach(m => processChatMessage(m));
    chatMessages = roomChatMessages;
    if (chatMessages.length)
        me.lastId = chatMessages[chatMessages.length - 1].id;
}

function setPlayers(roomPlayers) {
    for (const p of roomPlayers) {
        players[p.id] = p;
    }
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
        async send() {
            console.log(this.inputMessage);
            await sendMessage(me, this.inputMessage);
            this.inputMessage = '';
        },
        async roll(click) {
            console.log(click.target.id);
            const ndice = +click.target.id.split('dice')[1];
            console.log(ndice);
            rollDice(ndice);
        }
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
    await createRoomListeners();
    Vue.createApp(Document).mount('#title');
    Vue.createApp(Document).mount('#main-menu-bar');
    vueChat = Vue.createApp(ChatArea).mount('#chat-area');
    vuePlayers = Vue.createApp(PlayerArea).mount('#player-area');
    Document.data();
}
