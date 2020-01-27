const { RichEmbed } = require('discord.js');

const createHelpEmbed = help => {
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

const createSuccessEmbed = msg => {
    return new RichEmbed()
        .setTitle('**Work complete**')
        .setDescription(msg)
        .setColor(0x00FF00);
}

const createFailureEmbed = msg => {
    return new RichEmbed()
        .setTitle('**Houston, we have a problem**')
        .setDescription(msg)
        .setColor(0xFF0000);
}

const createErrorEmbed = e => {
    return new RichEmbed()
        .setTitle(e.title)
        .setDescription(e.description)
        .setFooter('Send details of this message to Disgust so he can fix me up')
        .setColor(0xFF0000);
}

module.exports = {
    createHelpEmbed,
    createSuccessEmbed,
    createFailureEmbed,
    createErrorEmbed,
};