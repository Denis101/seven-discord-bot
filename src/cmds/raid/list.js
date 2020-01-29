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
        const fields = Object.keys(raids() || []).map(k => ({
                title: `**__${raids()[k].name || raids()[k].slug}__**`,
                description: 
`
:information_source:\n${raids()[k].description || 'No description'}
${!!raids()[k].day && !!raids()[k].time ? `
:watch: **Next raid** - ${getNext(raids()[k].day, raids()[k].time)}
` : ''}
`
        }));

        const title = fields.length > 0
            ? 'Here\'s a list of all the raids I\'m managing'
            : 'I\'ve not been given any raids to manage!';

        channel().send(createListEmbed({
            title,
            description: '',
            fields,
        }));
    },
}