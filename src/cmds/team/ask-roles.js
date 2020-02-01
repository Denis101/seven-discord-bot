const { createListEmbed } = require('../../utils/messageUtils.js');
const { team, guild } = require('../../selectors');
const redisService = require('../../services/redisService.js');

module.exports = {
    help: {
        title: '@Laty team ask-classes <slug>',
        description: 'Command to ask raiders for their team classes',
    },
    handler: async args => {
        const slug = args[0];
        let channel = guild().channels.find(c => c.name === team(slug).discordChannel);

        if (!channel) {
            channel = await guildService.createRoleChannel(team(slug).discordChannel);
        }

        //channel.send(`<@&${team(slug).roleId}>`);

        const msgId = `role.${slug}`;
        const msg = createListEmbed({
            title: `${team(slug).name}`,
            footer: msgId,
            description:`React with your role
     
:hospital: for Healer

:shield: for Tank
            `
        });

        const message = await channel.send(msg);
        message.react('🏥');
        message.react('🛡');
        await redisService.set(msgId, message.id);
    },
};