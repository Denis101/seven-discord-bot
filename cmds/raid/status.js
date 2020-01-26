const { RichEmbed } = require('discord.js');
const State = require('../../state.js');

const ROLE_MSGS = {
    "Raid Leader": "Mega Rat, sign up for raid pls.",
    "Raider": "Big Rat, sign up for raid pls.",
    "Trial Raider": "Baby Rat, sign up for raid pls.",
};

const CLASS_MAP = {
    'Warlock': [],
    'Priest': [],
    'Mage': [],
    'Warrior': [],
    'Paladin': [],
    'Druid': [],
    'Hunter': [],
    'Rogue': []
}

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
    const msg = new RichEmbed()
        .setTitle('RAID STATUS')
        .setColor(0x0000FF);

    const g = State.getMessage().guild;
    g.members.forEach(m => {
        const nickname = m.nickname || m.user.username;
        const raidRole = getRaidRole(m);
        if (raidRole === null) {
            return;
        }

        Object.keys(CLASS_MAP).filter(cls => hasRole(m, cls)).forEach(cls => {
            CLASS_MAP[cls].push(nickname + ' - ' + raidRole);
        });
    });

    Object.keys(CLASS_MAP).forEach(cls => {
        if (CLASS_MAP[cls].length > 0) {
            msg.addField(`${cls}(s) [${CLASS_MAP[cls].length}]`, CLASS_MAP[cls].join('\n'));
        }
    });

    State.getMessage().channel.send(msg);
};