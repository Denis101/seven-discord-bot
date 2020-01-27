const { message, raid, raidExists } = require('../../selectors');
const { updateRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
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
    handler: args => {
        const name = args[0];
        const day = args[1];

        if (!name) {
            message().channel.send("Can't set day, no raid name provided.");
        }

        if (!raidExists(name)) {
            message().channel.send(`Can't set day of __${name}__ raid,  it doesn't exist!`);
            return;
        }

        updateRaid(name, {
            ...raid(name),
            day,
        });

        message().channel.send(`**Work complete**`);
    },
};