const { message } = require('../../selectors');
const { getRaidRole, getRaidRoleMessage } = require('../../roleUtils.js');
const { guildLeader, raidLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: member => {
        return guildLeader(member) || raidLeader(member);
    },
    handler: () => {
        const g = message().guild;
        g.members.filter(m => getRaidRole(m) !== null)
            .forEach(m => m.send(getRaidRoleMessage(m)));
    },
};