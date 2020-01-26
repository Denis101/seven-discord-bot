const State = require('../../state.js');
const { getRaidRole, getRaidRoleMessage } = require('../../roleUtils.js');

module.exports = {
    handler: () => {
        const g = State.getMessage().guild;
        g.members.filter(m => getRaidRole(m) !== null)
            .forEach(m => m.send(getRaidRoleMessage(m)));
    },
};