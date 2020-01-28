const { convertToObject } = require('../utils/arrayUtils.js');

module.exports = (state = {}, action) => {
    const newState = { ...state };

    switch (action.type) {
        case 'RAIDS_INIT_COMPLETE':
            return convertToObject(action.raids, r => r.name);
        case 'RAID_CREATE_REQUEST':
            newState[action.name] = {};
            return newState;
        case 'RAID_CREATE_COMPLETE':
        case 'RAID_UPDATE':
            newState[action.name] = action.raid;
            return newState;
        case 'RAID_CREATE_FAILED':
        case 'RAID_REMOVE':
            delete newState[action.name];
            return newState;
        default:
            return state;
    }
};