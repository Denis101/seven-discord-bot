const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raid, raidExists } = require('../../selectors');
const { updateRaid } = require('../../actions');
const { guildLeader } = require('../../services/authenticator');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid set-frequency-weeks <slug> <value>',
        description: 'Command to set the frequency of a raid in weeks.',
        fields: [
            {
                title: 'Example 1',
                description: '@Laty raid set-frequency-weeks molten-core 1\nThis raid will occur weekly',
                inline: false,
            },
            {
                title: 'Example 2',
                description: '@Laty raid set-frequency-weeks molten-core 2\nThis raid will occur bi-weekly',
                inline: false,
            },
            {
                title: 'Example 3',
                description: '@Laty raid set-frequency-weeks molten-core 4\nThis raid will occur monthly',
                inline: false,
            },
        ],
    },
    handler: async args => {
        const slug = args[0];
        const frequencyWeeks = args[1];

        if (!slug) {
            channel().send(createFailureEmbed("Can't set frequency, no raid slug provided."));
        }

        if (!raidExists(slug)) {
            channel().send(createFailureEmbed(`Can't set frequency of __${slug}__ raid, it doesn't exist!`));
            return;
        }

        await updateRaid({
            slug,
            frequencyWeeks,
        });

        if (raid(slug).frequencyWeeks === frequencyWeeks) {
            channel().send(createSuccessEmbed(`Set frequency of __${slug}__ to **${frequencyWeeks}**`));
        }
    },
};