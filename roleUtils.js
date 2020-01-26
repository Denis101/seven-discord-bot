const ROLE_MSGS = {
    "Raid Leader": "Mega Rat, sign up for raid pls.",
    "Raider": "Big Rat, sign up for raid pls.",
    "Trial Raider": "Baby Rat, sign up for raid pls.",
};

module.exports = {
    hasRole: (member, name) => {
        return member.roles.map(r => r.name).includes(name);
    },
    getRaidRole: member => {
        const keys = Object.keys(ROLE_MSGS).filter(role => (member.roles.map(r => r.name) || []).includes(role));
        if (!keys || keys.length === 0) {
            return null;
        }
    
        return keys[0];
    },
    getRaidRoleMessage: member => {
        return ROLE_MSGS[getRaidRole(m)];
    },
    getTeam:(members, team) => {
        return members.filter(m => hasRole(m, team));
    },
};