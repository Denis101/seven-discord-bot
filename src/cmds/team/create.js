const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, teamExists } = require('../../selectors');
const { createTeam } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty team create <slug> [roleId] [channel]',
        description: 'Command to add a new raid team',
        fields: [
            {
                title: 'Example',
                description: '@Laty team add EU',
                inline: false,
            },
        ],
    },
    handler: async args => {
        const slug = args[0];
        const roleId = args[1];
        const discordChannel = args[2];

        if (!slug) {
            channel().send(createFailureEmbed('A slug is required to create a team'));
            return;
        }

        if (teamExists(slug)) {
            channel().send(createFailureEmbed('A team with this slug already exists. Did you mean \'@Laty team update\'?'));
            return;
        }

        await createTeam({
            slug,
            roleId,
            discordChannel,
        });

        if (teamExists(slug)) {
            channel().send(createSuccessEmbed(`Created new team __${slug}__`));
        }
    },
};