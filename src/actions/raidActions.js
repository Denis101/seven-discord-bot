const { createTransaction } = require('../transaction.js');
const { store } = require('../store');
const { wrap } = require('../utils/actionUtils.js');

const initFunc = async dispatch => {
    const res = await createTransaction('SELECT * FROM raids');
    dispatch({
        type: 'RAIDS_INIT_COMPLETE',
        raids: res.rows.map(r => ({
            name: r.display_name,
            description: r.description,
            day: r.day,
            time: r.time,
        })),
    });
};

const createRaidFunc = raid => {
    return async dispatch => {
        dispatch({
            type: 'RAID_CREATE_REQUEST',
            name: raid.name,
        });

        try {
            let rowsSql = 'display_name';
            let values = [raid.name];
    
            if (raid.day) {
                rowsSql += ', day';
                values.push(raid.day);
            }
    
            if (raid.time) {
                rowsSql += ', time';
                values.push(raid.time);
            }
    
            let valuesSql = '';
            for (let i = 0; i < values.length; i++) {
                valuesSql += `$${i+1}${values.length > 1 && i == values.length - 1 ? ',' : ''}`;
            }

            await createTransaction(`INSERT INTO raids (${rowsSql}) VALUES (${valuesSql})`, values);
        }
        catch (e) {
            dispatch({
                type: 'RAID_CREATE_FAILED',
                name: raid.name,
                raid,
            });

            throw e;
        }

        dispatch({
            type: 'RAID_CREATE_COMPLETE',
            name: raid.name,
            raid,
        });
    };
};

module.exports = {
    init: () => store.dispatch(wrap(initFunc)),
    createRaid: raid => store.dispatch(wrap(createRaidFunc(raid))),
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