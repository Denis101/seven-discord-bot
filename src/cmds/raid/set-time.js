const { message, raid, raidExists } = require('../../selectors');
const { createRaid, updateRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

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
    handler: args => {
        const name = args[0];
        const time = args[1];

        if (!name) {
            message().channel.send("Can't set time, no raid name provided.");
        }

        if (!raidExists(name)) {
            message().channel.send(`Can't set time of __${name}__ raid,  it doesn't exist!`);
            return;
        }

        updateRaid(name, {
            ...raid(name),
            time,
        });

        message().channel.send(`**Work complete**`);
    },
};