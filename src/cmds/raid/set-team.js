const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, raid, raidExists, team, teams } = require('../../selectors');
const { updateRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid set-team <slug> <team>',
        description: `
Command to set the team of a raid
NOTE: The team name must match the name of the role exactly.
        `,
        fields: [
            {
                title: 'Example',
                description: '@Laty raid set-team molten-core EU',
                inline: false,
            },
        ],
    },
    handler: async args => {
        const slug = args[0];
        const teamSlug = args[1];

        if (!slug) {
            channel().send(createFailureEmbed("Can't set team, no raid slug provided."));
        }

        if (!raidExists(slug)) {
            channel().send(createFailureEmbed(`Can't set team of __${slug}__ raid, it doesn't exist!`));
            return;
        }

        await updateRaid({
            slug,
            team: team(teamSlug).id,
        });

        if (raid(slug).team === team(teamSlug).id) {
            channel().send(createSuccessEmbed(`Set team of __${slug}__ to __${teamSlug}__`));
        }
    },
};