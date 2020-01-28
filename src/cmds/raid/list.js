const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raidExists } = require('../../selectors');
const { createRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid list',
        description: 'Lists all raids.',
    },
    handler: async args => {
        const name = args[0];
        const day = args[1];
        const time = args[2];

        if (!name) {
            channel().send(createFailureEmbed('A name is required to create a raid.'));
        }

        if (raidExists(name)) {
            channel().send(createFailureEmbed('A raid with this name already exists.\nDid you mean \'@Laty raid update\'?'));
            return;
        }

        await createRaid({
            name,
            day,
            time,
        });

        if (raidExists(name)) {
            channel().send(createSuccessEmbed(`Created new raid __${name}__`));
        }
    },
}