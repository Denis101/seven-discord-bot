module.exports = (state = null, action) => {
    if (action.type === 'DISCORD_CLIENT_SET') {
        return action.client;
    }

    return state;
};