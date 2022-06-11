module.exports = {
    token: {
        secret: process.env.AUTH_TOKEN_SECRET,
        expiration: process.env.AUTH_TOKEN_EXPIRATION,
    },
};
