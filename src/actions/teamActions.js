const { store } = require('../store');
const { asyncDbInitAction, asyncDbCreateAction, asyncDbUpdateAction } = require('../utils/actionUtils.js');

const MAPPINGS = {
    name: 'display_name',
};

module.exports = {
    init: () => store.dispatch(asyncDbInitAction('team', MAPPINGS)),
    createTeam: data => store.dispatch(asyncDbCreateAction('team', data, MAPPINGS)),
    updateTeam: data => store.dispatch(asyncDbUpdateAction('team', data, MAPPINGS)),
};