const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raid, raidExists } = require('../../selectors');
const { updateRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid set-day <name> <day>',
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
        const name = args[0];
        const day = args[1];

        if (!name) {
            channel().send(createFailureEmbed("Can't set day, no raid name provided."));
        }

        if (!raidExists(name)) {
            channel().send(createFailureEmbed(`Can't set day of __${name}__ raid, it doesn't exist!`));
            return;
        }

        await updateRaid({
            name,
            day: day.toLowerCase(),
        });

        if (raid(name).day === day) {
            channel().send(createSuccessEmbed(`Set day of __${name}__ to __${day}__`));
        }
    },
};