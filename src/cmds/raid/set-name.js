const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raid, raidExists } = require('../../selectors');
const { updateRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid set-name <slug> "<name>"',
        description: 'Command to update the display name of a raid.',
        fields: [
            {
                title: 'Example',
                description: '@Laty raid set-name mc-eu "Molten Core Europe"',
                inline: false,
            },
        ],
    },
    handler: async args => {
        const slug = args[0];
        const name = args[1];

        if (!name) {
            channel().send(createFailureEmbed("Can't set name, no raid slug provided."));
        }

        if (!raidExists(name)) {
            channel().send(createFailureEmbed(`Can't set name of __${slug}__ raid, it doesn't exist!`));
            return;
        }

        await updateRaid({
            slug,
            name,
        });

        if (raid(slug).name === name) {
            channel().send(createSuccessEmbed(`Set name of __${slug}__ to __${name}__`));
        }
    },
};