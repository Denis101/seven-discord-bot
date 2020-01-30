const { store } = require('../store');
const { wrap, asyncAction, asyncDbInitAction, asyncDbCreateAction, asyncDbUpdateAction } = require('../utils/actionUtils.js');

const MAPPINGS = {
    instance: 'instance_id',
    team: 'team_id',
    name: 'display_name',
    frequencyDays: 'frequency_days',
    frequencyWeeks: 'frequency_weeks',
};

const markRaidCompleteFunc = raid => {
    return asyncAction(async raid => {

    });
};

module.exports = {
    init: () => store.dispatch(asyncDbInitAction('raid', MAPPINGS)),
    createRaid: data => store.dispatch(asyncDbCreateAction('raid', data, MAPPINGS)),
    updateRaid: data => store.dispatch(asyncDbUpdateAction('raid', data, MAPPINGS)),
    markRaidComplete: data => store.dispatch(wrap(markRaidCompleteFunc(data))),
};