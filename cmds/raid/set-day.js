module.exports = {
    help: {
        title: '@Laty raid set-day <name> <day>',
        description: 'Command to update the day of the week of a raid.',
        fields: [
            {
                title: 'Possible values for day (case-insensitive)',
                description: `
- monday
- tuesday
- wednesday
- thursday
- friday
- saturday
- sunday
                `,
                inline: false,
            },
            {
                title: 'Example',
                description: '@Laty raid set-day molten-core monday',
                inline: false,
            },
        ],
    },
    handler: () => {
    },
};