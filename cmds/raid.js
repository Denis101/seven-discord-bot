
const fs = require('fs');
const State = require('../state.js');

module.exports = args => {
    if (args.length < 1) {
        State.getMessage().channel.send('Missing subcommand for raid command');
    }

    const cmdFile = process.cwd() + '/cmds/raid/' + args[0] + '.js';
    if (!fs.existsSync(cmdFile)) {
        console.log('Failed to execute cmd', cmdFile, args);
        State.getMessage().channel.send('Sorry, I didn\'t quite catch that. Please try again with something that makes sense.');
        return;
    }

    args.shift();
    require(cmdFile)(args);
};