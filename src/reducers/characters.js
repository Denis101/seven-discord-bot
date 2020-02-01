const { dataReducer } = require('../utils/reducerUtils.js');
const { CHARACTER_MAPPINGS } = require('../constant/dbConstants.js');

module.exports = (state = {}, action) => {
    return dataReducer('CHARACTER', state, action, CHARACTER_MAPPINGS.keyGetter);
};