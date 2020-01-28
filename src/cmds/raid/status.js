const { RichEmbed } = require('discord.js');
const { createFailureEmbed } = require('../../utils/messageUtils.js');
const { guild, channel, raid, nextRaid } = require('../../selectors');
const { hasRole, getRaidRole, getMembersInTeam } = require('../../utils/roleUtils.js');
const { getNickname } = require('../../utils/userUtils.js');

const RANGED_DPS = [
    'Warlock',
    'Mage',
    'Hunter',
    'Druid',
    'Priest',
];

const MELEE_DPS = [
    'Warrior',
    'Rogue',
    'Paladin',
]

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
        const name = args[0];
        const currentRaid = name ? raid(name) : nextRaid();
        if (!currentRaid) {
            channel().send(createFailureEmbed('No raids configured. Create raid with `@Laty raid create <name>`'));
            return;
        }

        let team = getMembersInTeam(guild().members, currentRaid.team);

        const msg = new RichEmbed().setColor(0x000000)
            .setTitle(`**${currentRaid.description ? currentRaid.description : currentRaid.name}**`);

        let raidLeader = null;
        const tanks = [];
        const healers = [];
        const rangedDps = 0;
        const meleeDps = 0;
        
        team.forEach(m => {
            const nickname = getNickname(m);
            const raidRole = getRaidRole(m);
            if (raidRole === null) {
                return;
            }

            if (hasRole(m, 'Raid Leader')) {
                raidLeader = nickname;
            }

            if (hasRole(m, 'Tank')) {
                tanks.push(nickname);
            }
            else if (hasRole(m, 'Healer')) {
                healers.push(nickname);
            }
            else if (MELEE_DPS.includes(raidRole)) {
                meleeDps++;
            }
            else if (RANGED_DPS.includes(raidRole)) {
                rangedDps++;
            }

            const signUpStatus = ':red_circle:';

            Object.keys(CLASS_MAP).filter(cls => hasRole(m, cls)).forEach(cls => {
                CLASS_MAP[cls].push(`${signUpStatus}   -   ${nickname}`);
            });
        });

        msg.addField('**__Raid Leader__**', raidLeader);
        tanks.length > 0 && msg.addField(`**__Tanks__** (${tanks.length})`, tanks.join('\n'), true);
        healers.length > 0 && msg.addField(`**__Healers__** (${healers.length})`, healers.join('\n'), true);
        msg.addField(`**__DPS__**`, `**Melee**: ${meleeDps}\n**Ranged**: ${rangedDps}`, true);
        msg.addBlankField();

        Object.keys(CLASS_MAP).forEach(cls => {
            if (CLASS_MAP[cls].length > 0) {
                msg.addField(`${EMOJI_MAP[cls]} - **__${cls}__** (${CLASS_MAP[cls].length})`, CLASS_MAP[cls].join('\n'), true);
            }
        });

        channel().send(msg);
    },
};