const { dataReducer } = require('../utils/reducerUtils.js');
const { RAID_MAPPINGS } = require('../constant/dbConstants.js');

module.exports = (state = {}, action) => {
    return dataReducer('RAID', state, action, RAID_MAPPINGS.keyGetter);
};