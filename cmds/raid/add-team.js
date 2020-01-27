module.exports = {
    help: {
        title: '@Laty raid add-team <raid> <team>',
        description: `
Command to add a team to a raid.
NOTE: The team name must match the name of the role exactly.
        `,
        fields: [
            {
                title: 'Example',
                description: '@Laty raid add-team molten-core EU',
                inline: false,
            },
        ],
    },
    handler: () => {
    },
};