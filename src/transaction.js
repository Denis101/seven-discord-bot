const moment = require('moment');
const { dbClient } = require('./selectors');

const getParamIndex = i => {
    return `$${i+1}`;
};

const withSimpleWhereClause = (query, obj, keyMapper = k => k) => {
    const keys = Object.keys(obj).filter(k => !!obj[k]);
    const values = keys.map(k => obj[k]);
    const startIndex = query.values ? query.values.length : 0;

    return {
        sql: `${query.sql} WHERE ${keys.map((k, i) => `${keyMapper(k)} = ${getParamIndex(startIndex + i)}`).join(',')}`,
        values: query.values ? [...query.values, ...values] : values,
    };
};

const createQueryWrapper = (fn, args) => {
    const query = fn.apply(null, args);
    return {
        ...query,
        withSimpleWhereClause: (obj, mapper) => withSimpleWhereClause(query, obj, mapper),
    };
}

const getSelectQuery = (table, keys, keyMapper = k => k) => {
    const fn = (t, k, m) => ({
        sql: `SELECT ${k.map(m).join(',')} FROM ${t}`,
    });

    return createQueryWrapper(fn, [table, keys, keyMapper]);
};

const getInsertQuery = (table, obj, keyMapper = k => k) => {
    const fn = (t, o, m) => {
        const ks = Object.keys(o).filter(k => !!o[k]);
        return {
            sql: `INSERT INTO ${t} (${ks.map(m).join(',')}) VALUES (${ks.map((_, i) => getParamIndex(i)).join(',')})`,
            values: ks.map(k => o[k]),
        };
    };

    return createQueryWrapper(fn, [table, obj, keyMapper]);
};

const getUpdateQuery = (table, obj, keyMapper = k => k) => {
    const fn = (t, o, m) => {
        const ks = Object.keys(o).filter(k => !!o[k]);
        return {
            sql: `UPDATE ${t} SET ${ks.map((k, i) => `${m(k)} = ${getParamIndex(i)}`).join(',')}`,
            values: ks.map(k => o[k]),
        };
    };
    return createQueryWrapper(fn, [table, obj, keyMapper]);
};

const executeQuery = async query => {
    if (!dbClient()) {
        throw 'No open db connection';
    }
    
    return await dbClient().query(query.sql, query.values || null);
};

const isFunction = obj => !!(obj && obj.constructor && obj.call && obj.apply);

const transaction = async opt => {
    if (!dbClient()) {
        throw 'No open db connection';
    }

    let res = null;
    try {
        await dbClient().query('BEGIN');
        res = await (isFunction(opt) ? opt() : executeQuery(opt));
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
    executeQuery,
    transaction,
};