const State = require('../../state.js');

const ROLE_MSGS = {
    "Raider": "Big Rat, sign up for raid pls.",
    "Trial Raider": "Baby Rat, sign up for raid pls.",
    "Raid Leader": "Mega Rat, sign up for raid pls.",
};

const getRaidRole = member => {
    const keys = Object.keys(ROLE_MSGS).filter(role => (member.roles.map(r => r.name) || []).includes(role));
    if (!keys || keys.length === 0) {
        return null;
    }

    return keys[0];
};

module.exports = () => {
    State.getClient().guilds.forEach(g => {
        g.members.forEach(m => {
            const raidRole = getRaidRole(m);
            if (raidRole === null) {
                return;
            }

            m.send(ROLE_MSGS[raidRole]);
        });
    });
};