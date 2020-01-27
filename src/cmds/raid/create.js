const { message, raid, raidExists } = require('../../selectors');
const { createRaid, updateRaid } = require('../../actions');
const { guildLeader } = require('../../authenticators.js');
const { createTransaction } = require('../../transaction.js');

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
    handler: async args => {
        const name = args[0];
        const day = args[1];
        const time = args[2];

        if (!name) {
            message().channel.send('**Houston, we have a problem**, a name is required to create a raid.');
        }

        if (raidExists(name)) {
            message().channel.send('**Houston, we have a problem**, A raid with this name already exists. Did you mean \'@Laty raid update\'?');
            return;
        }

        let rowsSql = 'display_name';
        let values = [name];

        if (day) {
            rowsSql += ', day';
            values.push(day);
        }

        if (time) {
            rowsSql += ', time';
            values.push(time);
        }

        let valuesSql = '';
        for (let i = 0; i < values.length; i++) {
            valuesSql += `$${i+1}${values.length > 1 && i == values.length - 1 ? ',' : ''}`;
        }

        try {
            await createTransaction(`INSERT INTO raids (${rowsSql}) VALUES (${valuesSql})`, values);
            createRaid(name);

            if (time || day) {
                updateRaid(name, {
                    ...raid(name),
                    time,
                    day,
                });
            }
        }
        catch (e) {
            message().channel.send('**Work failed**, looks like something went wrong on my end. Oopsies.');
            return;
        }
        
        message().channel.send(`**Work complete**, created new raid __${name}__`);
    },
}