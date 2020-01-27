
const { message } = require('../selectors');

module.exports = {
    directory: __dirname + '/raid-team',
    handler: (args, next) => {
        if (args.length < 1) {
            message().channel.send('Missing subcommand for raid-team command');
            return;
        }

        next.execute();
    }
}