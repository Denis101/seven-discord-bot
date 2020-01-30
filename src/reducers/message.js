const { setterReducer } = require('../utils/reducerUtils.js');
module.exports = (state = {}, action) => {
    return setterReducer('MESSAGE', state, action);
};