const { guild, channel } = require('../selectors');

// Super secret command :)
module.exports = {
    help: {
        title: '2019 Guy',
        description: 'Hello, hi, I\'m a 2019 guy.'
    },
    handler: async () => {
        const voiceChannel = guild().channels.find(c => c.name === "Just Chatting");
        if (!voiceChannel.joinable) {
            channel().send('I don\'t have permissions to join the voice channel :(');
        }

        await voiceChannel.join();
        channel().channel.send('-play https://www.youtube.com/watch?v=4SiiRx7GDzI');
    },
};