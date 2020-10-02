const { expect } = require('chai');
const rewire = require('rewire');

const app = require('../../src/app');

const ChatHouse = require('../../src/entities/ChatHouse');
const ChatMessageServiceModule = rewire(
    '../../src/services/chat-message/chat-message.class'
);

describe('\'ChatMessage\' service', () => {
    it('registered the service', () => {
        const service = app.service('chatmessage');

        expect(service, 'Registered the service').to.be.an('object');
    });

    describe('create (send)', () => {
        let roomName;
        let join;
        let message;

        beforeEach(() => {
            roomName = 'best of rap';
            join = {
                player: { name: 'Lori' },
                chatroom: { name: roomName },
            };
            message = 'Happyness happy happy happyness';
        });

        it('sends a message and nothing explodes', async () => {
            // Arrange
            const service = await app.service('chatmessage');
            const { playerid } = await app.service('chatroom').create(join);
            const body = { chatroom: { name: roomName }, playerid, message };

            // Act
            const { chatmessageid } = await service.create(body);

            // Assert
            expect(chatmessageid).to.be.a('number');
        });
    });

    describe('find (get)', () => {
        let playerNames;
        let joinPlayers;
        let messages;
        let roomName;

        beforeEach(() => {
            ChatMessageServiceModule.__set__(
                'chatHouse',
                new ChatHouse(),
            );
            ChatHouse.reset();

            roomName = 'Pimpinela';
            playerNames = ['Lucía', 'Joaquín'];
            joinPlayers = [{
                player: { name: playerNames[0] },
                chatroom: { name: roomName },
            }, {
                player: { name: playerNames[1] },
                chatroom: { name: roomName }
            }];

            messages = [
                [0, '¿Quién es?'],
                [1, 'Soy yo...'],
                [0, '¿Qué vienes a buscar?'],
                [1, 'A ti...'],
                [0, 'Ya es tarde...'],
                [1, '¿Por qué?'],
                [0, '¡Porque ahora soy yo la quiere estar sin ti'],
            ];
        });

        it('gets the messages assigned to the same players', async () => {
            // Arrange
            const service = await app.service('chatmessage');
            const playerids = [0, 1];
            playerids[0] = (await app.service('chatroom').create(
                joinPlayers[0]
            )).playerid;
            playerids[1] = (await app.service('chatroom').create(
                joinPlayers[1]
            )).playerid;

            // Act
            for (let m of messages) {
                await service.create({
                    playerid: playerids[m[0]],
                    message: m[1],
                    chatroom: { name: roomName },
                });
            }
            const chatMessages = await service.find({ query: {roomName}});
            for (let i = 0; i < messages.length; i++) {
                expect(chatMessages[i].message).to.equal(messages[i][1]);
                expect(chatMessages[i].playerid).to.equal(playerids[messages[i][0]]);
            }
        });

        it('gets the messages from lastId', async () => {
            // Arrange
            const messages2 = [
                [0, 'Por eso vete'],
                [0, 'olvida mi nombre'],
                [0, 'mi cara, mi casa'],
                [0, 'y pega la vuelta'],
                [1, 'Jamás te pude comprender'],
            ];
            const service = await app.service('chatmessage');
            const playerids = [0, 1];
            playerids[0] = (await app.service('chatroom').create(
                joinPlayers[0]
            )).playerid;
            playerids[1] = (await app.service('chatroom').create(
                joinPlayers[1]
            )).playerid;

            // Act
            for (let m of messages) {
                await service.create({
                    playerid: playerids[m[0]],
                    message: m[1],
                    chatroom: { name: roomName },
                });
            }
            const firstMessages = await service.find({ query: {roomName}});
            const lastId = firstMessages[firstMessages.length - 1].id;

            for (let m of messages2) {
                await service.create({
                    playerid: playerids[m[0]],
                    message: m[1],
                    chatroom: { name: roomName },
                });
            }

            const chatMessages = await service.find({ query: {roomName, lastId}});

            // Assert
            for (let i = 0; i < messages2.length; i++) {
                expect(chatMessages[i].message).to.equal(messages2[i][1]);
                expect(chatMessages[i].playerid).to.equal(playerids[messages2[i][0]]);
            }
        });

        it('receives roll results in the message', async () => {
            // Arrange
            const service = await app.service('chatmessage');
            const playerids = [0, 1];
            playerids[0] = (await app.service('chatroom').create(
                joinPlayers[0]
            )).playerid;
            playerids[1] = (await app.service('chatroom').create(
                joinPlayers[1]
            )).playerid;
            const hun = 2, po = 3;

            // Act
            await service.create({
                playerid: playerids[0],
                message: 'roll hun',
                roll: { ndice: hun },
                chatroom: { name: roomName },
            });

            await service.create({
                playerid: playerids[1],
                message: 'roll pò',
                roll: { ndice: po },
                chatroom: { name: roomName },
            });

            const chatMessages = await service.find({ query: {roomName}});
            expect(chatMessages[0].roll.result).to.be.an('Array');
            expect(chatMessages[0].roll.result.length).to.equal(hun);
            expect(chatMessages[1].roll.result).to.be.an('Array');
            expect(chatMessages[1].roll.result.length).to.equal(po);
        });
    });
});
