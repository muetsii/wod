// Socket.io is exposed as the `io` global.
const socket = io();
// p@feathersjs/client is exposed as the `feathers` global.
const app = feathers();
// Set up Socket.io client with the socket
app.configure(feathers.socketio(socket));

let labels = {};
let roomName = 'ROOM';
let player = { name: 'nobody' };

async function fillLabels() {
    labels = await app.service('label').find();
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
            chatMessages: [],
        };
    },

    methods: {
        send() {
            console.log(this.inputMessage);
            this.addMessage(player, this.inputMessage);
            this.inputMessage = '';
        },

        addMessage() {
            this.chatMessages.push({
                player,
                message: this.inputMessage,
            });
        },
    },
};

const PlayerArea = {
    data() {
        return {
            players: [
                player,
            ],
        };
    },
};


window.onload = async () => {
    await fillLabels();
    Vue.createApp(Document).mount('#title');
    Vue.createApp(Document).mount('#main-menu-bar');
    Vue.createApp(ChatArea).mount('#chat-area');
    Vue.createApp(PlayerArea).mount('#player-area');
    Document.data();
}
