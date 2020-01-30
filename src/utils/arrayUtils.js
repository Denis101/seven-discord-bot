const convertToObject = (values, keySelector) => {
    values = values.filter(v => !!v);
    const result = {};
    for (let i = 0; i < values.length; i++) {
        result[keySelector(values[i])] = values[i];
    }

    return result;
};

const invert = data => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const result = {};
    values.forEach((v, i) => {
        result[v] = keys[i];
    });
    return result;
};

const remapKeys = (data, mappings) => {
    const result = {};
    Object.keys(data).forEach(k => {
        const nk = mappings[k];
        result[nk || k] = data[k];
    });
    return result;
};

module.exports = {
    convertToObject,
    invert,
    remapKeys,
};