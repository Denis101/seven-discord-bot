const { convertToObject } = require('../utils/arrayUtils.js');

module.exports = (state = {}, action) => {
    const newState = { ...state };

    switch (action.type) {
        case 'RAIDS_INIT_COMPLETE':
            return convertToObject(action.data, r => r.name);
        case 'RAID_CREATE_REQUEST':
            newState[action.data.name] = {};
            return newState;
        case 'RAID_CREATE_COMPLETE':
            newState[action.data.name] = action.data;
            return newState;
        case 'RAID_UPDATE_COMPLETE':
            newState[action.data.name] = {
                ...newState[action.data.name],
                ...action.data,
            };
            return newState;
        case 'RAID_CREATE_FAILED':
        case 'RAID_REMOVE':
            delete newState[action.data.name];
            return newState;
        case 'RAID_UPDATE_REQUEST':
        case 'RAID_UPDATE_FAILED':
        default:
            return state;
    }
};