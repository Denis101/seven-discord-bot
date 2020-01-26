
const fs = require('fs');
const State = require('../state.js');

module.exports = {
    name: 'raid-team',
    directory: __dirname + '/raid-team',
    handler: (args, next) => {
        if (args.length < 1) {
            State.getMessage().channel.send('Missing subcommand for raid-team command');
            return;
        }

        next();
    }
}