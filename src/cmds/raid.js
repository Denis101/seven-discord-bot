const { channel } = require('../selectors');

module.exports = {
    directory: __dirname + '/raid',
    help: {
        title: '@Laty raid',
        description: 'Command to manage raids.',
        fields: [
            {
                title: '**Available Sub-commands**',
                description: '---',
                inline: false,
            },
            {
                title: '__create__',
                description: 'Creates a new raid.',
                inline: true
            },
            {
                title: '__invite__',
                description: 'Sends out invites to raiders for the given raid.',
                inline: true
            },
            {
                title: '__set-day__',
                description: 'Sets the day when this raid occurs.',
                inline: true
            },
            {
                title: '__set-team__',
                description: 'Sets the team of a given raid.',
                inline: true
            },
            {
                title: '__set-time__',
                description: 'Sets the time when this raid occurs (Faerlina Server Time).',
                inline: true
            },
            {
                title: '__set-description__',
                description: 'Sets the description of this raid.',
                inline: true
            },
            {
                title: '__status__',
                description: 'Gets the raider status of the next raid.',
                inline: true
            },
        ]
    },
    handler: (args, next) => {
        if (args.length < 1) {
            channel().send('@Laty raid: missing subcommand');
            return;
        }

        next.execute();
    }
};