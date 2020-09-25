const InputArea = {
    data() {
        return {
            label: 'send!',
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

window.onload = () => {
    Vue.createApp(InputArea).mount('#input-area');
}
