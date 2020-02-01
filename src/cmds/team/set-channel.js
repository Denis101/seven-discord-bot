const { createSuccessEmbed, createFailureEmbed } = require('../../utils/messageUtils.js');
const { discordClient, channel, team, teamExists } = require('../../selectors');
const { updateTeam } = require('../../actions');

const { guildLeader } = require('../../services/authenticator.js');
const teamService = require('../../services/teamService.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty team ask-roles <slug>',
        description: 'Command to ask raiders for their team roles',
    },
    handler: async args => {
        const slug = args[0];
        const discordChannel = args[1];

        if (!slug) {
            channel().send(createFailureEmbed('A slug is required to create a team'));
            return;
        }

        if (!teamExists(slug)) {
            channel().send(createFailureEmbed(`Can't set channel of __${slug}__ team, it doesn't exist!`));
            return;
        }

        const oldChannel = discordClient().channels.find(c => c.name === team(slug).discordChannel);

        await updateTeam({
            slug,
            discordChannel
        });

        if (team(slug).discordChannel === discordChannel) {
            channel().send(createSuccessEmbed(`Set channel of __${slug}__ to **${discordChannel}**`));

            if (oldChannel) {
                discordClient().channelDelete(oldChannel);
            }
            
            await teamService.createCharClassMessage(team(slug));
            await teamService.createCharRoleMessage(team(slug));
            await teamService.createCharMainMessage(team(slug));
        }
    },
};