
const { CLASS_EMOJI_MAP } = require('../constant/classConstants.js');
const ROLE_MAP = require('../constant/roleConstants.js');
const YES_NO_MAP = require('../constant/yesNoConstants.js');
const { CHARACTER_MAPPINGS } = require('../constant/dbConstants.js');

const { store } = require('../store');
const { guild, team, characters, characterByUserId } = require('../selectors');

const { getNickname } = require('../utils/userUtils.js');
const { objectKey } = require('../utils/arrayUtils.js');

const { asyncDbAction, asyncDbInitAction } = require('../services/actionService.js');
const { executeQuery, getInsertQuery, getUpdateQuery } = require('../services/dbService.js');

const mapCharFlags = (char, emoji) => {
    let value = objectKey(CLASS_EMOJI_MAP, emoji);
    if (value) {
        char = {
            ...char,
            class: value.name,
        };
    }

    value = objectKey(ROLE_MAP, emoji);
    if (value) {
        char = {
            ...char,
            isHealer: value === 'healer',
            isTank: value === 'tank',
        };
    }

    value = objectKey(YES_NO_MAP, emoji);
    if (value) {
        char = {
            ...char,
            isMain: value === 'yes',
        };
    }

    return char;
}

const unsetCharFlags = (char, emoji) => {
    let value = objectKey(CLASS_EMOJI_MAP, emoji);
    if (value) {
        char = {
            ...char,
            class: null,
        };
    }

    value = objectKey(ROLE_MAP, emoji);
    if (value) {
        char = {
            ...char,
            isHealer: value === 'healer' ? null : char.isHealer,
            isTank: value === 'tank' ? null : char.isTank,
        };
    }

    value = objectKey(YES_NO_MAP, emoji);
    if (value) {
        char = {
            ...char,
            isMain: value === 'yes' ? false : char.isMain,
        };
    }

    return char;
}

const mapExisting = (teamSlug, emoji, member) => {
    const namePending = !getNickname(member);
    return mapCharFlags({ 
        ...characterByUserId(member.user.id),
        team: team(teamSlug).id,
        name: getNickname(member),
        namePending,
    }, emoji);
};

const updateExisting = async chars => {
    await chars.forEach(async c => {
        const query = getUpdateQuery('characters', c, CHARACTER_MAPPINGS)
            .where({ user_id: c.userId });

        await executeQuery(query, CHARACTER_MAPPINGS);
    });

    return chars;
}

const mapNew = (teamSlug, emoji, member) => {
    const namePending = !getNickname(member);
    return mapCharFlags({ 
        userId: member.user.id,
        team: team(teamSlug).id,
        name: getNickname(member),
        namePending,
    }, emoji);
};

const insertNew = async chars => {
    await chars.forEach(async c => {
        await executeQuery(getInsertQuery('characters', c, CHARACTER_MAPPINGS));
    });

    return chars;
};

const setter = (teamSlug, emoji, users) => {
    return asyncDbAction(async () => {
        const existingUsers = users.filter(u => Object.values(characters()).find(c => c.userId === u.id))
            .map(u => guild().members.get(u.id));
        const newUsers = users.filter(u => !existingUsers.find(eu => eu.user.id === u.id))
            .map(u => guild().members.get(u.id));

        await updateExisting(existingUsers.map(u => mapExisting(teamSlug, emoji, u, mapCharFlags)));
        await insertNew(newUsers.map(u => mapNew(teamSlug, emoji, u)));
    }, 'character', 'set');
};

const unsetter = (teamSlug, emoji, users) => {
    return asyncDbAction(async () => {
        const existingUsers = users.filter(u => Object.values(characters()).find(c => c.userId === u.id))
            .map(u => guild().members.get(u.id));
        
        if (!existingUsers || existingUsers.length < 1) {
            return;
        }

        await updateExisting(existingUsers.map(u => mapExisting(teamSlug, emoji, u, unsetCharFlags)));
    }, 'character', 'unset');
};

module.exports = {
    init: () => store.dispatch(asyncDbInitAction('character', CHARACTER_MAPPINGS)),
    setCharacters: (teamSlug, emoji, users) => store.dispatch(setter(teamSlug, emoji, users)),
    unsetCharacters: (teamSlug, emoji, users) => store.dispatch(unsetter(teamSlug, emoji, users)),
};