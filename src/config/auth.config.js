module.exports = {
    token: {
        algorithm: process.env.AUTH_TOKEN_ALGORITHM,
        secret: process.env.AUTH_TOKEN_SECRET,
        expiration: Number(process.env.AUTH_TOKEN_EXPIRATION),
    },
    session: {
        prefixLogin: 'authId',
        prefixLogout: 'logoutId',
        expiration: Math.floor(Date.now() / 1000) + Number(process.env.AUTH_TOKEN_EXPIRATION),
    },
};
