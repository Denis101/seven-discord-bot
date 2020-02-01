const { promisify } = require('util');
const { redisClient } = require('../selectors');

module.exports = {
    get: promisify(redisClient().get).bind(redisClient()),
    set: promisify(redisClient().set).bind(redisClient()),
};