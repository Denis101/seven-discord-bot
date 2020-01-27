
const fs = require('fs');
const { message } = require('../selectors');

module.exports = {
    directory: __dirname + '/raid',
    handler: (args, next) => {
        if (args.length < 1) {
            message().channel.send(`
raid: missing subcommand

Available subcommands:
- create
- invite
- set-day
- set-time
- status
`);
            return;
        }

        next.execute();
    }
};