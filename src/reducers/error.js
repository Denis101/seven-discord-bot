module.exports = (state = null, action) => {
    if (action.type === 'ERROR') {
        return action.error;
    }

    return null;
};