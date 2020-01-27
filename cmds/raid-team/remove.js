const { message } = require('../../selectors');

module.exports = {
    help: {
        title: '@Laty raid-team remove <name>',
        description: 'Command to remove an existing raid team',
        fields: [
            {
                title: 'Example',
                description: '@Laty raid-team remove NA'
            }
        ]
    },
    handler: () => {
        message().channel.send('Not yet implemented.');
    },
};