module.exports = (state = {}, action) => {
    const newState = { ...state };

    switch (action.type) {
        case 'MEMBER_ADD':        
            newState[action.id] = {};
            return newState;
        case 'MEMBER_UPDATE':
            newState[action.id] = action.raid;
            return newState;
        case 'MEMBER_REMOVE':
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};