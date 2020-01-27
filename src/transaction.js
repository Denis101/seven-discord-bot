const { dbClient } = require('./selectors');

const createTransaction = async (sql, values) => {
    if (!dbClient()) {
        throw 'No open db connection';
    }

    let res = null;

    console.log(sql, values);

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
    createTransaction,
};