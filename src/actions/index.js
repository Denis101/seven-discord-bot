const { store } = require('../store');
const raidActions = require('./raidActions.js');
const characterActions = require('./characterActions.js');
const teamActions = require('./teamActions.js');

module.exports = {
    ...raidActions,
    ...characterActions,
    ...teamActions,
    init: async () => {
        store.dispatch({ type: 'INIT' });
        await raidActions.init();
        await teamActions.init();
        await characterActions.init();
    },
    initComplete: () => store.dispatch({ type: 'INIT_COMPLETE' }),
    setDbClient: client => store.dispatch({
        type: 'DB_CLIENT_SET',
        data: client,
    }),
    setDiscordClient: client => store.dispatch({
        type: 'DISCORD_CLIENT_SET',
        data: client,
    }),
    setMessage: message => store.dispatch({
        type: 'MESSAGE_SET',
        data: message,
    }),
};