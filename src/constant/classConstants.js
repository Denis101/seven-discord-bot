const { switchKey } = require('../utils/arrayUtils.js');

const CLASS_MAP = {
    'Warlock': {
        name: 'Warlock',
        rangedDps: true,
        meleeDps: false,
        healer: false,
        tank: false,
        emoji: '😈',
        text: ':smiling_imp:',
    },
    'Priest': {
        rangedDps: true,
        name: 'Priest',
        meleeDps: false,
        healer: true,
        tank: false,
        emoji: '😇',
        text: ':innocent:',
    },
    'Mage': {
        name: 'Mage',
        rangedDps: true,
        meleeDps: false,
        healer: false,
        tank: false,
        emoji: '🥛',
        text: ':milk:',
    },
    'Warrior': {
        name: 'Warrior',
        rangedDps: true,
        meleeDps: true,
        healer: false,
        tank: true,
        emoji: '⚔️',
        text: ':crossed_swords:',
    },
    'Paladin': {
        name: 'Paladin',
        rangedDps: false,
        meleeDps: true,
        healer: true,
        tank: true,
        emoji: '🔦',
        text: ':flashlight:',
    },
    'Druid': {
        name: 'Druid',
        rangedDps: true,
        meleeDps: true,
        healer: true,
        tank: true,
        emoji: '😺',
        text: ':smiley_cat:',
    },
    'Hunter': {
        name: 'Hunter',
        rangedDps: true,
        meleeDps: false,
        healer: false,
        tank: false,
        emoji: '🏹',
        text: ':bow_and_arrow:',
    },
    'Rogue': {
        name: 'Rogue',
        rangedDps: false,
        meleeDps: true,
        healer: false,
        tank: false,
        emoji: '🗡',
        text: ':dagger:',
    },
};

module.exports = {
    CLASSES: Object.keys(CLASS_MAP),
    RANGED_DPS: Object.keys(CLASS_MAP).filter(k => CLASS_MAP[k].rangedDps),
    MELEE_DPS: Object.keys(CLASS_MAP).filter(k => CLASS_MAP[k].meleeDps),
    HEALERS: Object.keys(CLASS_MAP).filter(k => CLASS_MAP[k].healer),
    TANKS: Object.keys(CLASS_MAP).filter(k => CLASS_MAP[k].tank),
    CLASS_MAP,
    CLASS_EMOJI_MAP: switchKey(CLASS_MAP, o => o.emoji),
};