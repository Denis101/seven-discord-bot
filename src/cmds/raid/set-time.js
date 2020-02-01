const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raid, raidExists } = require('../../selectors');
const { updateRaid } = require('../../actions');
const { guildLeader } = require('../../services/authenticator');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid set-time <slug> <time>',
        description: 'Command to update the time during a 24hr period when the raid will start.',
        fields: [
            {
                title: 'Example 1',
                description: '@Laty raid set-time molten-core 3pm',
                inline: false,
            },
            {
                title: 'Example 2',
                description: '@Laty raid set-time molten-core 15:30',
                inline: false,
            },
            {
                title: 'Example 3',
                description: '@Laty raid set-time molten-core 7:15am',
                inline: false,
            },
        ],
    },
    handler: async args => {
        const slug = args[0];
        const time = args[1];

        if (!slug) {
            channel().send(createFailureEmbed("Can't set time, no raid slug provided."));
        }

        if (!raidExists(slug)) {
            channel().send(createFailureEmbed(`Can't set time of __${slug}__ raid, it doesn't exist!`));
            return;
        }

        await updateRaid({
            slug,
            time,
        });

        if (raid(slug).time === time) {
            channel().send(createSuccessEmbed(`Set team of __${slug}__ to __${time}__`));
        }
    },
};