const { guild, message } = require('../selectors');

// Super secret command :)
module.exports = {
    help: {
        title: '2019 Guy',
        description: 'Hello, hi, I\'m a 2019 guy.'
    },
    handler: () => {
        const chan = guild().channels.find(c => c.name === "Just Chatting");
        if (!chan.joinable) {
            message().channel.send('I don\'t have permissions to join the voice channel :(');
        }

        chan.join().then(() => {
            message().channel.send('-play https://www.youtube.com/watch?v=4SiiRx7GDzI'); 
        }).catch(e => {
            console.error(e);
        });
    },
};