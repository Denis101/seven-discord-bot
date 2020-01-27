const { message } = require('../../selectors');

module.exports = {
    name: 'remove',
    handler: () => {
        message().channel.send('Not yet implemented.');
    },
};