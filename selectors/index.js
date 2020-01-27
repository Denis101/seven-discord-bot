const store = require('../store.js');

module.exports = {
    message: () => store.getState().message,
    client: () => store.getState().client,
    guild: () => this.message().guild,
};