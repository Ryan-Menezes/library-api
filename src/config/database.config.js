module.exports = {
    mongo: {
        host: process.env.DATABASE_MONGO_HOST,
        port: process.env.DATABASE_MONGO_PORT,
        user: process.env.DATABASE_MONGO_USER,
        pass: process.env.DATABASE_MONGO_PASS,
        name: process.env.DATABASE_MONGO_NAME,
    },

    redis: {
        host: process.env.DATABASE_REDIS_HOST,
        port: process.env.DATABASE_REDIS_PORT,
        user: process.env.DATABASE_REDIS_USER,
        pass: process.env.DATABASE_REDIS_PASS,
        name: process.env.DATABASE_REDIS_NAME,
    },
};
