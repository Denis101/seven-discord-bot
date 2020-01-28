const wrap = fn => {
    return dispatch => fn(dispatch).catch(error => dispatch({ type: 'ERROR', error }));
};

module.exports = {
    wrap,
};