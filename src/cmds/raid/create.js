const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raidExists } = require('../../selectors');
const { createRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid create <slug> [day] [time] "[name]"',
        description: 'Command to create a new raid.',
        fields: [
            {
                title: 'Example 1',
                description: '@Laty raid create molten-core tuesday 1pm',
                inline: false,
            },
            {
                title: 'Example 2',
                description: '@Laty raid create onyxia',
                inline: false,
            },
        ],
    },
    handler: async args => {
        const slug = args[0];
        const day = args[1];
        const time = args[2];
        const name = args[3];

        if (!slug) {
            channel().send(createFailureEmbed('A slug is required to create a raid.'));
        }

        if (raidExists(slug)) {
            channel().send(createFailureEmbed('A raid with this slug already exists.\nDid you mean \'@Laty raid update\'?'));
            return;
        }

        await createRaid({
            slug,
            day,
            time,
            name,
        });

        if (raidExists(slug)) {
            channel().send(createSuccessEmbed(`Created new raid __${slug}__`));
        }
    },
}