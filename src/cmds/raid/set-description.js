const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raid, raidExists } = require('../../selectors');
const { updateRaid } = require('../../actions');
const { guildLeader } = require('../../services/authenticator');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid set-description <slug>\n<description>',
        description: 'Command to update the description of a raid.',
        fields: [
            {
                title: 'Example',
                description: '@Laty raid set-description molten-core\nLet\'s kill WAGNAWOS!\nTry not to ninja pull this time, you know who you are.',
                inline: false,
            },
        ],
    },
    handler: async args => {
        const slug = args[0];
        const description = args[1];

        if (!slug) {
            channel().send(createFailureEmbed("Can't set description, no raid slug provided."));
        }

        if (!raidExists(slug)) {
            channel().send(createFailureEmbed(`Can't set description of __${slug}__ raid, it doesn't exist!`));
            return;
        }

        await updateRaid({
            slug,
            description,
        });

        if (raid(slug).description === description) {
            channel().send(createSuccessEmbed(`Set description of __${slug}__ to:\n${description}`));
        }
    },
};