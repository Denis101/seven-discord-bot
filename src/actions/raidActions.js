const { transaction, getInsertQuery, getUpdateQuery, getSelectQuery } = require('../transaction.js');
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
        default:
            return key;
    }
};

const initFunc = async dispatch => {
    const res = await transaction({ sql: 'SELECT * FROM raids' });
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
    return asyncAction(async raid => {
        await transaction(getInsertQuery('raids', raid, mapKeyToDb));
        const res = transaction(
            getSelectQuery('raids', ['id'])
                .withSimpleWhereClause({ name: raid.name }, mapKeyToDb));
        return {
            ...raid,
            id: res.rows[0].id,
        };
    }, 'RAID_CREATE', raid);
};

const updateRaidFunc = raid => {
    return asyncAction(async raid => {
        const raidCopy = { ...raid };
        delete raidCopy['id'];
        await transaction(
            `${getUpdateQuery('raids', raidCopy, mapKeyToDb)} WHERE id = \$${Object.keys(raidCopy).length}`,
            [ ...Object.values(raidCopy).filter(v => !!v), raid.id ]);
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