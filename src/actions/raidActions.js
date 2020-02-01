const { RAID_MAPPINGS } = require('../constant/dbConstants.js');
const { store } = require('../store');
const { wrap, asyncAction, asyncDbInitAction, asyncDbCreateAction, asyncDbUpdateAction } = require('../services/actionService.js');

const markRaidCompleteFunc = raid => {
    return asyncAction(async raid => {

    });
};

module.exports = {
    init: () => store.dispatch(asyncDbInitAction('raid', RAID_MAPPINGS)),
    createRaid: data => store.dispatch(asyncDbCreateAction('raid', data, RAID_MAPPINGS)),
    updateRaid: data => store.dispatch(asyncDbUpdateAction('raid', data, RAID_MAPPINGS)),
    markRaidComplete: data => store.dispatch(wrap(markRaidCompleteFunc(data))),
};