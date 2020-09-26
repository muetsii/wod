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
            this.message = '';
        },
    },
};

window.onload = async () => {
    await fillLabels();
    Vue.createApp(Document).mount('#title');
    Vue.createApp(Document).mount('#main-menu-bar');
    Vue.createApp(InputArea).mount('#input-area');
    Document.data();
}

