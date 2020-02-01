const { date, getUnix } = require('../utils/dateTimeUtils.js');
const { convertToObject, remapKeys, invert } = require('../utils/arrayUtils.js');
const { dbClient } = require('../selectors');

const getParamIndex = i => {
    return `$${i+1}`;
};

const toDb = (data, mappings, type) => {
    const updateData = { ...data };

    if (updateData.createDate) {
        delete updateData.createDate;
    }

    if (updateData.modifiedDate) {
        delete updateData.modifiedDate;
    }

    const newData = remapKeys(data, mappings);
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

const where = (query, obj) => {
    const keys = Object.keys(obj).filter(k => !!obj[k]);
    const values = keys.map(k => obj[k]);
    const startIndex = query.values ? query.values.length : 0;

    return {
        sql: `${query.sql} WHERE ${keys.map((k, i) => `${k} = ${getParamIndex(startIndex + i)}`).join(',')}`,
        values: query.values ? [...query.values, ...values] : values,
    };
};

const whereMapped = (query, obj, mappings) => {
    const newObj = remapKeys(data, mappings);
    const keys = Object.keys(newObj).filter(k => !!obj[k]);
    const values = keys.map(k => obj[k]);
    const startIndex = query.values ? query.values.length : 0;

    return {
        sql: `${query.sql} WHERE ${keys.map((k, i) => `${k} = ${getParamIndex(startIndex + i)}`).join(',')}`,
        values: query.values ? [...query.values, ...values] : values,
    };
};

const createQueryWrapper = (fn, args) => {
    const q = fn.apply(null, args);
    return {
        ...q,
        where: o => where(q, o),
        whereMapped: (o, m) => whereMapped(q, o, m),
    };
}

const getSelectQuery = (table, keys, mappings) => {
    const fn = (t, k, m) => {
        if (!k || k.length < 1) {
            return {
                sql: `SELECT * FROM ${t}`
            };
        }

        const ks = !!m ? k.map(m) : k;
        return {
            sql: `SELECT ${ks.join(',')} FROM ${t}`,
        };
    };

    const mapper = mappings ? k => toDb(k, mappings) : null;
    return createQueryWrapper(fn, [table, keys, mapper]);
};

const getInsertQuery = (table, obj, mappings) => {
    const fn = (t, o, m) => {
        o = m(o);
        const ks = Object.keys(o).filter(k => !!o[k]);
        return {
            sql: `INSERT INTO ${t} (${ks.join(',')}) VALUES (${ks.map((_, i) => getParamIndex(i)).join(',')})`,
            values: ks.map(k => o[k]),
        };
    };

    return createQueryWrapper(fn, [table, obj, o => toDb(o, mappings, 'insert')]);
};

const getUpdateQuery = (table, obj, mappings) => {
    const fn = (t, o, m) => {
        o = m(o);
        const ks = Object.keys(o).filter(k => !!o[k]);
        return {
            sql: `UPDATE ${t} SET ${ks.map((k, i) => `${k} = ${getParamIndex(i)}`).join(',')}`,
            values: ks.map(k => o[k]),
        };
    };
    return createQueryWrapper(fn, [table, obj, o => toDb(o, mappings, 'update')]);
};

const executeQuery = async (query, mappings) => {
    if (!dbClient()) {
        throw 'No open db connection';
    }
    
    const res = await dbClient().query(query.sql, query.values || null);
    if (res.rows.length < 1) {
        return null;
    }

    if (!mappings) {
        return res.rows;
    }

    return convertToObject(res.rows.map(r => fromDb(r, mappings)), mappings.keyGetter);
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