
const { channel } = require('../selectors');

module.exports = {
    directory: __dirname + '/team',
    help: {
        title: '@Laty team',
        description: `
Command to manage raid teams.
NOTE: The team name must match the name of the role exactly.
        `,
        fields: [
            {
                title: '**Available Sub-commands**',
                description: '---',
                inline: false,
            },
            {
                title: '__add__',
                description: 'Adds a raid team.',
                inline: true
            },
            {
                title: '__list__',
                description: 'Lists the raid teams.',
                inline: true
            },
            {
                title: '__remove__',
                description: 'Removes a raid team.',
                inline: true
            },
        ]
    },
    handler: (args, next) => {
        if (args.length < 1) {
            channel().send('Missing subcommand for raid-team command');
            return;
        }

        next.execute();
    }
}