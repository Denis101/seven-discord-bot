const store = require('../store.js');

module.exports = {
    setClient: client => store.dispatch({
        type: 'CLIENT_SET',
        client,
    }),
    setMessage: client => store.dispatch({
        type: 'MESSAGE_SET',
        client,
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