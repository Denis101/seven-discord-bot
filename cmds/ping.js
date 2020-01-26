
const State = require('../state.js');

module.exports = args => {
    console.log('pongers');
    State.getMessage().channel.send('pong');
};