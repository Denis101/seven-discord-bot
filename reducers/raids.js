module.exports = (state = {}, action) => {
    const newState = { ...state };

    switch (action.type) {
        case 'RAID_CREATE':        
            newState[action.name] = {};
            return newState;
        case 'RAID_UPDATE':
            newState[action.name] = action.raid;
            return newState;
        case 'RAID_REMOVE':
            delete newState[action.name];
            return newState;
        default:
            return state;
    }
};