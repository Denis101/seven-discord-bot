
const State = require('../state.js');

module.exports = () => {
    State.getMessage().channel.send('pong');
};