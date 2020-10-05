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

let vueTitle;
let vueMenu;
let vueChat;
let vueLobby;
let vues = [];

let labels = {};
let roomName = 'ROOM';
const chatroom = { name: roomName };
const me = { name: `PJ_${Math.floor(Math.random() * 100)}` };

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

async function addPlayerInfo(chatMessage) {
    chatMessage.player = vuePlayers.players[chatMessage.playerid];
}

async function receiveMessage() {
    const lastId = me.lastId !== undefined ? me.lastId : -1;

    const newMessages = await app.service('chatmessage').find({
        query: {
            roomName: chatroom.name,
            lastId,
        }
    });

    newMessages.forEach(m => addPlayerInfo(m));

    // concat
    Array.prototype.push.apply(vueChat.chatMessages, newMessages);
    me.lastId = vueChat.chatMessages[vueChat.chatMessages.length - 1].id;
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
        me.lastId = -1;
        chatroom.id = chatroomid;
        vuePlayers.players[me.id] = me;
        if(vueChat) vueChat.chatMessages.splice(0, vueChat.chatMessages.length);
        console.log('I am ', me);
    } catch (e) {
        console.error(e);
    }
}

async function leaveRoom() {
    const chatRoomService = await app.service('chatroom');
    const { playerid, chatroomid } = await chatRoomService.remove({
        chatroom,
        player: me,
    });
}

async function createRoomListeners() {
    app.service('chatmessage')
        .on('created', receiveMessage);
    app.service('chatroom') .on('created', async (response) => {
        const roomPlayers = await app.service('player/list').find({ query: { roomName: chatroom.name } });
        receivePlayer(roomPlayers);
    });
}

async function loadRoomInfo() {
    const [
        roomPlayers,
        roomChatMessages,
    ] = await Promise.all([
        app.service('player/list').find({ query: { roomName: chatroom.name } }),
        app.service('chatmessage').find({ query: { roomName: chatroom.name } }),
    ]);

    setPlayers(roomPlayers);

    roomChatMessages.forEach(m => addPlayerInfo(m));
    Array.prototype.push.apply(vueChat.chatMessages, roomChatMessages);
    if (vueChat.chatMessages.length)
        me.lastId = vueChat.chatMessages[vueChat.chatMessages.length - 1].id;
}

function setPlayers(roomPlayers) {
    // TODO: move to PlayerArea object
    for (let pid of Object.keys(vuePlayers.players)) {
        delete vuePlayers.players[pid];
    }
    for (const p of roomPlayers) {
        vuePlayers.players[p.id] = p;
    }
}    

const Document = {
    data() {
        return {
            roomName: chatroom.name,
            wod: labels.wod,
        };
    }
};

const Lobby = {
    data() {
        return {
            labelPlayerName: labels.playerName,
            labelRoomName: labels.roomName,
            labelChange: labels.change,
            playerName: me.name,
            roomName: chatroom.name,
        };
    },

    methods: {
        async changeRoom() {
            me.name = this.playerName;
            await leaveRoom(chatroom.name);
            chatroom.name = this.roomName;
            await reload();
        }
    }
};

const ChatArea = {
    data() {
        return {
            labelSend: labels.send,
            inputMessage: '',
            chatMessages: [],
        };
    },

    methods: {
        async send() {
            console.log(this.inputMessage);
            await sendMessage(me, this.inputMessage);
            this.inputMessage = '';
        },
    },
};

const PlayerArea = {
    data() {
        return {
            players: {}
        };
    },
};

const load = async () => {
    await joinRoom();
    await loadRoomInfo();
};

const createVues = () => {
    vueTitle = Vue.createApp(Document).mount('#title');
    vueMenu = Vue.createApp(Document).mount('#main-menu-bar');
    vueChat = Vue.createApp(ChatArea).mount('#chat-area');
    vuePlayers = Vue.createApp(PlayerArea).mount('#player-area');
    vueLobby = Vue.createApp(Lobby).mount('#lobby');
    vues = [
        vueTitle,
        vueMenu,
        vueChat,
        vuePlayers,
        vueLobby,
    ];
};

const updateVues = () => {
    for (let v of vues) {
        v.$forceUpdate();
    }
}

const reload  = async () => {
    await load();
    updateVues();
};

window.onload = async () => {
    await fillLabels();
    createVues();
    await load();
    await createRoomListeners();
};

