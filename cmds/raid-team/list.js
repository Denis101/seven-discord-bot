const { message, teams } = require('../../selectors');

module.exports = {
    handler: () => message().channel.send(teams()),
};