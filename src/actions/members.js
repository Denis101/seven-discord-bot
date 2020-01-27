const store = require('../store');

module.exports = {
    createAlt(id, info) {
        store.dispatch({
            type: 'CHARACTER_UPDATE'
        });
    },
};