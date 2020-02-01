const { TEAM_MAPPINGS } = require('../constant/dbConstants.js');
const { store } = require('../store');
const { asyncDbInitAction, asyncDbCreateAction, asyncDbUpdateAction } = require('../services/actionService.js');

module.exports = {
    init: () => store.dispatch(asyncDbInitAction('team', TEAM_MAPPINGS)),
    createTeam: data => store.dispatch(asyncDbCreateAction('team', data, TEAM_MAPPINGS)),
    updateTeam: data => store.dispatch(asyncDbUpdateAction('team', data, TEAM_MAPPINGS)),
};