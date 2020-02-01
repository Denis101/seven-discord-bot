const { guild } = require('../selectors');

// ADMINISTRATOR (implicitly has all permissions, and bypasses all channel overwrites)
// CREATE_INSTANT_INVITE (create invitations to the guild)
// KICK_MEMBERS
// BAN_MEMBERS
// MANAGE_CHANNELS (edit and reorder channels)
// MANAGE_GUILD (edit the guild information, region, etc.)
// ADD_REACTIONS (add new reactions to messages)
// VIEW_AUDIT_LOG
// PRIORITY_SPEAKER
// VIEW_CHANNEL
// READ_MESSAGES (deprecated)
// SEND_MESSAGES
// SEND_TTS_MESSAGES
// MANAGE_MESSAGES (delete messages and reactions)
// EMBED_LINKS (links posted will have a preview embedded)
// ATTACH_FILES
// READ_MESSAGE_HISTORY (view messages that were posted prior to opening Discord)
// MENTION_EVERYONE
// USE_EXTERNAL_EMOJIS (use emojis from different guilds)
// EXTERNAL_EMOJIS (deprecated)
// CONNECT (connect to a voice channel)
// SPEAK (speak in a voice channel)
// MUTE_MEMBERS (mute members across all voice channels)
// DEAFEN_MEMBERS (deafen members across all voice channels)
// MOVE_MEMBERS (move members between voice channels)
// USE_VAD (use voice activity detection)
// CHANGE_NICKNAME
// MANAGE_NICKNAMES (change other members' nicknames)
// MANAGE_ROLES
// MANAGE_ROLES_OR_PERMISSIONS (deprecated)
// MANAGE_WEBHOOKS
// MANAGE_EMOJIS

const READ_PERMS = ['VIEW_CHANNEL', 'READ_MESSAGES', 'READ_MESSAGE_HISTORY'];
const MOST_PERMS = [
    'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS'
];

const getRolePermissions = name => {
    switch (name) {
        case 'Guild Leader':
        case 'Raid Leader':
        case 'Role Officer':
        case 'Officer':
            return {
                deny: [],
                allow: [...READ_PERMS, ...MOST_PERMS],
            }
        case 'Raider':
        case 'Trial Raider':
        default:
            return {
                deny: MOST_PERMS,
                allow: READ_PERMS,
            };
    }
};

const createRoleChannel = async name => {
    const perms = guild().roles.map(r => {
        const perms = getRolePermissions(r);
        return {
            type: 'role',
            id: r.id,
            deny: perms.deny,
            allow: perms.allow,
        };
    });

    const channel = await guild().createChannel(name, { type: 'text' }, [
        {
            id: guild().defaultRole.id,
            deny: [...READ_PERMS, ...MOST_PERMS],
        },
        ...perms,
    ]);

    channel.setParent(guild().channels.find(c => c.name.toLowerCase() === 'read this stuff'));
    return channel;
};

module.exports = {
    createRoleChannel
};