const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, team, teamExists } = require('../../selectors');
const { updateTeam } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty team set-role <slug> <roleId>',
        description: 'Command to set the role of a team',
    },
    handler: async args => {
        const slug = args[0];
        const roleId = args[0];

        if (!slug) {
            channel().send(createFailureEmbed('A slug is required to create a team'));
            return;
        }

        if (teamExists(slug)) {
            channel().send(createFailureEmbed('A team with this slug already exists. Did you mean \'@Laty team update\'?'));
            return;
        }

        await updateTeam({
            slug,
            roleId
        });

        if (team(slug).roleId === roleId) {
            channel().send(createSuccessEmbed(`Updated roleId of __${slug}__`));
        }
    },
};