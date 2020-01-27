const store = require('../store.js');

module.exports = {
    createAlt(id, info) {
        store.dispatch({
            type: 'CHARACTER_UPDATE'
        });
    },
};