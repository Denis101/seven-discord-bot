module.exports = (state = false, action) => {
    if (action.type === 'READY_SET') {
        return action.ready;
    }
    
    return state;
};