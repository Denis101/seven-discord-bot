const { message } = require('../../selectors');

module.exports = {
    handler: args => {
        if (!args[0]) {
            message().channel.send(`
            Invalid value provided for name field in raid create command.

            example usage:
            @Seven raid create molten-core tuesday 1pm
            @Seven raid create onxyia
            `);
        }

        // store.dispatch({

        // });
    }
}