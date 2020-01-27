const { message } = require('../../selectors');
const { getRaidRole, getRaidRoleMessage } = require('../../roleUtils.js');

module.exports = {
    handler: () => {
        const g = message().guild;
        g.members.filter(m => getRaidRole(m) !== null)
            .forEach(m => m.send(getRaidRoleMessage(m)));
    },
};