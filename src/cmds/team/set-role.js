const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { channel, guild, team, teamExists } = require('../../selectors');
const { updateTeam } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty team set-role <slug> <roleName>',
        description: 'Command to set the role of a team',
    },
    handler: async args => {
        const slug = args[0];
        const roleName = args[1];

        if (!slug) {
            channel().send(createFailureEmbed('A slug is required to create a team'));
            return;
        }

        if (!teamExists(slug)) {
            channel().send(createFailureEmbed(`Can't set role of __${slug}__ team, it doesn't exist!`));
            return;
        }

        const role = guild().roles.find(r => r.name === roleName);
        if (!role) {
            channel().send(createFailureEmbed(`${roleName} doesn't exist!`));
            return;
        }

        await updateTeam({
            slug,
            roleId: role.id,
        });

        if (team(slug).roleId === role.id) {
            channel().send(createSuccessEmbed(`Updated role of __${slug}__`));
        }
    },
};