
module.exports = {
    help: {
        title: '@Laty raid set-time <name> <time>',
        description: 'Command to update the time during a 24hr period when the raid will start.',
        fields: [
            {
                title: 'Example 1',
                description: '@Laty raid set-time molten-core 3pm',
                inline: false,
            },
            {
                title: 'Example 2',
                description: '@Laty raid set-time molten-core 15:30',
                inline: false,
            },
            {
                title: 'Example 3',
                description: '@Laty raid set-time molten-core 7:15am',
                inline: false,
            },
        ],
    },
    handler: () => {
    },
};