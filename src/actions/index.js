const { store } = require('../store');
const raidActions = require('./raidActions.js');
const characterActions = require('./characterActions.js');
const teamActions = require('./teamActions.js');

module.exports = {
    ...raidActions,
    ...characterActions,
    ...teamActions,
    init: () => {
        store.dispatch({ type: 'INIT' });
        
        raidActions.init();
        characterActions.init();
        teamActions.init();
    },
    initComplete: () => store.dispatch({ type: 'INIT_COMPLETE' }),
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
};