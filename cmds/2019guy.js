
const State = require('../state.js');

module.exports = () => {
    State.getMessage().channel.send('-play https://www.youtube.com/watch?v=4SiiRx7GDzI');
};