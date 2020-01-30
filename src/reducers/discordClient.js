const { setterReducer } = require('../utils/reducerUtils.js');
module.exports = (state = null, action) => {
    return setterReducer('DISCORD_CLIENT', state, action);
};