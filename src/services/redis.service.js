const Redis = require('ioredis');

const { database: databaseConfig } = require('../config/index');
const redis = databaseConfig.redis;

module.exports = new Redis({
    host: redis.host,
    port: redis.port,
    username: redis.user || undefined,
    password: redis.pass || undefined,
    db: redis.name || undefined,
});
