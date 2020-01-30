const { createListEmbed } = require('../../utils/messageUtils.js');
const { channel, teams } = require('../../selectors');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty team list',
        description: 'Lists all teams.',
    },
    handler: async () => {
        const fields = Object.keys(teams() || [])
            .map(k => {
                const name = teams()[k].name;
                return `${'**' + name + '** - ' || ''}${teams()[k].slug}`;   
            });

        const title = fields.length > 0
            ? 'Here\'s a list of all the teams I\'m managing'
            : 'I\'ve not been given any teams to manage!';

        channel().send(createListEmbed({
            title,
            description: fields.join('\n'),
        }));
    },
}