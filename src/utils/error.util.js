const boom = require('@hapi/boom');

module.exports = {
    parse: error => {
        switch (error.message) {
            case 'Not Found':
                throw boom.notFound(error.message);
            default:
                throw boom.badImplementation(error);
        }
    },
};
