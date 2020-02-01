const { CLASS_MAP } = require('../../constant/classConstants.js');
const { createListEmbed } = require('../../utils/messageUtils.js');
const { team, guild } = require('../../selectors');
const guildService = require('../../services/guildService.js');
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

        const msgId = `class.${slug}`;
        const msg = createListEmbed({
            title: `${team(slug).name}`,
            footer: msgId,
            description:`React with your class
            
${Object.keys(CLASS_MAP).map(k => `${CLASS_MAP[k].text} for ${k}`).join('\n')}
            `
        });

        const message = await channel.send(msg);
        Object.keys(CLASS_MAP).forEach(k => message.react(CLASS_MAP[k].emoji));
        await redisService.set(msgId, message.id);
    },
};