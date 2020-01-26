const State = require('../../state.js');

module.exports = {
    name: 'add',
    handler: args => {
        const g = State.getMessage().guild;
        State.addTeam(g.roles.find(r => r.name === args[0]).id);
    }
}