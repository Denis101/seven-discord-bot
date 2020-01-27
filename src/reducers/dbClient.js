module.exports = (state = null, action) => {
    if (action.type === 'DB_CLIENT_SET') {
        return action.client;
    }

    return state;
};