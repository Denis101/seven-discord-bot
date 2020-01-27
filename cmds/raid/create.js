const { message, raid, raidExists } = require('../../selectors');
const { createRaid, updateRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid create <name> [day] [time]',
        description: 'Command to create a new raid.',
        fields: [
            {
                title: 'Example 1',
                description: '@Laty raid create molten-core tuesday 1pm',
                inline: false,
            },
            {
                title: 'Example 2',
                description: '@Laty raid create onyxia',
                inline: false,
            },
        ],
    },
    handler: args => {
        const name = args[0];
        const day = args[1];
        const time = args[2];

        if (!name) {
            message().channel.send(`
            Invalid value provided for name field in raid create command.

            example usage:
            @Laty raid create molten-core tuesday 1pm
            @Laty raid create onxyia
            `);
        }

        if (raidExists(name)) {
            message().channel.send('A raid with this name already exists. Did you mean \'@Laty raid update\'?');
            return;
        }

        createRaid(name);
        updateRaid(name, {
            ...raid(name),
            time,
            day,
        });

        message().channel.send(`Created new raid: ${raid().name}`);
    }
}