const store = require('../store');

module.exports = {
    ready: () => store.getState().ready,
    message: () => store.getState().message,
    dbClient: () => store.getState().dbClient,
    discordClient: () => store.getState().discordClient,
    guild: () => store.getState().message.guild,
    raidExists: name => Object.keys(store.getState().raids).includes(name),
    raid: name => store.getState().raids[name],
    // TODO: compare dates to now
    nextRaid: () => store.getState().raids[Object.keys(store.getState().raids)[0]],
};