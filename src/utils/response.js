const { server: serverConfig } = require('../config/index');

const url = `http://${serverConfig.host}:${serverConfig.port}/`;

module.exports = {
    parse: (req, type, data) => {
        const page = req.query.page || 1;
        const next = page + 1;
        const last = (page > 1) ? page - 1 : 1;

        // Data
        if (Array.isArray(data)) {
            return {
                data: data.map(d => ({
                    type,
                    id: d.id,
                    attributes: d,
                    links: {
                        self: `${url}${type}/${d.id}`,
                    },
                })),

                links: {
                    self: `${url}${type}`,
                    next: `${url}${type}?page=${next}`,
                    last: `${url}${type}?page=${last}`,
                },
            };
        } else {
            return {
                data: {
                    type,
                    id: data.id,
                    attributes: data,  
                },
                links: {
                    self: `${url}${type}`,
                },
            };
        }
    }
};
