const { createListEmbed } = require('../../utils/messageUtils.js');
const { channel, teams } = require('../../selectors');
const { raider } = require('../../services/authenticator.js');

module.exports = {
    authenticator: raider,
    help: {
        title: '@Laty team list',
        description: 'Lists all teams.',
    },
    handler: async () => {
        const fields = Object.keys(teams() || [])
            .map(k => {
                const name = teams()[k].name;
                return `${name ? '**' + name + '** - ' : ''}${teams()[k].slug}`;   
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