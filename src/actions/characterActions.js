const { transaction } = require('../transaction.js');
const { store } = require('../store');
const { wrap } = require('../utils/actionUtils.js');

const initFunc = async dispatch => {
    const res = await transaction({ sql: 'SELECT * FROM characters' });
    dispatch({
        type: 'CHARACTERS_INIT_COMPLETE',
        characters: res.rows.map(r => ({
            userId: r.user_id,
            name: r.display_name,
            class: r.class,
            isTank: r.is_tank,
            isHealer: r.is_healer,
            isMain: r.is_main,
        })),
    });
};

module.exports = {
    init: () => store.dispatch(wrap(initFunc)),
    createAlt: (id, info) => {
        store.dispatch({
            type: 'CHARACTER_UPDATE'
        });
    },
};