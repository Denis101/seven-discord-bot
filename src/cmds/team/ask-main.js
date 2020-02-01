const { createListEmbed } = require('../../utils/messageUtils.js');
const { team, guild } = require('../../selectors');
const redisService = require('../../services/redisService.js');

module.exports = {
    help: {
        title: '@Laty team ask-main <slug>',
        description: 'Command to ask raiders for their main character',
    },
    handler: async args => {
        const slug = args[0];
        let channel = guild().channels.find(c => c.name === team(slug).discordChannel);

        if (!channel) {
            channel = await guildService.createRoleChannel(team(slug).discordChannel);
        }

        //channel.send(`<@&${team(slug).roleId}>`);

        const msgId = `main.${slug}`;
        const msg = createListEmbed({
            title: `${team(slug).name}`,
            footer: msgId,
            description:`Is this your main?
     
:green_circle: for Yes

:red_circle: for No
            `
        });

        const message = await channel.send(msg);
        message.react('🟢');
        message.react('🔴');

        await redisService.set(msgId, message.id);
    },
};