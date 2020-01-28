const { convertToObject } = require('../utils/arrayUtils.js');

module.exports = (state = {}, action) => {
    const newState = { ...state };

    switch (action.type) {
        case 'CHARACTERS_INIT_COMPLETE':
            return convertToObject(action.characters, c => c.name);
        case 'CHARACTER_ADD':        
            newState[action.id] = {};
            return newState;
        case 'CHARACTER_UPDATE':
            newState[action.id] = action.raid;
            return newState;
        case 'CHARACTER_REMOVE':
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};