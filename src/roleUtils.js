const ROLE_MSGS = {
    "Raid Leader": "Mega Rat, sign up for raid pls.",
    "Raider": "Big Rat, sign up for raid pls.",
    "Trial Raider": "Baby Rat, sign up for raid pls.",
};

const hasRole = (member, name) => member.roles.map(r => r.name).includes(name);

const getRaidRole = member => {
    const keys = Object.keys(ROLE_MSGS).filter(role => (member.roles.map(r => r.name) || []).includes(role));
    if (!keys || keys.length === 0) {
        return null;
    }

    return keys[0];
};

module.exports = {
    hasRole,
    getRaidRole,
    getRaidRoleMessage: m => {
        return ROLE_MSGS[getRaidRole(m)];
    },
    getMembersInTeam: (members, team) => {
        return members.filter(m => hasRole(m, team));
    },
};