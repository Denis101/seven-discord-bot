const { setterReducer } = require('../utils/reducerUtils.js');
module.exports = (state = null, action) => {
    return setterReducer('DB_CLIENT', state, action);
};