const { date, getUnix } = require('./utils/dateTimeUtils.js');
const { convertToObject, remapKeys, invert } = require('./utils/arrayUtils.js');
const { dbClient } = require('./selectors');

const getParamIndex = i => {
    return `$${i+1}`;
};

const toDb = (data, mappings, type) => {
    const newData = remapKeys(convertToObject(data, d => d.slug), mappings);
    switch (type) {
        case 'insert':
            return {
                ...newData,
                create_date: date().unix(),
            };
        case 'update':
            return {
                ...newData,
                modified_date: date().unix(),
            };
        default:
            return newData;
    }
};

const fromDb = (data, mappings) => {
    const newData = remapKeys(data, invert(mappings));

    return {
        ...newData,
        createDate: data.create_date ? getUnix(data.create_date) : null,
        modifiedDate: data.modified_date ? getUnix(data.modified_date) : null,
    };
};

const withSimpleWhereClause = (query, obj, mappings) => {
    const keys = Object.keys(obj).filter(k => !!obj[k]);
    const values = keys.map(k => obj[k]);
    const startIndex = query.values ? query.values.length : 0;

    return {
        sql: `${query.sql} WHERE ${keys.map((k, i) => `${toDb(k, mappings)} = ${getParamIndex(startIndex + i)}`).join(',')}`,
        values: query.values ? [...query.values, ...values] : values,
    };
};

const createQueryWrapper = (fn, args) => {
    const q = fn.apply(null, args);
    return {
        ...q,
        withSimpleWhereClause: (o, m) => withSimpleWhereClause(q, o, m),
    };
}

const getSelectQuery = (table, keys, mappings) => {
    const fn = (t, k, m) => ({
        sql: `SELECT ${!k || k.length < 1 ? '*' : k.map(m).join(',')} FROM ${t}`,
    });

    return createQueryWrapper(fn, [table, keys, k => toDb(k, mappings)]);
};

const getInsertQuery = (table, obj, mappings) => {
    const fn = (t, o, m) => {
        const ks = Object.keys(o).filter(k => !!o[k]);
        return {
            sql: `INSERT INTO ${t} (${ks.map(m).join(',')}) VALUES (${ks.map((_, i) => getParamIndex(i)).join(',')})`,
            values: ks.map(k => o[k]),
        };
    };

    return createQueryWrapper(fn, [table, obj, k => toDb(k, mappings, 'insert')]);
};

const getUpdateQuery = (table, obj, mappings) => {
    const fn = (t, o, m) => {
        const ks = Object.keys(o).filter(k => !!o[k]);
        return {
            sql: `UPDATE ${t} SET ${ks.map((k, i) => `${m(k)} = ${getParamIndex(i)}`).join(',')}`,
            values: ks.map(k => o[k]),
        };
    };
    return createQueryWrapper(fn, [table, obj, k => toDb(k, mappings, 'update')]);
};

const executeQuery = async (query, mappings) => {
    if (!dbClient()) {
        throw 'No open db connection';
    }

    const res = await dbClient().query(query.sql, query.values || null);
    if (!mappings) {
        return res.rows;
    }

    return convertToObject(res.rows.map(r => fromDb(r, mappings)), r => r.slug);
};

const isFunction = obj => !!(obj && obj.constructor && obj.call && obj.apply);

const transaction = async (opt, mappings) => {
    if (!dbClient()) {
        throw 'No open db connection';
    }

    let res = null;
    try {
        await dbClient().query('BEGIN');
        res = await (isFunction(opt) ? opt() : executeQuery(opt, mappings));
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