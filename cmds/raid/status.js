const { RichEmbed } = require('discord.js');
const { guild, message } = require('../../selectors');
const { hasRole, getRaidRole, getTeam } = require('../../roleUtils.js');

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

module.exports = {
    help: {
        title: '@Laty raid status <name>',
        description: 'Command to print the status of all raiders for a given raid.',
        fields: [
            {
                title: 'Example',
                description: '@Laty raid status molten-core',
            },
        ],
    },
    handler: args => {
        const msg = new RichEmbed()
            .setTitle('RAID STATUS')
            .setTimestamp()
            .setColor(0x0000FF);

        let team = [];
        if (args[0]) {
            msg.setTitle('RAID STATUS - ' + args[0]);
            team = getTeam(g.members, team);
        } else {
            team = guild().members;
        }
        
        guild().members.forEach(m => {
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
                msg.addField(`${EMOJI_MAP[cls]} ${cls}(s) [${CLASS_MAP[cls].length}]`, CLASS_MAP[cls].join('\n'));
            }
        });

        message().channel.send(msg);
    },
};