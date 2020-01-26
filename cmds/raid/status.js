const { RichEmbed } = require('discord.js');
const State = require('../../state.js');

const ROLE_MSGS = {
    "Raid Leader": "Mega Rat, sign up for raid pls.",
    "Raider": "Big Rat, sign up for raid pls.",
    "Trial Raider": "Baby Rat, sign up for raid pls.",
};

const hasRole = (member, name) => {
    return member.roles.map(r => r.name).includes(name);
};

const getRaidRole = member => {
    const keys = Object.keys(ROLE_MSGS).filter(role => (member.roles.map(r => r.name) || []).includes(role));
    if (!keys || keys.length === 0) {
        return null;
    }

    return keys[0];
};

module.exports = () => {
    const warlocks = [];
    const priests = [];
    const mages = [];

    State.getClient().guilds.forEach(g => {
        g.members.forEach(m => {
            const raidRole = getRaidRole(m);
            if (raidRole === null) {
                return;
            }

            if (hasRole(m, 'Warlock')) {
                warlocks.push(m.nickname + ' - ' + raidRole);
            }

            if (hasRole(m, 'Priest')) {
                priests.push(m.nickname + ' - ' + raidRole);
            }

            if (hasRole(m, 'Mage')) {
                mages.push(m.nickname + ' - ' + raidRole);
            }
        });
    });

    console.log(warlocks, priests, mages);

    State.getMessage().channel.send(new RichEmbed()
        .setTitle('RAID STATUS')
        .setColor(0xFF0000)
        .addField('Warlocks', warlocks.join('\n'))
        .addField('Priests', priests.join('\n'))
        .addField('Mages', mages.join('\n')));
};