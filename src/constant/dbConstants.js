const RAID_MAPPINGS = {
    instance: 'instance_id',
    team: 'team_id',
    name: 'display_name',
    frequencyDays: 'frequency_days',
    frequencyWeeks: 'frequency_weeks',
    keyGetter: data => data.slug,
};

const TEAM_MAPPINGS = {
    roleId: 'role_id',
    name: 'display_name',
    discordChannel: 'discord_channel',
    keyGetter: data => data.slug,
};

const CHARACTER_MAPPINGS = {
    userId: 'user_id',
    team: 'team_id',
    name: 'display_name',
    isTank: 'is_tank',
    isHealer: 'is_healer',
    isMain: 'is_main',
    namePending: 'name_pending',
    keyGetter: data => data.name,
};

module.exports = {
    RAID_MAPPINGS,
    TEAM_MAPPINGS,
    CHARACTER_MAPPINGS,
};