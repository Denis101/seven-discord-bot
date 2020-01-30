module.exports = (state = {}, action) => {
    const newState = { ...state };

    switch (action.type) {
        case 'RAID_INIT_COMPLETE':
            return action.data;
        case 'RAID_CREATE_REQUEST':
            newState[action.data.slug] = {};
            return newState;
        case 'RAID_CREATE_COMPLETE':
            newState[action.data.slug] = action.data;
            return newState;
        case 'RAID_UPDATE_COMPLETE':
            newState[action.data.slug] = {
                ...newState[action.data.slug],
                ...action.data,
            };
            return newState;
        case 'RAID_CREATE_FAILED':
        case 'RAID_REMOVE':
            delete newState[action.data.slug];
            return newState;
        case 'RAID_UPDATE_REQUEST':
        case 'RAID_UPDATE_FAILED':
        default:
            return state;
    }
};