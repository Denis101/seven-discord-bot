const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raid, raidExists } = require('../../selectors');
const { markRaidComplete } = require('../../actions');
const { guildLeader } = require('../../service/authenticator.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid complete',
        description: 'Mark a raid as complete.',
    },
    handler: async args => {
        const slug = args[0];

        if (!slug) {
            channel().send(createFailureEmbed("Can't mark complete, no raid slug provided."));
        }

        if (!raidExists(slug)) {
            channel().send(createFailureEmbed(`Can't mark __${slug}__ raid as complete, it doesn't exist!`));
            return;
        }

        await markRaidComplete(raid(slug));

        if (raid(slug).day === day) {
            channel().send(createSuccessEmbed(`Set day of __${slug}__ to __${day}__`));
        }
    },
};