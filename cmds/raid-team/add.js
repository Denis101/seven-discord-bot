const { addTeam } = require('../../actions');
const { guild } = require('../../selectors');

module.exports = {
    handler: args => addTeam(guild().roles.find(r => r.name === args[0]).id),
};