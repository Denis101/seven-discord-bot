const convertToObject = (values, keySelector) => {
    const result = {};
    for (let i = 0; i < values.length; i++) {
        result[keySelector(values[i])] = values[i];
    }
    return result;
};

module.exports = {
    convertToObject,
};