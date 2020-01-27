const { message, raid, raidExists } = require('../../selectors');
const { updateRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid set-team <raid> <team>',
        description: `
Command to set the team of a raid
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
    handler: args => {
        const name = args[0];
        const team = args[1];

        if (!name) {
            message().channel.send("Can't set team, no raid name provided.");
        }

        if (!raidExists(name)) {
            message().channel.send(`Can't set team of __${name}__ raid,  it doesn't exist!`);
            return;
        }

        updateRaid(name, {
            ...raid(name),
            team,
        });

        message().channel.send(`**Work complete**`);
    },
};