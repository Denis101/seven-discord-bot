const wrap = fn => {
    return dispatch => fn(dispatch).catch(error => dispatch({ type: 'ERROR', error }));
};

const asyncAction = (action, actionId, data) => {
    return async dispatch => {
        const requestAction = 
        requestAction[dataKey] = data;
        dispatch({ type: `${actionId}_REQUEST`, data });

        let newData = null;
        try {
            newData = await action(data);
        }
        catch (e) {
            dispatch({ type: `${actionId}_FAILED`, data, error: e });
            throw e;
        }

        dispatch({ type: `${actionId}_COMPLETE`, data: newData ? newData : data });
    };
};

module.exports = {
    wrap,
    asyncAction,
};