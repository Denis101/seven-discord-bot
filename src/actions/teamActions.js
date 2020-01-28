const { transaction } = require('../transaction.js');
const { store } = require('../store');
const { wrap } = require('../utils/actionUtils.js');

const initFunc = async dispatch => {
    const res = await transaction({ sql: 'SELECT * FROM teams' });
    dispatch({
        type: 'TEAMS_INIT_COMPLETE',
        teams: res.rows.map(r => r.display_name),
    });
};

module.exports = {
    init: () => store.dispatch(wrap(initFunc)),
    addTeam: team => store.dispatch({
        type: 'TEAM_ADD',
        team,
    }),
};