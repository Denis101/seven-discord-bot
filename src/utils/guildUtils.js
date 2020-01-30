const { guild } = require('../selectors');

const createRoleChannel = async name => {
    guild().roles.map(r => {
        return {
            id: r.id,

        }
    });

    await guild().createChannel(name, {
        type: 'text',
        category: guild().channels.find(c => c.name.toLowerCase() === 'read this stuff')
    }, {

    });
};

module.exports = {
    createRoleChannel
};