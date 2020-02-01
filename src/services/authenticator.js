const { hasRole } = require('./utils/roleUtils.js');

module.exports = {
    guildLeader: member => {
        return hasRole(member, 'Guild Leader');
    },
    raidLeader: member => {
        return hasRole(member, 'Raid Leader');
    },
    raider: member => {
        return hasRole(member, 'Raider');
    },
    anyone: () => true
}