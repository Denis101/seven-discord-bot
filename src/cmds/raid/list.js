const { createListEmbed } = require('../../utils/messageUtils.js');
const { channel, raids } = require('../../selectors');
const { getNext } = require('../../utils/dateTimeUtils.js');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid list',
        description: 'Lists all raids.',
    },
    handler: async () => {
        const fields = Object.keys(raids()).map(k => ({
                title: `**__${raids()[k].name}__**`,
                description: 
`
${raids()[k].description || 'No description'}
${!!raids()[k].day && !!raids()[k].time ? `

__Next raid__
:watch: ${getNext(raids()[k].day, raids()[k].time)}
` : ''}
`
        }));

        channel().send(createListEmbed({
            title: 'Here\'s a list of all the raids I\'m managing',
            description: '',
            fields,
        }));
    },
}