const { store } = require('../store');
const { asyncDbInitAction  } = require('../utils/actionUtils.js');

const MAPPINGS = {
    userId: 'user_id',
    name: 'display_name',
    isTank: 'is_tank',
    isHealer: 'is_healer',
    isMain: 'is_main',
};

module.exports = {
    init: () => store.dispatch(asyncDbInitAction('character', MAPPINGS)),
};