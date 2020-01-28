const { RichEmbed } = require('discord.js');

const createListEmbed = opts => {
    const embed = new RichEmbed()
                    .setTitle(opts.title)
                    .setDescription(opts.description)
                    .setColor(0x000000);

    if (opts.fields && opts.fields.length > 0) {
        opts.fields.forEach(f => {
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

const createErrorEmbed = msg => {
    return new RichEmbed()
        .setTitle('**I\'m afraid my wires got crossed**')
        .setDescription(msg)
        .setFooter('Send details of this message to Disgust so he can fix me up')
        .setColor(0xFF0000);
}

module.exports = {
    createListEmbed,
    createSuccessEmbed,
    createFailureEmbed,
    createErrorEmbed,
};