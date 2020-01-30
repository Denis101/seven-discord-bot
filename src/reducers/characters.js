const { dataReducer } = require('../utils/reducerUtils.js');
module.exports = (state = {}, action) => {
    return dataReducer('CHARACTER', state, action);
};