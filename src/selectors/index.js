const { store } = require('../store');

module.exports = {
    ready: () => store.getState().boot.complete,
    author: () => store.getState().message && store.getState().message.author,
    channel: () => store.getState().message && store.getState().message.channel,
    dbClient: () => store.getState().dbClient,
    discordClient: () => store.getState().discordClient,
    guild: () => store.getState().message.guild,
    raidExists: name => Object.keys(store.getState().raids).includes(name),
    raid: name => store.getState().raids[name],
    // TODO: compare dates to now
    nextRaid: () => store.getState().raids[Object.keys(store.getState().raids)[0]],
};