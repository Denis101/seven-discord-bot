const { channel } = require('../../selectors');

module.exports = {
    help: {
        title: '@Laty team remove <name>',
        description: 'Command to remove an existing raid team',
        fields: [
            {
                title: 'Example',
                description: '@Laty team remove NA'
            }
        ]
    },
    handler: () => {
        channel().send('Not yet implemented.');
    },
};