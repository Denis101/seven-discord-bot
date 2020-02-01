const { dataReducer } = require('../utils/reducerUtils.js');
const { TEAM_MAPPINGS } = require('../constant/dbConstants.js');

module.exports = (state = {}, action) => {
    return dataReducer('TEAM', state, action, TEAM_MAPPINGS.keyGetter);
};