const { channel, teams } = require('../../selectors');

module.exports = {
    help: {
        title: '@Laty team list',
        description: 'Command to list all raid teams.',
    },
    handler: () => channel().send(teams()),
};