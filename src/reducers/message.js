module.exports = (state = null, action) => {
    if (action.type === 'MESSAGE_SET') {
        return action.message;
    }

    return state;
};