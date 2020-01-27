const { message } = require('../selectors');

// Super secret command :)
module.exports = {
    help: {
        title: 'Ranker babies',
        description: 'Slipry is your god now.'
    },
    handler: () => {
        message().channel.send(new RichEmbed()
            .setImage("https://media.discordapp.net/attachments/629386652111994940/671258544573513758/unknown.png"));
    },
};