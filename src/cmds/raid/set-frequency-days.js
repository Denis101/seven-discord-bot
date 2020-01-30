const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raid, raidExists } = require('../../selectors');
const { updateRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid set-frequency-days <slug> <value>',
        description: 'Command to set the frequency of a raid in days.',
        fields: [
            {
                title: 'Example 1',
                description: '@Laty raid set-frequency-days molten-core 1\nThis raid will occur daily',
                inline: false,
            },
            {
                title: 'Example 2',
                description: '@Laty raid set-frequency-days molten-core 5\nThis raid will occur every 5 days',
                inline: false,
            },
        ],
    },
    handler: async args => {
        const slug = args[0];
        const frequencyDays = args[1];

        if (!slug) {
            channel().send(createFailureEmbed("Can't set frequency, no raid slug provided."));
        }

        if (!raidExists(slug)) {
            channel().send(createFailureEmbed(`Can't set frequency of __${slug}__ raid, it doesn't exist!`));
            return;
        }

        await updateRaid({
            slug,
            frequencyDays,
        });

        if (raid(slug).frequencyDays === frequencyDays) {
            channel().send(createSuccessEmbed(`Set frequency of __${slug}__ to **${frequencyDays}**`));
        }
    },
};