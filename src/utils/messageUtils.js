const { RichEmbed } = require('discord.js');

const createHelpMessage = help => {
    const embed = new RichEmbed()
                    .setTitle(help.title)
                    .setDescription(help.description)
                    .setColor(0x000000);

    if (help.fields && help.fields.length > 0) {
        help.fields.forEach(f => {
            embed.addField(f.title, f.description, f.inline || false);
        });
    }

    return embed;
}

const createErrorEmbed = e => {
    return new RichEmbed()
        .setTitle(e.title)
        .setDescription(e.description)
        .setFooter('Send details of this message to Disgust so he can fix me up')
        .setColor(0xFF0000);
}

module.exports = {
    createHelpMessage,
    createErrorEmbed,
};