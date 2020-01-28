const { guild } = require('../../selectors');
const { getRaidRole, getRaidRoleMessage } = require('../../utils/roleUtils.js');
const { guildLeader, raidLeader } = require('../../authenticators.js');

module.exports = {
    help: {
        title: '@Laty raid invite <name>',
        description: 'Command that will send PMs to all raiders for a given raid, prompting them to sign-up.',
        fields: [
            {
                title: 'Example 1',
                description: '@Laty raid invite molten-core',
                inline: false,
            },
            {
                title: 'Example 2',
                description: '@Laty raid invite onyxia',
                inline: false,
            },
            {
                title: 'Example 3',
                description: '@Laty raid invite blackwing-lair',
                inline: false,
            },
        ],
    },
    authenticator: member => {
        return guildLeader(member) || raidLeader(member);
    },
    handler: () => {
        guild().members.filter(m => getRaidRole(m) !== null)
            .forEach(m => m.send(getRaidRoleMessage(m)));
    },
};