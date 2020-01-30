const { transaction, executeQuery, getInsertQuery, getUpdateQuery, getSelectQuery } = require('../transaction.js');

const wrap = fn => {
    return dispatch => fn(dispatch).catch(error => dispatch({ type: 'ERROR_SET', error }));
};

const asyncAction = (action, actionId, data) => {
    return async dispatch => {
        console.log(`dispatching ${actionId.toUpperCase()}_REQUEST`);
        dispatch({ type: `${actionId.toUpperCase()}_REQUEST`, data });

        let newData = null;
        try {
            newData = await action(data);
        }
        catch (e) {
            console.log(`dispatching ${actionId.toUpperCase()}_FAILED`);
            dispatch({ type: `${actionId.toUpperCase()}_FAILED`, data });
            dispatch({ type: 'ERROR_SET', error: e });
            return;
        }

        console.log(`dispatching ${actionId.toUpperCase()}_COMPLETE`);
        dispatch({ type: `${actionId.toUpperCase()}_COMPLETE`, data: newData ? newData : data });
    };
};

const asyncDbInitAction = (type, mappings) => {
    return asyncAction(async () => {
        return await transaction(getSelectQuery(`${type}s`, [], mappings), mappings);
    }, `${type.toUpperCase()}_INIT`);
}

const asyncDbCreateAction = (type, data, mappings) => {
    return asyncAction(async data => {
        const res = await transaction(async () => {
            await executeQuery(getInsertQuery(`${type}s`, data, mappings));

            return await executeQuery(
                getSelectQuery(`${type}s`, ['id'])
                    .withSimpleWhereClause({ slug: data.slug }));
        },);

        return {
            ...data,
            id: res[0].id,
        };
    }, `${type.toUpperCase()}_CREATE`, data);
};

const asyncDbUpdateAction = (type, data, mappings) => {
    return asyncAction(async data => {
        const dataCopy = {
            ...data,
        };

        delete dataCopy['id'];
        return await transaction(
            getUpdateQuery(`${type}s`, dataCopy, mappings)
                .withSimpleWhereClause({ slug: data.slug }, mappings), mappings);
    }, `${type.toUpperCase()}_UPDATE`, data);
}

module.exports = {
    wrap,
    asyncAction: (action, actionId, data) => wrap(asyncAction(action, actionId, data)),
    asyncDbInitAction: (type, mappings) => asyncDbInitAction(type, mappings),
    asyncDbCreateAction: (type, data, mappings) => wrap(asyncDbCreateAction(type, data, mappings)),
    asyncDbUpdateAction: (type, data, mappings) => wrap(asyncDbUpdateAction(type, data, mappings)),
};