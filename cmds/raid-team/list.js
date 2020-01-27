const { message, teams } = require('../../selectors');

module.exports = {
    help: {
        title: '@Laty raid-team list',
        description: 'Command to list all raid teams.',
    },
    handler: () => message().channel.send(teams()),
};