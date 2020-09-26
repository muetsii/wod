// Socket.io is exposed as the `io` global.
const socket = io();
// p@feathersjs/client is exposed as the `feathers` global.
const app = feathers();
// Set up Socket.io client with the socket
app.configure(feathers.socketio(socket));

let labels = {};
let roomName = 'ROOM';
let player = { name: 'nobody' };

const chatMessages = [{player, message: 'fake message'}];

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

const MessageList = {

    data() {
        return { chatMessages };
    },

    addMessage(player, message) {
        chatMessages.push({
            player,
            message: this.message,
        });
    },
};

const InputArea = {
    data() {
        return {
            label: labels.send,
            message: '',
        };
    },

    methods: {
        send() {
            console.log(this.message);
            MessageList.addMessage(player, this.message);
            this.message = '';
        },
    },
};

window.onload = async () => {
    await fillLabels();
    Vue.createApp(Document).mount('#title');
    Vue.createApp(Document).mount('#main-menu-bar');
    Vue.createApp(InputArea).mount('#input-area');
    Vue.createApp(MessageList).mount('#message-list');
    Document.data();
}

