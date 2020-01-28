const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raid, raidExists } = require('../../selectors');
const { updateRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid set-team <raid> <team>',
        description: `
Command to set the team of a raid
NOTE: The team name must match the name of the role exactly.
        `,
        fields: [
            {
                title: 'Example',
                description: '@Laty raid add-team molten-core EU',
                inline: false,
            },
        ],
    },
    handler: async args => {
        const name = args[0];
        const team = args[1];

        if (!name) {
            channel().send(createFailureEmbed("Can't set team, no raid name provided."));
        }

        if (!raidExists(name)) {
            channel().send(createFailureEmbed(`Can't set team of __${name}__ raid, it doesn't exist!`));
            return;
        }

        await updateRaid({
            name,
            team,
        });

        if (raid(name).team === team) {
            channel().send(createSuccessEmbed(`Set team of __${name}__ to __${team}__`));
        }
    },
};