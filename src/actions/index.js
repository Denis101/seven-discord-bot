const { store } = require('../store');
const { discordClient, teams, team } = require('../selectors');
const raidActions = require('./raidActions.js');
const characterActions = require('./characterActions.js');
const teamActions = require('./teamActions.js');

const setter = (type, data) => store.dispatch({ type, data });

const cacheMessage = async (channel, team, type) => {
    const msgId = await require('../services/redisService.js').get(`${type}.${team}`);
    if (msgId) {
        const msg = await channel.fetchMessage(msgId);
        channel.messages.set(msgId, msg);
    }

    return !!msgId;
}

module.exports = {
    ...raidActions,
    ...characterActions,
    ...teamActions,
    init: async () => {
        store.dispatch({ type: 'INIT' });
        await raidActions.init();
        await teamActions.init();
        await characterActions.init();

        Object.keys(teams() || []).forEach(async k => {
            const t = team(k);
            const chan = discordClient().channels.find(c => c.name === t.discordChannel);
            if (!chan) {
                return;
            }
            
            await cacheMessage(chan, k, 'class');
            await cacheMessage(chan, k, 'role');
            await cacheMessage(chan, k, 'main');
        });
    },
    initComplete: () => store.dispatch({ type: 'INIT_COMPLETE' }),
    setDbClient: data => setter('DB_CLIENT_SET', data),
    setDiscordClient: data => setter('DISCORD_CLIENT_SET', data),
    setRedisClient: data => setter('REDIS_CLIENT_SET', data),
    setMessage: data => setter('MESSAGE_SET', data),
};