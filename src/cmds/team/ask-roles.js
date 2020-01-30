const { CLASS_MAP } = require('../../constant/classConstants.js');
const { createListEmbed } = require('../../utils/messageUtils.js');
const { channel } = require('../../selectors');

module.exports = {
    help: {
        title: '@Laty team ask-roles <slug>',
        description: 'Command to ask raiders for their team roles',
    },
    handler: async args => {
        //const slug = args[0];

        const msg = createListEmbed({
            title: 'React with your class & role',
            description:`${Object.keys(CLASS_MAP).map(k => `${CLASS_MAP[k].text} for ${k}`).join('\n')}
            
:hospital: for Healer

:shield: for Tank
            `
        })

        const message = await channel().send(msg);
        Object.keys(CLASS_MAP).forEach(k => message.react(CLASS_MAP[k].emoji));
        message.react('🏥');
        message.react('🛡');

        const collected = await message.awaitReactions((_, user) => !user.bot, { time: 1000 * 60 * 5 });
        console.log(collected.keys());
        //channel().send(Object.keys(collected));
    },
};