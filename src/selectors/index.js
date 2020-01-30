const { store } = require('../store');

module.exports = {
    ready: () => store.getState().boot.complete,
    message: () => store.getState().message,
    author: () => store.getState().message && store.getState().message.author,
    channel: () => store.getState().message && store.getState().message.channel,
    dbClient: () => store.getState().dbClient,
    discordClient: () => store.getState().discordClient,
    guild: () => store.getState().message.guild,
    raidExists: slug => Object.keys(store.getState().raids).includes(slug),
    raid: slug => store.getState().raids[slug],
    raids: () => store.getState().raids,
    team: slug => store.getState().teams[slug],
    teams: () => store.getState().teams,
    nextRaid: () => store.getState().raids[Object.keys(store.getState().raids)[0]],
};