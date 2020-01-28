const { addTeam } = require('../../actions');
const { guild } = require('../../selectors');

module.exports = {
    help: {
        title: '@Laty team add <name>',
        description: 'Command to add a new raid team',
        fields: [
            {
                title: 'Example',
                description: '@Laty team add EU',
                inline: false,
            },
        ],
    },
    handler: args => addTeam(guild().roles.find(r => r.name === args[0]).id),
};