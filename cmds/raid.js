
const fs = require('fs');
const { message } = require('../selectors');

module.exports = {
    directory: __dirname + '/raid',
    handler: (args, next) => {
        if (args.length < 1) {
            message().channel.send('Missing subcommand for raid command');
            return;
        }

        next.execute();
    }
};