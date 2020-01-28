const moment = require('moment');
const { transaction, executeQuery, getInsertQuery, getUpdateQuery, getSelectQuery } = require('../transaction.js');
const { store } = require('../store');
const { wrap, asyncAction } = require('../utils/actionUtils.js');

const mapKeyToDb = key => {
    switch (key) {
        case 'instance':
            return 'instance_id';
        case 'team':
            return 'team_id';
        case 'name':
            return 'display_name';
        case 'createDate':
            return 'create_date';
        case 'modifiedDate':
            return 'modified_date';
        default:
            return key;
    }
};

const initFunc = async dispatch => {
    const res = await transaction({ sql: 'SELECT * FROM raids' });
    dispatch({
        type: 'RAIDS_INIT_COMPLETE',
        data: res.rows.map(r => ({
            id: r.id,
            name: r.display_name,
            description: r.description,
            day: r.day,
            time: r.time,
        })),
    });
};

const createRaidFunc = raid => {
    return asyncAction(async raid => {
        const res = await transaction(async () => {
            await executeQuery(getInsertQuery('raids', {
                ...raid,
                createDate: moment().unix(),
            }, mapKeyToDb));

            return await executeQuery(
                getSelectQuery('raids', ['id'])
                    .withSimpleWhereClause({ name: raid.name }, mapKeyToDb));
        });

        return {
            ...raid,
            id: res.rows[0].id,
        };
    }, 'RAID_CREATE', raid);
};

const updateRaidFunc = raid => {
    return asyncAction(async raid => {
        const raidCopy = { 
            ...raid,
            modifiedDate: moment().unix(),
        };

        delete raidCopy['id'];
        await transaction(
            getUpdateQuery('raids', raidCopy, mapKeyToDb)
                .withSimpleWhereClause({ name: raid.name }, mapKeyToDb));
    }, 'RAID_UPDATE', raid);
};

module.exports = {
    init: () => store.dispatch(wrap(initFunc)),
    createRaid: raid => store.dispatch(wrap(createRaidFunc(raid))),
    updateRaid: raid => store.dispatch(wrap(updateRaidFunc(raid))),
    removeRaid: name => store.dispatch({
        type: 'RAID_REMOVE',
        name,
    }),
};