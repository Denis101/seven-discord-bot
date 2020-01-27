const { message } = require('../../selectors');
const { guildLeader } = require('../../authenticators.js');

module.exports = {
    authenticator: guildLeader,
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