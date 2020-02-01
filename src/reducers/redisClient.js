const { setterReducer } = require('../utils/reducerUtils.js');
module.exports = (state = null, action) => {
    return setterReducer('REDIS_CLIENT', state, action);
};