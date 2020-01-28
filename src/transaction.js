const { dbClient } = require('./selectors');

const getParamIndex = i => {
    return `$${i+1}`;
};

const getSelectQuery = (table, keys, keyMapper = k => k) => {
    return `SELECT ${keys.map(keyMapper).join(',')} FROM ${table}`;
};

const getInsertQuery = (table, obj, keyMapper = k => k) => {
    const keys = Object.keys(obj).filter(k => !!obj[k]).map(keyMapper);
    const values = keys.map(k => obj[k]);
    return `INSERT INTO ${table} (${keys.join(',')}) VALUES (${values.map((_, i) => getParamIndex(i)).join(',')})`;
};

const getUpdateQuery = (table, obj, keyMapper = k => k) => {
    const keys = Object.keys(obj).filter(k => !!obj[k]).map(keyMapper);
    return `UPDATE ${table} SET ${keys.map((k, i) => `${k} = ${getParamIndex(i)}`).join(',')}`;
};

const transaction = async (sql, values) => {
    if (!dbClient()) {
        throw 'No open db connection';
    }

    let res = null;

    try {
        await dbClient().query('BEGIN');
        if (values) {
            res = await dbClient().query(sql, values);
        }
        else {
            res = await dbClient().query(sql);
        }

        await dbClient().query('COMMIT');
    }
    catch (e) {
        console.error(e);
        await dbClient().query('ROLLBACK');  
        throw e;  
    }

    return res;
};

module.exports = {
    getSelectQuery,
    getInsertQuery,
    getUpdateQuery,
    transaction,
};