const store = require('../store.js');
const memberActions = require('./members.js');

module.exports = {
    ...memberActions,
    setReady: () => store.dispatch({
        type: 'READY_SET',
        ready: true,
    }),
    setDbClient: client => store.dispatch({
        type: 'DB_CLIENT_SET',
        client,
    }),
    setDiscordClient: client => store.dispatch({
        type: 'DISCORD_CLIENT_SET',
        client,
    }),
    setMessage: message => store.dispatch({
        type: 'MESSAGE_SET',
        message,
    }),
    addTeam: team => store.dispatch({
        type: 'TEAM_ADD',
        team,
    }),
    createRaid: name => store.dispatch({
        type: 'RAID_CREATE',
        name,
    }),
    updateRaid: (name, raid) => store.dispatch({
        type: 'RAID_UPDATE',
        name,
        raid,
    }),
    removeRaid: name => store.dispatch({
        type: 'RAID_REMOVE',
        name,
    }),
};