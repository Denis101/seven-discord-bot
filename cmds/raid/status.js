const { RichEmbed } = require('discord.js');
const State = require('../../state.js');
const table = require('table');

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

const EMOJI_MAP = {
    'Warlock': ':smiling_imp:',
    'Priest': ':innocent:',
    'Mage': ':milk:',
    'Warrior': ':crossed_swords:',
    'Paladin': ':flashlight:',
    'Druid': ':cat:',
    'Hunter': ':bow_and_arrow:',
    'Rogue': ':dagger:'
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

const getTeam = (members, team) => {
    return members.filter(m => hasRole(m, team));
}

module.exports = args => {
    const msg = new RichEmbed()
        .setTitle('RAID STATUS')
        .setTimestamp()
        .setColor(0x0000FF);

    const g = State.getMessage().guild;

    let team = [];
    if (args[0]) {
        msg.setTitle('RAID STATUS - ' + args[0]);
        team = getTeam(g.members, team);
    } else {
        team = g.members;
    }
    

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

    // Object.keys(CLASS_MAP).forEach(cls => {
    //     if (CLASS_MAP[cls].length > 0) {
    //         msg.addField(`${EMOJI_MAP[cls]} ${cls}(s) [${CLASS_MAP[cls].length}]`, CLASS_MAP[cls].join('\n'));
    //     }
    // });

    let raiderArray = [
        Object.keys(CLASS_MAP),
        ...Object.values(CLASS_MAP),
    ];

    raiderArray = raiderArray[0].map((col, i) => raiderArray.map(row => row[i]));
    msg.addField('Raiders', table(raiderArray));
    State.getMessage().channel.send(msg);
};