const { createTransaction } = require('../transaction.js');
const store = require('../store');

const wrap = fn => dispatch => fn(dispatch).catch(error => dispatch({ type: 'ERROR', error }));

const createRaidFunc = async raid => {
    return async dispatch => {
        let rowsSql = 'display_name';
        let values = [name];

        if (day) {
            rowsSql += ', day';
            values.push(day);
        }

        if (time) {
            rowsSql += ', time';
            values.push(time);
        }

        let valuesSql = '';
        for (let i = 0; i < values.length; i++) {
            valuesSql += `$${i+1}${values.length > 1 && i == values.length - 1 ? ',' : ''}`;
        }

        try {
            await createTransaction(`INSERT INTO raids (${rowsSql}) VALUES (${valuesSql})`, values);
        }
        catch (e) {
            throw e;
        }

        dispatch({
            type: 'RAID_CREATE',
            name: raid.name,
            raid,
        });
    };
};

module.exports = {
    createRaid: async raid => store.dispatch(wrap(createRaidFunc(raid))),
    updateRaid: (name, raid) => store.dispatch({
        type: 'RAID_UPDATE',
        name,
        raid,
    }),
    removeRaid: name => store.dispatch({
        type: 'RAID_REMOVE',
        name,
    }),
};