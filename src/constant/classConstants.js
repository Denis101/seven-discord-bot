const CLASS_MAP = {
    'Warlock': {
        rangedDps: true,
        meleeDps: false,
        healer: false,
        tank: false,
        emoji: '😈',
        text: ':smiling_imp:',
    },
    'Priest': {
        rangedDps: true,
        meleeDps: false,
        healer: true,
        tank: false,
        emoji: '😇',
        text: ':innocent:',
    },
    'Mage': {
        rangedDps: true,
        meleeDps: false,
        healer: false,
        tank: false,
        emoji: '🥛',
        text: ':milk:',
    },
    'Warrior': {
        rangedDps: true,
        meleeDps: true,
        healer: false,
        tank: true,
        emoji: '⚔️',
        text: ':crossed_swords:',
    },
    'Paladin': {
        rangedDps: false,
        meleeDps: true,
        healer: true,
        tank: true,
        emoji: '🔦',
        text: ':flashlight:',
    },
    'Druid': {
        rangedDps: true,
        meleeDps: true,
        healer: true,
        tank: true,
        emoji: '😺',
        text: ':smiley_cat:',
    },
    'Hunter': {
        rangedDps: true,
        meleeDps: false,
        healer: false,
        tank: false,
        emoji: '🏹',
        text: ':bow_and_arrow:',
    },
    'Rogue': {
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
};