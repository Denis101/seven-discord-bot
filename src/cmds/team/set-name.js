const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, team, teamExists } = require('../../selectors');
const { updateTeam } = require('../../actions');
const { guildLeader } = require('../../services/authenticator');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty team set-name <slug> <name>',
        description: 'Command to set the name of a team',
    },
    handler: async args => {
        const slug = args[0];
        const name = args[1];

        if (!slug) {
            channel().send(createFailureEmbed('A slug is required to create a team'));
            return;
        }

        if (!teamExists(slug)) {
            channel().send(createFailureEmbed(`Can't set name of __${slug}__ team, it doesn't exist!`));
            return;
        }

        await updateTeam({
            slug,
            name
        });

        if (team(slug).name === name) {
            channel().send(createSuccessEmbed(`Set name of __${slug}__ to __${name}__`));
        }
    },
};