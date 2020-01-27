const store = require('../store.js');

module.exports = {
    ready: () => store.getState().ready,
    message: () => store.getState().message,
    client: () => store.getState().client,
    guild: () => store.getState().message.guild,
    raidExists: name => Object.keys(store.getState().raids).includes(name),
    raid: name => store.getState().raids[name],
};