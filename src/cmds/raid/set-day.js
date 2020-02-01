const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raid, raidExists } = require('../../selectors');
const { updateRaid } = require('../../actions');
const { guildLeader } = require('../../services/authenticator.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid set-day <slug> <day>',
        description: 'Command to update the day of the week of a raid.',
        fields: [
            {
                title: 'Possible values for day (case-insensitive)',
                description: `
- monday
- tuesday
- wednesday
- thursday
- friday
- saturday
- sunday
                `,
                inline: false,
            },
            {
                title: 'Example',
                description: '@Laty raid set-day molten-core monday',
                inline: false,
            },
        ],
    },
    handler: async args => {
        const slug = args[0];
        const day = args[1];

        if (!slug) {
            channel().send(createFailureEmbed("Can't set day, no raid slug provided."));
        }

        if (!raidExists(slug)) {
            channel().send(createFailureEmbed(`Can't set day of __${slug}__ raid, it doesn't exist!`));
            return;
        }

        await updateRaid({
            slug,
            day: day.toLowerCase(),
        });

        if (raid(slug).day === day) {
            channel().send(createSuccessEmbed(`Set day of __${slug}__ to __${day}__`));
        }
    },
};