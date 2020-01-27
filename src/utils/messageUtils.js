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

module.exports = {
    createHelpMessage,
};