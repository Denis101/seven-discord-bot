const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raid, raidExists } = require('../../selectors');
const { updateRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid set-description <name> <description>',
        description: 'Command to update the description of a raid.',
        fields: [
            {
                title: 'Example',
                description: '@Laty raid set-description molten-core Lets kill WAGNAWOS!',
                inline: false,
            },
        ],
    },
    handler: args => {
        const name = args[0];
        const description = args[1];

        if (!name) {
            channel().send(createFailureEmbed("Can't set description, no raid name provided."));
        }

        if (!raidExists(name)) {
            channel().send(createFailureEmbed(`Can't set description of __${name}__ raid, it doesn't exist!`));
            return;
        }

        updateRaid(name, {
            ...raid(name),
            description,
        });

        channel().send(createSuccessEmbed(`Set description of __${name}__ to __${description}__`));
    },
};