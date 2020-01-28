const { dbClient } = require('./selectors');

const getParamIndex = i => {
    return `$${i+1}`;
};

const withSimpleWhereClause = (obj, keyMapper = k => k) => {
    const keys = Object.keys(o).filter(k => !!obj[k]).map(m);
    return {
        sql: `${this.sql} WHERE ${keys.map((k, i) => `${k} = ${getParamIndex(this.values.length + i)}`).join(',')}`,
        values: [...this.values, addedValues],
    };
};

const createQueryWrapper = (fn, args) => {
    const query = fn.apply(args);
    query.withSimpleWhereClause = withSimpleWhereClause.bind(query);
    return query;
}

const getSelectQuery = (table, keys, keyMapper = k => k) => {
    return createQueryWrapper(
        (t, k, m) => ({
            sql: `SELECT ${k.map(m).join(',')} FROM ${t}`,
        }), [table, keys, keyMapper]);
};

const getInsertQuery = (table, obj, keyMapper = k => k) => {
    return createQueryMapper(
        (t, o, m) => {
            const ks = Object.keys(o).filter(k => !!o[k]);

            return {
                sql: `INSERT INTO ${t} (${ks.map(m).join(',')}) VALUES (${ks.map((_, i) => getParamIndex(i)).join(',')})`,
                values: ks.map(k => o[k]),
            };
        }, [table, obj, keyMapper]);
};

const getUpdateQuery = (table, obj, keyMapper = k => k) => {
    return createQueryWrapper(
        (t, o, m) => {
            const ks = Object.keys(o).filter(k => !!o[k]).map(m);
            return {
                sql: `UPDATE ${t} SET ${ks.map((k, i) => `${k} = ${getParamIndex(i)}`).join(',')}`,
                values: keys.map(k => o[k]),
            };
        }, [table, obj, keyMapper]);
};

const transaction = async query => {
    if (!dbClient()) {
        throw 'No open db connection';
    }

    let res = null;

    try {
        await dbClient().query('BEGIN');
        if (query.values) {
            res = await dbClient().query(query.sql, query.values);
        }
        else {
            res = await dbClient().query(query.sql);
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