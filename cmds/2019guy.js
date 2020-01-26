
const State = require('../state.js');

module.exports = () => {
    const g = State.getClient().guilds.first();
    const chan = g.channels.find(c => c.name === "Just Chatting");
    if (!chan.joinable) {
        State.getMessage().channel.send('I don\'t have permissions to join the channel :(');
    }

    chan.join();
    State.getMessage().channel.send('-play https://www.youtube.com/watch?v=4SiiRx7GDzI');
};