const State = require('../../state.js');

module.exports = {
    name: 'list',
    handler: () => {
        State.getMessage().channel.send(State.getTeams());
    }
}