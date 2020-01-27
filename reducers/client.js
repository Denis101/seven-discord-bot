module.exports = (state = null, action) => {
    if (action.type === 'CLIENT_SET') {
        return action.client;
    }

    return state;
};